import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { getAllCustomers } from "../../services/slices/UtilitySlice";
import { CustomHeadersType, CustomerListType } from "../../config/DataTypes.config";
import Customer from "../../components/core/customers/Customer";

type Customers_props = {
    header: CustomHeadersType | undefined
}

const Customers = ({ header }: Customers_props): JSX.Element => {
    const { customers_data } = useSelector((state: any) => state.utilitySlice);
    const dispatch: Dispatch<any> = useDispatch();

    const [customersData, setCustomersData] = useState<Array<CustomerListType>>([]);

    useEffect(() => {
        dispatch(getAllCustomers({ header }));
    }, [dispatch, header]);


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
                            <form className="ms-auto position-relative">
                                <div className="position-absolute top-50 translate-middle-y search-icon px-3"><i className="bi bi-search"></i>
                                </div>
                                <input className="form-control ps-5" type="text" placeholder="search" />
                            </form>
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