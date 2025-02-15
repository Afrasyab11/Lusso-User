
interface TabsProps {
    active: string;
    tabs: { [key: string]: any };
    onChange?: (tab: any) => void;
    disabled?: boolean;
}

const Tabs = ({ active, tabs, onChange, disabled = false }: TabsProps) => {
    return (
        <div role="tablist" className="tabs tabs-bordered">
            {tabs.map((tab: { [key: string]: any }, index: number) => (
                <a
                    key={'tab_' + index}
                    role="tab"
                    className={`tab text-white  ${active === tab?.value ? 'tab-active' : ''}`}
                    onClick={() => !disabled && tab?.value !== active && onChange && onChange(tab?.value)}
                >
                    {tab?.label ?? tab?.value ?? ''}
                </a>
            ))}
        </div>
    );
};

export default Tabs;
