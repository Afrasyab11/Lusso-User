// LoadingSpinner.tsx

import React from 'react';

const LoadingSpinner: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
    if (!isVisible) return null; // Return null if the spinner is not visible

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{
                background: 'linear-gradient(45deg, rgba(66, 153, 225, 1), rgba(164, 203, 255, 1))',
            }}
        >
            <div className="loader border-t-4 border-b-4 border-white rounded-full w-12 h-12 animate-spin"></div>
        </div>
    );
};

export default LoadingSpinner;
