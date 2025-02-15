import HumanIcon from '../../assets/images/icons/human-icon.svg';
interface HumanMessageProps {
  message: string;
}

const HumanMessage = (props: HumanMessageProps) => {
  const {message} = props;

  return (
    <div className="w-full flex gap-x-4">
      <span className="w-9 h-9 bg-[#464070] rounded-lg flex-shrink-0 flex items-center justify-center [&>img]:max-w-[30px]">
        <img src={HumanIcon} alt="User" />
      </span>
      <div className="flex-grow overflow-hidden flex flex-col gap-y-2.5">
        <h4 className="text-white font-medium text-lg mt-1">You</h4>
        <p className="text-[#ECECF1] text-base font-medium">{message}</p>
      </div>
    </div>
  );
};

export default HumanMessage;
