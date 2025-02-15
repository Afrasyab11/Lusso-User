import { useNavigate } from "react-router-dom";

const GridBox = (props: any) => {
  const navigate = useNavigate();
  const navigateDetails = (id: number) => navigate(`/dashboard/details/${id}`);
  const { data } = props;
  return (
    <div className="w-full grid grid-cols-4 gap-7 fontFamily-work-sans">
      {data.map((item: any) => (
        <div
          key={item.id}
          className="ll-grid-box h-[305px] relative"
          onClick={() => navigateDetails(item.id)}
        >
          <img
            src={item.icon}
            className="w-full object-cover object-center rounded-t-2xl absolute"
            alt="Ai Tools"
          />
          <div className="w-full flex flex-col gap-y-2.5 p-6 rounded-b-3xl absolute bg-[rgba(0, 0, 0, 0.15)]" style={{ backdropFilter: 'blur(20px)', top: "70%" }}>
            <h3 className="text-white font-semibold text-20 uppercase">
              {item.title}
            </h3>
            <p className="text-white text-xs font-normal text-16">
              {item.genre}
            </p>
          </div>
        </div>
        // <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        //   <img style={{ width: 368.47, height: 305.24, left: 0, top: 0, position: 'absolute', borderRadius: 10 }} src={item.icon} />
        //   <div style={{ width: 368.47, height: 106.83, left: 0, top: 198.40, position: 'absolute', background: 'rgba(0, 0, 0, 0.15)', borderTopLeftRadius: 10, borderTopRightRadius: 10, backdropFilter: 'blur(20px)' }} />
        //   <div style={{ width: 259.45, height: 26.16, left: 21.80, top: 234.57, position: 'absolute', color: 'white', fontSize: 20, fontFamily: 'Work Sans', fontWeight: '800', textTransform: 'uppercase', wordWrap: 'break-word' }}>Forza Horizon 4</div>
        //   <div style={{ width: 228.93, height: 20.71, left: 21.80, top: 262.72, position: 'absolute', color: 'white', fontSize: 16, fontFamily: 'Work Sans', fontWeight: '400', wordWrap: 'break-word' }}>Action | Adventure | Racing</div>
        // </div>
      ))}
    </div>
  );
};

export default GridBox;
