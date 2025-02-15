import { Text, Timeline } from "@mantine/core";
import StoryImage from "../../assets/images/about-us-story.svg";
const StorySection = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 py-6 gap-7">
            <div className="flex flex-col justify-center items-start">
                <span className="text-start self-start font-bold text-4xl mb-6 md:mt-0 md:ml-0 mt-[-22px]" style={{ color: "#FFFFFF" }}>
                    Our Story
                </span>
                <Timeline active={3} bulletSize={24} lineWidth={2} color="#00FFFF">
                    <Timeline.Item
                        title={
                            <span className="font-bold text-4xl" style={{ color: "#FFFFFF" }}>
                                2025 and Beyond
                            </span>
                        }
                        bullet={<div className="w-6 h-6 bg[#00F0FB] rounded-full" />}
                    >
                        <hr className="w-full border-t-2 border-[#FFFFFF] my-4" style={{ color: "#FFFFFF" }} />
                        <Text className="font-normal text-xl" style={{ color: "#FFFFFF" }}>
                            Evolved into an Enterprise AI Solutions Hub with global market expansion.
                        </Text>
                    </Timeline.Item>

                    <Timeline.Item
                        title={
                            <span className="font-bold text-4xl" style={{ color: "#FFFFFF" }}>
                                October 2024 - January 2025
                            </span>
                        }
                        bullet={<div className="w-6 h-6 bg[#00F0FB] rounded-full" />}
                    >
                        <hr className="w-full border-t-2 border-[#FFFFFF] my-4" />
                        <Text className="font-normal text-xl" style={{ color: "#FFFFFF" }}>
                            Expanded with advanced AI features and live developer training.
                        </Text>
                    </Timeline.Item>
                    <Timeline.Item
                        title={
                            <span className="font-bold text-4xl" style={{ color: "#FFFFFF" }}>
                                March- September 2024
                            </span>
                        }
                        bullet={<div className="w-6 h-6 bg[#00F0FB] rounded-full" />}
                    >
                        <hr className="w-full border-t-2 border-[#FFFFFF] my-4" />
                        <Text className="font-normal text-xl" style={{ color: "#FFFFFF" }}>
                            Built the marketplace and "Ask Lusso" for personalized AI assistance.
                        </Text>
                    </Timeline.Item>

                    <Timeline.Item
                        title={
                            <span className="font-bold text-4xl" style={{ color: "#FFFFFF" }}>
                                January - March 2024
                            </span>
                        }
                        bullet={<div className="w-6 h-6 bg[#00F0FB] rounded-full" />}
                    >
                        <hr className="w-full border-t-2 border-[#FFFFFF] my-4" style={{ color: "#FFFFFF" }} />
                        <Text className="font-normal text-xl" style={{ color: "#FFFFFF" }}>
                            Lusso.ai launched, focusing on AI-powered content creation and marketing automation.
                        </Text>
                    </Timeline.Item>
                </Timeline>
            </div>
            <div className="flex flex-col justify-center gap-2">
                <img src={StoryImage} className="w-full h-auto max-w-4xl object-contain" />
            </div>
        </div>
    );
};

export default StorySection;
