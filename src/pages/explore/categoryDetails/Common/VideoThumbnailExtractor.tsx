import { useEffect, useState } from 'react';
import { generateVideoThumbnail } from '../../../../hooks/common.utils';

export const VideoThumbnailExtractor = ({ videoUrl }: { videoUrl: string }) => {
    const [thumbnail, setThumbnail] = useState<any>(null);

    useEffect(() => {
        const extractThumbnail = async () => {
            try {
                const thumbnailUrl = await generateVideoThumbnail(videoUrl);
                setThumbnail(thumbnailUrl);
            } catch (error) {
                console.error('Error generating thumbnail:', error);
            }
        };

        extractThumbnail();
    }, [videoUrl]);

    return (
        <>
            {thumbnail ? (
                <img src={thumbnail} alt="Video thumbnail" className="w-[30rem] h-[15rem] object-cover" />
            ) : (
                <p>Loading thumbnail...</p>
            )}
        </>
    );
};
