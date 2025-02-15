interface CategoryType {
  id: number;
  title: string;
}

const categories: CategoryType[] = [
  { id: 1, title: "AI and Technology" },
  { id: 2, title: "Digital Trends" },
  { id: 3, title: "Content Creation" },
  { id: 4, title: "Entertainment " },
  { id: 5, title: "Health and Wellness" },
  { id: 6, title: "Communication and Social" },
  { id: 7, title: "Financial" },
  { id: 8, title: "Professional" },
];
const Sidebar = () => {
  return (
    <div className="w-full float-left flex flex-col gap-y-9">
      <input className="ll-search-box" type="text" placeholder="Search"></input>
      <div className="w-full float-left">
        <div className="w-full flex justify-between items-center text-white pb-3 border-b border-white/10">
          <p className="text-xl font-bold">Category</p>
          <div className="flex items-center gap-x-1.5">
            <span className="text-sm font-normal">View All</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M6.00254 7.15641L1.51317 2.66724C1.38985 2.54363 1.22498 2.47563 1.04917 2.47563C0.873268 2.47563 0.708488 2.54363 0.584975 2.66724L0.191805 3.06061C0.0680975 3.18402 0 3.349 0 3.5248C0 3.70061 0.0680975 3.86539 0.191805 3.9889L5.53678 9.33397C5.66068 9.45797 5.82624 9.52588 6.00224 9.52539C6.17902 9.52588 6.34439 9.45807 6.46839 9.33397L11.8082 3.99388C11.9319 3.87036 12 3.70558 12 3.52968C12 3.35388 11.9319 3.1891 11.8082 3.06549L11.415 2.67222C11.1591 2.41632 10.7425 2.41632 10.4867 2.67222L6.00254 7.15641Z"
                fill="#7D3CF3"
              />
            </svg>
          </div>
        </div>
        <div className="w-full float-left mt-6">
          {categories.map((item) => (
            <div
              key={item.id}
              className="w-full float-left border-b border-white/10 mb-2.5 last:mb-0 last:border-transparent"
            >
              <div className="w-full flex justify-between items-center text-white pb-3">
                <div className="flex items-center gap-x-1.5 flex-grow overflow-x-hidden">
                  <svg
                    className="flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M7.15641 5.99746L2.66724 10.4868C2.54363 10.6101 2.47563 10.775 2.47563 10.9508C2.47563 11.1267 2.54363 11.2915 2.66724 11.415L3.06061 11.8082C3.18402 11.9319 3.349 12 3.5248 12C3.70061 12 3.86539 11.9319 3.9889 11.8082L9.33397 6.46322C9.45797 6.33932 9.52588 6.17376 9.52539 5.99776C9.52588 5.82098 9.45807 5.65561 9.33397 5.53161L3.99388 0.191808C3.87036 0.0681 3.70558 1.90735e-06 3.52968 1.90735e-06C3.35388 1.90735e-06 3.1891 0.0681 3.06549 0.191808L2.67222 0.584978C2.41632 0.84088 2.41632 1.25747 2.67222 1.51327L7.15641 5.99746Z"
                      fill="#7D3CF3"
                    />
                  </svg>
                  <p className="w-full text-base font-bold truncate pr-2">
                    {item.title}
                  </p>
                </div>
                <div className="flex items-center justify-center min-w-[28px] min-h-[28px] px-1 rounded-full bg-white/10">
                  <span className="text-base font-bold">2</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full float-left">
        <div className="w-full flex justify-between items-center text-white pb-3 border-b border-white/10">
          <p className="text-xl font-bold">Popular tags</p>
        </div>
        <div className="w-full float-left mt-6">
          <div className="w-full flex items-center gap-3 justify-start flex-wrap [&>span]:!leading-[21px]">
            <span className="tag-label">Ai</span>
            <span className="tag-label">Fitness</span>
            <span className="tag-label">Creative</span>
            <span className="tag-label">Marketing</span>
            <span className="tag-label">finance</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
