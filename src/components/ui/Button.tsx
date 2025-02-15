import React, { useId } from 'react';
import { cn } from '../../lib/utils';

interface IconProps {
    component: any;
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
    id?: string;
}

const Button: React.FC<ButtonProps> = ({
    label = '',
    disabled = false,
    isLoading = false,
    className = '',
    type = 'button',
    onClick = () => console.log('...clicked'),
    icon = {},
    id,
    children,
}) => {
    const btnId = useId()
    return type === 'submit' ? (
        <button
            id={id ?? btnId}
            type={type}
            className={cn(
                'flex items-center justify-center py-2 px-6 gap-2.5 rounded-3xl',
                className,
            )}
            disabled={isLoading || disabled} // Disable button when loading
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
            id={id ?? btnId}
            type="button"
            onClick={onClick}
            className={cn('text-white', className)}
            style={{ border: 'none', borderRadius: '50px' }}
            disabled={isLoading || disabled}
        >
            {children}
        </button>
    ) : (
        <button
            id={id ?? btnId}
            type={type}
            onClick={onClick}
            className={cn(
                'flex items-center justify-center py-2 px-6 gap-2.5 text-white',
                className,
            )}
            style={{ borderRadius: '50px' }}
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
