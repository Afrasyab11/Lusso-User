import { useNavigate } from "react-router";
import Logo from "../../assets/images/logo.svg";
import "./auth.scss";
const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full mx-auto clearfix max-w-7xl py-10">
      <div className="w-full float-left flex flex-col items-center">
        <img src={Logo} alt="Logo" />
        <p className="login-bg-clip-txt font-exo text-center font-medium capitalize text-[90px] leading-[100px] tracking-[1.8px] mt-10">
          Your Partners in <br /> digital Development
        </p>
        <div className="max-w-[720px] w-full py-[72px] px-10 border border-[rgb(181,108,255)]/50 bg-[rgb(29,27,54)]/80 mt-10 rounded-lg">
          <form className="w-full flex flex-col gap-y-7 max-w-[424px] mx-auto">
            <div className="w-full flex gap-x-4 items-center">
              <label className="w-20 font-exo text-xl text-[#FAFAFA] font-bold flex-shrink-0">
                PHONE
              </label>
              <input className="auth-input" type="text" />
            </div>
            <div className="w-full flex gap-x-4 items-center">
              <label className="w-20 font-exo text-xl text-[#FAFAFA] font-bold flex-shrink-0">
                EMAIl
              </label>
              <input className="auth-input" type="text" />
            </div>
            <div className="w-full flex gap-x-4 items-center">
              <label className="w-20 flex-shrink-0"></label>
              <button
                onClick={() => navigate("/home")}
                type="button"
                className="join-btn w-full rounded-full py-4 px-10 font-bold font-exo text-center text-white text-[22px] leading-normal"
              >
                Join Waiting List Now
              </button>
            </div>
          </form>
        </div>
        <p className="text-white text-xl text-center font-medium opacity-70 mt-10">
          Welcome to Lusso Labs, where your digital vision becomes a reality.{" "}
          <br />
          Be the first to get the digital space. Sign up our now!
        </p>
      </div>
    </div>
  );
};
export default Login;
