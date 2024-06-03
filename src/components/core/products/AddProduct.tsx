import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CategoryListType } from "../../../config/DataTypes.config";
import { useEffect, useMemo, useState } from "react";
import { addProduct, clearAddProductRespData, clearError, getAllCategory } from "../../../services/slices/UtilitySlice";
import { useFormik } from "formik";
import { addProductValidationSchema } from "../../../helper/FormValidation";
import CustomAlert from "../../../util/CustomAlert";

const AddProduct = () => {
    const token: string | null = window.localStorage.getItem("token");
    const _TOKEN = JSON.parse(token ?? 'null');

    const header = useMemo(() => ({
        headers: {
            Authorization: `Bearer ${_TOKEN}`
        }
    }), [_TOKEN]);

    const { category_data, add_product_resp_data, error } = useSelector((state: any) => state.utilitySlice);
    const navigate: any = useNavigate();
    const dispatch: any = useDispatch();

    const [categoryData, setCategoryData] = useState<CategoryListType[]>([]);
    const [imagePreviews, setImagePreviews] = useState<{ file: File, preview: string }[]>([]);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isValid, resetForm, setFieldValue } = useFormik({
        initialValues: {
            productTitle: "",
            offer: false,
            offerPercentage: "",
            productImages: [],
            productDescription: "",
            price: "",
            availability: "Available",
            visibility: "Show",
            category: ""
        },
        validationSchema: addProductValidationSchema,
        onSubmit: (values) => {
            const formData = new FormData();

            formData.append("productTitle", values.productTitle);
            formData.append("offer", values.offer.toString());
            formData.append("offerPercentage", values.offerPercentage);

            values.productImages.forEach((image: File) => {
                formData.append("productImages", image);
            });

            formData.append("productDescription", values.productDescription);
            formData.append("price", values.price);
            formData.append("availability", values.availability);
            formData.append("visibility", values.visibility);
            formData.append("category", values.category);
            // console.log(values);
            dispatch(addProduct({ data: formData, header }));
        }
    });


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            const files = Array.from(e.currentTarget.files);
            const newPreviews = files.map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }));
            setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
            setFieldValue("productImages", [...values.productImages, ...files]);
        }
    };

    const removeImage = (index: number) => {
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
        const updatedImages = values.productImages.filter((_, i) => i !== index);

        // Revoke object URLs to avoid memory leaks
        URL.revokeObjectURL(imagePreviews[index].preview);

        setImagePreviews(updatedPreviews);
        setFieldValue("productImages", updatedImages);
    };

    useEffect(() => {
        dispatch(getAllCategory({ header }));
    }, [dispatch, header]);

    useEffect(() => {
        setCategoryData(category_data?.data);
    }, [category_data]);

    useEffect(() => {
        if (add_product_resp_data?.success) {
            resetForm();
            setImagePreviews([]);
        }
    }, [add_product_resp_data, resetForm]);


    return (
        <>
            <main className="page-content">
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Product & Category</div>
                    <div className="ps-3">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0 p-0">
                                <li className="breadcrumb-item"><Link to="#"><i className="bx bx-home-alt"></i></Link>
                                </li>
                                <li className="breadcrumb-item"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => navigate('/products')}
                                >Products</li>
                                <li className="breadcrumb-item active" aria-current="page">Add New Product</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12 mx-auto">
                        <div className="card">
                            <div className="card-header py-3 bg-transparent">
                                <div className="d-sm-flex align-items-center">
                                    <h5 className="mb-2 mb-sm-0">Add New Product</h5>
                                </div>
                            </div>
                            <div className="card-body">

                                <div className="row d-flex justify-content-center">
                                    <div className="col-6">
                                        {
                                            error?.success === false ?
                                                <CustomAlert
                                                    type="danger"
                                                    message={error?.message}
                                                    onClose={() => dispatch(clearError())}
                                                /> : add_product_resp_data?.success === true ?
                                                    <CustomAlert
                                                        type="success"
                                                        message={add_product_resp_data?.message}
                                                        onClose={() => dispatch(clearAddProductRespData())}
                                                    /> : null
                                        }
                                    </div>
                                </div>

                                <form className="row g-3" onSubmit={handleSubmit}>
                                    <div className="col-12 col-lg-8">
                                        <div className="card shadow-none bg-light border">
                                            <div className="row g-3 card-body">

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

                                                <div className="col-12 col-lg-6">
                                                    <label className="form-label" htmlFor="offer">Offer</label>
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

                                                <div className="col-12 col-lg-6">
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
                                            </div>
                                        </div>

                                        {/* Button */}
                                        <div className="ms-auto">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={!isValid}
                                            >Add Product</button>
                                        </div>

                                    </div>

                                    <div className="col-12 col-lg-4">
                                        <div className="card shadow-none bg-light border">
                                            <div className="card-body">
                                                <div className="row g-3">

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

                                                    {/* Product Visibility */}
                                                    <div className="col-12">
                                                        <label className="form-label" htmlFor="visibility">Product Visibility</label>
                                                        <select
                                                            id="visibility"
                                                            className="form-select"
                                                            name="visibility"
                                                            value={values.visibility}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        >
                                                            <option value="Show">Show</option>
                                                            <option value="Hide">Hide</option>
                                                        </select>
                                                        {touched.visibility && errors.visibility && <div className="text-danger" style={{ fontSize: "13px" }}>*{errors.visibility}</div>}
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
                                {/* <!--end row--> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--end row--> */}
            </main>
        </>
    );
};

export default AddProduct;