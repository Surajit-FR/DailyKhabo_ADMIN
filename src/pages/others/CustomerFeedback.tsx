import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { clearDelError, clearFeedbackDelResp, deleteFeedbacks, getAllFeedbacks } from "../../services/slices/UtilitySlice";
import { CustomHeadersType, FeedbackListType } from "../../config/DataTypes.config";
import Feedback from "../../components/core/feedback/Feedback";
import ConfModal from "../../util/ConfModal";
import CustomAlert from "../../util/CustomAlert";

type CustomerFeedbackProps = {
    header: CustomHeadersType | undefined;
}

const CustomerFeedback = ({ header }: CustomerFeedbackProps): JSX.Element => {
    const { customer_feedback_data, del_resp, del_error } = useSelector((state: any) => state.utilitySlice);
    const dispatch: Dispatch<any> = useDispatch();

    const [customersFeedbackData, setCustomerFeedbackData] = useState<Array<FeedbackListType>>([]);
    const [selectedFeedbacks, setSelectedFeedbacks] = useState<string[]>([]);

    const allSelected = customersFeedbackData.length > 0 && selectedFeedbacks.length === customersFeedbackData.length;

    const handleSelectAll = () => {
        const allIds = customersFeedbackData.map(feedback => feedback._id);
        setSelectedFeedbacks(allIds);
    };

    const handleClearAll = useCallback(() => {
        setSelectedFeedbacks([]);
    }, []);

    const handleCheckboxChange = (feedbackId: string, isChecked: boolean) => {
        setSelectedFeedbacks(prevSelected =>
            isChecked ? [...prevSelected, feedbackId] : prevSelected.filter(id => id !== feedbackId)
        );
    };

    const handleDelete = () => {
        if (customersFeedbackData) {
            dispatch(deleteFeedbacks({ selectedIDs: selectedFeedbacks, header }));
        }
    };

    useEffect(() => {
        dispatch(getAllFeedbacks({ header }));
    }, [dispatch, header]);

    useEffect(() => {
        setCustomerFeedbackData(customer_feedback_data);
    }, [customer_feedback_data]);

    useEffect(() => {
        handleClearAll();
    }, [handleClearAll]);

    return (
        <>
            {/* Delete Modal */}
            <ConfModal
                modalId="deleteModal"
                modalHeading="Want To Delete The Selected Feedbacks?"
                onDelete={handleDelete}
            />

            <main className="page-content">
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Tables</div>
                    <div className="ps-3">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0 p-0">
                                <li className="breadcrumb-item"><Link to="/dashboard"><i className="bx bx-home-alt"></i></Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Customer Tables</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        {/* Alert */}
                        {del_error?.success === false ? <CustomAlert type="danger" message={del_error?.message} onClose={() => dispatch(clearDelError())} /> : null}
                        {del_resp?.success === true ? <CustomAlert type="success" message={del_resp?.message} onClose={() => dispatch(clearFeedbackDelResp())} /> : null}

                        <div style={{ position: "sticky", top: 0, padding: "10px" }}>
                            <div className="my-2 d-flex justify-content-between align-items-center">
                                <div>
                                    {/* Select All & Clear All Button */}
                                    <button className={`btn btn-${!allSelected ? "primary" : "secondary"} me-4`} onClick={!allSelected ? handleSelectAll : handleClearAll}>
                                        {!allSelected ? "Select All" : "Clear All"}
                                    </button>
                                    {/* Delete Button */}
                                    {selectedFeedbacks?.length > 0 && (
                                        <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                            <i className="fa-solid fa-trash-can fa-shake me-2"></i> Delete Selected
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="d-flex align-items-center">
                            <h5 className="mb-0">Customer Details</h5>
                        </div>
                        <div className="table-responsive mt-3">
                            <table className="table align-middle">
                                <thead className="table-secondary">
                                    <tr>
                                        <th>#</th>
                                        <th>Customer</th>
                                        <th>Contact Details</th>
                                        <th>Message</th>
                                        <th>Highlight Feedback</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        customersFeedbackData?.length > 0 && customersFeedbackData?.map((item, index) => (
                                            <Feedback
                                                header={header}
                                                key={index}
                                                index={index}
                                                item={item}
                                                isSelected={selectedFeedbacks?.includes(item._id)}
                                                handleCheckboxChange={handleCheckboxChange}
                                            />
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default CustomerFeedback;