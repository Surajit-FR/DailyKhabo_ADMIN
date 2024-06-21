import { Link } from "react-router-dom";
import { CustomHeadersType, ProductResponse, UserData } from "../../../config/DataTypes.config";
import { REACT_APP_BASE_URL } from "../../../config/App.config";
import { getProductDetails } from "../../../services/slices/UtilitySlice";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { checkPermissions, permissionsToCheck } from "../../../helper/CheckPermissions";
// import Slider from "react-slick";

type DataList_Props = {
    data: ProductResponse,
    setProductID: (id: string) => void,
    userData: UserData,
    header: CustomHeadersType | undefined
}

const Product = ({ data, setProductID, userData, header }: DataList_Props): JSX.Element => {
    const dispatch: Dispatch<any> = useDispatch();

    const imageContainer: React.CSSProperties = {
        height: "200px",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px",
        cursor: "pointer",
    };
    const imageContainerImg: React.CSSProperties = {
        height: "100%",
        width: "100%",
        objectFit: "cover",
        borderRadius: "5px",
    };

    const permissionCheckResult = checkPermissions(userData, permissionsToCheck);

    // const autoplaySettings = {
    //     autoplay: true,
    //     autoplaySpeed: 3000
    // };

    // const settings1 = {
    //     ...autoplaySettings,
    //     dots: false,
    //     infinite: true,
    //     speed: 800,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     arrows: false,
    // };

    return (
        <div className="col">
            <div className="card border shadow-none mb-0">
                <div className="card-body text-center">

                    {/* <Slider {...settings1}>
                        {
                            data?.productImages?.map((item, index) => {
                                return (
                                    <div className=" mb-3" style={imageContainer} key={index}>
                                        <img
                                            src={`${REACT_APP_BASE_URL}${item}`}
                                            className="img-fluid"
                                            alt="Product"
                                            style={imageContainerImg}
                                        />
                                    </div>
                                )
                            })
                        }
                    </Slider> */}

                    <div
                        className=" mb-3"
                        style={imageContainer}
                        data-bs-toggle="modal"
                        data-bs-target="#productDetails"
                        onClick={() => dispatch(getProductDetails({ product_id: data?._id, header }))}
                    >
                        <img
                            src={`${REACT_APP_BASE_URL}${data?.productImages[0]}`}
                            className="img-fluid"
                            alt="Product"
                            style={imageContainerImg}
                        />
                    </div>

                    <h6 className="product-title">{data?.productTitle}</h6>
                    <p className="product-price fs-5 mb-1"><span>₹{Number(data?.price).toFixed(2)}</span></p>

                    <div className="actions d-flex align-items-center justify-content-around gap-2 mt-3">
                        {
                            (permissionCheckResult?.edit_update || permissionCheckResult?.all) &&
                            <Link
                                to="#"
                                className="btn btn-sm btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#updateProductModal"
                                onClick={() => dispatch(getProductDetails({ product_id: data?._id, header }))}
                            ><i className="bi bi-pencil-fill me-1"></i>Edit
                            </Link>
                        }
                        {
                            (permissionCheckResult?.delete || permissionCheckResult?.all) &&
                            <Link
                                to="#"
                                className="btn btn-sm btn-danger"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteModal"
                                onClick={() => setProductID(data?._id)}
                            ><i className="bi bi-trash-fill me-1"></i>Delete
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Product;