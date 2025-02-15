import Account2StepsVerification from "./Account2StepsVerification";
import AccountFields from "./accountPasswordFields";

const AccountSecurityContent = () => {
    return (
        <div className="flex flex-col gap-5">
            <AccountFields />
            <Account2StepsVerification />
        </div>
    );
};

export default AccountSecurityContent;
