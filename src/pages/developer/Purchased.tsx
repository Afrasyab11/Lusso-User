import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import success from '../../assets/icons/success.svg';
import americanexpress from '../../assets/images/americanexpress.png';
import ChevronRightWhite from '../../assets/images/ChevronRight.png';
import discover from '../../assets/images/discover.png';
import greenTick from '../../assets/images/greenTick.png';
import jcb from '../../assets/images/jcb.png';
import mastercard from '../../assets/images/mastercard.png';
import ChevronRight from '../../assets/images/subscription-chev-right.png';
import unionpay from '../../assets/images/unionpay.png';
import visa from '../../assets/images/Visa.png';

import DrawerRtL from '../../components/common/DrawerRtL';
import Loading from '../../components/common/Loading';

import * as XLSX from "xlsx";

import Button from '../../components/ui/Button';
import { apiEndpoints } from '../../constants/api-endpoints';
import { ICON_ENUM } from '../../constants/icons.constant';
import { CREATOR_PLANS_ENUM, PAYMENT_METHODS_ENUM } from '../../data-center/data';
import makeApiCall from '../../lib/apiCall';
interface SubscriptionPlan {
    title?: string;
    subTitle?: string;
    planType?: string;
    bg?: string;
    price?: string;
    duration?: string;
    features?: string[];
}

interface Package {
    active: boolean;
    packageName: string;
    subscriptionDate: string;
    stripeSubscriptionId: string;
    expiryDate: string;
    subscriptionStatus: string;
    id: string
}

interface Card {
    brand: string;
    exp_year: number;
    exp_month: number;
    last4: string;
}

interface PaymentHistory {
    created: number;
    total: number;
    status: string;
}

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: '#d1d5db',
            fontSize: '16px',
            '::placeholder': {
                color: '#9ca39f',
            },
            backgroundColor: 'transparent',
            border: '1px solid #a768fd',
            borderRadius: '9999px',
            padding: '12px 16px',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
        },
        invalid: {
            color: '#ff4d4d',
        },
    },
};

