import { LineDraw } from "../GameDetailsScreen";


interface InfoSectionProps {
    publisher: string;
    genres: string;
    category: string;
    productSize: string;
    ageRating: string;
    support: {
        phoneNumber: string;
        email: string;
    };
    compatibility: {
        devices: string[];
        requirements: string[];
    };
}
function AdditionalInfo({ infoData }: any) {
    const isDataEmpty: any = (obj: any) => {
        if (typeof obj !== "object" || obj === null) return true;

        return Object.values(obj).every((value: any) => {
            if (typeof value === "object" && value !== null) {
                return isDataEmpty(value); // Recursive check for nested objects
            }
            return value === "" || value === null || value === undefined;
        });
    };

    const InfoItem = ({ title, content }: { title: string, content: string | any }) => (
        <div>
            <h3 className="text-[#6DDCFF] uppercase text-lg md:text-xl font-semibold mb-1">{title}</h3>
            <div className="text-white text-lg">{content}</div>
        </div>
    );

    const InfoSection = ({
        publisher,
        genres,
        category,
        productSize,
        ageRating,
        support,
        compatibility
    }: InfoSectionProps) => {
        return (
            <div className="text-sm p-3 pb-5 px-0">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1 flex flex-col gap-7 justify-start">
                        {publisher && <InfoItem title="PUBLISHER:" content={publisher} />}
                        {genres && <InfoItem title="GENRES" content={genres} />}
                        {category && <InfoItem title="CATEGORY" content={category} />}
                    </div>
                    <div className="flex-1 flex flex-col justify-start gap-7 mt-3 md:mt-0">
                        {productSize && <InfoItem title="PRODUCT SIZE" content={productSize} />}
                        {ageRating && <InfoItem title="AGE RATING" content={ageRating} />}
                        {support && (
                            // Check if there's any valid support data (phoneNumber or email)
                            (support.phoneNumber || support.email) && (
                                <InfoItem
                                    title="SUPPORT"
                                    content={
                                        <>
                                            {support.phoneNumber && <>Phone Number: {support.phoneNumber}<br /></>}
                                            {support.email && <>Email: {support.email}</>}
                                        </>
                                    }
                                />
                            )
                        )}
                    </div>
                    <div className="flex-1 flex flex-col justify-start gap-7 mt-3 md:mt-0">
                        {/* Compatibility Section */}
                        {compatibility && (
                            // Check if there are any devices or requirements before rendering the section
                            (compatibility.devices?.length > 0 || compatibility.requirements?.length > 0) && (
                                <InfoItem
                                    title="COMPATIBILITY"
                                    content={
                                        <ul className="list-disc pl-4">
                                            {compatibility.devices?.length > 0 && compatibility.devices.map((device, index) => (
                                                <li key={index}>{device}</li>
                                            ))}
                                            {compatibility.requirements?.length > 0 && compatibility.requirements.map((requirement, index) => (
                                                <li key={index}>{requirement}</li>
                                            ))}
                                        </ul>
                                    }
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="mb-3 bg-[#161328] rounded-2xl p-5">
            <h2 className="text-xl md:text-3xl font-bold mb-4">Additional Information</h2>
            <LineDraw />
            {isDataEmpty(infoData) ? <h2>N/A</h2> : <InfoSection {...infoData} />}
        </div>
    )
}

export default AdditionalInfo