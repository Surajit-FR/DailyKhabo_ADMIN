import { useDispatch, useSelector } from 'react-redux';
import { CategoryListType, PermissionCheckResult } from '../../../config/DataTypes.config';
import Pagination from '../../../util/Pagination';
import Category from './Category';
import CustomAlert from '../../../util/CustomAlert';
import { clearCategoryDelResp, clearDelError } from '../../../services/slices/UtilitySlice';
import { Dispatch } from 'redux';

type categoryList_props = {
    newData: Array<CategoryListType> | undefined,
    pageCount: number,
    pageNumber: number,
    changePage: (data: { selected: number }) => void,
    setCategoryID: (id: string) => void,
    permissionCheckResult: PermissionCheckResult,
}

const CategoryList = ({ newData, pageCount, pageNumber, changePage, setCategoryID, permissionCheckResult }: categoryList_props): JSX.Element => {
    const { category_del_resp, del_error } = useSelector((state: any) => state.utilitySlice);
    const dispatch: Dispatch<any> = useDispatch();

    return (
        <>

            <div className="col-12 col-lg-8 d-flex">
                <div className="card border shadow-none w-100">
                    <div className="card-body">
                        {/* Alert */}
                        {del_error?.success === false ? <CustomAlert type="danger" message={del_error?.message} onClose={() => dispatch(clearDelError())} /> : null}
                        {category_del_resp?.success === true ? <CustomAlert type="success" message={category_del_resp?.message} onClose={() => dispatch(clearCategoryDelResp())} /> : null}
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newData?.map((item, index) => (
                                        <Category
                                            index={index}
                                            key={item?._id}
                                            data={item}
                                            setCategoryID={setCategoryID}
                                            permissionCheckResult={permissionCheckResult}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <nav className="float-end mt-0" aria-label="Page navigation">
                            <Pagination
                                pageNumber={pageNumber}
                                pageCount={pageCount}
                                changePage={changePage}
                            />
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryList;
