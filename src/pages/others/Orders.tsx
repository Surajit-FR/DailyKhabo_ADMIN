import { Link } from "react-router-dom"
import { CustomHeadersType, ProductOrderListType } from "../../config/DataTypes.config";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { useEffect, useState } from "react";
import { getAllOrders } from "../../services/slices/UtilitySlice";
import Order from "../../components/core/orders/Order";
import { REACT_APP_ORDER_PER_PAGE } from "../../config/App.config";
import Search from "../../components/common/Search";
import Pagination from "../../util/Pagination";

type Orders_props = {
    header: CustomHeadersType | undefined
}

const Orders = ({ header }: Orders_props): JSX.Element => {
    const { orders_data } = useSelector((state: any) => state.utilitySlice);
    const dispatch: Dispatch<any> = useDispatch();

    const [ordersData, setOrdersData] = useState<Array<ProductOrderListType>>([]);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");

    // Pagination
    const dataPerPage = REACT_APP_ORDER_PER_PAGE;
    const pageCount = orders_data?.totalPages;


    const changePage = ({ selected }: { selected: number }) => {
        setPageNumber(selected);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Debounce logic for search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 600);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    useEffect(() => {
        dispatch(getAllOrders({
            page: (pageNumber + 1),
            pageSize: dataPerPage,
            searchQuery: debouncedSearchQuery,
            header
        }));
    }, [dispatch, dataPerPage, header, pageNumber, debouncedSearchQuery]);

    useEffect(() => {
        setOrdersData(orders_data?.data);
    }, [orders_data]);

    return (
        <>
            <main className="page-content">
                {/* <!--breadcrumb--> */}
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Tables</div>
                    <div className="ps-3">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0 p-0">
                                <li className="breadcrumb-item"><Link to="/dashboard"><i className="bx bx-home-alt"></i></Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Order Tables</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                {/* <!--end breadcrumb--> */}

                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="mb-0">Order Table</h5>
                            <Search
                                placeholder="Search Orders"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className="table-responsive mt-3">
                            <table className="table align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Product</th>
                                        <th>Photo</th>
                                        <th>Product ID</th>
                                        <th>Status</th>
                                        <th>Amount</th>
                                        <th>Date & Time</th>
                                        <th>Shipping</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        ordersData?.length > 0 && ordersData?.map((item, index) => {
                                            return (
                                                <Order
                                                    key={index}
                                                    item={item}
                                                />
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                        <nav className="float-end mt-4" aria-label="Page navigation">
                            {/* Pagination */}
                            <Pagination
                                pageCount={pageCount}
                                pageNumber={pageNumber}
                                changePage={changePage}
                            />
                        </nav>

                    </div>
                </div>
            </main>
        </>
    );
};

export default Orders;