import {useMutation} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import btnStar from '../../assets/images/icons/btn-star.svg';
import ChatIcon from '../../assets/images/icons/chat-icon.svg';
import SavedIcon from '../../assets/images/icons/saved-icon.svg';
import SearchMenuIcon from '../../assets/images/icons/search-menu-icon.svg';
import SettingsIcon from '../../assets/images/icons/settings-icon.svg';
import UserIcon from '../../assets/images/icons/user-icon.svg';
import NavlogoIcon from '../../assets/images/logo-icon.png';
import GreetingScreen from '../../components/ask-lusso/greeting-screen';
import LussoChat from '../../components/ask-lusso/lusso-chat';
import UpgradeBox from '../../components/common/UpgradeBox';
import {apiEndpoints} from '../../constants/api-endpoints';
import {envValues} from '../../constants/envs';
import {useAuthCheck} from '../../hooks/authHooks';
import {ChatbotMessage, MessageAuthor} from '../../types/ChatMessage';
import './askLusso.scss';

const AskLusso = () => {
  const {checkAuth} = useAuthCheck();

  const [loading, setLoading] = useState<boolean>(true);

  const [messages, setMessages] = useState<ChatbotMessage[]>([]);

  const [message, setMessage] = useState('');

  const sendMessageMutation = useMutation({
    mutationFn: async () => {
      if (message) {
        // Add new human message to messages
        const newMessageHuman: ChatbotMessage[] = [
          ...messages,
          {
            message,
            author: MessageAuthor.Human,
          },
        ];

        setMessages(newMessageHuman);
        setMessage('');

        const response = await fetch(
          envValues.apiBaseUrl + apiEndpoints.chatBot,
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              message,
              history: messages,
            }),
          },
        );
        if (response.status === 400) {
          alert('Invalid Request');
          return;
        }

        if (!response.body) {
          return;
        }

        try {
          let newMessage = '';
          const reader = response.body
            .pipeThrough(new TextDecoderStream())
            .getReader();

          // Create an empty ai message
          setMessages(mes => [
            ...mes,
            {
              message: '',
              author: MessageAuthor.AI,
            },
          ]);

          while (true) {
            const {done, value} = await reader.read();
            newMessage += value;
            if (done) {
              break;
            }

            // eslint-disable-next-line no-loop-func
            setMessages(mes => {
              // Find last message and update it
              mes[mes.length - 1].message = newMessage;
              return [...mes];
            });

            // setStreamingMessages(prev => prev + newMessage);
          }
        } catch (error) {
          console.error('error', error);
        }
      }
    },

    onError: () => {
      alert('Error sending message');
      // Remove last human message
      setMessages(mes => {
        const newMessage = mes.slice(0, -1);

        // sessionStorage.setItem('messages', JSON.stringify(newMessage));

        return newMessage;
      });
    },
  });

  const handleSendMessage = async () => {
    sendMessageMutation.mutate();
  };

  useEffect(() => {
    checkAuth();
    setLoading(false);
  }, [checkAuth]);

  return (
    <>
      {!loading && (
        <div className="w-full float-left private-layout-bg min-h-[calc(100vh-348px)]">
          <div className="w-full max-w-[1680px] mx-auto clearfix px-10">
            <div className="w-full float-left flex ask-lusso-bg my-12 p-8">
              <div className="w-[280px] xl:w-[340px] flex-shrink-0 flex flex-col my-10 justify-between pr-8">
                <div className="w-full float-left flex flex-col items-start pl-10 gap-y-12">
                  <img src={NavlogoIcon} alt="" />
                  <div className="w-full flex flex-col gap-y-8 mt-3">
                    <div className="w-full flex gap-x-3.5 items-center">
                      <img className="flex-shrink-0" src={ChatIcon} alt="" />
                      <p className="text-xl font-normal text-ll-gray truncate">
                        Chat
                      </p>
                    </div>
                    <div className="w-full flex gap-x-3.5 items-center">
                      <img
                        className="flex-shrink-0"
                        src={SearchMenuIcon}
                        alt=""
                      />
                      <p className="text-xl font-normal text-ll-gray truncate">
                        Search
                      </p>
                    </div>
                    <div className="w-full flex gap-x-3.5 items-center">
                      <img className="flex-shrink-0" src={SavedIcon} alt="" />
                      <p className="text-xl font-normal text-ll-gray truncate">
                        Saved
                      </p>
                    </div>
                    <div className="w-full flex gap-x-3.5 items-center">
                      <img
                        className="flex-shrink-0"
                        src={SettingsIcon}
                        alt=""
                      />
                      <p className="text-xl font-normal text-ll-gray truncate">
                        Settings
                      </p>
                    </div>
                  </div>
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
              <div className="w-full float-left bg-[#2B2748] rounded-[48px] p-8 flex flex-col justify-between min-h-[1000px]">
                {messages.length > 0 ? (
                  <LussoChat messages={messages} loading={false} />
                ) : (
                  <GreetingScreen />
                )}
                <div className="w-full float-left mt-20">
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                  >
                    <div className="w-full float-left relative">
                      <input
                        defaultValue="how can I help you today?"
                        type="text"
                        className="ai-input-box py-6 pl-8 pr-[218px] disabled:cursor-not-allowed"
                        value={message}
                        onChange={e => {
                          setMessage(e.target.value);
                        }}
                        disabled={false}
                      />
                      <button
                        type="submit"
                        className="search-ai-btn px-6 py-3 absolute right-2 top-1/2 transform -translate-y-1/2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
                        disabled={sendMessageMutation.isPending}
                      >
                        <span>Search with AI</span>
                        <img src={btnStar} alt="Star" />
                      </button>
                    </div>
                  </form>
                  <p className="w-full float-left text-sm font-normal text-ll-gray text-center mt-6">
                    Free Research Preview. Lusso may produce inaccurate
                    information about people, places, or fact. Lusso beta
                    version.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AskLusso;
