
export type PasswordFormData = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
};
export interface SettingDrawerProps<T = { [key: string]: any }> {
    opened: boolean;
    close: () => void;
    title: string;
    fields: Array<{
        label: string;
        name: string;
        onClick?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | ((val: string) => void);
        type?: string;
        value?: string;
        placeholder: string;
        className?: string;
        error?: any;
    }>;
    buttons: Array<{
        label: string;
        className: string;
        onClick?: () => void;

    }>;
    toastError?: string
}

export interface Field {
    label: string;
    name: string;
    type?: any | 'select';
    value?: string;
    placeholder?: string;
    onClick?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | ((val: string) => void);
    className?: string;
    options?: Array<{ label: string; value: string }>;
    error?: any;
    onChange?: any;
}

export interface ButtonConfig {
    disabled?: boolean;
    isLoading?: boolean;
    label: string;
    className: string;
    onClick?: () => void;
    style?: {};
}

export interface DrawerContentProps {
    title: string;
    fields: Field[];
    buttons: ButtonConfig[];
    toastError?: string;
}

