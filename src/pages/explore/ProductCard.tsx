
const ProductCard = ({ course }: any) => {
    return (
        <div className="product-card-bg rounded-lg p-4 max-w-sm lg:min-w-[250px]">
            <img
                src={course.image}
                alt={course.title}
                className="rounded-md mb-4 w-full h-40 object-cover"
            />
            <div className="flex space-x-2 mb-4">
                {course.tags.map((tag: string, index: number) => (
                    <span
                        key={index}
                        className={`${index % 2 === 0 ? 'bg-[#322781]' : 'bg-[#3B346D]'} 
                        text-white text-xs px-2 py-1 rounded-full`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <div className="flex">
                <div className="flex-1">
                    <h3 className="text-white text-lg font-bold mb-2">{course.title}</h3>
                </div>
                <div className="flex items-center mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                        <g clip-path="url(#clip0_2684_1272)">
                            <path d="M12.1963 4.51912C12.1536 4.39157 12.0431 4.29865 11.9101 4.2782L8.38081 3.73895L6.79949 0.370361C6.74029 0.244429 6.61364 0.164062 6.47461 0.164062C6.33558 0.164062 6.20911 0.244429 6.14974 0.370361L4.56841 3.73895L1.03909 4.27838C0.906162 4.29865 0.795837 4.39175 0.752963 4.5193C0.710268 4.64666 0.742379 4.7873 0.836379 4.88364L3.40058 7.51296L2.7946 11.2271C2.77236 11.3627 2.82958 11.4992 2.94206 11.5781C3.00377 11.6217 3.07607 11.6438 3.14854 11.6438C3.2081 11.6438 3.26801 11.6287 3.32219 11.5989L6.47443 9.85543L9.62668 11.5989C9.68085 11.6287 9.74077 11.6438 9.80032 11.6438C9.8728 11.6438 9.94527 11.6217 10.0068 11.5781C10.1193 11.4992 10.1765 11.3627 10.1543 11.2271L9.54828 7.51296L12.1125 4.88364C12.2067 4.78713 12.239 4.64648 12.1963 4.51912Z" fill="#EABA12" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2684_1272">
                                <rect width="11.481" height="11.481" fill="white" transform="translate(0.734375 0.164062)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span className="text-white ml-2 text-sm">{course.rating}</span>
                </div>
            </div>
            <p className="text-gray-400 text-sm">{course.subtitle}</p>
        </div>
    );
};

export default ProductCard