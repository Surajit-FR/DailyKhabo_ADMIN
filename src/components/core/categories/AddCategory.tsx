import { useFormik } from "formik";
import { categoryValidationSchema } from "../../../helper/FormValidation";
import CustomAlert from "../../../util/CustomAlert";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, clearCategoryRespData, clearError } from "../../../services/slices/UtilitySlice";
import { useEffect, useState } from "react";
import { REACT_APP_PRODUCT_PER_PAGE } from "../../../config/App.config";

type addCategory_props = {
    pageCount: number;
    pageNumber: number;
    changePage: (data: { selected: number }) => void;
}

const AddCategory = ({ pageNumber }: addCategory_props): JSX.Element => {
    const { category_resp_data, error } = useSelector((state: any) => state.utilitySlice);
    const dispatch: any = useDispatch();

    const token: string | null = window.localStorage.getItem("token");
    const _TOKEN = JSON.parse(token ?? 'null');

    // header
    const header = {
        headers: {
            Authorization: `Bearer ${_TOKEN}`
        }
    };

    // dataPerPage
    const dataPerPage = REACT_APP_PRODUCT_PER_PAGE;

    // State variable to hold the URL of the selected image
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // taking form values
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isValid, resetForm, setFieldValue } = useFormik({
        initialValues: {
            category_name: "",
            categoryImage: null,
            category_desc: "",
        },
        validationSchema: categoryValidationSchema,
        onSubmit: (values) => {
            // Create a new FormData object
            const formData = new FormData();

            formData.append("category_name", values.category_name);

            if (values.categoryImage !== null) {
                formData.append("categoryImage", values.categoryImage);
            }
            formData.append("category_desc", values.category_desc);

            // console.log({ values });
            dispatch(addCategory({ data: formData, page: (pageNumber + 1), pageSize: dataPerPage, header }));
        }
    });

    // renderError func.
    const renderError = (error: any) => {
        if (typeof error === "string") {
            return <p className='text-danger m-1' style={{ fontSize: "11.5px" }}>*{error}</p>;
        }
        return null;
    };

    // Function to handle file input change and display image preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];
            // Set the image preview URL
            setImagePreview(URL.createObjectURL(file));
            // Set the selected image file to formik field
            setFieldValue("categoryImage", file);
        }
    };

    useEffect(() => {
        if (category_resp_data?.success) {
            resetForm();
            setImagePreview(null);
        }
    }, [category_resp_data, resetForm]);

    return (
        <>
            <div className="col-12 col-lg-4 d-flex">
                <div className="card border shadow-none w-100">
                    <div className="card-body">

                        {/* Alert */}
                        {error?.success === false ? <CustomAlert type="danger" message={error?.message} onClose={() => dispatch(clearError())} /> : null}
                        {category_resp_data?.success === true ? <CustomAlert type="success" message={category_resp_data?.message} onClose={() => dispatch(clearCategoryRespData())} /> : null}

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
                                {/* Display image preview */}
                                {imagePreview &&
                                    <img
                                        src={imagePreview}
                                        alt="Category Preview"
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "380px",
                                            margin: "10px 0",
                                            border: "1px solid black",
                                            objectFit: "contain"
                                        }}
                                    />
                                }
                                {touched.categoryImage && errors.categoryImage && <div className="text-danger" style={{ fontSize: "13px" }}>*{errors.categoryImage}</div>}
                            </div>

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
                                    >Add Category</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddCategory;