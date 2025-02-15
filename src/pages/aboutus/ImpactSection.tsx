const ImpactSection = () => {
    // Data array for impact metrics
    const impactData = [
        { value: "1.73k+", label: "Online Users" },
        { value: "1 M+", label: "Projected Users" },
        { value: "300M+", label: "Goal Achiever" },
        { value: "298k+", label: "Subscriptions" },
    ];

    return (
        <div>
            <div className="text-3xl md:text-4xl font-bold text-center">Our Impact in Numbers</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
                {impactData.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center aspect-square"
                        style={{
                            background: `linear-gradient(125.12deg, rgba(45, 36, 108, 0.9) 6.52%, rgba(22, 19, 43, 0.5) 30.66%, rgba(24, 20, 46, 0.5) 63.49%, rgba(37, 32, 74, 0.9) 78.95%)`,
                            border: `1px solid transparent`,
                            borderImageSource: `linear-gradient(177.73deg, #4300BD 6.78%, #792FFF 46.97%, #FF77B0 98.12%)`,
                            borderImageSlice: 1,
                        }}
                    >
                        <div className="flex flex-col items-center justify-center py-6">
                            <h2 className="font-bold text-4xl text-white">{item.value}</h2>
                            <span style={{ color: "#C1C1C1" }}>{item.label}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImpactSection;
