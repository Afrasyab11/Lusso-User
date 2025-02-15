import { Link } from "react-router-dom";
import FooterLogo from "../../assets/images/footer-logo.svg";
import EmailIcon from "../../assets/images/icons/email.svg";
import LocationIcon from "../../assets/images/icons/location.svg";
import PhoneIcon from "../../assets/images/icons/phone.svg";
const Footer = (props: any) => {
  return (
    <footer className="w-full float-left" style={{ background: "#111924" }}>
      <div className="w-full max-w-[1480px] mx-auto clearfix px-10">
        <div className="w-full float-left flex pb-8 pt-12 gap-x-9 items-start">
          <img src={FooterLogo} alt="Footer Logo" />
          <div className="flex flex-col items-center flex-grow gap-y-8">
            <div className="flex gap-x-8 uppercase mt-4">
              <Link
                to="/home"
                className="text-sm font-bold text-white tracking-[1.4px] hover:text-white/80"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="text-sm font-bold text-white tracking-[1.4px] hover:text-white/80"
              >
                Dashboard
              </Link>
              <Link
                to="/askLusso"
                className="text-sm font-bold text-white tracking-[1.4px] hover:text-white/80"
              >
                Ask lusso
              </Link>
              <Link
                to="/admin-dashboard"
                className="text-sm font-bold text-white tracking-[1.4px] hover:text-white/80"
              >
                Admin
              </Link>
              <Link
                to="/dev-dashboard"
                className="text-sm font-bold text-white tracking-[1.4px] hover:text-white/80"
              >
                Dev
              </Link>
              <Link
                to="/admin-panel"
                className="text-sm font-bold text-white tracking-[1.4px] hover:text-white/80"
              >
                Analytics
              </Link>
            </div>
            <div className="float-left flex gap-x-6 mt-2">
              <div className="flex gap-x-2 items-center">
                <img src={PhoneIcon} alt="Phone" />
                <p className="text-sm font-normal text-ll-gray">914-501-7487</p>
              </div>
              <div className="flex gap-x-2 items-center">
                <img src={EmailIcon} alt="Email" />
                <p className="text-sm font-normal text-ll-gray">
                  lussolabs@gmail.com
                </p>
              </div>
              <div className="flex gap-x-2 items-center">
                <img src={LocationIcon} alt="Location" />
                <p className="text-sm font-normal text-ll-gray">
                  1203 S White Chapel Blvd Suite 100 Southlake,Texas 76092
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-x-2.5 items-center">
            <svg
              className="[&:hover>rect]:fill-primary/80 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <rect width="40" height="40" rx="20" fill="#7D3CF3" />
              <path
                d="M23.6055 21L24.0054 18.1044H21.5048V16.2253C21.5048 15.4331 21.8541 14.6609 22.9741 14.6609H24.1109V12.1956C24.1109 12.1956 23.0793 12 22.0929 12C20.0336 12 18.6875 13.3869 18.6875 15.8975V18.1044H16.3984V21H18.6875V28H21.5048V21H23.6055Z"
                fill="white"
              />
            </svg>
            <svg
              className="[&:hover>rect]:fill-primary/80 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <rect width="40" height="40" rx="20" fill="#7D3CF3" />
              <path
                d="M15.5815 28H12.2643V17.3176H15.5815V28ZM13.9211 15.8604C12.8604 15.8604 12 14.9819 12 13.9211C12 13.4116 12.2024 12.923 12.5627 12.5627C12.923 12.2024 13.4116 12 13.9211 12C14.4306 12 14.9193 12.2024 15.2795 12.5627C15.6398 12.923 15.8422 13.4116 15.8422 13.9211C15.8422 14.9819 14.9815 15.8604 13.9211 15.8604ZM27.9968 28H24.6867V22.7999C24.6867 21.5606 24.6617 19.9712 22.962 19.9712C21.2373 19.9712 20.9731 21.3177 20.9731 22.7106V28H17.6594V17.3176H20.8409V18.7748H20.8873C21.3302 17.9355 22.412 17.0498 24.026 17.0498C27.3832 17.0498 28.0004 19.2605 28.0004 22.132V28H27.9968Z"
                fill="white"
              />
            </svg>
            <svg
              className="[&:hover>rect]:fill-primary/80 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <rect width="40" height="40" rx="20" fill="#7D3CF3" />
              <path
                d="M26.3554 17.2386C26.3655 17.3807 26.3655 17.5229 26.3655 17.665C26.3655 22 23.066 26.995 17.0356 26.995C15.1777 26.995 13.4518 26.4569 12 25.5229C12.264 25.5533 12.5178 25.5635 12.7919 25.5635C14.3249 25.5635 15.736 25.0457 16.863 24.1625C15.4213 24.132 14.2132 23.1878 13.7969 21.8883C14 21.9188 14.203 21.9391 14.4163 21.9391C14.7107 21.9391 15.0051 21.8985 15.2792 21.8274C13.7767 21.5228 12.6497 20.2031 12.6497 18.6091V18.5685C13.0863 18.8122 13.5939 18.9645 14.1319 18.9848C13.2487 18.3959 12.67 17.3909 12.67 16.2538C12.67 15.6447 12.8324 15.0863 13.1167 14.599C14.7309 16.5888 17.1574 17.8883 19.8782 18.0305C19.8274 17.7868 19.7969 17.533 19.7969 17.2792C19.7969 15.4721 21.2589 14 23.0761 14C24.0203 14 24.8731 14.3959 25.4721 15.0355C26.2132 14.8934 26.9238 14.6193 27.5533 14.2437C27.3096 15.0051 26.7919 15.6447 26.1117 16.0508C26.7716 15.9797 27.4112 15.7969 28 15.5432C27.5534 16.1929 26.995 16.7715 26.3554 17.2386Z"
                fill="white"
              />
            </svg>
            <svg
              className="[&:hover>rect]:fill-primary/80 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <rect width="40" height="40" rx="20" fill="#7D3CF3" />
              <path
                d="M19.9981 17.6657C18.7128 17.6657 17.6638 18.7146 17.6638 20C17.6638 21.2854 18.7128 22.3343 19.9981 22.3343C21.2835 22.3343 22.3324 21.2854 22.3324 20C22.3324 18.7146 21.2835 17.6657 19.9981 17.6657ZM26.9992 20C26.9992 19.0333 27.008 18.0754 26.9537 17.1105C26.8994 15.9898 26.6437 14.9951 25.8242 14.1756C25.0029 13.3543 24.01 13.1003 22.8893 13.0461C21.9226 12.9918 20.9648 13.0005 19.9999 13.0005C19.0332 13.0005 18.0754 12.9918 17.1105 13.0461C15.9897 13.1003 14.9951 13.356 14.1755 14.1756C13.3543 14.9969 13.1003 15.9898 13.0461 17.1105C12.9918 18.0772 13.0005 19.0351 13.0005 20C13.0005 20.9649 12.9918 21.9246 13.0461 22.8895C13.1003 24.0102 13.356 25.0049 14.1755 25.8244C14.9968 26.6457 15.9897 26.8997 17.1105 26.9539C18.0771 27.0082 19.035 26.9995 19.9999 26.9995C20.9665 26.9995 21.9244 27.0082 22.8893 26.9539C24.01 26.8997 25.0047 26.644 25.8242 25.8244C26.6455 25.0031 26.8994 24.0102 26.9537 22.8895C27.0097 21.9246 26.9992 20.9667 26.9992 20ZM19.9981 23.5917C18.0106 23.5917 16.4065 21.9876 16.4065 20C16.4065 18.0124 18.0106 16.4083 19.9981 16.4083C21.9857 16.4083 23.5897 18.0124 23.5897 20C23.5897 21.9876 21.9857 23.5917 19.9981 23.5917ZM23.7368 17.1C23.2728 17.1 22.898 16.7253 22.898 16.2612C22.898 15.7972 23.2728 15.4224 23.7368 15.4224C24.2009 15.4224 24.5756 15.7972 24.5756 16.2612C24.5758 16.3714 24.5542 16.4806 24.5121 16.5824C24.47 16.6842 24.4082 16.7767 24.3303 16.8547C24.2523 16.9326 24.1598 16.9944 24.058 17.0365C23.9562 17.0786 23.847 17.1002 23.7368 17.1Z"
                fill="white"
              />
            </svg>
            <svg
              className="[&:hover>rect]:fill-primary/80 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <rect width="40" height="40" rx="20" fill="#7D3CF3" />
              <path
                d="M27.6657 15.7602C27.4817 15.0674 26.9395 14.5217 26.2511 14.3365C25.0033 14 20 14 20 14C20 14 14.9967 14 13.7489 14.3365C13.0605 14.5217 12.5183 15.0674 12.3343 15.7602C12 17.0161 12 19.6364 12 19.6364C12 19.6364 12 22.2566 12.3343 23.5125C12.5183 24.2053 13.0605 24.7283 13.7489 24.9135C14.9967 25.25 20 25.25 20 25.25C20 25.25 25.0033 25.25 26.2511 24.9135C26.9395 24.7283 27.4817 24.2053 27.6657 23.5125C28 22.2566 28 19.6364 28 19.6364C28 19.6364 28 17.0161 27.6657 15.7602ZM18.3636 22.0154V17.2574L22.5454 19.6364L18.3636 22.0154Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <div className="w-full float-left flex justify-between items-center py-4 gap-x-2 border-t border-white/10">
          <div className="float-left">
            <p className="text-sm font-normal text-ll-gray">
              ©2023 lussolabs. All Rights Reserved.
            </p>
          </div>
          <div className="float-left flex gap-x-4 items-center">
            <Link
              to={""}
              className="text-sm font-normal text-ll-gray hover:underline"
            >
              Terms Of Services
            </Link>
            <Link
              to={""}
              className="text-sm font-normal text-ll-gray hover:underline"
            >
              Privacy Policy{" "}
            </Link>
            <Link
              to={""}
              className="text-sm font-normal text-ll-gray hover:underline"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
