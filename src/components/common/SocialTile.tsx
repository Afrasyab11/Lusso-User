import { checkNullOrEmpty } from '../../utils/utils';
import Loading from './Loading';

interface TileData {
    headerIcon?: any;
    title?: string;
    borderColor?: string;
    changedValue?: string;
    bodyIcon?: any;
    count?: string;
    text?: string;
    borderWidth?: string;
}
const SocialTile = ({
    data,
    loading = false,
}: {
    data: TileData;
    loading?: boolean;
}) => {
    return (
        <div
            className={`social-card rounded-lg ${data?.borderWidth ? 'p-[' + data?.borderWidth + ']' : 'p-1'
                }`}
            style={{
                backgroundColor: data?.borderColor,
                backgroundImage: data?.borderColor,
                backgroundOrigin: 'border-box',
                backgroundPosition: 'left,right',
                backgroundSize: '100% 100%, 100% 100%',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="w-full h-full p-4 space-y-3 social-tile-bg rounded-lg">
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <div className="flex items-center gap-3">
                            {data?.headerIcon && (
                                <img src={data?.headerIcon ?? ''} width={25} />
                            )}
                            <span className="font-bold">{data?.title ?? ''}</span>
                        </div>
                        <div>
                            <div className="flex space-x-10">
                                <div className="social-count text-3xl font-bold">
                                    {data?.count ?? '0'}
                                </div>
                                {!checkNullOrEmpty(data?.bodyIcon) && (
                                    <img src={data?.bodyIcon} width={35} />
                                )}
                            </div>
                            <span className="increase text-blue-500">
                                {data?.text ?? ''}
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SocialTile;
