const Spinner = ({ spin = false, children }: { spin: boolean; children?: any }) => {
    return spin ? (
        // <div
        //     style={{
        //         position: 'absolute',
        //         // top: '50%',
        //         // left: '50%',
        //         // transform: 'translate(-50%, -50%)',
        //         zIndex: 1,
        //     }}
        // >
        //     <div className="loader"></div>
        // </div>
        <span className="loading loading-spinner text-primary" />
    ) : (
        children
    );
};

export default Spinner;
