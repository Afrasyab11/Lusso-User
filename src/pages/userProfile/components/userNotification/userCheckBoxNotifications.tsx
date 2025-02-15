import { Checkbox } from "@mantine/core";

const UserCheckBoxNotifications = ({ checkboxStates, setCheckboxStates }: { checkboxStates: any, setCheckboxStates: any }) => {




    const handleCheckboxChange = (index: any, checkboxNumber: any) => {
        const newCheckboxStates = [...checkboxStates];
        if (checkboxNumber === 1) {
            newCheckboxStates[index].checked1 = !newCheckboxStates[index].checked1;
        } else {
            newCheckboxStates[index].checked2 = !newCheckboxStates[index].checked2;
        }
        setCheckboxStates(newCheckboxStates);
    };
    return (
        <div className="card-bg-dev rounded-2xl md:px-8 md:py-6 opacity-70 text-white"
        // style={{
        //     border: "1px solid transparent",
        //     borderImage: "linear-gradient(90deg, #4B03CE 0%, #5899FF 52.5%, #00F0FB 100%) 1",
        //     padding: "10px",
        //     borderRadius: "18px"
        // }}
        >
            <div className="flex flex-col gap-6  rounded-lg">
                <div className="flex justify-end gap-4">
                    <div>
                        <span className="font-medium text-[#FFFFFF]">Email</span>
                    </div>
                    {/* <div>
                        <span className="font-medium text-[#FFFFFF]">In App</span>
                    </div> */}
                </div>
                {checkboxStates.map((item: any, index: any) => (
                    <div key={index} className="flex items-start gap-8">
                        <div className="text-[#FFFFFF] text-base font-normal flex-grow">
                            {item.statement}
                        </div>

                        <div className="flex gap-8 mr-4">
                            <Checkbox
                                checked={item.checked1}
                                onChange={() => handleCheckboxChange(index, 1)}
                                color="rgba(188, 89, 241, 1)"
                                styles={{
                                    root: {
                                        '&.mantine-Checkbox-root input:checked + .mantine-Checkbox-label': {
                                            background: 'linear-gradient(177.73deg, #4300BD -37.45%, #792FFF 29.89%, #FF77B0 115.59%)',
                                            borderRadius: '4px',
                                            padding: '4px',
                                        },
                                    },
                                }}
                            />

                            {/* <Checkbox
                                checked={item.checked2}
                                onChange={() => handleCheckboxChange(index, 2)}
                                color="rgba(188, 89, 241, 1)"
                            /> */}
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default UserCheckBoxNotifications