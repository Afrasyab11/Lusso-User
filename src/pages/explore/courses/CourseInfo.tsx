
const CourseInfo = (props: any) => {
    const tags = ['Eductaion', 'AI', 'Computer', 'Technology', 'Science'];
    if(!props?.description){
        return <></>
    }
    return (
        <div className="bg-[#161328] text-white p-6 rounded-2xl mb-3">
            <div className="flex overflow-x-auto scrollbar-none gap-2 mb-4">
                {tags.map((tag, index) => (
                    <span key={index} className="w-auto x-3 py-1 border-2 border-[#7D3CF3] rounded-full text-md min-w-[100px] text-center">
                        {tag}
                    </span>
                ))}
            </div>

            {!props?.description ? <h2>N/A</h2> :
                <>
                    <p className="text-lg mb-6 border-b-2 border-b-[#333042] py-2">
                        {props?.description}
                    </p>

                    <div className="flex flex-col md:flex-row gap-5 text-[#6DDCFF]">
                        <div className="flex gap-2 items-center">
                            <p className="text-white text-sm">Duration</p>
                            <p>3hr 15min</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <p className="text-white text-sm">Section</p>
                            <p>3 part</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <p className="text-white text-sm">Lecturer</p>
                            <p>16</p>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default CourseInfo;