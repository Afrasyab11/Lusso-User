import React, { useId } from 'react';

interface DrawerProps {
    children?: React.ReactNode;
    closeId: string;
    className?: string;
    handler: any;
}

const DrawerRtL = ({ handler, closeId, children, className }: DrawerProps) => {
    const compId = useId();

    const wrapCloseIdElement = (child: React.ReactNode): React.ReactNode => {
        if (React.isValidElement(child)) {
            const hasCloseId = child.props.id === closeId;

            if (hasCloseId) {
                return <label htmlFor={`drawer-${compId}`}>{child}</label>;
            }

            if (child.props.children) {
                return React.cloneElement(child as React.ReactElement<any>, {
                    children: React.Children.map(
                        child.props.children,
                        wrapCloseIdElement,
                    ),
                });
            }
        }
        return child;
    };

    const modifiedChildren = React.Children.map(children, wrapCloseIdElement);

    return (
        <div className={'drawer drawer-end ' + className}>
            <input
                id={'drawer-' + compId}
                type="checkbox"
                className="drawer-toggle"
            />
            <div className="drawer-content sdd">
                <label
                    htmlFor={'drawer-' + compId}
                    className="flex items-center swap swap-rotate mt-1"
                >
                    <input type="checkbox" />
                    {handler}
                </label>
            </div>

            <div className="drawer-side" style={{ zIndex: '100' }}>
                <label
                    htmlFor={'drawer-' + compId}
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div className="flex justify-end"></div>
                {modifiedChildren}
            </div>
        </div>
    );
};

export default DrawerRtL;
