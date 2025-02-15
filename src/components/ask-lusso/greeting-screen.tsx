import RobotIcon from '../../assets/images/icons/robot.png';
import {helpData} from './askLussoData';
const GreetingScreen = () => {
  return (
    <div className="w-full float-left flex flex-col items-center pt-16">
      <img src={RobotIcon} alt="" />
      <div className="flex items-center mt-1">
        <p className="ask-lusso-txt bg-gradient-to-r from-[#CC00F2] via-[#7362FF] to-[#5B97FF] text-[50px] font-bold">
          Ask Lusso
        </p>
        <span className="bg-primary text-xs font-medium text-white rounded py-0.5 px-1 ml-1">
          beta
        </span>
      </div>
      <div className="w-full grid grid-cols-3 gap-7 mt-20">
        {helpData.map(item => (
          <div
            key={item.id}
            className="w-full float-left px-4 py-6 bg-[#353057] border border-[#464070] rounded-[20px]"
          >
            <div className="w-full flex items-center gap-x-3">
              <span className="flex-shrink-0 w-9 h-9 bg-primary flex justify-center items-center rounded-lg">
                <img src={item.icon} alt="" />
              </span>
              <p className="truncate text-white text-2xl font-bold">
                {item.title}
              </p>
            </div>
            <div className="w-full float-left flex flex-col gap-y-4 mt-4">
              {item.list.map(list => (
                <div
                  key={list.id}
                  className="rounded-[10px] bg-[#3D385D] px-4 py-3"
                >
                  <p className="text-base font-normal text-ll-gray">
                    {list.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GreetingScreen;
