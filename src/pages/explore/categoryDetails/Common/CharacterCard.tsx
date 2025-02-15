import { useEffect, useRef } from 'react';
import { enableHorizontalScroll } from '../../../../lib/ScrollHelper';
import { LineDraw } from '../GameDetailsScreen';
import { Dialog, DialogContent, DialogTrigger } from "./UiDialouge";

function Characters({ characterData, title }: { characterData: string[] | any, title: string }) {

    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const cleanup = enableHorizontalScroll(scrollRef.current);

        return () => {
            if (cleanup) cleanup();
        };
    }, []);

    return (
        <div className="mb-3 bg-[#161328] rounded-2xl p-5">
            <h2 className="text-xl md:text-3xl font-bold mb-4 capitalize">{title ?? ''}</h2>
            <LineDraw />
            <div className="flex overflow-x-auto scrollbar-none space-x-4 pb-2" ref={scrollRef}>
                {characterData?.map((character: any, i: number) => (
                    <Dialog key={i}>
                        <DialogTrigger asChild className='w-[20rem]'>
                            <div className='flex flex-col'><img
                                src={character?.img ?? ''}
                                alt={`Character ${i + 1}`}
                                className="mb-2 w-[20rem] md:w-[12rem] h-[10rem] md:h-[10rem] 
                                object-cover cursor-pointer rounded-lg"
                            />
                                <h5 className="text-md md:text-lg font-bold mb-0">{character?.title ?? ''}</h5>
                                <p className='text-xs md:text-md'>{character?.subTitle ?? ''}</p>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-7xl">
                            <img src={character?.img ?? ''} alt={`Character ${i + 1}`} className="w-full max-h-[50vh] object-contain" />
                        </DialogContent>
                    </Dialog>
                ))}
            </div>

        </div>
    );
}

export default Characters;