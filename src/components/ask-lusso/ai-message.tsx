import Markdown from 'react-markdown';
import AiIcon from '../../assets/images/icons/ai-icon.svg';
interface AiMessageProps {
  message: string;
}

const AiMessage = (props: AiMessageProps) => {
  const {message} = props;

  if (message === '') {
    return null;
  }

  return (
    <div className="w-full flex gap-x-4">
      <span className="w-9 h-9 chat-box-gradient rounded-lg flex-shrink-0 flex items-center justify-center [&>img]:max-w-[30px]">
        <img src={AiIcon} alt="User" />
      </span>
      <div className="flex-grow overflow-hidden flex flex-col gap-y-2.5">
        <h4 className="text-white font-medium text-lg mt-1">Lusso</h4>
        <p className="text-[#ECECF1] text-base font-medium">
          <Markdown>{message}</Markdown>
        </p>
      </div>
    </div>
  );
};

export default AiMessage;
