import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { getAllCustomers } from "../../services/slices/UtilitySlice";
import { CustomHeadersType, CustomerListType } from "../../config/DataTypes.config";
import Customer from "../../components/core/customers/Customer";
import Search from "../../components/common/Search";

type Customers_props = {
    header: CustomHeadersType | undefined
}

const Customers = ({ header }: Customers_props): JSX.Element => {
    const { customers_data } = useSelector((state: any) => state.utilitySlice);
    const dispatch: Dispatch<any> = useDispatch();

    const [customersData, setCustomersData] = useState<Array<CustomerListType>>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");

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
        dispatch(getAllCustomers({
            searchQuery: debouncedSearchQuery,
            header,
        }));
    }, [dispatch, debouncedSearchQuery, header]);


    useEffect(() => {
        setCustomersData(customers_data?.data);
    }, [customers_data]);


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
                                <li className="breadcrumb-item active" aria-current="page">Customer Tables</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                {/* <!--end breadcrumb--> */}

                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="mb-0">Customer Details</h5>
                            <Search
                                placeholder="Search Customer"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className="table-responsive mt-3">
                            <table className="table align-middle">
                                <thead className="table-secondary">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>City</th>
                                        <th>Pin Code</th>
                                        <th>Country</th>
                                        {/* <th>Actions</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        customersData?.length > 0 && customersData?.map((item, index) => {
                                            return (
                                                <Customer
                                                    key={index}
                                                    index={index}
                                                    item={item}
                                                />
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Customers;