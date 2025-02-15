
const Tooltip = ({ tooltipContent, children }: any) => {
    return (
        <>
            <div
                className="hidden hover:block absolute -top-8 left-0 bg-black text-white text-xs rounded px-2 py-1"
            >
                {tooltipContent ?? ''}
            </div>
            {children}
        </>
    )
}

export default Tooltip