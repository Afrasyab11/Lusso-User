import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface EditModeContextType {
    isEditPage: boolean;
    toActiveProduct: boolean;
    setToActiveProduct: React.Dispatch<React.SetStateAction<boolean>>;
    locId?: string;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const isEditPage = location?.pathname?.includes("editproduct");
    const locId = location?.pathname?.split("/")?.pop();
    const [toActiveProduct, setToActiveProduct] = useState(isEditPage);

    useEffect(() => {
        setToActiveProduct(isEditPage);
    }, [isEditPage]);

    return (
        <EditModeContext.Provider value={{ isEditPage, toActiveProduct, setToActiveProduct, locId }}>
            {children}
        </EditModeContext.Provider>
    );
};


export const useEditMode = (): EditModeContextType => {
    const context = useContext(EditModeContext);
    if (!context) {
        throw new Error("useEditMode must be used within an EditModeProvider");
    }
    return context;
};
