import { CustomerListType } from "../../../config/DataTypes.config";

type CustomerList_props = {
    item: CustomerListType;
    index: number
}

const Customer = ({ item, index }: CustomerList_props): JSX.Element => {
    const customer_address = item?.address?.filter(addr => addr?.primary === true);

    return (
        <>
            <tr>
                <td>{index + 1}</td>
                <td>
                    <div className="d-flex align-items-center gap-3 cursor-pointer">
                        <img src="/assets/images/avatars/avatar-26.png" className="rounded-circle" width="44" height="44" alt="" />
                        <div className="">
                            <p className="mb-0">{item?.full_name}</p>
                        </div>
                    </div>
                </td>
                <td>{customer_address[0]?.address ? customer_address[0]?.address : "--"}</td>
                <td>{customer_address[0]?.city ? customer_address[0]?.city : "--"}</td>
                <td>{customer_address[0]?.postalCode ? customer_address[0]?.postalCode : "--"}</td>
                <td>{customer_address[0]?.country ? customer_address[0]?.country : "--"}</td>
                {/* <td>
                    <div className="table-actions d-flex align-items-center gap-3 fs-6">
                        <Link to="#" className="text-primary" data-bs-toggle="tooltip" data-bs-placement="bottom"
                            title="Views"><i className="bi bi-eye-fill"></i></Link>
                        <Link to="#" className="text-warning" data-bs-toggle="tooltip" data-bs-placement="bottom"
                            title="Edit"><i className="bi bi-pencil-fill"></i></Link>
                        <Link to="#" className="text-danger" data-bs-toggle="tooltip" data-bs-placement="bottom"
                            title="Delete"><i className="bi bi-trash-fill"></i></Link>
                    </div>
                </td> */}
            </tr>
        </>
    );
};

export default Customer;