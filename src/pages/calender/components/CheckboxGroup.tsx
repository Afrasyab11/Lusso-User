export const CheckboxGroup = ({ options, selected, onChange }: any) => (
    <div className="flex gap-4">
        {options.map((option: string) => (
            <div key={option} className="flex items-center FilderModalCheckbox">

                <input
                    type="checkbox"
                    checked={selected?.includes(option)}
                    onChange={(e) =>
                        onChange(
                            e.target.checked
                                ? [...(selected || []), option]
                                : selected.filter((item: any) => item !== option)
                        )
                    }
                    className="appearance-none h-6 w-6 border-2 border-white rounded-full bg-transparent"
                />
                <label htmlFor="" className='text-[1rem] ml-[0.6rem]'>{option}</label>

            </div>
        ))}
    </div>
);
