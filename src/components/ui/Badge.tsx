import { COLOR_ENUM } from '../../constants/colors.constant';
import { checkNullOrEmpty } from '../../utils/utils';
import HTMLContentRenderer from '../common/HTMLContentRenderer';

interface BadgeProps {
    value?: string;
    textColor?: string;
    rounded?: string;
    textColorEnumKey?: string;
    bgColorEnumKey?: string;
    bgColor?: string;
    children?: React.ReactNode;
}

const Badge = ({
    value = '',
    textColor = 'white',
    rounded = 'md',
    textColorEnumKey,
    bgColorEnumKey,
    bgColor,
    children,
}: BadgeProps) => {
    return (
        <span
            className={`inline-flex items-center rounded-${rounded} px-3 py-1 text-xs font-medium text-{${checkNullOrEmpty(textColorEnumKey)
                ? textColor
                : COLOR_ENUM[
                textColorEnumKey?.toUpperCase() as keyof typeof COLOR_ENUM
                ]
                }}`}
            style={{
                backgroundColor: checkNullOrEmpty(bgColor)
                    ? COLOR_ENUM[bgColorEnumKey?.toUpperCase() as keyof typeof COLOR_ENUM]
                    : bgColor,
            }}
        >
            {children ? children : <HTMLContentRenderer htmlContent={value ?? ''} />}
        </span>
    );
};

export default Badge;
