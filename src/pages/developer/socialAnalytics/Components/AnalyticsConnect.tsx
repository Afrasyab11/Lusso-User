import { useState } from 'react';
import analytics_img from '../../../../assets/images/creator/analytics-connect.svg';
import SocialPageModal from '../../../../components/sidebar/SocialPageModal';
import { apiEndpoints } from '../../../../constants/api-endpoints';
import { ICON_ENUM } from '../../../../constants/icons.constant';
import { ROUTES_ENUM } from '../../../../constants/routes.constant';
import makeApiCall from '../../../../lib/apiCall';
import { useAppDispatch, useAppSelector, useCurrentOrigin } from '../../../../redux/hooks';
import { getUserSocialNetworks } from '../../../../redux/socialAnalytics/socialAnalyticSlice';
import { checkNullOrEmpty, getCookies } from '../../../../utils/utils';
import { SPLASH_ENUM } from '../constants/analytics.constants';
import '../SocialAnalytics.scss';

interface AnalyticsConnectScreenProps {
    platform: string;
    children: any;
}

const AnalyticsConnectScreen = ({
    platform = '',
    children,
}: AnalyticsConnectScreenProps) => {
    const dispatch = useAppDispatch()
    const baseOrigin = useCurrentOrigin();
    const upperPlatform = platform.toUpperCase();

    const { connectedPlatforms } = useAppSelector(
        state => state?.socialAnalytics,
    );

    const [connected, setConnected] = useState(true);
    const [addSocialModal, setAddSocialModal] = useState<boolean>(false);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [socialPages, setSocialPages] = useState([]);
    const [paramsData, setParamsData] = useState<{
        userId: number | string;
        blogId: number | string;
    }>({ userId: '', blogId: '' });

    const platformDetail =
        SPLASH_ENUM[upperPlatform as keyof typeof SPLASH_ENUM] ?? {};

    const addSocialPlatform = async () => {
        const creator = getCookies('authUser');
        const platformName = platform?.toLowerCase();
        if (creator) {
            let newContent = { ...apiEndpoints.socialSignin };
            newContent.params.query.platformName = platformName;

            const signinLink = await makeApiCall(newContent);

            if (!signinLink) return;
            const newWindow = window.open(
                signinLink +
                '&returnPage=' +
                baseOrigin +
                ROUTES_ENUM.CREATOR_SOCIAL_CALLBACK,
                'myWindow',
                'width=1000,height=700',
            );

            const handleMessage = (event: MessageEvent) => {
                if (event.origin === baseOrigin) {
                    const { userId, blogId } = event.data;
                    console.log('User ID:', userId);
                    console.log('Blog ID:', blogId);
                    if (!checkNullOrEmpty(blogId)) {
                        setParamsData({ userId, blogId });

                        const targetPlatform =
                            apiEndpoints?.[platformName as keyof typeof apiEndpoints] ?? {};
                        if (targetPlatform?.addPage) {
                            if (!checkNullOrEmpty(targetPlatform?.getPages)) {
                                makeApiCall(targetPlatform.getPages)
                                    .then(resp => {
                                        const newResp =
                                            platformName === 'facebook' && !checkNullOrEmpty(resp)
                                                ? resp?.map((page: any) => ({
                                                    ...page,
                                                    name: page?.value ?? '',
                                                    id: page?.key ?? '',
                                                }))
                                                : resp ?? [];
                                        setSocialPages(newResp ?? []);
                                        if (!checkNullOrEmpty(newResp)) setAddSocialModal(true);
                                    })
                                    .catch(error => console.error(error));
                            }
                        } else {
                            dispatch(getUserSocialNetworks())
                        }
                    }

                    // newWindow?.close();
                }
            };

            window.addEventListener('message', handleMessage);

            return () => {
                window.removeEventListener('message', handleMessage);
            };
        }
    };

    const socialPageHandle = async (id: string) => {
        setInProgress(true);
        const key: keyof typeof paramsData = 'blogId';
        const addPageContent = {
            ...apiEndpoints[platform.toLowerCase() as keyof typeof apiEndpoints]
                .addPages,
        };
        const addLikPage = {
            ...addPageContent,
            endpoint:
                addPageContent.endpoint + paramsData[key] + '?linkedInPageId=' + id,
        };
        await makeApiCall(addLikPage);
        setInProgress(false);
        setAddSocialModal(false);
        dispatch(getUserSocialNetworks())
    };

    return connectedPlatforms[platform] ? (
        children
    ) : (
        <div className="space-y-8">
            <SocialPageModal
                platform={platform}
                open={addSocialModal}
                loading={inProgress}
                options={socialPages}
                onClose={() => setAddSocialModal(false)}
                onConfirm={socialPageHandle}
            />
            <div className="flex items-center space-x-5">
                {platformDetail.icon && (
                    <img
                        src={platformDetail.icon}
                        alt="platform-Icon"
                        className="w-5 h-10 text-white"
                    />
                )}
                <span className="text-[#FFFFFFCC] text-lg font-bold capitalize">
                    {platformDetail?.header ?? platform}
                </span>
            </div>

            <div className="card-bg-dev rounded-xl p-4 w-full flex flex-col md:flex-row py-5">
                {/* Content on the left */}
                <div className="md:w-1/2 space-y-8 text-white">
                    <div className="text-2xl font-bold">
                        {platformDetail?.title ?? ''}
                    </div>
                    <p>{platformDetail?.desc ?? ''}</p>
                    <button
                        className={`text-${platformDetail?.btnTextColor ?? '[#FFFFFF99]'
                            } rounded-md p-2 flex items-center justify-between hover:p-3`}
                        style={{
                            background:
                                platformDetail?.btnBG ?? ICON_ENUM?.TIKTOK?.borderColor,
                        }}
                        onClick={addSocialPlatform}
                    >
                        {platformDetail?.connectBtn ?? 'Connect'}
                        {platformDetail?.icon && (
                            <img
                                src={platformDetail?.icon ?? ''}
                                alt="platform-Icon"
                                className="w-5 h-5 ms-7"
                            />
                        )}
                    </button>
                </div>

                {/* Graph card */}
                <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center md:py-12">
                    <div className="w-full md:w-4/5">
                        <img src={analytics_img} alt="analytics" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsConnectScreen;