const Purchased = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedActivePlanIndex, setSelectedActivePlanIndex] = useState(null);
    const [selectedUpgradePlanIndex, setSelectedUpgradePlanIndex] =
        useState(null);
    const [stripeCustomerId, setStripeCustomerId] = useState('');
    const [stripeSubscriptionId, setStripeSubscriptionId] = useState('');
    const [subscribedPackageName, setSubscribedPackageName] = useState('');

    const [activePriceId, setActivePriceId] = useState('');
    const [activePrice, setActivePrice] = useState('');

    const stripe = useStripe();
    const elements = useElements();
    const [paymentMethod] = useState('card'); // Default is card
    const [cardNumberError, setCardNumberError] = useState(null);
    const [cardExpiryError, setCardExpiryError] = useState(null);
    const [cardCvcError, setCardCvcError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [currentPackage, setCurrentPackage] = useState<Package | null>(null);
    const [currentCard, setCurrentCard] = useState<Card | null>(null);
    const [planUpdated, setPlanUpdated] = useState(false);
    const [paymentHistory, setPayementHistory] = useState<Array<PaymentHistory> | []>([]);
    const [cardHolderName, setCardHolderName] = useState('');
    const [cancelSubscriptionPrompt, setCancelSubscriptionPrompt] = useState(false);

    const handleCardNumberChange = (event: any) => {
        if (event.error) {
            setCardNumberError(event.error.message);
        } else {
            setCardNumberError(null);
        }
    };

    const handleCardExpiryChange = (event: any) => {
        if (event.error) {
            setCardExpiryError(event.error.message);
        } else {
            setCardExpiryError(null);
        }
    };

    const handleCardCvcChange = (event: any) => {
        if (event.error) {
            setCardCvcError(event.error.message);
        } else {
            setCardCvcError(null);
        }
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (loading) return false
        setLoading(true);

        if (paymentMethod === 'card') {
            const cardNumberElement = elements?.getElement(CardNumberElement);

            if (!cardNumberElement || !stripe) {
                setLoading(false);
                throw new Error("Stripe.js has not loaded yet. Please ensure that it is properly initialized.");
            }

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardNumberElement,
                    billing_details: {
                        name: cardHolderName,
                    },
                },
            });
            if (error) {
                toast.error(error.message, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                setLoading(false);
            } else if (paymentIntent) {
                const postsData = {
                    ...apiEndpoints.addPaymentHistory,
                    params: {
                        query: {
                            packageName: subscribedPackageName,
                            paymentStatus: paymentIntent?.status === 'succeeded',
                            stripeSubscriptionId: stripeSubscriptionId,
                            isUpgrade: true,
                        }
                    },
                };
                await makeApiCall(postsData);
                if (paymentIntent?.status === 'succeeded') {
                    setPlanUpdated(true)
                    getCustomerCard();
                    getCurrentPackage();
                    getStripeCustomer();
                    getPaymentHistory(true);
                    setLoading(false);
                } else {
                    toast.error('Unable to process payment.', {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                    setLoading(false);
                }
            }
        }
    };

    const navigate = useNavigate();

    const [showUpgradePlan, setShowUpgradePlan] = useState(false);


    const makeSubscription = async () => {
        if (loading) return false
        //setCurrentPackage(null)
        setLoading(true);
        setShowUpgradePlan(true);
        const postsData = {
            ...apiEndpoints.createStripeSubscription,
            params: {
                query: {
                    priceId: activePriceId,
                    customerId: stripeCustomerId,
                }
            },
        };
        const resp = await makeApiCall(postsData);
        setStripeSubscriptionId(resp.id)
        if (resp && resp?.latest_invoice?.payment_intent?.client_secret) {
            setClientSecret(resp?.latest_invoice?.payment_intent?.client_secret)
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    const handleCancelClick = () => {
        setShowUpgradePlan(false);
        getCurrentPackage();
        getStripeCustomer();
    };

    const handlePlanSelect = (index: any, priceId: string, price: string, planTitle: string) => {
        if (priceId) {
            setActivePriceId(priceId)
        } else {
            setActivePriceId('')
            toast.error('You cannot subscribe to this plan because its price ID has not been created in Stripe.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return false
        }
        setActivePrice(price)
        setSelectedUpgradePlanIndex(
            selectedUpgradePlanIndex === index ? null : index,
        );
        setSubscribedPackageName(planTitle)
    };

    const registerStripeCustomer = async () => {
        const getCustomer: any = await makeApiCall(apiEndpoints.registerStripeCustomer);
        if (getCustomer?.id) {
            setStripeCustomerId(getCustomer?.id)
        }
    };

    const getStripeCustomer = async () => {
        const getCustomer: any = await makeApiCall(apiEndpoints.getStripeCustomer);
        if (!getCustomer?.data?.[0]?.id) {
            registerStripeCustomer()
        } else {
            setStripeCustomerId(getCustomer?.data?.[0]?.id)
        }
    };

    const getCurrentPackage = async () => {
        const getCurrentPackage: any = await makeApiCall(apiEndpoints.getCurrentPackage);
        setCurrentPackage(getCurrentPackage?.subscription)
    }

    const getPaymentHistory = async (onPageLoad = false, id = "") => {
        const postsData = {
            ...apiEndpoints.paymentHistory,
            params: {
                query: {
                    startingAfter: id,
                    stripeCustomerId: stripeCustomerId,
                }
            },
        };
        const response: any = await makeApiCall(postsData);
        const hasMore = response?.has_more;
        const paymentId = response?.data[response?.data?.length - 1]?.id;
        if (onPageLoad) {
            setPayementHistory(response?.data)
        } else {
            setPayementHistory((prevState: any) => {
                return [
                    ...prevState, // previous records
                    ...response?.data, // new records
                ];
            })
        }
        if (hasMore) {
            getPaymentHistory(false, paymentId)
        }
    }

    const getCustomerCard = async () => {
        const postsData = {
            ...apiEndpoints.getCustomerCurrentCard,
            params: {
                query: {
                    customerId: stripeCustomerId,
                }
            },
        };
        const resp = await makeApiCall(postsData);
        setCurrentCard(resp?.data[0]?.card)
    }

    useEffect(() => {
        if (PAYMENT_METHODS_ENUM?.length > 0) {
            setSelectedCard(PAYMENT_METHODS_ENUM[0] as any);
        }
    }, [PAYMENT_METHODS_ENUM]);

    useEffect(() => {
        if (stripeCustomerId) {
            getCustomerCard();
            getPaymentHistory(true);
        }
    }, [stripeCustomerId]);

    useEffect(() => {
        getCurrentPackage();
        getStripeCustomer();
    }, []);

    const cancelSubscription = async () => {
        if (loading) return false
        setLoading(true);
        setCurrentPackage(null)
        setPlanUpdated(false);
        const postsData = {
            ...apiEndpoints.cancelSubscription,
            params: {
                query: {
                    subscriptionId: currentPackage?.id,
                }
            },
        };
        const resp = await makeApiCall(postsData);
        if (resp) {
            toast.success('Subscription has been unsubscribed successfully.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            });
            getCurrentPackage();
            getStripeCustomer();
            getPaymentHistory(true);
            setLoading(false);
        } else {
            toast.error('Unable to cancel subscription. Please contact lusso.ai help desk.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            });
            setLoading(false);
        }
    }

    const getActivePlan = () => {
        const subscriptionPlan: SubscriptionPlan = CREATOR_PLANS_ENUM.find(item => item.priceId === activePriceId) || {};

        return (
            <div
                className="p-[1px] rounded-lg h-full cursor-pointer border-2 border-[#00F0FB66]"
                style={{
                    background: '#00F0FB66',
                }}
            >
                <div
                    className="planCard-price-bg grid grid-cols-3 gap-5 p-5 rounded-lg min-h-full text-white"
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold uppercase tracking-[0.3em]">
                                {subscriptionPlan?.title || ''}
                            </span>
                            <span className="text-2xl uppercase tracking-[0.3em] font-light">
                                {subscriptionPlan?.subTitle || ''}
                            </span>
                            <span className="text-[#FFFFFF80] text-xs uppercase">
                                {subscriptionPlan?.planType || ''}
                            </span>
                        </div>
                        <div className={`flex flex-col py-2 text-center w-full ${subscriptionPlan.bg || ''}`}>
                            <span className="text-md font-bold">
                                {subscriptionPlan?.price === 'Free'
                                    ? subscriptionPlan.price
                                    : `$${subscriptionPlan?.price || '0.00'}`}
                            </span>
                            <span className="text-[#FFFFFF80] text-xs uppercase">
                                {subscriptionPlan?.duration || ''}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 col-span-2">
                        {subscriptionPlan?.features?.map((feature, idx) => (
                            <div
                                key={`plan_features_${idx}`}
                                className="flex items-center space-x-3"
                            >
                                <div className="h-3 w-3">
                                    <img
                                        src={ICON_ENUM.BLUE_TICK.icon}
                                        alt="tick"
                                        className="h-full w-full"
                                    />
                                </div>
                                <p className="flex flex-wrap">{feature || ''}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const exportHistory = () => {
        // Prepare the data array for SheetJS
        const data = paymentHistory.map((payment) => ({
            Created: new Date(payment.created * 1000).toLocaleString(),
            Status: payment.status ?? "N/A",
            Amount: `$${(payment.total / 100).toFixed(2)}`,
        }));

        // Create a worksheet from the data
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Style the header row
        const headerRow = ["Created", "Status", "Amount"]; // Define headers explicitly
        if (!worksheet["!ref"]) return
        const range = XLSX.utils.decode_range(worksheet["!ref"]);
        for (let col = range.s.c; col <= range.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col }); // Header row is row 0
            worksheet[cellAddress].v = headerRow[col]; // Assign the correct header text
            worksheet[cellAddress].s = {
                font: { bold: true }, // Apply bold style to the font
                alignment: { horizontal: "center" }, // Optional: Center align
            };
        }

        // Create a workbook and append the styled worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transaction History");

        // Trigger the download
        const fileName = "TransactionHistory " + new Date().toLocaleString() + ".xlsx"
        XLSX.writeFile(workbook, fileName);
    }


    const planCardRendere = (plan: any, index: any, isActivePlan: any) => {
        const isSelected = isActivePlan
            ? selectedActivePlanIndex === index
            : selectedUpgradePlanIndex === index;
        return (
            <div
                key={plan.title + '_' + index}
                // className="p-[1px] rounded-lg h-full"
                // style={{ background: plan.color }}
                className={`p-[1px] rounded-lg h-full ${isActivePlan && 'pointer-events-none'}  ${isSelected ? 'border-2 border-[#00F0FB66]' : ''
                    }`}
                style={{
                    background: isSelected ? '#00F0FB66' : plan.color,
                    cursor: !isActivePlan ? 'pointer' : 'not-allowed',
                }}
                onClick={() => handlePlanSelect(index, plan?.priceId, plan?.price, plan?.title)}
            >
                <div
                    // className="planCard-price-bg grid grid-cols-3 gap-5 p-5 rounded-lg min-h-[calc(100%)]"
                    className={`planCard-price-bg grid grid-cols-3 gap-5 p-5 rounded-lg min-h-[calc(100%)] ${isSelected ? 'text-white' : ''
                        }`}
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold uppercase tracking-[0.3em]">
                                {plan.title ?? ''}
                            </span>
                            <span className="text-2xl uppercase tracking-[0.3em] font-light">
                                {plan.subTitle ?? ''}
                            </span>
                            <span className="text-[#FFFFFF80] text-xs uppercase">
                                {plan.planType ?? ''}
                            </span>
                        </div>
                        <div className={`flex flex-col py-2 text-center w-full ${plan.bg}`}>
                            <span className="text-md font-bold">
                                {plan.price === 'Free'
                                    ? plan.price
                                    : `$${plan.price ?? '0.00'}`}
                            </span>
                            <span className="text-[#FFFFFF80] text-xs uppercase">
                                {plan.duration ?? ''}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 col-span-2">
                        {plan.features?.map((feature: any, idx: number) => (
                            <div
                                key={'plan_features_' + index + '_' + idx}
                                className="flex items-center space-x-3"
                            >
                                <div className="h-3 w-3">
                                    <img
                                        src={ICON_ENUM.BLUE_TICK.icon}
                                        alt="tick"
                                        className="h-full w-full"
                                    />
                                </div>
                                <p className="flex flex-wrap">{feature ?? ''}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const monthOptions = [
        { value: 'Jan', label: 'January' },
        { value: 'Feb', label: 'Febrary' },
        { value: 'Mar', label: 'March' },
        { value: 'Apr', label: 'April' },
        { value: 'May', label: 'May' },
    ];

    const getPaymentNetworkBrannd = (brand: any) => {
        if (brand === 'visa') {
            return (<img src={visa} alt="Visa" className="w-[64px] h-[18px] mr-3" />)
        } else if (brand === 'mastercard') {
            return (<img src={mastercard} alt="Visa" className="w-[64px] h-[35px] mr-3" />)
        } else if (brand === 'amex') {
            return (<img src={americanexpress} alt="Visa" className="w-[64px] h-[35px] mr-3" />)
        } else if (brand === 'discover') {
            return (<img src={discover} alt="Visa" className="w-[64px] h-[35px] mr-3" />)
        } else if (brand === 'jcb') {
            return (<img src={jcb} alt="Visa" className="w-[64px] h-[35px] mr-3" />)
        } else if (brand === 'unionpay') {
            return (<img src={unionpay} alt="Visa" className="w-[64px] h-[35px] mr-3" />)
        }
        else {
            <span className='w-[64px] h-[18px] mr-3 text-white text-[20px]'>{currentCard?.brand}</span>
        }
    }

    return (
        <>
            <div className="text-white font-bold text-[24px] mb-8">
                <span className="bg-gradient-to-r from-[#985FFF] to-[#FF99EF] bg-clip-text text-transparent">
                    Subscription
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 lg:space-x-2">
                {/* Left Column */}
                <div className="lg:col-span-3 space-y-5">
                    <div className="text-white font-semibold text-[18px] flex justify-between items-center">
                        <span>Current Plan</span>

                        <div>
                            <DrawerRtL
                                closeId="close-update-plan-drawer"
                                handler={
                                    <div className="flex items-center space-x-3 cursor-pointer" onClick={
                                        () => {
                                            setPlanUpdated(false)
                                            setShowUpgradePlan(false)
                                            setCardHolderName('')
                                        }
                                    }>
                                        <span className="text-white font-semibold text-[18px]">
                                            Update Plan
                                        </span>
                                        <img
                                            src={ChevronRight}
                                            alt="Chevron Right"
                                            className="w-2 h-3"
                                        />
                                    </div>
                                }
                            >
                                <div className="menu dev-subscription-sider min-h-full lg:w-2/5 769-1300:w-[600px] md:w-full text-white px-10 py-16 space-y-10">
                                    {!planUpdated && !showUpgradePlan && (
                                        <div>
                                            {currentPackage?.packageName && (
                                                <div className="space-y-5">
                                                    <span className="text-xl">Current Plan</span>
                                                    {CREATOR_PLANS_ENUM.filter(item => item.title === currentPackage?.packageName)?.map((plan, index) =>
                                                        planCardRendere(plan, index, true),
                                                    )}
                                                </div>
                                            )}
                                            <div className="space-y-5 mt-5">
                                                <span className="text-xl">Upgrade Plan</span>
                                                {CREATOR_PLANS_ENUM.filter(item => item.title !== currentPackage?.packageName)?.map((plan, index) =>
                                                    planCardRendere(plan, index, false),
                                                )}
                                            </div>
                                            <div className="flex justify-center items-center gap-3 mt-8">
                                                <div className="cursor-pointer border-2 border-[#7D3CF3] font-bold px-10 py-2 rounded-full hover:bg-[#7D3CF3]">
                                                    <span
                                                        id="close-update-plan-drawer"
                                                        className="cursor-pointer py-2 px-12 w-full inline-block"
                                                        onClick={handleCancelClick}
                                                    >
                                                        Cancel
                                                    </span>
                                                </div>
                                                <div className={`flex font-bold px-10 py-2 rounded-full ${!activePriceId ? 'bg-[#9797a5]' : 'bg-gradient-vertical lussoBtn'}`}>
                                                    <Button
                                                        id="close-update-plan-drawer"
                                                        disabled={!activePriceId ? true : false}
                                                        label="Upgrade Plan"
                                                        onClick={makeSubscription}
                                                        icon={{
                                                            position: 'start',
                                                            component: (
                                                                <img
                                                                    src={ICON_ENUM.PLUS_WITH_CIRCLE.icon}
                                                                    className="w-5 h-5"
                                                                    alt="plus"
                                                                />
                                                            ),
                                                        }}
                                                    />
                                                    <span className='ml-2 mt-2'>{loading && <Loading />}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {!planUpdated && showUpgradePlan && (
                                        <form onSubmit={handleSubmit}>
                                            <div className="space-y-5 flex flex-col">
                                                <span className="text-xl">Upgrade Plan</span>
                                                <span className="font-medium text-sm text-[#B1ADCD]">
                                                    Selected plan
                                                </span>
                                                {getActivePlan()}
                                                <div className="text-white font-semibold text-[18px] flex justify-between items-center">
                                                    <span className="text-[#B1ADCD]">Card details</span>
                                                    {/* <div className="flex items-center space-x-3 cursor-pointer">
                                                    <span className="text-white font-semibold text-[18px]">
                                                        Change Card
                                                    </span>
                                                    <img
                                                        src={ChevronRight}
                                                        alt="Chevron Right"
                                                        className="w-2 h-3"
                                                    />
                                                </div> */}

                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[50px]">
                                                    <div className="col-span-2">
                                                        <input
                                                            value={cardHolderName}
                                                            onChange={e => setCardHolderName(e.target.value)}
                                                            type="text"
                                                            placeholder="Full Name"
                                                            className="w-full rounded-full p-4 bg-[transparent] border border-[#a768fd] text-white placeholder-gray-400"
                                                        />
                                                    </div>
                                                    <div className="col-span-2">
                                                        <CardNumberElement
                                                            options={{
                                                                ...CARD_ELEMENT_OPTIONS,
                                                                placeholder: 'Card Number',
                                                            }}
                                                            onChange={handleCardNumberChange}
                                                            className="w-full rounded-full p-4 bg-[transparent] border border-[#a768fd] text-white placeholder-gray-400"
                                                        />
                                                        {cardNumberError && (
                                                            <span className="text-red-500 text-sm">
                                                                {cardNumberError}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <CardExpiryElement
                                                            options={CARD_ELEMENT_OPTIONS}
                                                            onChange={handleCardExpiryChange}
                                                            className="w-full rounded-full p-4 bg-[transparent] border border-[#a768fd] text-white placeholder-gray-400"
                                                        />
                                                        {cardExpiryError && (
                                                            <span className="text-red-500 text-sm">
                                                                {cardExpiryError}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <CardCvcElement
                                                            options={CARD_ELEMENT_OPTIONS}
                                                            onChange={handleCardCvcChange}
                                                            className="w-full rounded-full p-4 bg-[transparent] border border-[#a768fd] text-white placeholder-gray-400"
                                                        />
                                                        {cardCvcError && (
                                                            <span className="text-red-500 text-sm">{cardCvcError}</span>
                                                        )}
                                                    </div>
                                                </div>


                                                <span className="text-[#B1ADCD]">Order Summary</span>
                                                <hr className="border-[#B1ADCD]" />
                                                <span className="font-bold text-[#9551F6] text-lg">
                                                    ELITE LUSSO
                                                </span>
                                                <div className="text-white font-semibold text-[18px] flex justify-between items-center">
                                                    <span className="text-white">Monthly</span>
                                                    <div className="flex items-center space-x-3 cursor-pointer">
                                                        <span className="text-white text-[18px]">${activePrice}</span>
                                                    </div>
                                                </div>
                                                <div className="text-white font-semibold text-[18px] flex justify-between items-center">
                                                    <span className="text-[#B1ADCD] text-base">
                                                        Promotion (50% off for 2 months)
                                                    </span>
                                                    <div className="flex items-center space-x-3 cursor-pointer">
                                                        <span className="text-white text-[14px]">-$0</span>
                                                    </div>
                                                </div>
                                                <div className="text-white font-semibold text-[18px] flex justify-between items-center">
                                                    <span className="text-white">Tax</span>
                                                    <div className="flex items-center space-x-3 cursor-pointer">
                                                        <span className="text-white text-[18px]">$0</span>
                                                    </div>
                                                </div>
                                                <hr className="border-[#B1ADCD]" />
                                                <div className="text-white font-semibold text-[18px] flex justify-between items-center">
                                                    <span className="text-white">SubTotal</span>
                                                    <div className="flex items-center space-x-3 cursor-pointer">
                                                        <span className="text-[B1ADCD] font-semibold text-[18px]">
                                                            ${activePrice}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center items-center gap-3 mt-8">
                                                    <div className="cursor-pointer border-2 border-[#7D3CF3] font-bold px-10 py-2 rounded-full hover:bg-[#7D3CF3]">
                                                        <span
                                                            id="close-update-plan-drawer"
                                                            className="cursor-pointer py-2 px-12 w-full inline-block"
                                                            onClick={handleCancelClick}
                                                        >
                                                            Cancel
                                                        </span>
                                                    </div>
                                                    <div className="flex bg-gradient-vertical lussoBtn font-bold px-10 py-2 rounded-full">
                                                        <Button
                                                            id="close-update-plan-drawer"
                                                            label="Upgrade Plan"
                                                            type="submit"
                                                            icon={{
                                                                position: 'start',
                                                                component: (
                                                                    <img
                                                                        src={ICON_ENUM.PLUS_WITH_CIRCLE.icon}
                                                                        className="w-5 h-5"
                                                                        alt="plus"
                                                                    />
                                                                ),
                                                            }}
                                                        >
                                                        </Button>
                                                        <span className='ml-2 mt-2'>{loading && <Loading />}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    )}

                                    {planUpdated && (
                                        <div className="flex flex-col justify-center items-center space-y-6 min-h-screen">
                                            <img src={success} alt="success" />
                                            <h2 className="text-lg font-bold text-center capitalize">
                                                Your plan has been upgraded to <br />{' '}
                                                <span className="font-bold text-2xl text-center text-white uppercase">
                                                    ELITE LUSSO!
                                                </span>
                                            </h2>

                                            <div>
                                                <Button
                                                    id="close-view-history-drawer"
                                                    label="Go to Dashboard"
                                                    className="bg-gradient-vertical font-bold rounded-full px-2 py-2 hover:bg-gradient-vertical lussoBtn"
                                                    onClick={() => navigate('/dev/dashboard')}
                                                />
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </DrawerRtL>
                        </div>
                    </div>

                    <div className="card-bg-dev px-5 py-8 rounded-lg space-y-10">
                        {currentPackage ? <>
                            <span
                                className="flex items-center justify-center rounded-full p-3 w-1/3 text-white"
                                style={{
                                    background:
                                        'linear-gradient(115.33deg, #006EF8 20.95%, #212CB1 72.86%, #2B189C 88.07%)',
                                }}
                            >
                                Plan active since: {currentPackage?.subscriptionDate ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(currentPackage?.subscriptionDate)) : "N/A"}
                            </span>
                            <div className="flex items-center justify-between">
                                <h3 className='text-white tracking-[10px] text-[25px] font-bold'>{currentPackage?.packageName?.toUpperCase()}<span className='font-normal'><br />LUSSO</span></h3>
                                <div className="text-right">
                                    <span
                                        className="text-2xl font-semibold"
                                        style={{ color: '#5B97FF' }}
                                    >
                                        ${CREATOR_PLANS_ENUM.find(item => item.title === currentPackage?.packageName)?.price}
                                    </span>
                                    <span className="text-2xl " style={{ color: 'white' }}>
                                        /mon
                                    </span>
                                    {currentPackage && <div className="text-sm" style={{ color: 'white' }}>
                                        Your plan is {currentPackage?.subscriptionStatus?.toLowerCase()}
                                    </div>}
                                </div>
                            </div>
                        </> : <p className='text-white'>You did not subscribed any plan yet.</p>}

                    </div>
                    {/* Plan Benefits and Payment History Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 lg:space-x-2">
                        <div className="space-y-5 h-full">
                            <span className="text-white text-[24px]">Plan Benefits</span>
                            <div
                                className="rounded-lg p-[1px] lg:h-full"
                                style={{
                                    background:
                                        'linear-gradient(180deg, #0054B5 0.32%, #40DAFE 101.24%)',
                                }}
                            >
                                <div className="card-bg-dev-border-none px-4 py-6 rounded-lg space-y-8 h-full">
                                    {currentPackage ? <p><h3 className='text-white tracking-[10px] text-[25px] font-bold mb-4'>{currentPackage?.packageName?.toUpperCase()}<span className='font-normal'><br />LUSSO</span></h3>
                                        {/* <img src={ACCESSLUSSO} alt="ACCESSLUSSO" /> */}
                                        <hr style={{ color: 'grey', borderColor: 'grey' }} />
                                        <div className="space-y-3">
                                            <div className="flex items-center p-2">
                                                <img src={greenTick} alt="green tick" className="mr-3" />
                                                <span className="text-[sm] text-white">
                                                    Includes 50 digital products and completely customizable
                                                </span>
                                            </div>
                                            <div className="flex items-center p-2">
                                                <img src={greenTick} alt="green tick" className="mr-3" />
                                                <span className="text-[sm] text-white">
                                                    Perfect for small projects and individual use.
                                                </span>
                                            </div>
                                            <div className="flex items-center p-2">
                                                <img src={greenTick} alt="green tick" className="mr-3" />
                                                <span className="text-[sm] text-white">
                                                    Free updates for 3 months.
                                                </span>
                                            </div>
                                        </div></p> : <p className='text-white flex items-center justify-center'>You need to subscribe to a plan to access and view its benefits.</p>}

                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2 space-y-5">
                            <span className="text-white text-[24px]">Payment History</span>
                            <div
                                className="rounded-lg p-[1px] lg:h-full"
                                style={{
                                    background:
                                        'linear-gradient(180deg, #0054B5 0.32%, #40DAFE 101.24%)',
                                }}
                            >
                                <div className="card-bg-dev-border-none flex flex-col justify-between p-5 rounded-lg h-full space-y-3">
                                    <div
                                        className="subscriptions max-h-full"
                                        style={{ overflow: 'auto' }}
                                    >
                                        <div
                                            className="flex flex-row justify-between items-center p-4 font-bold"
                                            style={{
                                                background:
                                                    'linear-gradient(125.12deg, rgba(45, 36, 108, 0.9) 6.52%, rgba(22, 19, 43, 0.5) 30.66%, rgba(24, 20, 46, 0.5) 63.49%, rgba(37, 32, 74, 0.9) 78.95%)',
                                            }}
                                        >
                                            <span className="text-white flex-1 text-center ">
                                                Created
                                            </span>

                                            <span className="text-white flex-1 text-center ">
                                                Status
                                            </span>
                                            <span className="text-white flex-1 text-center ">
                                                Amount
                                            </span>
                                        </div>

                                        {paymentHistory?.slice(0, 5)?.map((payment: any, index: number) => (
                                            <div
                                                key={index}
                                                className="p-[1px]"
                                                style={{
                                                    background:
                                                        'linear-gradient(90deg, #8423F4 0%, rgba(255, 153, 239, 0.86) 100%)',
                                                }}
                                            >
                                                <div
                                                    className="flex flex-row p-4 justify-between"
                                                    style={{
                                                        background:
                                                            'linear-gradient(270deg, #2E246C 0%, #2E246C 56.9%, #271F56 100%)',
                                                    }}
                                                >
                                                    <span className="flex-1 text-[#FFF] font-normal text-[13px] text-center">
                                                        {new Date(payment.created * 1000).toLocaleString()}
                                                    </span>
                                                    {/* <span className="flex-1 text-[#FFF] font-normal text-[13px] text-center">
                                                        <div className="flex items-center justify-center">
                                                            <img
                                                                src={Visa} // Update with your actual path
                                                                alt="Visa"
                                                                className="mr-2"
                                                            />
                                                            <span className="text-white font-semibold">
                                                                {payment.paymentMethod}
                                                            </span>
                                                        </div>
                                                    </span> */}
                                                    <span className="flex-1 text-[#FFF] font-normal text-[13px] text-center pl-6">
                                                        {payment.status}
                                                    </span>
                                                    <span className="flex-1 text-[#FFF] font-normal text-[13px] text-center">
                                                        $ {payment.total / 100}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <DrawerRtL
                                        closeId="close-view-history-drawer"
                                        handler={
                                            <div className="lussoBtn flex justify-between items-center font-bold w-full border border-[#6C8CFF80] rounded-lg bg-[#00000033] p-5">
                                                <span className="text-white">View full history</span>
                                                <img
                                                    src={ChevronRightWhite}
                                                    alt="Chevron"
                                                    className="w-[10px] h-[12px]"
                                                />
                                            </div>
                                        }
                                    >
                                        <div className="menu dev-subscription-sider min-h-full lg:w-2/5 769-1300:w-[600px] md:w-full text-white px-10 py-16 space-y-10">
                                            <div className="lg:col-span-2 space-y-2">
                                                <div className="flex space-y-5 items-center justify-between">
                                                    <span className="mb-5 text-white text-[24px] text-center">
                                                        Payment History
                                                    </span>
                                                    {/* <div className="">
                                                        <Dropdown
                                                            // label="Month"
                                                            name="month"
                                                            // value={stateOptions?.find((i: any) => i?.label === formData?.state)}
                                                            options={monthOptions}
                                                            placeholder="Select Month"
                                                            borderRadius={0}
                                                            borderColor="var(--outline, #6C8CFF80)"
                                                        // required
                                                        // error={validation?.state?.error ?? false}
                                                        // errorMessage={validation?.state?.errorMessage ?? ''}
                                                        // onChange={onStateChange}
                                                        />
                                                    </div> */}
                                                </div>
                                                <div
                                                    className="rounded-lg p-[1px] h-full"
                                                >
                                                    <div
                                                        className=" flex flex-col justify-between rounded-lg h-full space-y-3"
                                                        style={{
                                                            backgroundColor:
                                                                'linear-gradient(to right, #25204AE5, #18142E80, #16132B80, #2D246CE5)',
                                                        }}
                                                    >
                                                        <div
                                                            className="subscriptions max-h-full rounded-md"
                                                            style={{ overflow: 'auto' }}
                                                        >
                                                            <div
                                                                className="flex flex-row justify-between items-center p-4 font-bold"
                                                                style={{
                                                                    background:
                                                                        'linear-gradient(125.12deg, rgba(45, 36, 108, 0.9) 6.52%, rgba(22, 19, 43, 0.5) 30.66%, rgba(24, 20, 46, 0.5) 63.49%, rgba(37, 32, 74, 0.9) 78.95%)',
                                                                }}
                                                            >
                                                                <span className="text-white flex-1 text-center ">
                                                                    Created
                                                                </span>

                                                                <span className="text-white flex-1 text-center ">
                                                                    Status
                                                                </span>
                                                                <span className="text-white flex-1 text-center ">
                                                                    Amount
                                                                </span>
                                                            </div>
                                                            <div className="max-h-[400px] overflow-y-auto table-body" >
                                                                {paymentHistory?.map((payment: any, index: number) => (
                                                                    <div
                                                                        key={index}
                                                                        className="p-[1px]"
                                                                        style={{
                                                                            background:
                                                                                'linear-gradient(90deg, #8423F4 0%, rgba(255, 153, 239, 0.86) 100%)',
                                                                        }}
                                                                    >
                                                                        <div
                                                                            className="flex flex-row p-4 justify-between"
                                                                            style={{
                                                                                background:
                                                                                    'linear-gradient(270deg, #2E246C 0%, #2E246C 56.9%, #271F56 100%)',
                                                                            }}
                                                                        >
                                                                            <span className="flex-1 text-[#FFF] font-normal text-[13px] text-center">
                                                                                {new Date(payment.created * 1000).toLocaleString()}
                                                                            </span>
                                                                            {/* <span className="flex-1 text-[#FFF] font-normal text-[13px] text-center">
                                                        <div className="flex items-center justify-center">
                                                            <img
                                                                src={Visa} // Update with your actual path
                                                                alt="Visa"
                                                                className="mr-2"
                                                            />
                                                            <span className="text-white font-semibold">
                                                                {payment.paymentMethod}
                                                            </span>
                                                        </div>
                                                    </span> */}
                                                                            <span className="flex-1 text-[#FFF] font-normal text-[13px] text-center pl-6">
                                                                                {payment.status}
                                                                            </span>
                                                                            <span className="flex-1 text-[#FFF] font-normal text-[13px] text-center">
                                                                                $ {payment.total / 100}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-center items-center gap-3">
                                                <div className="lussoBtn bg-gradient-vertical font-bold md:px-10 rounded-full py-2">
                                                    <Button
                                                        id="close-view-history-drawer"
                                                        label="Export History"
                                                        className=""
                                                        onClick={exportHistory}
                                                    />
                                                </div>
                                                <div className="cursor-pointer border-2 border-[#7D3CF3] font-bold  px-12 py-2 rounded-full">
                                                    <span
                                                        id="close-view-history-drawer"
                                                        className="cursor-pointer py-2 px-12 w-full inline-block"
                                                    >
                                                        Cancel
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </DrawerRtL>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className='space-y-5'>
                    <div className="text-white font-semibold text-[18px] mb-4">
                        Payment Method
                    </div>
                    <div
                        className="rounded-lg p-[1px]"
                        style={{
                            background:
                                'linear-gradient(180deg, #0054B5 0.32%, #40DAFE 101.24%)',
                        }}
                    >
                        <div className="profile-card card-bg-dev-border-none p-4 rounded-lg">
                            {currentPackage ? <><div className="flex items-center mt-6">
                                {getPaymentNetworkBrannd(currentCard?.brand)}
                                <span className="text-white font-semibold">{currentCard ? '**** **** ****' + currentCard?.last4 : ''}</span>
                            </div>
                                {/* <div className="flex items-center mt-8">
                                <span className="text-[#666F8D] font-semibold">
                                    Name on card
                                </span>
                                <span className="text-white font-semibold ml-3">
                                    Robert Downey
                                </span>
                            </div> */}
                                <div className="flex items-center mt-8">
                                    <span className="text-[#666F8D] font-semibold">
                                        Expiration date
                                    </span>
                                    <span className="text-white font-semibold ml-3">{currentCard ? currentCard?.exp_month + '/' : ''}{currentCard?.exp_year}</span>
                                </div>
                                <div></div></> : <p className='text-white flex items-center justify-center h-14'>N/A</p>}

                        </div>
                    </div>

                    <div className="text-white text-[24px] mb-4 mt-4">Next Renewal</div>
                    <div
                        className="rounded-lg p-[1px]"
                        style={{
                            background:
                                'linear-gradient(180deg, #0054B5 0.32%, #40DAFE 101.24%)',
                        }}
                    >
                        <div className="profile-card card-bg-dev-border-none p-4 rounded-lg">
                            {currentPackage ? <>
                                <div className="text-white p-1 text-[36px]">${CREATOR_PLANS_ENUM.find(item => item.title === currentPackage?.packageName)?.price}
                                </div>
                                <div className="flex items-center mt-8">
                                    <span className="text-[#666F8D] font-semibold">Plan type</span>
                                    <span className="text-white font-semibold ml-3">
                                        Standard (monthly)
                                    </span>
                                </div>
                                <div className="flex items-center mt-8">
                                    <span className="text-[#666F8D] font-semibold">
                                        Next bill date
                                    </span>
                                    <span className="text-white font-semibold ml-3">
                                        {currentPackage?.expiryDate ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(currentPackage?.expiryDate)) : "N/A"}
                                    </span>
                                </div>
                                {/* cancelSubscription */}
                                {currentPackage?.stripeSubscriptionId && <div>

                                    {cancelSubscriptionPrompt ?
                                        <>
                                            <p className='text-white mt-8'>Are you sure to cancel your subscription?</p>
                                            <div onClick={() => setCancelSubscriptionPrompt(false)} className="lussoBtn cursor-pointer field flex justify-between items-center w-full border border-[#6C8CFF80] rounded-lg bg-[#00000033] mt-2 p-3">
                                                <span className="flex text-white pl-4">Keep Plan <span className='ml-2'>{loading && <Loading />}</span></span>
                                                <img
                                                    src={ChevronRightWhite}
                                                    alt="Chevron"
                                                    className="w-[10px] h-[12px]"
                                                />
                                            </div>
                                            <div onClick={cancelSubscription} className="cursor-pointer field flex justify-between items-center w-full border border-[#6C8CFF80] rounded-lg bg-[#FF5733] mt-2 p-3">
                                                <span className="flex text-white pl-4">Cancel Plan <span className='ml-2'>{loading && <Loading />}</span></span>
                                                <img
                                                    src={ChevronRightWhite}
                                                    alt="Chevron"
                                                    className="w-[10px] h-[12px]"
                                                />
                                            </div></> :
                                        <div onClick={() => setCancelSubscriptionPrompt(true)} className="cursor-pointer field flex justify-between items-center w-full border border-[#6C8CFF80] rounded-lg hover:bg-[#FF5733] bg-[#00000033] mt-2 p-3">
                                            <span className="flex text-white pl-4">Cancel Plan <span className='ml-2'>{loading && <Loading />}</span></span>
                                            <img
                                                src={ChevronRightWhite}
                                                alt="Chevron"
                                                className="w-[10px] h-[12px]"
                                            />
                                        </div>
                                    }

                                </div>}
                            </> : <p className='text-white flex items-center justify-center h-14'>N/A</p>}

                            {/* <DrawerRtL
                                closeId="close-cancel-plan-drawer"
                                handler={
                                    <span className="field flex justify-between items-center w-full border border-[#6C8CFF80] rounded-lg bg-[#00000033] mt-8 p-3">
                                        <span className="text-white pl-4">Cancel Plan</span>
                                        <img
                                            src={ChevronRightWhite}
                                            alt="Chevron"
                                            className="w-[10px] h-[12px]"
                                        />
                                    </span>
                                }
                            >
                                <div className="menu dev-subscription-sider min-h-full w-2/5 text-white px-10 py-16 space-y-8">
                                    <CancelPlanPurchase />
                                </div>
                            </DrawerRtL> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Purchased;