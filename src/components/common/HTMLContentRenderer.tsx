import React from 'react';

interface HTMLContentRendererProps {
    htmlContent: string;
}

const HTMLContentRenderer: React.FC<HTMLContentRendererProps> = ({ htmlContent }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
};

export default HTMLContentRenderer;