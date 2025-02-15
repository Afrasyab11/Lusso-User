import { useState } from "react";
import { Link } from "react-router-dom";
import { LineDraw } from "../GameDetailsScreen";

function DescriptionSection({ desc, isMovie, lineLimit = 5 }: { desc: string, isMovie?: boolean; lineLimit?: number }) {
    const [showFullText, setShowFullText] = useState(false);

    // Split the description by \n to create an array of lines
    const lines = desc.split('\n');

    // Determine if we need to show "Read more"
    const shouldShowReadMore = lines.length > lineLimit;

    // Conditionally show either the full description or just the limited lines
    const displayedLines = showFullText ? lines : lines.slice(0, lineLimit);

    if (!desc) {
        return <></>
    }
    
    return (
        <div className="mb-3 bg-[#161328] rounded-2xl p-5">
            <h2 className="text-xl md:text-3xl font-bold mb-4">{isMovie ? 'Movie/Show Description' : 'Description'}</h2>
            <LineDraw />
            {!desc ? <h2>N/A</h2> : <>
                <div className="text-gray-300 mb-2 text-lg">
                    {displayedLines.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
                {shouldShowReadMore && !showFullText && (
                    <Link to="#" onClick={() => setShowFullText(true)} className="text-[#6DDCFF] font-semibold mt-3 text-lg">
                        Read more
                    </Link>
                )}
            </>}
        </div>
    );
}

export default DescriptionSection;
