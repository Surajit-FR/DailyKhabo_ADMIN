import { REACT_APP_BASE_URL } from "../../../config/App.config";
import { ProductOrderListType } from "../../../config/DataTypes.config";
import { formatDateTime } from "../../../helper/FormatDateTime";

type Order_props = {
    item: ProductOrderListType;
};

const Order = ({ item }: Order_props) => {

    return (
        <>
            <tr>
                <td>{item?.productTitle}</td>
                <td><img src={`${REACT_APP_BASE_URL}${item?.productImages[0]}`} className="product-img-2" alt="product img" /></td>
                <td>{item?._id}</td>

                {
                    item?.status === ("pending" || "processing" || "shipped") ?
                        <td><span className="badge bg-light-warning text-warning w-100">{item?.status?.toUpperCase()}</span></td>
                        : item?.status === "canceled" ?
                            <td><span className="badge bg-light-danger text-danger w-100">{item?.status?.toUpperCase()}</span></td>
                            : <td><span className="badge bg-light-success text-success w-100">Paid</span></td>
                }

                <td>₹ {item?.price}</td>
                <td>{formatDateTime(item?.createdAt)}</td>

                {
                    item?.status === ("pending" || "processing" || "shipped") ?
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

            </tr>
        </>
    );
};

export default Order;