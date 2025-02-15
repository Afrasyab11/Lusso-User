import "./layout.scss";
import NavlogoIcon from "../../assets/images/logo-icon.png";
import UserIcon from "../../assets/images/icons/user-icon.svg";
import UpgradeBox from "../../components/common/UpgradeBox";

const AccountLayout = (props: any) => {
  return (
    <div className="w-full float-left private-layout-bg min-h-[calc(100vh-348px)]">
      <div className="w-full max-w-[1680px] mx-auto clearfix px-10">
        <div className="w-full float-left flex ask-lusso-bg my-12 p-8">
          <div className="w-[280px] xl:w-[340px] flex-shrink-0 flex flex-col my-10 justify-between pr-8">
            <div className="w-full float-left flex flex-col items-start pl-10 gap-y-12">
              <img src={NavlogoIcon} alt="" />
            </div>
            <div className="w-full float-left">
              <UpgradeBox />
              <div className="w-full float-left flex items-center gap-x-5 mt-10 pl-4">
                <img
                  className="w-[68px] h-[68px] rounded-full"
                  src={UserIcon}
                  alt=""
                />
                <div className="flex flex-col gap-y-1.5 flex-grow overflow-hidden [&>p]:text-ll-gray [&>p]:text-base [&>p]:truncate [&>p]:font-normal">
                  <p className="capitalize">Maverick. n</p>
                  <p>Content Strategist</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full float-left bg-[#2B2748] rounded-[48px] p-8">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
