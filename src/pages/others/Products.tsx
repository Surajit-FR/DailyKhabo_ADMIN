import { Link } from "react-router-dom";
import Pagination from "../../util/Pagination";
import { useEffect, useMemo, useState } from "react";
import Product from "../../components/core/products/Product";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { clearDelError, clearProductDelResp, deleteProduct, getAllCategory, getAllProduct } from "../../services/slices/UtilitySlice";
import { CategoryListType, ProductResponse } from "../../config/DataTypes.config";
import { REACT_APP_PRODUCT_PER_PAGE } from "../../config/App.config";
import Search from "../../components/common/Search";
import ConfModal from "../../util/ConfModal";
import CustomAlert from "../../util/CustomAlert";
import ProductDetailsModal from "../../util/ProductDetailsModal";
import UpdateProductModal from "../../util/UpdateProductModal";
import { DecryptData } from "../../helper/EncryptDecrypt";
import { checkPermissions, permissionsToCheck } from "../../helper/CheckPermissions";

const Products = (): JSX.Element => {
    const { products_data, category_data, del_error, product_del_resp } = useSelector((state: any) => state.utilitySlice);
    const dispatch: Dispatch<any> = useDispatch();

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
    const [productData, setProductData] = useState<ProductResponse[]>([]);
    const [categoryData, setCategoryData] = useState<CategoryListType[]>([]);
    const [productID, setProductID] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    // Pagination
    const dataPerPage = REACT_APP_PRODUCT_PER_PAGE;
    const pageCount = products_data?.totalPages;

    const changePage = ({ selected }: { selected: number }) => {
        setPageNumber(selected);
    };

    const handleDelete = () => {
        if (categoryData) {
            dispatch(deleteProduct({
                product_id: productID,
                page: (pageNumber + 1),
                pageSize: dataPerPage,
                search: debouncedSearchQuery,
                category: selectedCategory,
                header
            }));
        };
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    // permissionCheck
    const permissionCheckResult = checkPermissions(userData, permissionsToCheck);

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
        dispatch(getAllProduct({
            page: (pageNumber + 1),
            pageSize: dataPerPage,
            search: debouncedSearchQuery,
            category: selectedCategory,
            header
        }));
        dispatch(getAllCategory({ page: (pageNumber + 1), pageSize: dataPerPage, header }));
    }, [dispatch, dataPerPage, header, pageNumber, debouncedSearchQuery, selectedCategory]);

    useEffect(() => {
        setProductData(products_data?.data);
        setCategoryData(category_data?.data);
    }, [products_data, category_data]);


    return (
        <>
            {/* Product Details Modal */}
            <UpdateProductModal
                modalId="updateProductModal"
                pageNumber={pageNumber}
                dataPerPage={dataPerPage}
                debouncedSearchQuery={debouncedSearchQuery}
                selectedCategory={selectedCategory}
                header={header}
            />

            {/* Delete Modal */}
            <ConfModal
                modalId="deleteModal"
                modalHeading="Want To Delete The Product?"
                onDelete={handleDelete}
            />

            {/* Product Details Modal */}
            <ProductDetailsModal
                modalId="productDetails"
                productID={productID}
                header={header}
            />

            {/* <!--content--> */}
            <main className="page-content">

                {/* <!--breadcrumb--> */}
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Product & Category</div>
                    <div className="ps-3">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0 p-0">
                                <li className="breadcrumb-item"><Link to="#"><i className="bx bx-home-alt"></i></Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Products</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-lg-3 col-xl-2">
                                {
                                    (permissionCheckResult?.write_create || permissionCheckResult?.all) &&
                                    <Link to="/add/product" className="btn btn-primary mb-3 mb-lg-0">
                                        <i className="lni lni-plus me-2">
                                        </i>Add Product
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header py-3">
                        <div className="row g-3 align-items-center">

                            {/* Search Products */}
                            <div className="col-lg-3 col-md-6 me-auto">
                                <Search
                                    placeholder="Search Products"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>

                            {/* Filter dropdown */}
                            <div className="col-lg-2 col-6 col-md-3">
                                <select className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
                                    <option value="">All categories</option>
                                    {categoryData && categoryData?.map((item) => {
                                        return (
                                            <option key={item?.categoryID} value={item?._id}>{item?.category_name}</option>
                                        )
                                    })}
                                </select>
                            </div>

                        </div>
                    </div>

                    {/* Alert */}
                    <div className="row d-flex justify-content-center mt-2">
                        <div className="col-4">
                            {
                                del_error?.success === false ?
                                    <CustomAlert
                                        type="danger"
                                        message={del_error?.message}
                                        onClose={() => dispatch(clearDelError())}
                                    /> : product_del_resp?.success === true ?
                                        <CustomAlert
                                            type="success"
                                            message={product_del_resp?.message}
                                            onClose={() => dispatch(clearProductDelResp())}
                                        /> : null
                            }
                        </div>
                    </div>

                    {/* Products */}
                    <div className="card-body">
                        <div className="product-grid">
                            <div className="row row-cols-1 row-cols-lg-4 row-cols-xl-4 row-cols-xxl-5 g-3">

                                {/* Product */}
                                {productData && productData?.map((item) => {
                                    return (
                                        <Product
                                            key={item?._id}
                                            data={item}
                                            setProductID={id => setProductID(id)}
                                            header={header}
                                            userData={userData}
                                        />
                                    )
                                })}

                            </div>
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

export default Products;