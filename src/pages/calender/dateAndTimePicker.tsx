import { addMinutes, addMonths, format, subMonths } from 'date-fns';
import { useState } from 'react';
import facebook from "../../assets/images/calender/facebook.svg";
import hoverImg from "../../assets/images/calender/hoverImg.svg";
import insta from "../../assets/images/calender/insta.svg";
import linkedin from "../../assets/images/calender/linkdin.png";
import tiktok from "../../assets/images/calender/tiktok.svg";
import x from "../../assets/images/calender/x.svg";

import CalenderPostModal from './calenderPostModal';

const DateAndTimePicker = ({
  calendarOpened,
  closeCalendar,
  openCalendar,
  allPostsData,
  selectedFromTableDate
}: any) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [hoveredDate, setHoveredDate] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const removeTime = (date: any) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };
  const networkImages: any = {
    facebook,
    instagram: insta,
    linkedin: linkedin,
    tiktok,
    x,
  };
  const generateCalendarDays = () => {
    const startOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1,
    );
    const endOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0,
    );
    const daysInMonth = endOfMonth.getDate();

    const daysArray = [];
    const today = removeTime(new Date());

    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        i,
      );

      const isDisabled = removeTime(day) < today;
      daysArray?.push({ day, isDisabled });
    }
    return daysArray;
  };

  const generateTimeSlots = () => {
    const timeSlots = [];
    const start = new Date();
    start.setHours(10, 0, 0);
    for (let i = 0; i < 10; i++) {
      const timeSlot = addMinutes(start, i * 30);
      timeSlots.push(timeSlot);
    }
    return timeSlots;
  };

  const handleDayClick = (day: any) => {
    setSelectedDate(day);
  };

  const handleTimeClick = (time: any) => {
    setSelectedTime(time);

    if (selectedDate && time) {
      openCalendar();
    }
  };

  const timeSlots = generateTimeSlots();
  const calendarDays = generateCalendarDays();
  const formattedDateTime =
    selectedDate && selectedTime
      ? `${format(selectedDate, 'MMM d, yyyy')} ${format(
        selectedTime,
        'h:mm a',
      )}`
      : null;

  const selectToday = () => {
    const now = new Date();
    const todayDate = removeTime(now);
    const timeSlots = generateTimeSlots();
    const firstTimeSlot: any = timeSlots?.length > 0 ? timeSlots[0] : null;

    setCurrentMonth(todayDate);
    setSelectedDate(todayDate);
    setSelectedTime(firstTimeSlot);
    setHoveredDate(todayDate);

    return todayDate && firstTimeSlot;
  };
  const findPostForDate = (date: any) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return allPostsData?.find((post: any) => format(new Date(post?.publicationDate?.dateTime), 'yyyy-MM-dd') === formattedDate);
  };
  return (
    <>
      <CalenderPostModal
        opened={calendarOpened}
        close={closeCalendar}
        formattedDateTime={formattedDateTime}
        setSelectedTime={setSelectedTime}
        setPreSelectedDate={setSelectedDate}
        selectedFromTableDate={selectedFromTableDate}
        canSaveDraft={selectedDate && removeTime(selectedDate) > removeTime(new Date())}
      />
      <div
        className="p-6 rounded-lg"
        style={{
          background:
            'linear-gradient(125.12deg, #2D246C 6.52%, #1A1442 34.28%, #171232 53.59%, #25204A 78.95%)',
          border: '1px solid rgba(108, 140, 255, 0.5)',
          boxShadow: '0px 10.64px 20.39px 0px rgba(62, 73, 84, 0.04)',
          color: 'white',
        }}
      >
        <div className="flex justify-end items-center mb-12">
          <div className="flex items-center space-x-4">
            <button
              className="bg-[#792FFF80]  px-4 py-3 rounded text-white font-medium text-xs  md:text-sm"
              onClick={() => {
                if (selectToday()) {
                  openCalendar();
                }
              }}
            >
              Today
            </button>
            <div className="join border-0 items-center">
              <button
                className="btn join-item bg-[#792FFF80] hover:bg-[#792FFF80] border-[#792FFF80] px-4  rounded text-white"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              >
                {'<'}
              </button>
              <button
                className="btn join-item bg-[#792FFF80] hover:bg-[#792FFF80] border-[#792FFF80] px-4  rounded text-white"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                {'>'}
              </button>
            </div>

            <button
              className="bg-[#792FFF80] font-medium text-xs  md:text-sm px-4 py-3 rounded text-white"
              onClick={() => {
                if (selectToday()) {
                  openCalendar();
                }
              }}
            >
              + Create Post
            </button>
          </div>
        </div>
        <div className="pt-10">
          <div className="grid grid-cols-[4fr_1px_2fr] gap-4">
            {/* Calendar Section */}
            <div className="flex flex-col">
              <div className="flex justify-start mb-4">
                <h2 className="text-white text-xl font-bold mb-4">
                  {format(currentMonth, 'MMMM yyyy')}
                </h2>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S']?.map((day, index) => (
                  <div key={index} className="text-center md:text-lg font-bold">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {calendarDays?.map(({ day, isDisabled }, index) => {
                  const postData = findPostForDate(day);
                  const date = new Date(postData?.publicationDate?.dateTime);
                  const timeWithAmPm = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

                  const isHovered = hoveredDate && hoveredDate.getTime() === day.getTime();
                  return (
                    <div
                      key={index}
                      onMouseEnter={() => setHoveredDate(day)}
                      onMouseLeave={() => setHoveredDate(null)}
                      onClick={() => !isDisabled && handleDayClick(day)}
                      className={`text-center py-2 md:text-lg rounded cursor-pointer ${isDisabled
                        ? 'text-gray-500 cursor-not-allowed'
                        : selectedDate &&
                          selectedDate.getTime() === day.getTime()
                          ? 'text-[#F09038]'
                          : day.getDate() === new Date().getDate() &&
                            currentMonth.getMonth() === new Date().getMonth()
                            ? ' text-white'
                            : 'text-white'
                        }`}
                    >
                      {day.getDate()}

                      {postData && isHovered && (
                        <div
                          // className="absolute rounded-lg w-1/3"
                          // style={{
                          //   top: "45%",
                          //   left: "45%",
                          //   transform: "translate(-50%, -50%)",
                          //   zIndex: 10,
                          //   border: "2px solid var(--4, #00F0FB)",
                          //   backgroundImage:
                          //     "linear-gradient(177.95deg, #2E246D 0.17%, #18152D 101.04%)",
                          // pointerEvents: "none", 
                          // }}
                          className="absolute rounded-lg w-1/3"
                          style={{
                            top: "45%",
                            left: "45%",
                            transform: "translate(-50%, -110%)",
                            zIndex: 10,
                            border: "2px solid var(--4, #00F0FB)",
                            backgroundImage:
                              "linear-gradient(177.95deg, #2E246D 0.17%, #18152D 101.04%)",
                            pointerEvents: "none",
                          }}
                        >
                          <div className="p-4 flex gap-6 items-start">
                            <div className="flex-shrink-0 h-full">
                              <img
                                src={postData?.media[0] ?? hoverImg}
                                alt="Hover Img"
                                className="w-16 object-cover"
                              />
                            </div>
                            <div className="w-1/2 flex flex-col gap-3">
                              <div>
                                <span className="bg-[#A519F5] text-white font-normal rounded-2xl p-2 ">
                                  {timeWithAmPm ?? ""}
                                </span>
                              </div>
                              <div>
                                <p className="font-normal text-[#FFFFFF] text-sm  truncate  break-all ">
                                  {postData?.text}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col gap-3 justify-end items-center">
                              {postData?.providers?.map((provider: any) => (
                                <div>
                                  {networkImages[provider?.network] && (
                                    <img
                                      src={networkImages[provider?.network]}
                                      alt={provider?.network}
                                      className="network-icon h-5 w-5 items-center justify-center"
                                    />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="h-full w-[1px] bg-gray-400 "></div>
            <div className="flex flex-col ">
              <div className="text-center">
                <h2 className="text-white text-xl font-bold mb-4">Time</h2>
              </div>

              <div
                className="flex flex-col  space-y-2 overflow-y-scroll scrollbar-hide"
                style={{
                  height: '320px',
                }}
              >
                {timeSlots?.map((time, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeClick(time)}
                    className={`flex items-center justify-center py-2 rounded ${selectedTime &&
                      format(selectedTime, 'h:mm a') === format(time, 'h:mm a')
                      ? 'text-[#00F0FB]'
                      : ' text-white'
                      }`}
                    style={
                      selectedTime &&
                        format(selectedTime, 'h:mm a') === format(time, 'h:mm a')
                        ? {
                          background:
                            'linear-gradient(89.97deg, rgba(0, 255, 255, 0.1) 0.03%, rgba(0, 240, 251, 0) 99.97%)',
                        }
                        : {}
                    }
                  >
                    <h2
                      className={`mx-9 md:text-lg font-semibold ${selectedTime &&
                        format(selectedTime, 'h:mm a') ===
                        format(time, 'h:mm a')
                        ? 'text-[#00F0FB]'
                        : 'text-[#FFFFFF]'
                        }`}
                    >
                      {format(time, 'hh:mm')}
                    </h2>
                    <h2
                      className={`mx-9 text-lg font-semibold ${selectedTime &&
                        format(selectedTime, 'h:mm a') ===
                        format(time, 'h:mm a')
                        ? 'text-[#00F0FB]'
                        : 'text-[#FFFFFF]'
                        }`}
                    >
                      {format(time, 'a')}
                    </h2>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            {selectedTime && selectedDate ? (
              <p className="text-white">
                Selected Date Time: {format(selectedDate, 'MMMM d, yyyy')} at{' '}
                {format(selectedTime, 'h:mm a')}
              </p>
            ) : (
              <p className="text-white">Please select a date and time.</p>
            )}
          </div>

          {/* {hoveredDate && (
            <div
              className="absolute rounded-lg w-1/3"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                border: "2px solid var(--4, #00F0FB)",
                backgroundImage:
                  "linear-gradient(177.95deg, #2E246D 0.17%, #18152D 101.04%)",
              }}
            >
              <div className="p-4 flex gap-6 items-start">
                <div className="flex-shrink-0 h-full">
                  <img
                    src={hoverImg}
                    alt=""
                    className="h-auto w-full object-cover"
                  />
                </div>

                <div className="w-1/2 flex flex-col gap-3">
                  <div>
                    <span className="bg-[#A519F5] text-white font-normal rounded-2xl p-2 ">
                      Time: 1:30 PM
                    </span>
                  </div>
                  <div>
                    <p className="font-normal text-[#FFFFFF] text-sm">
                      Discover the perfect blend of innovation and expertise at
                      Lusso Labs. As your digital partner, we specialize ...
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 justify-start">
                  <div>
                    <img src={facebook} alt="Facebook" />
                  </div>
                  <div>
                    <img src={insta} alt="Instagram" />
                  </div>
                  <div>
                    <img src={tiktok} alt="TikTok" />
                  </div>
                  <div>
                    <img src={x} alt="X" />
                  </div>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default DateAndTimePicker;
