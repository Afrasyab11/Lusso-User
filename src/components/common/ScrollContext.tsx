import React, { ReactNode, createContext, useContext, useRef } from 'react';

// Define the types for the context
interface ScrollContextType {
    refs: {
        apps: React.RefObject<HTMLDivElement>;
        games: React.RefObject<HTMLDivElement>;
        movies: React.RefObject<HTMLDivElement>;
        courses: React.RefObject<HTMLDivElement>;
        services: React.RefObject<HTMLDivElement>;
    };
    scrollToSection: (section: keyof ScrollContextType['refs']) => void;
}

// Create the context with an initial value of null
const ScrollContext = createContext<ScrollContextType | null>(null);

// Custom hook to use the ScrollContext
export const useScroll = () => {
    const context = useContext(ScrollContext);
    if (!context) {
        throw new Error('useScroll must be used within a ScrollProvider');
    }
    return context;
};

// Provider component to wrap the application
interface ScrollProviderProps {
    children: ReactNode;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
    // Create refs for each section
    const refs = {
        apps: useRef<HTMLDivElement>(null),
        games: useRef<HTMLDivElement>(null),
        movies: useRef<HTMLDivElement>(null),
        courses: useRef<HTMLDivElement>(null),
        services: useRef<HTMLDivElement>(null),
    };

    // Function to scroll to the specified section
    const scrollToSection = (section: keyof ScrollContextType['refs']) => {
        refs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <ScrollContext.Provider value={{ refs, scrollToSection }}>
            {children}
        </ScrollContext.Provider>
    );
};
