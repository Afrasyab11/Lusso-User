import { useEffect, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { useEditMode } from "../../context/EditModeContext";
import { aiCategories, appCategories, courseCategories, gameCategories, movieTabGeners, serviceCategories } from "../../data/productData";
import DropDown from "../dropdown/DropDown";

interface ProductCatSelectTabProps {
    setCurrentStep: (step: number) => void;
    currentStep: number;
    setSelectedCategory: (option: string) => void;
    selectedCategory: string;
    getAllProducts?: any
}
const ProductCatSelectTab: React.FC<ProductCatSelectTabProps> = ({ setCurrentStep, currentStep, setSelectedCategory, selectedCategory, getAllProducts }) => {

    // --------------------- Handle Submission of data --------------------
    const context = useStateContext()
    const { isEditPage, toActiveProduct } = useEditMode();
    const [selectedSubCategory, setSelectedSubCategory] = useState("")

    const handleSelectCategory = (option: string) => {
        setSelectedCategory(option);
    };
    const handleSelectSubCategory = (option: string) => {
        setSelectedSubCategory(option);
    };

    const handleSubmission = () => {
        if (selectedSubCategory === "") {
            alert("Select Sub category First")
        } else {
            context?.setProductCategory(selectedCategory)
            context?.setProductSubCategory(selectedSubCategory)
            if (currentStep <= 5) {
                setCurrentStep(currentStep + 1)
            }
        }
    }

    // --------------------------------------------------------------------------------------------------------
    const [subCategories, setSubCategories] = useState<string[]>([]);
    useEffect(() => {
        if (!isEditPage) {
            const categories = selectedCategory === "App" ? appCategories :
                selectedCategory === "Game" ? gameCategories :
                    selectedCategory === "Movie" ? movieTabGeners :
                        selectedCategory === "Service" ? serviceCategories :
                            selectedCategory === "Course" ? courseCategories :
                                selectedCategory === "AI Products" ? aiCategories :
                                    ["No SubCategories Found"];

            setSubCategories(categories);

            if (categories?.length > 0 && categories[0] !== "No SubCategories Found") {
                setSelectedSubCategory(categories[0]);
            } else {
                setSelectedSubCategory("");
            }
        }
    }, [selectedCategory]);

    useEffect(() => {
        if (getAllProducts) {
            const { subCategory, category } = getAllProducts;

            if (category) {
                setSelectedCategory(category);

                const categories = category === "App" ? appCategories :
                    category === "Game" ? gameCategories :
                        category === "Movie" ? movieTabGeners :
                            category === "Service" ? serviceCategories :
                                category === "Course" ? courseCategories :
                                    category === "AI Products" ? aiCategories :
                                        ["No SubCategories Found"];

                setSubCategories(categories);

                if (categories?.includes(subCategory)) {
                    console.log({ categories, subCategory })
                    setSelectedSubCategory(subCategory);
                } else {
                    setSelectedSubCategory("");
                }
            }
        }
    }, [getAllProducts]);


    return (
        <div className='flex flex-col gap-10'>
            <div className='flex flex-col gap-10'>
                <div className='flex flex-col gap-6'>
                    <p className='font-semibold text-[#00FFFF] md-lt:text-[20px] lg:text-[26px]'>Product Category & Sub Category</p>
                    <div className={`flex flex-col w-full gap-12`}>
                        <div className='flex flex-col gap-3'>
                            <DropDown label="Product Category"
                                options={["App", "Game", "Movie", "Service", "Course", "AI Products"]}
                                value={selectedCategory}
                                onSelect={handleSelectCategory}
                                width="w-full"
                                // height="h-12"
                                padding="py-3 px-6"
                                customStyles="z-50"
                                dropdownId={1}
                                optionStyles="text-gray-300"
                                notAbsolute={true}
                                required={true}
                                noCustom
                            />
                        </div>
                        <div className={`flex flex-col gap-3`}>
                            <DropDown label="Product’s Sub  Category"
                                options={subCategories}
                                value={selectedSubCategory}
                                onSelect={handleSelectSubCategory}
                                width="w-full"
                                // height="h-12"
                                padding="py-3 px-6"
                                isSubcategory={true}
                                dropdownId={2}
                                optionStyles="text-gray-300"
                                notAbsolute={true}
                                required={true}
                                noCustom
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`border-[1px] border-white border-opacity-20 w-full rounded-full`} />
            <div className='flex items-center gap-10 justify-start'>
                <button onClick={() => {
                    setCurrentStep(currentStep - 1)
                }}
                    className="relative py-3 lg:px-0 md-lt:px-3 md-lt:w-[50%] md:w-[40%] lg:w-[30%] text-white md-lt:font-medium lg:font-bold md-lt:text-[12px] lg:text-[16px] rounded-full border-2 bg-transparent gradient-border border-t-[#4B03CE] border-b-[#F572B6] border-l-[#4B03CE] border-r-[#F572B6]"
                >
                    Back
                </button>
                <button onClick={handleSubmission} style={{
                    background:
                        'linear-gradient(180deg, #4B03CE 0%, #F572B6 80%)'
                }} className='py-3 lg:px-0 md-lt:px-3 md:w-[40%] md-lt:w-[50%] lg:w-[30%] text-white md-lt:font-medium lg:font-bold md-lt:text-[12px] lg:text-[16px] rounded-full'>
                    Save & Continue
                </button>
            </div>
        </div>
    )
}

export default ProductCatSelectTab