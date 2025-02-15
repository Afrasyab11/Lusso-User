const CommentBox = () => {
  return (
    <div className="w-full float-left rounded-[20px] bg-black/75 p-7 mt-10">
      <div className="w-full float-left flex justify-between gap-x-4">
        <p className="text-white text-2xl font-bold">03 Comments</p>
        <div className="float-left flex gap-x-3 items-center">
          <span className="text-sm font-bold text-white float-left">
            Sort By:
          </span>
          <div className="relative float-left">
            <div className="flex items-center gap-x-0.5">
              <p className="text-sm font-bold text-white">Newest</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M4 7L8 11L12 7"
                  stroke="#C1C1C1"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full float-left mt-6">
        <div className="w-full float-left flex flex-col gap-y-10">
          <div className="comment-list w-full float-left flex flex-col gap-y-6 [&>.comment-list]:pl-10">
            <div className="w-full float-left flex flex-col gap-y-3">
              <div className="w-full flex gap-x-4 items-center">
                <div className="flex-grow overflow-hidden flex gap-x-4 items-center">
                  <div className="w-[52px] h-[52px] flex-shrink-0 rounded-full bg-[#615F6F]">
                    {/* <img src={} alt="" className="w-full h-full rounded-full object-cover object-center"/> */}
                  </div>
                  <div className="flex-grow overflow-hidden flex flex-col gap-y-1 [&>*]:truncate">
                    <p className="text-white font-bold text-base">
                      Guy Hawkins
                    </p>
                    <span className="text-sm text-[#C1C1C1]">1 days ago</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 12C9.41063 12 8.8454 11.7659 8.42865 11.3491C8.01191 10.9324 7.77778 10.3671 7.77778 9.77778C7.77778 9.18841 8.01191 8.62318 8.42865 8.20643C8.8454 7.78968 9.41063 7.55556 10 7.55556C10.5894 7.55556 11.1546 7.78968 11.5713 8.20643C11.9881 8.62318 12.2222 9.18841 12.2222 9.77778C12.2222 10.3671 11.9881 10.9324 11.5713 11.3491C11.1546 11.7659 10.5894 12 10 12ZM17.7778 12C17.1884 12 16.6232 11.7659 16.2064 11.3491C15.7897 10.9324 15.5556 10.3671 15.5556 9.77778C15.5556 9.18841 15.7897 8.62318 16.2064 8.20643C16.6232 7.78968 17.1884 7.55556 17.7778 7.55556C18.3671 7.55556 18.9324 7.78968 19.3491 8.20643C19.7659 8.62318 20 9.18841 20 9.77778C20 10.3671 19.7659 10.9324 19.3491 11.3491C18.9324 11.7659 18.3671 12 17.7778 12ZM2.22222 12C1.63285 12 1.06762 11.7659 0.650874 11.3491C0.234126 10.9324 0 10.3671 0 9.77778C0 9.18841 0.234126 8.62318 0.650874 8.20643C1.06762 7.78968 1.63285 7.55556 2.22222 7.55556C2.81159 7.55556 3.37682 7.78968 3.79357 8.20643C4.21032 8.62318 4.44444 9.18841 4.44444 9.77778C4.44444 10.3671 4.21032 10.9324 3.79357 11.3491C3.37682 11.7659 2.81159 12 2.22222 12Z"
                      fill="#C1C1C1"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-base text-white font-normal py-0.5">
                <p>
                  Lorem ipsum dolor sit amet consectetur. Cursus nunc pharetra
                  arcu quam turpis risus amet turpis. Facilisis elementum
                  tincidunt pellentesque sed rutrum enim.
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-x-4 items-center">
                  <div className="flex gap-x-1 items-center">
                    <label className="cursor-pointer">
                      <input type="checkbox" className="hidden peer" />
                      <svg
                        className="peer-checked:fill-white"
                        width="18"
                        height="16"
                        viewBox="0 0 18 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 14.875C9 14.875 0.875 10.5 0.875 5.34375C0.875 4.22487 1.31947 3.15181 2.11064 2.36064C2.90181 1.56947 3.97487 1.125 5.09375 1.125C6.85859 1.125 8.37031 2.08672 9 3.625C9.62969 2.08672 11.1414 1.125 12.9062 1.125C14.0251 1.125 15.0982 1.56947 15.8894 2.36064C16.6805 3.15181 17.125 4.22487 17.125 5.34375C17.125 10.5 9 14.875 9 14.875Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </label>
                    <span className="text-sm text-[#C1C1C1] font-bold">20</span>
                  </div>
                  <div className="flex gap-x-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M17.5 12.5C17.5 12.942 17.3244 13.366 17.0118 13.6785C16.6993 13.9911 16.2754 14.1667 15.8333 14.1667H5.83333L2.5 17.5V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H15.8333C16.2754 2.5 16.6993 2.67559 17.0118 2.98816C17.3244 3.30072 17.5 3.72464 17.5 4.16667V12.5Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm text-[#C1C1C1] font-bold">
                      Hide Replies
                    </span>
                  </div>
                </div>
                <span className="text-sm font-bold text-white">Reply</span>
              </div>
            </div>
            <div className="comment-list w-full float-left flex flex-col gap-y-6 [&>.comment-list]:pl-10">
              <div className="w-full float-left flex flex-col gap-y-3">
                <div className="w-full flex gap-x-4 items-center">
                  <div className="flex-grow overflow-hidden flex gap-x-4 items-center">
                    <div className="w-[52px] h-[52px] flex-shrink-0 rounded-full bg-[#615F6F]">
                      {/* <img src={} alt="" className="w-full h-full rounded-full object-cover object-center"/> */}
                    </div>
                    <div className="flex-grow overflow-hidden flex flex-col gap-y-1 [&>*]:truncate">
                      <p className="text-white font-bold text-base">
                        Maverick .N
                      </p>
                      <span className="text-sm text-[#C1C1C1]">1 days ago</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 12C9.41063 12 8.8454 11.7659 8.42865 11.3491C8.01191 10.9324 7.77778 10.3671 7.77778 9.77778C7.77778 9.18841 8.01191 8.62318 8.42865 8.20643C8.8454 7.78968 9.41063 7.55556 10 7.55556C10.5894 7.55556 11.1546 7.78968 11.5713 8.20643C11.9881 8.62318 12.2222 9.18841 12.2222 9.77778C12.2222 10.3671 11.9881 10.9324 11.5713 11.3491C11.1546 11.7659 10.5894 12 10 12ZM17.7778 12C17.1884 12 16.6232 11.7659 16.2064 11.3491C15.7897 10.9324 15.5556 10.3671 15.5556 9.77778C15.5556 9.18841 15.7897 8.62318 16.2064 8.20643C16.6232 7.78968 17.1884 7.55556 17.7778 7.55556C18.3671 7.55556 18.9324 7.78968 19.3491 8.20643C19.7659 8.62318 20 9.18841 20 9.77778C20 10.3671 19.7659 10.9324 19.3491 11.3491C18.9324 11.7659 18.3671 12 17.7778 12ZM2.22222 12C1.63285 12 1.06762 11.7659 0.650874 11.3491C0.234126 10.9324 0 10.3671 0 9.77778C0 9.18841 0.234126 8.62318 0.650874 8.20643C1.06762 7.78968 1.63285 7.55556 2.22222 7.55556C2.81159 7.55556 3.37682 7.78968 3.79357 8.20643C4.21032 8.62318 4.44444 9.18841 4.44444 9.77778C4.44444 10.3671 4.21032 10.9324 3.79357 11.3491C3.37682 11.7659 2.81159 12 2.22222 12Z"
                        fill="#C1C1C1"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-base text-white font-normal py-0.5">
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Cursus nunc pharetra
                    arcu quam turpis risus amet turpis. Facilisis elementum
                    tincidunt pellentesque sed rutrum enim.
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-x-4 items-center">
                    <div className="flex gap-x-1 items-center">
                      <label className="cursor-pointer">
                        <input type="checkbox" className="hidden peer" />
                        <svg
                          className="peer-checked:fill-white"
                          width="18"
                          height="16"
                          viewBox="0 0 18 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 14.875C9 14.875 0.875 10.5 0.875 5.34375C0.875 4.22487 1.31947 3.15181 2.11064 2.36064C2.90181 1.56947 3.97487 1.125 5.09375 1.125C6.85859 1.125 8.37031 2.08672 9 3.625C9.62969 2.08672 11.1414 1.125 12.9062 1.125C14.0251 1.125 15.0982 1.56947 15.8894 2.36064C16.6805 3.15181 17.125 4.22487 17.125 5.34375C17.125 10.5 9 14.875 9 14.875Z"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </label>
                      <span className="text-sm text-[#C1C1C1] font-bold">
                        20
                      </span>
                    </div>
                    {/* <div className="flex gap-x-1 items-center">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        >
                        <path
                            d="M17.5 12.5C17.5 12.942 17.3244 13.366 17.0118 13.6785C16.6993 13.9911 16.2754 14.1667 15.8333 14.1667H5.83333L2.5 17.5V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H15.8333C16.2754 2.5 16.6993 2.67559 17.0118 2.98816C17.3244 3.30072 17.5 3.72464 17.5 4.16667V12.5Z"
                            stroke="white"
                            strokeWidth="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        </svg>
                        <span className="text-sm text-[#C1C1C1] font-bold">
                        Hide Replies
                        </span>
                    </div> */}
                  </div>
                  <span className="text-sm font-bold text-white">Reply</span>
                </div>
              </div>
            </div>
          </div>

          <div className="comment-list w-full float-left flex flex-col gap-y-6">
            <div className="w-full float-left flex flex-col gap-y-3">
              <div className="w-full flex gap-x-4 items-center">
                <div className="flex-grow overflow-hidden flex gap-x-4 items-center">
                  <div className="w-[52px] h-[52px] flex-shrink-0 rounded-full bg-[#615F6F]">
                    {/* <img src={} alt="" className="w-full h-full rounded-full object-cover object-center"/> */}
                  </div>
                  <div className="flex-grow overflow-hidden flex flex-col gap-y-1 [&>*]:truncate">
                    <p className="text-white font-bold text-base">John Smith</p>
                    <span className="text-sm text-[#C1C1C1]">1 days ago</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 12C9.41063 12 8.8454 11.7659 8.42865 11.3491C8.01191 10.9324 7.77778 10.3671 7.77778 9.77778C7.77778 9.18841 8.01191 8.62318 8.42865 8.20643C8.8454 7.78968 9.41063 7.55556 10 7.55556C10.5894 7.55556 11.1546 7.78968 11.5713 8.20643C11.9881 8.62318 12.2222 9.18841 12.2222 9.77778C12.2222 10.3671 11.9881 10.9324 11.5713 11.3491C11.1546 11.7659 10.5894 12 10 12ZM17.7778 12C17.1884 12 16.6232 11.7659 16.2064 11.3491C15.7897 10.9324 15.5556 10.3671 15.5556 9.77778C15.5556 9.18841 15.7897 8.62318 16.2064 8.20643C16.6232 7.78968 17.1884 7.55556 17.7778 7.55556C18.3671 7.55556 18.9324 7.78968 19.3491 8.20643C19.7659 8.62318 20 9.18841 20 9.77778C20 10.3671 19.7659 10.9324 19.3491 11.3491C18.9324 11.7659 18.3671 12 17.7778 12ZM2.22222 12C1.63285 12 1.06762 11.7659 0.650874 11.3491C0.234126 10.9324 0 10.3671 0 9.77778C0 9.18841 0.234126 8.62318 0.650874 8.20643C1.06762 7.78968 1.63285 7.55556 2.22222 7.55556C2.81159 7.55556 3.37682 7.78968 3.79357 8.20643C4.21032 8.62318 4.44444 9.18841 4.44444 9.77778C4.44444 10.3671 4.21032 10.9324 3.79357 11.3491C3.37682 11.7659 2.81159 12 2.22222 12Z"
                      fill="#C1C1C1"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-base text-white font-normal py-0.5">
                <p>
                  Lorem ipsum dolor sit amet consectetur. Cursus nunc pharetra
                  arcu quam turpis risus amet turpis. Facilisis elementum
                  tincidunt pellentesque sed rutrum enim.
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-x-4 items-center">
                  <div className="flex gap-x-1 items-center">
                    <label className="cursor-pointer">
                      <input type="checkbox" className="hidden peer" />
                      <svg
                        className="peer-checked:fill-white"
                        width="18"
                        height="16"
                        viewBox="0 0 18 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 14.875C9 14.875 0.875 10.5 0.875 5.34375C0.875 4.22487 1.31947 3.15181 2.11064 2.36064C2.90181 1.56947 3.97487 1.125 5.09375 1.125C6.85859 1.125 8.37031 2.08672 9 3.625C9.62969 2.08672 11.1414 1.125 12.9062 1.125C14.0251 1.125 15.0982 1.56947 15.8894 2.36064C16.6805 3.15181 17.125 4.22487 17.125 5.34375C17.125 10.5 9 14.875 9 14.875Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </label>
                    <span className="text-sm text-[#C1C1C1] font-bold">20</span>
                  </div>
                  <div className="flex gap-x-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M17.5 12.5C17.5 12.942 17.3244 13.366 17.0118 13.6785C16.6993 13.9911 16.2754 14.1667 15.8333 14.1667H5.83333L2.5 17.5V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H15.8333C16.2754 2.5 16.6993 2.67559 17.0118 2.98816C17.3244 3.30072 17.5 3.72464 17.5 4.16667V12.5Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {/* <span className="text-sm text-[#C1C1C1] font-bold">
                        Hide Replies
                    </span> */}
                  </div>
                </div>
                <span className="text-sm font-bold text-white">Reply</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full float-left flex flex-col gap-y-6 mt-10">
        <p className="font-bold text-white text-2xl">Leave A comment</p>
        <form className="w-full float-left flex flex-col gap-y-5 items-start">
          <div className="w-full flex gap-x-5">
            <label className="max-w-[420px] w-full">
              <input
                type="text"
                placeholder="Your name"
                className="contact-frm-input border !border-white/10"
              ></input>
            </label>
            <label className="max-w-[420px] w-full">
              <input
                type="text"
                placeholder="Info.avitex@mail.com"
                className="contact-frm-input border !border-white/10"
              ></input>
            </label>
          </div>
          <div className="w-full flex gap-x-5">
            <textarea
              placeholder="Write comment"
              className="contact-frm-txtarea border !border-white/10"
            ></textarea>
          </div>
          <label className="ll-checkbox-outline flex gap-x-2 items-center cursor-pointer">
            <input type="checkbox" className="hidden" />
            <span className="w-4 h-4 border border-white"></span>
            <p className="text-sm text-[#C1C1C1] select-none">
              Save my name, email, and website in this browser for the next time
              I comment.
            </p>
          </label>
          <button type="button" className="btn-primary-fill !px-6 !py-3 mt-2">
            Submit Comment
          </button>
        </form>
      </div>
    </div>
  );
};
export default CommentBox;
