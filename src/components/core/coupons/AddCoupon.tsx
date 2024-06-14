import { useFormik } from "formik";
import { couponValidationSchema } from "../../../helper/FormValidation";
import CustomAlert from "../../../util/CustomAlert";
import { useDispatch, useSelector } from "react-redux";
import { clearAddCouponRespData, clearError, createCoupon } from "../../../services/slices/UtilitySlice";
import { useEffect } from "react";
import { REACT_APP_PRODUCT_PER_PAGE } from "../../../config/App.config";

type addCategory_props = {
    pageCount: number;
    pageNumber: number;
    changePage: (data: { selected: number }) => void;
}

const AddCoupon = ({ pageNumber }: addCategory_props): JSX.Element => {
    const { add_coupon_resp_data, error } = useSelector((state: any) => state.utilitySlice);
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
            couponNumber: 0,
            discount_amount: 0,
            expiry_date: "",
        },
        validationSchema: couponValidationSchema,
        onSubmit: (values) => {
            const data = values
            dispatch(createCoupon({ data, page: (pageNumber + 1), pageSize: dataPerPage, header }));
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
        if (add_coupon_resp_data?.success) {
            resetForm();
        }
    }, [add_coupon_resp_data, resetForm]);

    return (
        <>
            <div className="col-12 col-lg-4 d-flex">
                <div className="card border shadow-none w-100">
                    <div className="card-body">

                        {/* Alert */}
                        {error?.success === false ? <CustomAlert type="danger" message={error?.message} onClose={() => dispatch(clearError())} /> : null}
                        {add_coupon_resp_data?.success === true ? <CustomAlert type="success" message={add_coupon_resp_data?.message} onClose={() => dispatch(clearAddCouponRespData())} /> : null}

                        <form className="row g-3" onSubmit={handleSubmit}>
                            {/* Coupon Number */}
                            <div className="col-12">
                                <label className="form-label" htmlFor='couponNumber'>Coupon</label>
                                <input
                                    id="couponNumber"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter number"
                                    name="couponNumber"
                                    value={values?.couponNumber || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{ border: touched?.couponNumber && errors?.couponNumber ? "1px solid red" : "" }}
                                />
                            </div>
                            {touched?.couponNumber && renderError(errors?.couponNumber)}

                            {/* Discount amount */}
                            <div className="col-12">
                                <label className="form-label" htmlFor='discount_amount'>Discount amount</label>
                                <input
                                    id="discount_amount"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter amount"
                                    name="discount_amount"
                                    value={values?.discount_amount || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{ border: touched?.discount_amount && errors?.discount_amount ? "1px solid red" : "" }}
                                />
                            </div>
                            {touched?.discount_amount && renderError(errors?.discount_amount)}

                            {/* Expiry Date */}
                            <div className="col-12">
                                <label className="form-label" htmlFor='expiry_date'>Expiry Date</label>
                                <input
                                    id="expiry_date"
                                    type="datetime-local"
                                    className="form-control"
                                    placeholder="Enter amount"
                                    name="expiry_date"
                                    value={values?.expiry_date || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{ border: touched?.expiry_date && errors?.expiry_date ? "1px solid red" : "" }}
                                />
                            </div>
                            {touched?.expiry_date && renderError(errors?.expiry_date)}

                            {/* Button */}
                            <div className="col-12">
                                <div className="d-grid">
                                    <button
                                        type='submit'
                                        className="btn btn-primary"
                                        disabled={!isValid}
                                    >Create Coupon</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddCoupon;