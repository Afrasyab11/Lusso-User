import DeleteAccountSection from "../deleteAccountSection";
import UserFields from "../userFields";

const UserProfileContent = ({ isEdit, setIsEdit }: any) => {
    return (
        <div className="flex flex-col gap-5">
            <UserFields isEdit={isEdit} setIsEdit={setIsEdit} />
            <DeleteAccountSection />
        </div>
    );
};

export default UserProfileContent;
