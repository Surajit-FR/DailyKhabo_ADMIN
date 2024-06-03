import { useFormik } from "formik";
import { categoryValidationSchema } from "../../../helper/FormValidation";
import CustomAlert from "../../../util/CustomAlert";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, clearCategoryRespData, clearError } from "../../../services/slices/UtilitySlice";
import { useEffect } from "react";
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

    // taking form values
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isValid, resetForm } = useFormik({
        initialValues: {
            category_name: "",
            category_desc: "",
        },
        validationSchema: categoryValidationSchema,
        onSubmit: (values) => {
            dispatch(addCategory({ data: values, page: (pageNumber + 1), pageSize: dataPerPage, header }));
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
        if (category_resp_data?.success) {
            resetForm();
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