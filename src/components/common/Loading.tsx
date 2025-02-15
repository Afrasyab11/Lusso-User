const Loading = ({ className }: { className?: string }) => {
    return (
        <div className={'flex justify-center items-center ' + className}>
            <span className="loading loading-spinner text-primary" />
        </div>
    );
};

export default Loading;
