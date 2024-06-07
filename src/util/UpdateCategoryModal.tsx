import { CategoryListType, CustomHeadersType } from "../config/DataTypes.config";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { categoryValidationSchema } from "../helper/FormValidation";
import CustomAlert from "./CustomAlert";
import { clearCatError, clearUpdateCategoryRespData, updateCategory } from "../services/slices/UtilitySlice";
import { REACT_APP_BASE_URL } from "../config/App.config";

interface CategoryDetailsModal_props {
    modalId: string,
    categoryData: CategoryListType | undefined,
    pageNumber: number,
    dataPerPage: number,
    header: CustomHeadersType | undefined
}

const UpdateCategoryModal = ({ modalId, categoryData, pageNumber, dataPerPage, header }: CategoryDetailsModal_props): JSX.Element => {
    const { update_category_resp_data, update_cat_error } = useSelector((state: any) => state.utilitySlice);
    const dispatch: any = useDispatch();

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const getImagUrl = (url: string): string => {
        const subStr = "blob:";
        if (!url.includes(subStr)) {
            const imgUrl = `${REACT_APP_BASE_URL}${url}`;
            return imgUrl;
        }
        return url;
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isValid, resetForm, setValues, setFieldValue } = useFormik({
        initialValues: {
            category_name: "",
            categoryImage: null as string | File | null,
            category_desc: "",
        },
        validationSchema: categoryValidationSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append("category_name", values.category_name);
            formData.append("category_desc", values.category_desc);

            if (values.categoryImage && typeof values.categoryImage !== 'string') {
                formData.append("categoryImage", values.categoryImage);
            }

            dispatch(updateCategory({ data: formData, page: (pageNumber + 1), pageSize: dataPerPage, category_id: categoryData?._id, header }));
        }
    });

    const renderError = (error: any) => {
        if (typeof error === "string") {
            return <p className='text-danger m-1' style={{ fontSize: "11.5px" }}>*{error}</p>;
        }
        return null;
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];
            setImagePreview(URL.createObjectURL(file));
            setFieldValue("categoryImage", file);
        }
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
                categoryImage: categoryData?.categoryImage || null,
                category_desc: categoryData?.category_desc || "",
            });
            setImagePreview(categoryData?.categoryImage ? getImagUrl(categoryData?.categoryImage) : null);
        }
    }, [categoryData, setValues]);

    return (
        <>
            <div className="modal fade" id={modalId} tabIndex={-1} aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Update Category</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => dispatch(clearUpdateCategoryRespData())}></button>
                        </div>
                        <div className="modal-body">
                            <div className="col-12 col-lg-12 d-flex">
                                <div className="card border shadow-none w-100">
                                    <div className="card-body">

                                        {update_cat_error?.success === false ?
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

                                            {/* Category Image */}
                                            <div className="col-12">
                                                <label className="form-label" htmlFor="categoryImage">Category Image</label>
                                                <input
                                                    id="categoryImage"
                                                    className="form-control"
                                                    type="file"
                                                    onChange={handleImageChange}
                                                    onBlur={handleBlur}
                                                />
                                                {imagePreview &&
                                                    <img
                                                        src={imagePreview}
                                                        alt="Category Preview"
                                                        style={{
                                                            maxWidth: "100%",
                                                            maxHeight: "250px",
                                                            margin: "10px 0",
                                                            border: "1px solid black",
                                                            objectFit: "contain"
                                                        }}
                                                    />
                                                }
                                                {touched.categoryImage && errors.categoryImage && <div className="text-danger" style={{ fontSize: "13px" }}>*{errors.categoryImage}</div>}
                                            </div>

                                            {/* Description */}
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