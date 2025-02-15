import { useNavigate } from 'react-router-dom';
import star_icon from '../../../assets/images/icons/stars-group.svg';
import { ICON_ENUM } from '../../../constants/icons.constant';
import { PLANS_ENUM } from '../../../data-center/data';

const HomePricingComp = () => {
    const navigate = useNavigate();
    const getCheckout = (price: any) => {

        if (price === 'Free') {
            navigate("/signup");
        } else {
            navigate("/login?redirect=/subscribe");
        };
    }

    return (
        <div className="home-price-background-banner p-3 lg:p-10">
            <div className="flex flex-col justify-center items-center px-5 md:px-10 gap-10 text-white">
                <h1 className="text-3xl lg:text-7xl font-bold">Select Your Plan</h1>
                <p className="text-lg text-center">
                    No hidden fees, equipment rentals, or installation appointments.
                    Switch plan or cancel anytime.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {PLANS_ENUM.map((plan, index) => (
                        <div
                            key={plan.title + '_' + index}
                            className="p-[1px] rounded-2xl h-full"
                            style={{ background: plan.color }}
                        >
                            <div className="planCard-price-bg flex flex-col justify-between items-between gap-5 px-5 lg:px-10 pt-5 lg:pt-16 pb-10 rounded-2xl min-h-[calc(100%)]">
                                <div className="flex flex-col justify-between items-center gap-2 border-b-[0.5px] border-[#FFFFFF40] px-5 pb-5">
                                    <div className="flex flex-col items-center min-h-[56px]">
                                        <span className="text-base font-bold uppercase tracking-[0.3em]">
                                            {plan.title ?? ''}
                                        </span>
                                        <span className="text-base uppercase tracking-[0.3em] font-light">
                                            {plan.subTitle ?? ''}
                                        </span>
                                        <span className="text-[#FFFFFF80] text-xs uppercase">
                                            {plan.planType ?? ''}
                                        </span>
                                    </div>
                                    <div
                                        className={`flex flex-col py-2 text-center w-full ${plan.bg}`}
                                    >
                                        <span className="text-md font-bold">
                                            {plan.price === 'Free' ? plan.price : `$${plan.price ?? '0.00'}`}
                                        </span>
                                        <span className="text-[#FFFFFF80] text-xs uppercase">
                                            {plan.duration ?? ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col p-3 gap-5">
                                    {plan.features.map((feature, idx) => (
                                        <div
                                            key={'plan_features_' + index + '_' + idx}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="h-3 w-3 flex items-center justify-center shrink-0">
                                                <img
                                                    src={ICON_ENUM.BLUE_TICK.icon}
                                                    alt="tick"
                                                    className="h-full w-full object-contain"
                                                />
                                            </div>

                                            <p className="flex-1">{feature ?? ''}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-[1px] plan-btn-bg rounded-full w-full mt-10 cursor-pointer ">
                                    <button onClick={() => getCheckout(plan.price)} className="flex gap-3  cursor-pointer py-3 rounded-full text-white hover:text-blue-500 planCard-price-bg w-full justify-center items-center">
                                        <span className="font-bold">Get Started</span>
                                        <div>
                                            <img
                                                src={star_icon}
                                                alt="star-group"
                                                className="w-5 h-5"
                                            />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePricingComp;
