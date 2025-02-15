
function PlatformInfo({ logo, price }: { logo: any, price: string }) {
    return (
        <div className="flex justify-between items-center bg-[#161328] p-4 rounded-lg mb-2">
            <div className="flex items-center">
                <img src="/api/placeholder/40/40" alt={logo} className="w-10 h-10 mr-2" />
                <div>
                    <p className="font-bold">{logo}</p>
                    <p className="text-sm text-gray-400">Violence,Bad Language</p>
                </div>
            </div>
            <div className="flex items-center">
                <span className="mr-4">{price}</span>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-full">Visit Now</button>
            </div>
        </div>
    )
}

export default PlatformInfo