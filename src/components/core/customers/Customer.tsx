import { CustomerListType } from "../../../config/DataTypes.config";

type CustomerList_props = {
    item: CustomerListType
}

const Customer = ({ item }: CustomerList_props): JSX.Element => {
    // console.log(item);

    return (
        <>
            <tr>
                <td>1</td>
                <td>
                    <div className="d-flex align-items-center gap-3 cursor-pointer">
                        <img src="/assets/images/avatars/avatar-26.png" className="rounded-circle" width="44" height="44" alt="" />
                        <div className="">
                            <p className="mb-0">{item?.full_name}</p>
                        </div>
                    </div>
                </td>
                <td>89 Chicago UK</td>
                <td>Chicago</td>
                <td>8574201</td>
                <td>United Kingdom</td>
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