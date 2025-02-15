import { ICON_ENUM } from "../../constants/icons.constant";
import { checkNullOrEmpty } from "../../utils/utils";

interface UserAvatorProps {
    img?: string;
    className?: string
}

const UserAvator = ({ img = '', className }: UserAvatorProps) => {
    return (
        <div className="avatar">
            <div className={className ?? "w-14 rounded-full"}>
                {checkNullOrEmpty(img) ?
                    <img src={ICON_ENUM.PROFILE_DEFAULT.icon} /> :
                    <img src={img} alt="profile" />}
            </div>
        </div>
    )
}

export default UserAvator