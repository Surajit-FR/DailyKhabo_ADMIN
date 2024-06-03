import { Link } from "react-router-dom";
import AddCategory from "../../components/core/categories/AddCategory";
import CategoryList from "../../components/core/categories/CategoryList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { CategoryListType } from "../../config/DataTypes.config";
import { deleteCategory, getAllCategory } from "../../services/slices/UtilitySlice";
import ConfModal from "../../util/ConfModal";
import { REACT_APP_CATEGORY_PER_PAGE } from "../../config/App.config";
import UpdateCategoryModal from "../../util/UpdateCategoryModal";
import { DecryptData } from "../../helper/EncryptDecrypt";
import { checkPermissions, permissionsToCheck } from "../../helper/CheckPermissions";

const Categories = (): JSX.Element => {
    const { category_data } = useSelector((state: any) => state.utilitySlice);
    const dispatch: any = useDispatch();

    const token: string | null = window.localStorage.getItem("token");
    const _TOKEN = JSON.parse(token ?? 'null');
    const user: string | null = window.localStorage.getItem("user");
    const userData = DecryptData(user ?? 'null');

    const header = useMemo(() => ({
        headers: {
            Authorization: `Bearer ${_TOKEN}`
        }
    }), [_TOKEN]);

    const [pageNumber, setPageNumber] = useState<number>(0);
    const [categoryID, setCategoryID] = useState<string>('');
    const [categoryData, setCategoryData] = useState<CategoryListType[]>([]);

    const dataPerPage = REACT_APP_CATEGORY_PER_PAGE;
    const pageCount = category_data?.totalPages;

    const changePage = ({ selected }: { selected: number }) => {
        setPageNumber(selected);
    };

    const handleDelete = () => {
        if (categoryData) {
            dispatch(deleteCategory({ category_id: categoryID, page: (pageNumber + 1), pageSize: dataPerPage, header }));
        }
    };

    const selectedCategory = useMemo(() => {
        return categoryData?.find(category => category?._id === categoryID);
    }, [categoryID, categoryData]);

    // permissionCheck
    const permissionCheckResult = checkPermissions(userData, permissionsToCheck);

    useEffect(() => {
        dispatch(getAllCategory({ page: (pageNumber + 1), pageSize: dataPerPage, header }));
    }, [dispatch, header, pageNumber, dataPerPage]);

    useEffect(() => {
        setCategoryData(category_data?.data);
    }, [category_data]);

    console.log(userData);


    return (
        <>
            {/* Update Modal */}
            <UpdateCategoryModal
                pageNumber={pageNumber}
                modalId="updateCategoryModal"
                dataPerPage={dataPerPage}
                header={header}
                categoryData={selectedCategory}
            />

            {/* Delete Modal */}
            <ConfModal
                modalId="deleteModal"
                modalHeading="Want To Delete The Category?"
                onDelete={handleDelete}
            />

            <main className="page-content">
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Product & Category</div>
                    <div className="ps-3">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0 p-0">
                                <li className="breadcrumb-item"><Link to="#"><i className="bx bx-home-alt"></i></Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Categories</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header py-3">
                        <h6 className="mb-0">Add Product Category</h6>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {
                                (permissionCheckResult?.write_create || permissionCheckResult?.all) &&
                                <AddCategory
                                    pageCount={pageCount}
                                    pageNumber={pageNumber}
                                    changePage={changePage}
                                />
                            }

                            <CategoryList
                                newData={categoryData}
                                pageCount={pageCount}
                                pageNumber={pageNumber}
                                changePage={changePage}
                                setCategoryID={id => setCategoryID(id)}
                                permissionCheckResult={permissionCheckResult}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Categories;