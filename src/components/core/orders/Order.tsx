import { Link } from "react-router-dom";
// import { REACT_APP_BASE_URL } from "../../../config/App.config";
import { CustomHeadersType, ProductOrderListType } from "../../../config/DataTypes.config";
import { formatDateTime } from "../../../helper/FormatDateTime";
// import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { getInvoiceDetails } from "../../../services/slices/UtilitySlice";

type Order_props = {
    item: ProductOrderListType;
    header: CustomHeadersType | undefined;
};

const Order = ({ item, header }: Order_props) => {
    const dispatch: Dispatch<any> = useDispatch();

    return (
        <>
            <tr>
                {/* <td style={{ cursor: "pointer" }}>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-${item?._id}`}>{item?.productTitle}</Tooltip>}
                    >
                        <span className="d-inline-block text-truncate" style={{ maxWidth: "150px" }}>
                            {item?.productTitle}
                        </span>
                    </OverlayTrigger>
                </td>
                <td>
                    <img src={`${REACT_APP_BASE_URL}${item?.productImages[0]}`} className="product-img-2" alt="product img" />
                </td> */}
                <td>{item?.orderId}</td>

                {item?.status === "pending" || item?.status === "processing" || item?.status === "shipped" ?
                    <td><span className="badge bg-light-warning text-warning w-100">{item?.status?.toUpperCase()}</span></td>
                    : item?.status === "canceled" ?
                        <td><span className="badge bg-light-danger text-danger w-100">{item?.status?.toUpperCase()}</span></td>
                        : <td><span className="badge bg-light-success text-success w-100">{item?.status?.toUpperCase()}</span></td>
                }

                <td>₹ {item?.total}</td>
                <td>{formatDateTime(item?.createdAt)}</td>

                {item?.status === "pending" || item?.status === "processing" || item?.status === "shipped" ?
                    <td>
                        <div className="progress" style={{ height: "5px" }}>
                            <div className="progress-bar bg-warning" role="progressbar" style={{ width: "60%" }}></div>
                        </div>
                    </td>
                    : item?.status === "canceled" ?
                        <td>
                            <div className="progress" style={{ height: "5px" }}>
                                <div className="progress-bar bg-danger" role="progressbar" style={{ width: "70%" }}></div>
                            </div>
                        </td>
                        :
                        <td>
                            <div className="progress" style={{ height: "5px" }}>
                                <div className="progress-bar bg-success" role="progressbar" style={{ width: "100%" }}></div>
                            </div>
                        </td>
                }

                <td className="text-center">
                    <Link
                        to="#"
                        className="text-secondary fs-5"
                        data-bs-toggle="modal"
                        data-bs-target="#invoiceDetails"
                        onClick={() => dispatch(getInvoiceDetails({ order_id: item?._id, header }))}
                    ><i className="fa-solid fa-file"></i></Link>
                </td>
            </tr>
        </>
    );
};

export default Order;