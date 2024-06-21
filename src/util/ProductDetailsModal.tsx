import { useDispatch, useSelector } from "react-redux";
import { CustomHeadersType } from "../config/DataTypes.config";
import { REACT_APP_BASE_URL } from "../config/App.config";
import { clearProductsDetailsData } from "../services/slices/UtilitySlice";
import { Dispatch } from "redux";
import Slider from "react-slick";
import { Key } from "react";


interface ProductDetailsModalProps {
    modalId: string;
    productID: string;
    header: CustomHeadersType | undefined
}

const ProductDetailsModal = ({ modalId, productID, header }: ProductDetailsModalProps): JSX.Element => {
    const { products_details_data } = useSelector((state: any) => state.utilitySlice);
    const dispatch: Dispatch<any> = useDispatch();

    const imageContainer: React.CSSProperties = {
        height: "400px",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px",
    };
    const imageContainerImg: React.CSSProperties = {
        height: "100%",
        width: "100%",
        objectFit: "cover",
        borderRadius: "5px",
    };

    const autoplaySettings = {
        autoplay: true,
        autoplaySpeed: 3000
    };

    const settings1 = {
        ...autoplaySettings,
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };


    return (
        <>
            <div className="modal fade" id={modalId} tabIndex={-1} aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* Heading */}
                            <h4 className="modal-title">
                                {products_details_data?.data?.productTitle}
                            </h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => dispatch(clearProductsDetailsData())}></button>
                        </div>
                        <div className="modal-body">

                            {/* Image */}
                            <Slider {...settings1} className="custom-product-details-slider">
                                {products_details_data?.data?.productImages &&
                                    products_details_data?.data?.productImages?.map((item: any, index: Key | null | undefined) => {
                                        return (
                                            <div style={imageContainer} className="shadow mb-5 bg-white rounded" key={index}>
                                                <img
                                                    src={`${REACT_APP_BASE_URL}${item}`}
                                                    alt="Product"
                                                    style={imageContainerImg}
                                                />
                                            </div>
                                        )
                                    })}
                            </Slider>

                            <div className="row mt-4">
                                {/* Product Offer */}
                                <div className="col-md-6">
                                    <h5 style={{ fontSize: "16px" }}>Offer Applied:
                                        <span className="mx-2" style={{ fontWeight: "normal", fontSize: "14px" }}>
                                            {products_details_data?.data?.offer === "true" ? <i className="bi bi-check2-square text-success"></i> : <i className="bi bi-x-square text-danger"></i>}
                                        </span>
                                    </h5>
                                </div>

                                {/* Offer Percentage */}
                                <div className="col-md-6">
                                    <h5 style={{ fontSize: "16px" }}>Offer Percentage:
                                        <span className="mx-2" style={{ fontWeight: "normal", fontSize: "14px" }}>
                                            {products_details_data?.data?.offerPercentage ? (Number(products_details_data?.data?.offerPercentage)).toFixed(2) : "0"}%
                                        </span>
                                    </h5>
                                </div>

                                {/* Product Price */}
                                <div className="col-md-6">
                                    <h5 style={{ fontSize: "16px" }}>Product Price:
                                        <span className="mx-2" style={{ fontWeight: "normal", fontSize: "14px" }}>{products_details_data?.data?.price ? `₹${Number(products_details_data?.data?.price).toFixed(2)}` : "N/A"}</span>
                                    </h5>
                                </div>

                                {/* Product Final Price */}
                                <div className="col-md-6">
                                    <h5 style={{ fontSize: "16px" }}>Final Price:
                                        <span className="mx-2" style={{ fontWeight: "normal", fontSize: "14px" }}>{products_details_data?.data?.finalPrice ? `₹${Number(products_details_data?.data?.finalPrice).toFixed(2)}` : "N/A"}</span>
                                    </h5>
                                </div>

                                {/* Discount Code */}
                                {/* <div className="col-md-6">
                                    <h5 style={{ fontSize: "16px" }}>Discount Code:
                                        <span className="mx-2" style={{ fontWeight: "normal", fontSize: "14px" }}>{products_details_data?.data?.discountCode ? products_details_data?.data?.discountCode : "N/A"}</span>
                                    </h5>
                                </div> */}

                                {/* Product Quantity */}
                                <div className="col-md-6">
                                    <h5 style={{ fontSize: "16px" }}>Product Quantity:
                                        <span className="mx-2" style={{ fontWeight: "normal", fontSize: "14px" }}>{products_details_data?.data?.productQuantity}</span>
                                    </h5>
                                </div>

                                {/* Coupon Code */}
                                <div className="col-md-6">
                                    <h5 style={{ fontSize: "16px" }}>Coupon Code Applied:
                                        <span className="mx-2" style={{ fontWeight: "normal", fontSize: "14px" }}>
                                            {products_details_data?.data?.is_coupon_code ? <i className="bi bi-check2-square text-success"></i> : <i className="bi bi-x-square text-danger"></i>}
                                        </span>
                                    </h5>
                                </div>

                                {/* Product Availability */}
                                <div className="col-md-6">
                                    <h5 style={{ fontSize: "16px" }}>Availability
                                        <span className="mx-2">
                                            {products_details_data?.data?.availability ? <i className="bi bi-check2-square text-success"></i> : <i className="bi bi-x-square text-danger"></i>}
                                        </span>
                                    </h5>
                                </div>

                                {/* Product Category */}
                                <div className="col-md-6">
                                    <h5 style={{ fontSize: "16px" }}>Product Category:
                                        <span className="mx-2" style={{ fontWeight: "normal", fontSize: "14px" }}>{products_details_data?.data?.category ? products_details_data?.data?.category?.category_name : "N/A"}</span>
                                    </h5>
                                </div>

                                <hr />
                                {/* Product Description */}
                                <div className="col-md-12">
                                    <h5 style={{ fontSize: "16px" }}>Description:
                                        <span className="mx-2" style={{ fontWeight: "normal", fontSize: "14px" }}>
                                            {products_details_data?.data?.productDescription ? products_details_data?.data?.productDescription : "N/A"}
                                        </span>
                                    </h5>
                                </div>

                                <hr />
                                {/* Product Highlights */}
                                <div className="col-md-12">
                                    <h5 style={{ fontSize: "16px" }}>Highlights:</h5>
                                    <ul>
                                        {
                                            products_details_data?.data?.productKeyPoints?.length ?
                                                products_details_data?.data?.productKeyPoints?.map((item: any, index: any) => {
                                                    return (
                                                        <li key={index}>
                                                            <span style={{ fontWeight: "normal", fontSize: "14px" }}>
                                                                {item}
                                                            </span>
                                                        </li>
                                                    )
                                                })
                                                : "N/A"
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={() => dispatch(clearProductsDetailsData())}>OK</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetailsModal;