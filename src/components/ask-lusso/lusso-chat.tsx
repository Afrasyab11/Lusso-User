import {useEffect, useRef} from 'react';
import AiIcon from '../../assets/images/icons/ai-icon.svg';
import {ChatbotMessage, MessageAuthor} from '../../types/ChatMessage';
import AiMessage from './ai-message';
import HumanMessage from './human-message';
interface Props {
  messages: ChatbotMessage[];
  loading: boolean;
}

const LussoChat = (props: Props) => {
  const mainScrollArea: any = useRef();
  const msgLength = props.messages?.length;
  useEffect(() => {
    setTimeout(() => {
      mainScrollArea.current.scrollTop = mainScrollArea.current.scrollHeight;
      if (msgLength < 4) {
        window.scrollTo(0, 0);
      }
    }, 10);
  }, [props.loading, msgLength]);
  return (
    <div
      ref={mainScrollArea}
      className="max-w-[780px] w-full mx-auto clearfix px-6 max-h-[764px] overflow-auto custom-scrollbar"
    >
      <div className="w-full float-left flex flex-col gap-y-5">
        {props.messages.map(message => {
          if (message.author === MessageAuthor.Human) {
            return <HumanMessage message={message.message} />;
          }

          if (message.author === MessageAuthor.AI) {
            return <AiMessage message={message.message} />;
          }

          return null;
        })}
        {props.loading && (
          <div className="w-full flex gap-x-4">
            <span className="w-9 h-9 chat-box-gradient rounded-lg flex-shrink-0 flex items-center justify-center [&>img]:max-w-[30px]">
              <img className="ai-icon-animation" src={AiIcon} alt="User" />
            </span>
            <div className="flex-grow overflow-hidden flex items-center">
              {/* <h4 className="text-white font-medium text-lg mt-1">Lusso</h4> */}
              <div className="typing typing-xs">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LussoChat;
