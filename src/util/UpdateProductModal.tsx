import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { CategoryResponse, CustomHeadersType } from "../config/DataTypes.config";
import { addProductValidationSchema } from "../helper/FormValidation";
import { clearError, clearUpdateProductRespData, getAllCategory, updateProduct } from "../services/slices/UtilitySlice";
import CustomAlert from "./CustomAlert";
import { REACT_APP_BASE_URL } from "../config/App.config";

interface ProductDetailsModalProps {
    modalId: string;
    pageNumber: number;
    dataPerPage: number;
    debouncedSearchQuery: string,
    selectedCategory: string,
    header: CustomHeadersType | undefined
}

const UpdateProductModal = ({ modalId, pageNumber, dataPerPage, debouncedSearchQuery, selectedCategory, header }: ProductDetailsModalProps) => {
    const { category_data, update_product_resp_data, products_details_data, error } = useSelector((state: any) => state.utilitySlice);
    const dispatch: any = useDispatch();

    const [categoryData, setCategoryData] = useState<CategoryResponse[]>([]);
    const [imagePreviews, setImagePreviews] = useState<{ file: File | null, preview: string }[]>([]);

    const getImagUrl = (url: string): string => {
        const subStr = "blob:";
        if (!url.includes(subStr)) {
            const imgUrl = `${REACT_APP_BASE_URL}${url}`;
            return imgUrl;
        }
        return url;
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isValid, resetForm, setFieldValue, setValues } = useFormik({
        initialValues: {
            productTitle: "",
            offer: false,
            offerPercentage: "",
            is_coupon_code: false,
            productImages: [],
            productDescription: "",
            productKeyPoints: [""],
            price: "",
            productQuantity: "",
            availability: "Available",
            category: ""
        },
        validationSchema: addProductValidationSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append("productTitle", values.productTitle);
            formData.append("offer", values.offer.toString());
            formData.append("offerPercentage", values.offerPercentage);
            formData.append("is_coupon_code", values.is_coupon_code.toString());
            formData.append("productDescription", values.productDescription);
            values.productKeyPoints.forEach((point, index) => {
                formData.append(`productKeyPoints[${index}]`, point);
            });
            formData.append("productQuantity", values.productQuantity);
            formData.append("price", values.price);
            formData.append("availability", values.availability);
            formData.append("category", values.category);

            // Append all selected images
            values.productImages.forEach((image: File | string) => {
                if (typeof image !== 'string') {
                    formData.append("productImages", image);
                }
            });

            // console.log(values);
            dispatch(updateProduct({
                data: formData,
                product_id: products_details_data?.data?._id,
                page: (pageNumber + 1),
                pageSize: dataPerPage,
                searchQuery: debouncedSearchQuery,
                category: selectedCategory,
                header
            }));
        }
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.files.length > 0) {
            const filesArray = Array.from(e.currentTarget.files); // Convert FileList to Array
            const newPreviews = filesArray.map(file => ({ file, preview: URL.createObjectURL(file) }));

            setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]); // Append new previews
            setFieldValue("productImages", [...values.productImages, ...filesArray]); // Append new images to formik state
        }
    };

    const removeImage = (index: number) => {
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
        const updatedImages = values.productImages.filter((_, i) => i !== index);

        URL.revokeObjectURL(imagePreviews[index].preview);

        setImagePreviews(updatedPreviews);
        setFieldValue("productImages", updatedImages);
    };

    const addKeypointField = () => {
        const updatedKeyPoints = [...values.productKeyPoints, ""];
        setFieldValue("productKeyPoints", updatedKeyPoints);
    };

    const removeKeypointField = (index: number) => {
        const updatedKeyPoints = values.productKeyPoints.filter((_, i) => i !== index);
        setFieldValue("productKeyPoints", updatedKeyPoints);
    };

    const handleKeypointChange = (index: number, value: string) => {
        const updatedKeyPoints = values.productKeyPoints.map((kp, i) => (i === index ? value : kp));
        setFieldValue("productKeyPoints", updatedKeyPoints);
    };

    const keypointFields = values.productKeyPoints.map((keypoint, index) => (
        <div key={index} className="col-12">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Key Point"
                    value={keypoint}
                    onChange={(e) => handleKeypointChange(index, e.target.value)}
                />
                <button
                    className="btn btn-outline-danger"
                    type="button"
                    onClick={() => removeKeypointField(index)}
                ><i className='bx bx-trash'></i></button>
            </div>
        </div>
    ));

    useEffect(() => {
        dispatch(getAllCategory({ header }));
    }, [dispatch, header]);

    useEffect(() => {
        setCategoryData(category_data?.data);
    }, [category_data]);

    useEffect(() => {
        if (update_product_resp_data?.success) {
            resetForm();
            setImagePreviews([]);
        }
    }, [update_product_resp_data, resetForm]);

    useEffect(() => {
        if (products_details_data?.data) {
            setValues({
                productTitle: products_details_data?.data?.productTitle || "",
                offer: products_details_data?.data?.offer || false,
                offerPercentage: products_details_data?.data?.offerPercentage || "",
                is_coupon_code: products_details_data?.data?.is_coupon_code || false,
                productImages: products_details_data?.data?.productImages || [],
                productDescription: products_details_data?.data?.productDescription || "",
                productKeyPoints: products_details_data?.data?.productKeyPoints || [""],
                price: products_details_data?.data?.price || "",
                productQuantity: products_details_data?.data?.productQuantity || "",
                availability: products_details_data?.data?.availability || "Available",
                category: products_details_data?.data?.category?._id || "",
            });
            if (products_details_data?.data?.productImages) {
                setImagePreviews(
                    products_details_data.data.productImages.map((img: string) => ({
                        file: null,
                        preview: getImagUrl(img)
                    }))
                );
            }
        }
    }, [products_details_data, setValues]);


    return (
        <div className="modal fade" id={modalId} tabIndex={-1} aria-hidden="true" data-bs-backdrop="static">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Update Product</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-lg-12 mx-auto">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-6">
                                        {
                                            error?.success === false ?
                                                <CustomAlert
                                                    type="danger"
                                                    message={error?.message}
                                                    onClose={() => dispatch(clearError())}
                                                /> : update_product_resp_data?.success === true ?
                                                    <CustomAlert
                                                        type="success"
                                                        message={update_product_resp_data?.message}
                                                        onClose={() => dispatch(clearUpdateProductRespData())}
                                                    /> : null
                                        }
                                    </div>
                                </div>

                                <form className="row g-3" onSubmit={handleSubmit}>
                                    <div className="col-12 col-lg-8">
                                        <div className="card shadow-none bg-light border">
                                            <div className="row g-3 card-body">

                                                {/* Product title */}
                                                <div className="col-12">
                                                    <label className="form-label">Product title</label>
                                                    <input
                                                        id="productTitle"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Product title"
                                                        name="productTitle"
                                                        value={values.productTitle}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        style={{ border: touched.productTitle && errors.productTitle ? "1px solid red" : "" }}
                                                    />
                                                    {touched.productTitle && errors.productTitle && <div className="text-danger" style={{ fontSize: "13px" }}>*{errors.productTitle}</div>}
                                                </div>

                                                {/* Offer Applied */}
                                                <div className="col-12 col-lg-4">
                                                    <label className="form-label" htmlFor="offer">Offer Applied</label>
                                                    <select
                                                        id="offer"
                                                        className="form-select"
                                                        name="offer"
                                                        value={values.offer.toString()}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    >
                                                        <option value="true">Yes</option>
                                                        <option value="false">No</option>
                                                    </select>
                                                    {touched.offer && errors.offer && <div className="text-danger" style={{ fontSize: "13px" }}>*{errors.offer}</div>}
                                                </div>

                                                {/* Offer Percentage */}
                                                <div className="col-12 col-lg-4">
                                                    <label className="form-label" htmlFor="offerPercentage">Offer Percentage</label>
                                                    <input
                                                        id="offerPercentage"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Percentage"
                                                        name="offerPercentage"
                                                        value={values.offerPercentage}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled={values.offer === false}
                                                        style={{ border: touched.offerPercentage && errors.offerPercentage ? "1px solid red" : "" }}
                                                    />
                                                    {touched.offerPercentage && errors.offerPercentage && <div className="text-danger" style={{ fontSize: "13px" }}>*{errors.offerPercentage}</div>}
                                                </div>

                                                {/* Coupon Code Applied */}
                                                <div className="col-12 col-lg-4">
                                                    <label className="form-label" htmlFor="is_coupon_code">Coupon Code Applied</label>
                                                    <select
                                                        id="is_coupon_code"
                                                        className="form-select"
                                                        name="is_coupon_code"
                                                        value={values.is_coupon_code.toString()}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    >
                                                        <option value="true">Yes</option>
                                                        <option value="false">No</option>
                                                    </select>
                                                    {touched.is_coupon_code && errors.is_coupon_code && <div className="text-danger" style={{ fontSize: "13px" }}>*{errors.is_coupon_code}</div>}
                                                </div>

                                                {/* Product Images */}
                                                <div className="col-12">
                                                    <label className="form-label" htmlFor="productImages">Product Images</label>
                                                    <input
                                                        id="productImages"
                                                        className="form-control"
                                                        onChange={handleImageChange}
                                                        onBlur={handleBlur}
                                                        name="productImages"
                                                        type="file"
                                                        multiple
                                                    />
                                                    <div className="image-previews">
                                                        {imagePreviews?.map((preview, index) => (
                                                            <div key={index} style={{ position: "relative", display: "inline-block", margin: "10px" }}>
                                                                <img
                                                                    src={preview?.preview}
                                                                    alt={`Product Preview ${index}`}
                                                                    style={{
                                                                        maxWidth: "120px",
                                                                        maxHeight: "120px",
                                                                        objectFit: "cover"
                                                                    }}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeImage(index)}
                                                                    style={{
                                                                        position: "absolute",
                                                                        top: "0px",
                                                                        right: "0px",
                                                                        background: "#6e6e6ee0",
                                                                        border: "none",
                                                                        borderRadius: "5%",
                                                                        cursor: "pointer"
                                                                    }}
                                                                ><i className="lni lni-close text-danger fw-bold"></i></button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {touched.productImages && errors.productImages && <div className="text-danger" style={{ fontSize: "13px" }}>*{errors.productImages}</div>}
                                                </div>

                                                {/* Product description */}
                                                <div className="col-12">
                                                    <label className="form-label" htmlFor="productDescription">Product description</label>
                                                    <textarea
                                                        id="productDescription"
                                                        className="form-control"
                                                        placeholder="Full description"
                                                        rows={4}
                                                        name="productDescription"
                                                        value={values.productDescription}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    ></textarea>
                                                </div>

                                                {/* Product Hightlights */}
                                                <div className="col-12 col-lg-12">
                                                    <label className="form-label">Product Hightlights</label>
                                                    {keypointFields}
                                                    <div className="text-center">
                                                        <button type="button" className="btn btn-outline-success btn-sm" onClick={addKeypointField}>
                                                            <i className='bx bx-plus fs-6'></i> Add Input
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        {/* Button */}
                                        <div className="ms-auto">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={!isValid}
                                            >Update</button>
                                        </div>

                                    </div>

                                    <div className="col-12 col-lg-4">
                                        <div className="card shadow-none bg-light border">
                                            <div className="card-body">
                                                <div className="row g-3">

                                                    {/* Product Quantity */}
                                                    <div className="col-12">
                                                        <label className="form-label">Product Quantity</label>
                                                        <input
                                                            type="text"
                                                            id="productQuantity"
                                                            className="form-control"
                                                            placeholder="Enter product quantity"
                                                            name="productQuantity"
                                                            value={values.productQuantity}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            style={{ border: touched.productQuantity && errors.productQuantity ? "1px solid red" : "" }}
                                                        />
                                                        {touched.productQuantity && errors.productQuantity && <div className="text-danger" style={{ fontSize: "13px" }}>*{errors.productQuantity}</div>}
                                                    </div>

                                                    {/* Price */}
                                                    <div className="col-12">
                                                        <label className="form-label" htmlFor="price">Price</label>
                                                        <input
                                                            id="price"
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Price"
                                                            name="price"
                                                            value={values.price}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            style={{ border: touched.price && errors.price ? "1px solid red" : "" }}
                                                        />
                                                        {touched.price && errors.price && <div className="text-danger" style={{ fontSize: "13px" }}>*{errors.price}</div>}
                                                    </div>

                                                    {/* Availability */}
                                                    <div className="col-12">
                                                        <label className="form-label" htmlFor="availability">Availability</label>
                                                        <select
                                                            id="availability"
                                                            className="form-select"
                                                            name="availability"
                                                            value={values.availability}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        >
                                                            <option value="Available">Available</option>
                                                            <option value="Unavailable">Unavailable</option>
                                                        </select>
                                                        {touched.availability && errors.availability && <div className="text-danger" style={{ fontSize: "13px" }}>*{errors.availability}</div>}
                                                    </div>

                                                    {/* Categories */}
                                                    <div className="col-12">
                                                        <h5>Categories</h5>
                                                        <div className="category-list">
                                                            {categoryData && categoryData.map((item) => (
                                                                <div className="form-check" key={item?._id}>
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="radio"
                                                                        id={item?._id}
                                                                        name="category"
                                                                        value={item?._id}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        checked={values.category === item?._id} // Ensure single selection
                                                                    />
                                                                    <label className="form-check-label" htmlFor={item?._id}>
                                                                        {item?.category_name}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        {touched.category && errors.category && <div className="text-danger" style={{ fontSize: "13px" }}>*{errors.category}</div>}
                                                    </div>
                                                </div>
                                                {/* <!--end row--> */}
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductModal;