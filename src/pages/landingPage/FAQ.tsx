import React, { useState } from 'react';

interface FAQItemProps {
    question: { [key: string]: string };
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-700">
            <button
                className="flex justify-between items-center w-full md:py-5 py-1 text-left text-white"
                onClick={onClick}
            >
                <span>{question?.question}</span>
                <span className="text-2xl">{isOpen ? '-' : '+'}</span>
            </button>
            {isOpen && (
                <div className="pb-5 text-gray-400">
                    {question?.answer}
                </div>
            )}
        </div>
    );
};

const FAQ: React.FC = () => {
    const questions: { [key: string]: string }[] = [
        {
            question: "How does your platform handle product promotion?",
            answer:
                "Our platform uses a custom AI model to generate promotional posts tailored to your product's specifics. The posts are automatically scheduled and published across multiple social media platforms. You can also take advantage of our built-in product boosting features to enhance visibility and engagement."
        },
        {
            question: "Can I track my product's performance?",
            answer:
                "Absolutely! Our platform provides detailed analytics, giving you real-time insights into your product's performance. You can track metrics such as views, clicks, likes, shares, and other engagement stats across all social platforms."
        },
        {
            question: "How can I integrate my listings with other platforms?",
            answer:
                "Our platform offers seamless integration with various social media and e-commerce platforms. With just a few clicks, you can sync your product listings, ensuring consistency and wide reach across multiple channels."
        },
        {
            question: "How can I contact customer support?",
            answer:
                "You can reach our customer support via email, or through a support ticket directly from your account dashboard. Our team is available 24/7 to assist you with any inquiries or issues."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index); // Toggle FAQ open/close
    };

    return (
        <div className="text-white h-full md:py-24 py-5 items-center">
            <h2 className="text-[18px] md:text-4xl font-bold md:mb-12 mb-4 md:mt-0 mt-1 text-center">
                FREQUENTLY ASKED QUESTIONS
            </h2>
            <div className="lg:max-w-3xl px-3 mx-auto">
                {questions.map((question, index) => (
                    <FAQItem
                        key={index}
                        question={question}
                        isOpen={openIndex === index}
                        onClick={() => handleToggle(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default FAQ;
