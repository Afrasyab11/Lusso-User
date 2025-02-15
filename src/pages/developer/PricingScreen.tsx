import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TickIcon from '../../assets/images/tick-icon.svg';
import AlertPopup from '../../components/common/AlertPopup';
import Spinner from '../../components/common/Spinner';
import { apiEndpoints } from '../../constants/api-endpoints';
import { CREATOR_PLANS_ENUM, PAYMENT_METHODS_ENUM } from '../../data-center/data';
import useStripeHook from '../../hooks/stripeHook';
import makeApiCall from '../../lib/apiCall';
import { checkNullOrEmpty, getCookies, setCookies } from '../../utils/utils';
import './dev.scss';

const cardElementOptions = {
    style: {
        base: {
            color: '#ffffff',
            fontSize: '16px',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            '::placeholder': {
                color: '#cccccc',
            },
        },
        invalid: {
            color: '#ff6347',
            iconColor: '#ff6347',
        },
    },
};

const PricingScreen = () => {
    const navigate = useNavigate();
    const { isLoading, cardPayment } = useStripeHook();

    const [choosePlan, setChoosePlan] = useState(1);
    const [method, setPaymentMethod] = useState(0);
    const [devAuthentication, setDevAuthentication] = useState({
        popup: false,
        message: '',
        redirect: '',
    });
    const [paymentMsg, setPaymentMsg] = useState({
        alert: false,
        message: '',
        type: '',
    });
    // const [cardHolderName, setCardHolderName] = useState('');

    useEffect(() => {
        const authToken = getCookies('authToken');

        if (checkNullOrEmpty(authToken)) {
            setDevAuthentication({
                popup: true,
                message: 'Please login first!',
                redirect: '/login',
            });
        }
    }, []);

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        let user = getCookies('authUser');
        const { type } = PAYMENT_METHODS_ENUM[method] ?? {};
        const priceId = CREATOR_PLANS_ENUM[choosePlan]?.priceId ?? null;
        const planName = CREATOR_PLANS_ENUM[choosePlan]?.title ?? null;

        if (!priceId) {
            toast.error(
                'You cannot subscribe to this plan because its price ID has not been created in Stripe.',
                {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                },
            );
            return false;
        }

        if (type === 'card') {
            const cardPaymentResp = await cardPayment({
                CardNumberElement,
                CardCvcElement,
                CardExpiryElement,
                priceId,
                planName,
            });
            console.log('cardPaymentResp', cardPaymentResp);
            console.log('user data', user);
            setPaymentMsg({ alert: true, ...cardPaymentResp });
            // const loggedinUser = await makeApiCall(apiEndpoints.userProfile);
            if (cardPaymentResp.type === 'success' && user) {
                if (checkNullOrEmpty(user?.analyticsId)) {
                    makeApiCall(apiEndpoints.createBrand)
                        .then(brandId => {
                            if (brandId) {
                                let newContent = { ...apiEndpoints.updateBrandName };
                                newContent.params.path.brandId = brandId;
                                newContent.params.query.name = user?.username ?? '';
                                makeApiCall(newContent);
                                // }
                            }
                        })
                        .then(() => {
                            const loggedinUser = makeApiCall(apiEndpoints.userProfile)
                            setCookies('authUser', loggedinUser);

                            navigate('/dev/dashboard');
                        })
                        .catch(error => console.error('create brand error: ', error));
                } else {
                    const loggedinUser = await makeApiCall(apiEndpoints.userProfile)
                    setCookies('authUser', loggedinUser);
                    // if (loggedinUser?.type === 'user') {
                    //     navigate('/dev/manageprofile');
                    // } else {
                    navigate('/dev/dashboard');
                    // }
                }
            }
        }
    };

    const onSkipBtnClick = () => {
        let user = getCookies('authUser');
        if (user?.type === 'user') {
            navigate('/explore');
        } else {
            navigate('/dev/no-subscription');
        }
    };

    // const makePayment = () => {
    //     let user = getCookies('authUser');
    //     if (user) {
    //         Cookies.set('subscription', 'yes', { expires: 7 });
    //         makeApiCall(apiEndpoints.createBrand)
    //             .then(brandId => {
    //                 if (brandId) {
    //                     let newContent = { ...apiEndpoints.updateBrandName };
    //                     newContent.params.path.brandId = brandId;
    //                     newContent.params.query.name = user?.username ?? '';
    //                     makeApiCall(newContent);
    //                     setCookies('authUser', { ...user, analyticsId: brandId });
    //                     navigate('/dev/dashboard');
    //                 }
    //             })
    //             .catch(error => console.error('create brand error: ', error));
    //     }
    // };

    const paymentTypeCard = (icon: string, name: string, index: number) => {
        return (
            <div
                className={`flex-1 flex flex-row cursor-pointer ${index === method ? 'border border-green-400' : ''
                    }`}
                style={{
                    padding: 12,
                    background: '#00000033',
                    borderRadius: 8,
                }}
                onClick={() => setPaymentMethod(index)}
            >
                <div className="mr-1">
                    <img src={icon} alt="" />
                </div>
                <div>
                    <span className="text-white">{name}</span>
                </div>
            </div>
        );
    };

    const planCard = (
        name: string,
        subname: string,
        price: string,
        duration: string,
        planType: string,
        features: string[],
        index: number,
    ) => {
        return (
            <div
                className={`planCard flex flex-col relative cursor-pointer ${index === choosePlan ? 'border border-green-400' : ''
                    }`}
                onClick={() => setChoosePlan(index)}
            >
                <div
                    className="text-white uppercase"
                    style={{ letterSpacing: 8, fontSize: '1rem', fontWeight: 500 }}
                >
                    <span>{name}</span>
                </div>
                <div
                    className="text-white uppercase"
                    style={{ letterSpacing: 8, fontSize: '1rem', fontWeight: 100 }}
                >
                    <span>{subname}</span>
                </div>
                <div
                    className="text-[#FFFFFF80] uppercase pb-2 pt-2"
                    style={{ fontSize: '0.7rem', fontWeight: 100 }}
                >
                    <span>{planType}</span>
                </div>
                <div
                    className="absolute top-0 right-0 bg-gray-900 text-white px-3 py-3 rounded-tr-lg"
                    style={{
                        background:
                            index === 0
                                ? 'linear-gradient(180deg, #460F88 0%, #9B56FE 100.32%)'
                                : index === 1
                                    ? 'linear-gradient(180deg, #0054B5 0.32%, #40DAFE 101.24%)'
                                    : index === 2
                                        ? 'linear-gradient(181.2deg, #B00D98 0.45%, #FF5EE5 98.74%)'
                                        : '',
                        borderRadius: 16,
                    }}
                >
                    <div>
                        <span
                            className="text-[#00F0FB]"
                            style={{ fontSize: '1.2rem', fontWeight: 600 }}
                        >
                            ${price}
                        </span>
                    </div>
                    <div
                        className="text-[#FFFFFF80] uppercase"
                        style={{ fontSize: '0.7rem', fontWeight: 100 }}
                    >
                        <span className="uppercase">/ {duration}</span>
                    </div>
                </div>
                <div>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-row justify-start items-center gap-3"
                        >
                            <div>
                                <img src={TickIcon} alt="tick" />
                            </div>
                            <div>
                                <span
                                    className="text-white"
                                    style={{ fontSize: '0.9rem', fontWeight: 300 }}
                                >
                                    {feature}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="container price-background-banner">
            <AlertPopup
                open={devAuthentication.popup}
                message={devAuthentication.message}
                onClose={() => {
                    setDevAuthentication({ popup: false, message: '', redirect: '' });
                    navigate(devAuthentication.redirect);
                }}
            />
            <div className="left"></div>
            <div className="right">
                <div className="text-white font-bold text-[20px]">
                    <span>Pricing Details</span>
                </div>
                <div>
                    <div className="horizontal-divider-light mt-4 mb-4"></div>
                </div>
                <div className="flex flex-row gap-24">
                    <div className="flex flex-1 flex-col gap-y-6">
                        {CREATOR_PLANS_ENUM.map((plan: any, index: number) =>
                            planCard(
                                plan.title,
                                plan.subTitle,
                                plan.price,
                                plan.duration,
                                plan.planType,
                                plan.features,
                                index,
                            ),
                        )}
                    </div>
                    <div className="flex flex-1 flex-col gap-y-6 justify-between">
                        {!checkNullOrEmpty(CREATOR_PLANS_ENUM[choosePlan]) && (
                            <div className="flex flex-row justify-between items-center selectedPlan">
                                <div>
                                    <div
                                        className="text-white uppercase"
                                        style={{
                                            letterSpacing: 8,
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                        }}
                                    >
                                        <span>{CREATOR_PLANS_ENUM[choosePlan]?.title ?? ''}</span>
                                    </div>
                                    <div
                                        className="text-white uppercase"
                                        style={{
                                            letterSpacing: 8,
                                            fontSize: '1rem',
                                            fontWeight: 100,
                                        }}
                                    >
                                        <span>
                                            {CREATOR_PLANS_ENUM[choosePlan]?.subTitle ?? ''}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <span
                                            className="text-[#00F0FB]"
                                            style={{ fontSize: '1.2rem', fontWeight: 600 }}
                                        >
                                            ${CREATOR_PLANS_ENUM[choosePlan]?.price ?? ''}
                                            <span
                                                className="text-[#FFFFFF]"
                                                style={{ fontSize: '1rem', fontWeight: 400 }}
                                            >
                                                /{CREATOR_PLANS_ENUM[choosePlan]?.duration ?? ''}
                                            </span>
                                        </span>
                                    </div>
                                    <div>
                                        <span
                                            className="text-[#FFFFFF]"
                                            style={{ fontSize: '0.7rem', fontWeight: 100 }}
                                        >
                                            Free 7-day trial
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div>
                            <div className="text-white font-normal text-[16px]">
                                <span>Payment Method</span>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <div className="w-full flex-1 flex flex-row justify-between items-center gap-2">
                                    {PAYMENT_METHODS_ENUM.map((method: any, index: number) =>
                                        paymentTypeCard(method.icon, method.name, index),
                                    )}
                                    {/* {paymentTypeCard(DebitCard, 'Debit/ Credit')}
                                    {paymentTypeCard(Applepay, 'Apple Pay')} */}
                                </div>
                                {/* <div className="w-full flex-1 flex flex-row justify-between items-center gap-2">
                                    {paymentTypeCard(GoogleWallet, 'Google Wallet')}
                                    {paymentTypeCard(BitCoin, 'Bit Coin')}
                                </div> */}
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div
                                className="flex flex-col p-4 space-y-3"
                                style={{ border: '1px solid #A768FD33', borderRadius: 8 }}
                            >
                                <div className="text-white font-normal text-[16px]">
                                    <span>Enter Card Details</span>
                                </div>
                                <div
                                    className="border border-[#A768FD] rounded-full px-6 py-4 h-[50px]"
                                    style={{ background: 'rgba(4, 4, 4, 0.20)' }}
                                >
                                    <CardNumberElement options={cardElementOptions} />
                                </div>
                                {/* <div>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Card holder name"
                                        className="ac-frm-input rounded-pill badge h-[50px]"
                                        value={cardHolderName || ''}
                                        style={{
                                            borderRadius: 50,
                                            border: '1px solid #A768FD',
                                            background: 'rgba(4, 4, 4, 0.20)',
                                        }}
                                        onChange={e => {
                                            setCardHolderName(e.target.value);
                                        }}
                                    />
                                </div> */}
                                <div className="flex gap-2">
                                    <div
                                        className="flex-1 border border-[#A768FD] rounded-full px-6 py-4 h-[50px]"
                                        style={{ background: 'rgba(4, 4, 4, 0.20)' }}
                                    >
                                        <CardExpiryElement options={cardElementOptions} />
                                    </div>
                                    <div
                                        className="flex-1 border border-[#A768FD] rounded-full px-6 py-4 h-[50px]"
                                        style={{ background: 'rgba(4, 4, 4, 0.20)' }}
                                    >
                                        <CardCvcElement options={cardElementOptions} />
                                    </div>
                                </div>
                            </div>
                            {paymentMsg.alert && (
                                <div
                                    role="alert"
                                    className={`mt-3 alert alert-${paymentMsg.type}`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 shrink-0 stroke-current"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d={
                                                paymentMsg.type === 'success'
                                                    ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                                                    : 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                                            }
                                        />
                                    </svg>
                                    <span>{paymentMsg.message ?? ''}</span>
                                </div>
                            )}
                            <div className="flex flex-row justify-center items-center gap-3">
                                <button
                                    onClick={onSkipBtnClick}
                                    className="saveContinue mt-10"
                                    style={{
                                        borderRadius: 50,
                                        border: '1px solid #FFF',
                                        textTransform: 'capitalize',
                                        paddingLeft: 18,
                                        paddingRight: 18,
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="saveContinue payment-btn mt-10"
                                    style={{
                                        borderRadius: 50,
                                        border: '1px solid #A768FD',
                                        background:
                                            'linear-gradient(90deg, #4B03CE 0%, #F572B6 100%)',
                                        textTransform: 'capitalize',
                                        flex: 1,
                                    }}
                                    disabled={isLoading}
                                >
                                    <Spinner spin={isLoading}>Complete Payment</Spinner>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingScreen;
