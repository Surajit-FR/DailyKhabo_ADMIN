import ChatBox from "../review_chat/ChatBox";
import CustomerReviews from "../review_chat/CustomerReviews";

const CustomerReviewChatBox = (): JSX.Element => {
    return (
        <>
            <div className="row">
                {/* Customer Reviews */}
                <CustomerReviews />
                {/* Chat Box */}
                <ChatBox />
            </div>
        </>
    );
};

export default CustomerReviewChatBox;