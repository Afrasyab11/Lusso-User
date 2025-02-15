import React from 'react';
import kidsBackground from '../../assets/images/home/Kids.png'; // Import the SVG

const Kids: React.FC = () => {
    const pageStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: `url(${kidsBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        margin: 0,
        padding: 0,
    };

    const textStyle: React.CSSProperties = {
        fontSize: '125px',
        color: '#8D20F4',
        fontFamily: "'Margarine', cursive",
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    };

    const mobileTextStyle: React.CSSProperties = window.innerWidth <= 768 ? {
        fontSize: '48px', // Font size for mobile
    } : {};

    return (
        <div style={pageStyle}>
            <div style={{ ...textStyle, ...mobileTextStyle }}>
                Coming Soon
            </div>
        </div>
    );
};

export default Kids;
