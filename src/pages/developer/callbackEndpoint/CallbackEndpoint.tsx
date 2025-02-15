// import { useParams } from "react-router-dom";

const CallbackEndpoint = (props: any) => {
    // const { platformName } = useParams();
    // const navigate = useNavigate()
    // const location = useLocation()

    // const [paramsData, setParamsData] = useState({ userId: '', blogId: '' })
    // const [addSocialModal, setAddSocialModal] = useState(false)
    // const [inProgress, setInProgress] = useState(false)
    // const [socialPages, setSocialPages] = useState([])

    window.onload = () => {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('userId');
        const blogId = params.get('blogId');

        // setParamsData({ userId: userId ?? '', blogId: blogId ?? '' })

        console.log('CallbackEndpoint', userId, blogId);


        window.opener.postMessage({ userId, blogId }, process.env.REACT_APP_ORIGIN);
        window.close();
    };
    // console.log('CallbackEndpointparamsData', paramsData, platformName);

    // useEffect(() => {
    //     if (!checkNullOrEmpty(paramsData.blogId)) {
    //         fetchCompanies()
    //     }
    // }, [paramsData.userId, paramsData.blogId, platformName])

    // const fetchCompanies = () => {
    //     console.log('CallbackEndpointfetchCompanies', paramsData, platformName);
    //     makeApiCall(apiEndpoints.linkedInCompanies)
    //         .then(resp => {
    //             const pages = resp?.map((page: any) => ({
    //                 value: page.id,
    //                 label: page.name,
    //             }));
    //             setSocialPages(pages ?? []);
    //             setAddSocialModal(true);
    //         })
    //         .catch(error => console.error(error));
    // }

    // const socialPageHandle = async (id: string) => {
    //     setInProgress(true);
    //     const key: keyof typeof paramsData = 'blogId';
    //     const addLikPage = {
    //         ...apiEndpoints.addLinkedinPage,
    //         endpoint:
    //             apiEndpoints.addLinkedinPage.endpoint +
    //             paramsData[key] +
    //             '?linkedInPageId=' +
    //             id,
    //     };
    //     await makeApiCall(addLikPage);
    //     setInProgress(false);
    //     setAddSocialModal(false);
    //     navigate(location.pathname + '/' + platformName)
    // };

    return <></>
    // return <SocialPageModal
    //     open={addSocialModal}
    //     loading={inProgress}
    //     options={socialPages}
    //     onClose={() => setAddSocialModal(false)}
    //     onConfirm={(page: any) => socialPageHandle(page.value)}
    // />

}

export default CallbackEndpoint