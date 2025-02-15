import React from 'react';
import { cn } from '../../lib/utils';

interface IconProps {
    component: React.ReactNode;
    position: 'start' | 'end';
}

interface ButtonProps {
    label?: string;
    disabled?: boolean;
    isLoading?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset' | 'custom';
    onClick?: () => void;
    icon?: IconProps;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
    label = '',
    disabled = false,
    isLoading = false,
    className = '',
    type = 'button',
    onClick = () => console.log('...clicked'),
    icon = {},
    children,
    style = {},
}) => {
    const baseClasses = 'flex items-center justify-center py-2 px-6 gap-2.5 rounded-3xl';

    return type === 'submit' ? (
        <button
            type={type}
            className={cn(baseClasses, className)}
            style={style}
            disabled={isLoading || disabled}
        >
            {isLoading && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1,
                    }}
                >
                    <div className="loader"></div>
                </div>
            )}
            {icon?.position === 'start' && icon?.component}
            {!isLoading ? label : ''}
            {icon?.position === 'end' && icon?.component}
        </button>
    ) : type === 'custom' ? (
        <button
            type="button"
            onClick={onClick}
            className={cn('text-white', className)}
            style={{ border: 'none', borderRadius: '50px', ...style }}
            disabled={isLoading || disabled}
        >
            {children}
        </button>
    ) : (
        <button
            type={type}
            onClick={onClick}
            className={cn(baseClasses, 'text-white', className)}
            style={style}
            disabled={isLoading || disabled}
        >
            {isLoading && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1,
                    }}
                >
                    <div className="loader"></div>
                </div>
            )}
            {icon?.position === 'start' && icon?.component}
            {!isLoading ? label : ''}
            {icon?.position === 'end' && icon?.component}
        </button>
    );
};

export default Button;
