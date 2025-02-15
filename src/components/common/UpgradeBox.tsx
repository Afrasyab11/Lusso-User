import { Link } from "react-router-dom";

const UpgradeBox = () => {
  return (
    <div className="upgrade-box mt-10 py-7 px-8 text-center">
      <h4 className="font-semibold text-white mb-2 text-xl">Upgrade to Pro</h4>
      <p className="text-sm text-ll-gray font-normal mb-5">
        Unlock powerful features <br />
        with our Pro upgrade today!
      </p>
      <Link to="/subscription" className="btn-primary-fill outline-none">
        Upgrade now
      </Link>
    </div>
  );
};

export default UpgradeBox;
