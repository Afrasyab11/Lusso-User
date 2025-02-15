import { useEffect, useState } from 'react';
import { ICON_ENUM } from '../../constants/icons.constant';
import { checkNullOrEmpty, typeDetector } from '../../utils/utils';
import { dynamicSort } from './gridActions';
import NoRecordFound from './NoRecordFound';

interface DataGridProps {
    columns: any;
    data: any;
    pagination?: boolean;
    recordPerPage?: number;
    gridTotalRecords?: number;
    onPageChnage?: (pageNumber: number) => void;
}

const Divider = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="2"
        viewBox="0 0 1077 2"
        fill="none"
    >
        <path opacity="0.2" d="M4.37222e-08 0.999906L1077 1" stroke="white" />
    </svg>
);

const DataGrid = ({
    columns = [],
    data = [],
    pagination = true,
    recordPerPage = 5,
    gridTotalRecords,
    onPageChnage,
}: DataGridProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortHistory, setSortHistory] = useState({});
    const [gridData, setGridData] = useState(data ?? []);

    const totalRecords = checkNullOrEmpty(gridTotalRecords) ? gridData.length : gridTotalRecords;
    const totalPages =
        Math.ceil(totalRecords / recordPerPage) < 1
            ? 1
            : Math.ceil(totalRecords / recordPerPage);
    const paginatedData = typeDetector(gridData) === 'array' ? gridData?.slice(
        (currentPage - 1) * recordPerPage,
        currentPage * recordPerPage,
    ) : [];

    useEffect(() => {
        let sortH: { [key: string]: boolean } = {};

        columns.forEach((column: any) => {
            if (column?.sorting && !checkNullOrEmpty(column?.target)) {
                sortH[column?.target] = true;
            }
        });
        setSortHistory(sortH);
    }, [data, recordPerPage, columns, pagination]);

    const handlePageChange = (page: number) => {
        if (page === 0) {
            setCurrentPage(currentPage - 1);

            if (onPageChnage) {
                onPageChnage(currentPage - 1)
            }
        } else if (page === -1) {
            setCurrentPage(currentPage + 1);

            if (onPageChnage) {
                onPageChnage(currentPage + 1)
            }
        } else if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);

            if (onPageChnage) {
                onPageChnage(page)
            }
        } else {
            return;
        }
    };

    const onSorting = (column: any): void => {
        const sortedData = gridData?.sort(
            dynamicSort(
                column?.target ?? '',
                sortHistory[column.target as keyof typeof sortHistory] ? 'asc' : 'desc',
            ),
        );
        setGridData(sortedData);
        setSortHistory({
            ...sortHistory,
            [column.target]: !sortHistory[column.target as keyof typeof sortHistory],
        });
    };

    return (
        <div className="">
            <div className="overflow-x-auto">
                <table className="table ">
                    {/* head */}
                    <thead className='text-white'>
                        <tr className='text-white'>
                            {columns?.map((column: any, index: number) => (
                                <th key={column?.header + '_' + index}>
                                    {column?.sorting ? (
                                        <button
                                            className="flex flex-nowrap justify-center items-center gap-2"
                                            onClick={() => onSorting(column)}
                                        >
                                            <span className="flex flex-wrap text-white text-base font-semibold">{column?.header}</span>
                                            <img src={ICON_ENUM?.SORTING?.icon} alt="SORTING" />
                                        </button>
                                    ) : (
                                        column?.header ?? ''
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData?.length === 0 ? (
                            <tr className='h-80'>
                                <td colSpan={columns?.length} className="text-center py-4">
                                    <NoRecordFound message="No data available"/>
                                </td>
                            </tr>
                        ) : (
                            paginatedData?.map((row: any, idx: number) => (
                                <tr key={'row' + idx}>
                                    {columns?.map((column: any, id: number) => (
                                        <td key={'data_' + idx + '_' + id} >
                                            {column?.cellRender ? (
                                                column?.cellRender(
                                                    row?.[column?.target] ?? '',
                                                    idx + 1,
                                                    row,
                                                )
                                            ) : (
                                                <div className="flex flex-start gap-3">
                                                    <p>
                                                        {row?.[column?.target] ?? ''}
                                                    </p>
                                                </div>

                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}

                    </tbody>
                    {/* <tfoot>

                </tfoot> */}
                </table>
            </div>
            {pagination && (
                // <tr>
                //     <td colSpan={columns?.length} className=" ">
                <div className="flex justify-between items-center px-5 py-3">
                    <p>{`Result ${Math.min(
                        (currentPage - 1) * recordPerPage + 1,
                        totalRecords,
                    )} - ${Math.min(currentPage * recordPerPage, totalRecords)} of ${totalRecords}`}</p>
                    <div className="flex space-x-0.5">
                        {/* Previous Button */}
                        <button
                            className={`btn border border-[#464070] bg-[#302B4E] rounded-l-lg p-3`}
                            disabled={currentPage <= 1}
                            onClick={() => handlePageChange(0)}
                        >
                            <img src={ICON_ENUM?.LESS_THAN?.icon ?? ''} alt="prev" />
                        </button>

                        {/* Dynamic Page Numbers */}
                        {Array.from({ length: 5 }, (_, i) => {
                            const pageNumber = currentPage <= 2 ? i + 1 : currentPage - 1 + i;
                            return pageNumber <= totalPages ? (
                                <button
                                    key={pageNumber}
                                    className={`btn border border-[#464070] bg-[#302B4E] p-auto ${currentPage === pageNumber ? 'text-[#ffff]' : 'text-[#C1C1C1]'
                                        }`}
                                    onClick={() => handlePageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            ) : null;
                        })}

                        {/* Next Button */}
                        <button
                            className={`btn border border-[#464070] bg-[#302B4E] rounded-r-lg p-3`}
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(-1)}
                        >
                            <img src={ICON_ENUM?.GREATER_THAN?.icon ?? ''} alt="next" />
                        </button>
                    </div>
                </div>

                // <div className="flex justify-between items-center overflow-x-auto">
                //     <p>{`Result ${Math.min(
                //         (currentPage - 1) * recordPerPage + 1,
                //         totalRecords,
                //     )} - ${Math.min(
                //         currentPage * recordPerPage,
                //         totalRecords,
                //     )} of ${totalRecords}`}</p>
                //     <div className="flex space-x-0.5">
                //         <button
                //             className={`btn border border-[#464070] bg-[#302B4E] rounded-l-lg p-3 `}
                //             disabled={currentPage <= 1}
                //             onClick={() => handlePageChange(0)}
                //         >
                //             <img src={ICON_ENUM?.LESS_THAN?.icon ?? ''} alt="prev" />
                //         </button>
                //         {Array.from({ length: totalPages }, (_, i) => (
                //             <>
                //                 <button
                //                     key={i + 1}
                //                     className={`btn border border-[#464070] bg-[#302B4E] p-auto ${currentPage === i + 1
                //                         ? 'text-[#ffff]'
                //                         : 'text-[#C1C1C1]'
                //                         }`}
                //                     onClick={() => handlePageChange(i + 1)}
                //                 >
                //                     {i + 1}
                //                 </button>
                //             </>
                //         ))}
                //         <button
                //             className={`btn border border-[#464070] bg-[#302B4E] rounded-r-lg p-3 `}
                //             disabled={currentPage === totalPages}
                //             onClick={() => handlePageChange(-1)}
                //         >
                //             <img
                //                 src={ICON_ENUM?.GREATER_THAN?.icon ?? ''}
                //                 alt="next"
                //             />
                //         </button>
                //     </div>
                // </div>
                //     </td>
                // </tr>
            )}
        </div >
    );
};

export default DataGrid;
