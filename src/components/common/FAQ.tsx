import React, { useState } from 'react';

interface FAQItemProps {
    question: string;
    answer: string;
}

interface FAQProps {
    questions: FAQItemProps[];
}

const FAQItem: React.FC<{
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}> = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-700">
            <button
                className="flex justify-between items-center w-full py-3 text-left text-white"
                onClick={onClick}
            >
                <span>{question ?? ''}</span>
                <span className="text-2xl">{isOpen ? '-' : '+'}</span>
            </button>
            {isOpen && (
                <div className="pb-5 text-gray-400">
                    {answer ?? ''}
                </div>
            )}
        </div>
    );
};

const FAQ: React.FC<FAQProps> = ({ questions }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null); // Track which FAQ is open

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index); // Toggle FAQ, close if already open
    };

    return (
        <div className="text-white h-full py-10">
            <h2 className="lg:text-4xl font-bold text-center lg:text-start mb-5 md:mb-0">
                FREQUENTLY ASKED QUESTIONS
            </h2>
            <div className="w-full mx-auto">
                {questions.map((question: FAQItemProps, index: number) => (
                    <FAQItem
                        key={index}
                        question={question.question}
                        answer={question.answer}
                        isOpen={openIndex === index} // Open if it's the active FAQ
                        onClick={() => handleToggle(index)} // Handle click to toggle the FAQ
                    />
                ))}
            </div>
        </div>
    );
};

export default FAQ;
