import { Link } from 'react-router-dom';
import { CategoryListType, PermissionCheckResult } from '../../../config/DataTypes.config';

type DataList_Props = {
    data: CategoryListType,
    setCategoryID: (id: string) => void,
    index: number,
    permissionCheckResult: PermissionCheckResult
}

const Category = ({ data, index, setCategoryID, permissionCheckResult }: DataList_Props): JSX.Element => {
    return (
        <tr>
            <td>{data?.categoryID}</td>
            <td>{data?.category_name}</td>
            <td>{data?.category_desc ? data?.category_desc : "N/A"}</td>
            <td>
                <div className="d-flex align-items-center gap-3 fs-6">
                    {
                        (permissionCheckResult?.edit_update || permissionCheckResult?.all) &&
                        <Link to="#" className="text-warning" data-bs-toggle="modal" data-bs-target="#updateCategoryModal" onClick={() => setCategoryID(data._id)}>
                            <i className="bi bi-pencil-fill"></i>
                        </Link>
                    }

                    {
                        (permissionCheckResult?.delete || permissionCheckResult?.all) &&
                        <Link to="#" className="text-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => setCategoryID(data._id)}>
                            <i className="bi bi-trash-fill"></i>
                        </Link>
                    }
                </div>
            </td>
        </tr>
    );
};

export default Category;