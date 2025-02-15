import { Switch } from "@mantine/core";

const UserSwitchNotification = ({ switchStates, setSwitchStates }: { switchStates: any, setSwitchStates: any }) => {

    const handleSwitchChange = (index: number) => {
        const newSwitchStates = [...switchStates];
        newSwitchStates[index].checked = !newSwitchStates[index].checked;
        setSwitchStates(newSwitchStates);
    };
    return (
        <div className="card-bg-dev rounded-2xl md:px-8 md:py-6 opacity-70 text-white">
            <span>All NOTIFICATIONS</span>
            <div className="flex flex-col gap-6 mt-6 rounded-lg">
                {switchStates.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="text-[#FFFFFF] text-base font-normal">
                            {item.statement}
                        </div>

                        <Switch
                            checked={item.checked}
                            onChange={() => handleSwitchChange(index)}
                            styles={(theme) => ({
                                track: {
                                    background: item?.checked
                                        ? "linear-gradient(90deg, rgba(132, 35, 244, 0.2) 0%, rgba(255, 153, 239, 0.172) 100%)"
                                        : theme.colors.gray[4],
                                    borderRadius: '20px',
                                    border: 'none',
                                },
                                thumb: {
                                    background: item?.checked
                                        ? "linear-gradient(90deg, #8423F4 0%, rgba(255, 153, 239, 0.86) 100%)"
                                        : theme.colors.gray[6],
                                    borderRadius: '50%',
                                    transition: 'background 0.3s ease',
                                },
                            })}
                        />
                    </div>
                ))}
            </div>
        </div >
    )
}

export default UserSwitchNotification