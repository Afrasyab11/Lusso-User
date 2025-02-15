import { Mail, MapPin, Phone } from 'lucide-react';
import { LineDraw } from '../GameDetailsScreen';

const LetsConnectSection = ({ contactInfo }: any) => {
    return (
        <div className="mb-3 bg-[#161328] rounded-2xl p-5">
            <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
            <LineDraw />
            <div className="space-y-8">
                <div className="flex items-center gap-3">
                    <div className="bg-[#5721B9] p-2 rounded-full mr-3">
                        <Phone className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-md text-white font-bold">Phone</p>
                        <p className="text-md text-white font-semibold">{contactInfo.phone}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-[#5721B9] p-2 rounded-full mr-3">
                        <Mail className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-md text-white font-bold">Email</p>
                        <p className="text-md text-white font-semibold">{contactInfo.email}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-[#5721B9] p-2 rounded-full mr-3">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-md text-white font-bold">Address</p>
                        <p className="text-md text-white font-semibold">{contactInfo.address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LetsConnectSection