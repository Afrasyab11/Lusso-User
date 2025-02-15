import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import down_arrow_icon from '../../assets/images/icons/arrow-down.svg';
import DataGrid from '../../components/dataGrid/DataGrid';
import Search from '../../components/search/Search';
import Badge from '../../components/ui/Badge';
import { ICON_ENUM } from '../../constants/icons.constant';
import { getCookies } from '../../utils/utils';
import NewFilterComps from '../calender/components/NewFilterComps';
import './dev.scss';

const ProductList = () => {
    const navigate = useNavigate();
    const initialFilters = {
        appName: '',
        status: [],
        visitors: { min: 0, max: 3000 },
        likes: { min: 0, max: 3000 }
    };

    const [isLoading, setIsLoading] = useState(false);
    const [gridCurrentPage, setGridCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [gridData, setGridData] = useState<{ [key: string]: any }>({});
    const [originalData, setOriginalData] = useState<{ [key: string]: any }>({});
    const columns = [
        {
            header: 'App Name',
            target: 'name',
            sorting: true,
        },
        {
            header: 'Visitors',
            target: 'visitors',
            sorting: true,
        },
        {
            header: 'Likes',
            target: 'likes',
            sorting: true,
        },
        {
            header: 'Avg Rating',
            target: 'rating',
            sorting: true,
        },

        {
            header: 'Last Update',
            target: 'createdOn',
            sorting: true,
            cellRender: (value: string) => (
                <div className="text-start flex justify-start">
                    {format(parseISO(value), 'dd/MM/yyyy')}
                </div>
            ),
        },
        {
            header: 'Status',
            target: 'status',
            sorting: true,
            cellRender: (value: string) => (
                <div className="flex justify-start">
                    <Badge value={value} bgColorEnumKey={value} />
                </div>
            ),
        },
        {
            header: 'Action',
            sorting: true,
            cellRender: (value: any, rowIndex: number, rowData: any) => (
                <div className="flex justify-start gap-3">
                    <img
                        src={ICON_ENUM?.EYE?.icon ?? ''}
                        width={20}
                        alt="View"
                        className="cursor-pointer"
                        onClick={() => navigate(
                            `/dev/preview/${rowData?.category
                                ?.toLowerCase()
                                ?.replaceAll(' ', '_')}/${rowData?.productId}`,
                        )}
                    />
                    <img
                        src={ICON_ENUM?.EDIT?.icon ?? ''}
                        className="cursor-pointer"
                        width={20}
                        alt="Edit"
                        onClick={() => handleEdit(rowData)}
                    />
                </div>
            ),
        },
    ];
    const handleEdit = (id: any) => {
        navigate(`/dev/editproduct/${id?.productId}`);
    };
    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            let token = getCookies('authToken');
            const response = await axios.get(
                'https://api.lusso.dev/api/v1/products',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        page: gridCurrentPage > 0 ? gridCurrentPage - 1 : gridCurrentPage,
                        size: pageSize,
                        status: "",
                        category: '',
                        subCategory: '',
                        searchValue: "",
                        sortBy: ""
                    },
                },
            );
            setGridData(response?.data || {});
            setOriginalData(response?.data || {});
            console.log("products", response?.data)
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [gridCurrentPage]);

    const handleSearch = (data: any, query: string) => {
        if (query === '') {
            setGridData(gridData);
        } else {
            const filteredData = data.filter((item: any) => {
                let obj = JSON.stringify(item).toLowerCase();
                return obj.includes(query.toLowerCase());
            });
            setGridData({ recordsFiltered: filteredData.length, products: filteredData });
        }
    };

    const handleApplyFilters = (filters: any) => {
        setIsLoading(true);
        const filteredData = originalData?.products?.filter((item: any) => {
            const matchesAppName = filters.appName
                ? item.name.toLowerCase().includes(filters.appName.toLowerCase())
                : true;
            const matchesStatus = filters.status?.length
                ? filters.status.includes(item.status)
                : true;
            const matchesVisitors = filters.visitors
                ? item.visitors >= filters.visitors.min &&
                item.visitors <= filters.visitors.max
                : true;
            const matchesLikes = filters.likes
                ? item.likes >= filters.likes.min &&
                item.likes <= filters.likes.max
                : true;

            return matchesAppName && matchesStatus && matchesVisitors && matchesLikes;
        });

        setGridData({ recordsFiltered: filteredData?.length, products: filteredData });
        setTimeout(() => {
            setIsLoading(false);
        }, 4000);
    };


    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
            }}
        >
            <div>

                <div className="flex justify-between text-white text-[20px] flex-wrap gap-3">
                    <div className="text-center self-middle">
                        <span className="text-sm md:text-base lg:text-2xl font-medium text-center">
                            Product
                        </span>
                    </div>
                    <div className="flex justify-between items-center gap-14 flex-wrap">

                        <NewFilterComps
                            filters={initialFilters}
                            onApplyFilters={handleApplyFilters}
                        />

                        <Search data={gridData?.products ?? []} onSearch={handleSearch} />
                        <button
                            className="flex items-center border border-0 text-white btn bg-[#792FFF80] gap-2 py-1 px-2 rounded-lg"
                            onClick={() => {
                                navigate('/dev/addproduct');
                            }}
                        >
                            <span className="md:text-base font-medium">+ Add Product</span>
                            <span
                                className="flex items-center px-2 h-full"
                                style={{
                                    borderLeft: `1px solid #FFFFFF99`,
                                }}
                            >
                                <img src={down_arrow_icon} alt="dn-icon" className="h-5 w-3" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="card-bg-dev rounded-xl text-white">
                {isLoading ? (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                    </div>
                ) : (
                    <DataGrid
                        columns={columns}
                        data={gridData?.products ?? []}
                        recordPerPage={pageSize}
                        gridTotalRecords={gridData?.recordsFiltered}
                        key={gridData?.length + '_' + isLoading}
                        onPageChnage={setGridCurrentPage}
                    />
                )}

            </div>
        </div>
    );
};

export default ProductList;
