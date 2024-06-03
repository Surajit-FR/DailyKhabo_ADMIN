import { CategoryListType, CustomHeadersType } from "../config/DataTypes.config";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { categoryValidationSchema } from "../helper/FormValidation";
import CustomAlert from "./CustomAlert";
import { clearCatError, clearUpdateCategoryRespData, updateCategory } from "../services/slices/UtilitySlice";

interface ProductDetailsModalProps {
    modalId: string,
    categoryData: CategoryListType | undefined,
    pageNumber: number,
    dataPerPage: number,
    header: CustomHeadersType | undefined
}

const UpdateCategoryModal = ({ modalId, categoryData, pageNumber, dataPerPage, header }: ProductDetailsModalProps): JSX.Element => {
    const { update_category_resp_data, update_cat_error } = useSelector((state: any) => state.utilitySlice);
    const dispatch: any = useDispatch();

    // taking form values
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isValid, resetForm, setValues } = useFormik({
        initialValues: {
            category_name: "",
            category_desc: "",
        },
        validationSchema: categoryValidationSchema,
        onSubmit: (values) => {
            dispatch(updateCategory({ data: values, page: (pageNumber + 1), pageSize: dataPerPage, category_id: categoryData?._id, header }));
        }
    });

    // renderError func.
    const renderError = (error: any) => {
        if (typeof error === "string") {
            return <p className='text-danger m-1' style={{ fontSize: "11.5px" }}>*{error}</p>;
        }
        return null;
    };

    useEffect(() => {
        if (update_category_resp_data?.success) {
            resetForm();
        }
    }, [update_category_resp_data, resetForm]);

    useEffect(() => {
        if (categoryData) {
            setValues({
                category_name: categoryData?.category_name || "",
                category_desc: categoryData?.category_desc || "",
            });
        }
    }, [categoryData, setValues]);

    return (
        <>
            <div className="modal fade" id={modalId} tabIndex={-1} aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* Heading */}
                            <h4 className="modal-title">Update Category</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => dispatch(clearUpdateCategoryRespData())}></button>
                        </div>
                        <div className="modal-body">
                            <div className="col-12 col-lg-12 d-flex">
                                <div className="card border shadow-none w-100">
                                    <div className="card-body">

                                        {/* Alert */}
                                        {
                                            update_cat_error?.success === false ?
                                                <CustomAlert
                                                    type="danger"
                                                    message={update_cat_error?.message}
                                                    onClose={() => dispatch(clearCatError())}
                                                /> : update_category_resp_data?.success === true ?
                                                    <CustomAlert
                                                        type="success"
                                                        message={update_category_resp_data?.message}
                                                        onClose={() => dispatch(clearUpdateCategoryRespData())}
                                                    /> : null
                                        }

                                        <form className="row g-3" onSubmit={handleSubmit}>
                                            {/* Category Name */}
                                            <div className="col-12">
                                                <label className="form-label" htmlFor='CategoryName'>Category Name</label>
                                                <input
                                                    id="CategoryName"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Category name"
                                                    name="category_name"
                                                    value={values?.category_name || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    style={{ border: touched?.category_name && errors?.category_name ? "1px solid red" : "" }}
                                                />
                                            </div>
                                            {touched?.category_name && renderError(errors?.category_name)}

                                            {/* Category Description */}
                                            <div className="col-12">
                                                <label className="form-label" htmlFor='CategoryDescription'>Description (If any)</label>
                                                <textarea
                                                    id="CategoryDescription"
                                                    className="form-control"
                                                    rows={3}
                                                    cols={3}
                                                    name="category_desc"
                                                    placeholder="Category Description"
                                                    value={values?.category_desc || ""}
                                                    onChange={handleChange}
                                                ></textarea>
                                            </div>

                                            {/* Button */}
                                            <div className="col-12">
                                                <div className="d-grid">
                                                    <button
                                                        type='submit'
                                                        className="btn btn-primary"
                                                        disabled={!isValid}
                                                    >Update</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateCategoryModal;