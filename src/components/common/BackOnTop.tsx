import { Link } from "react-router-dom";

const BackOnTop = (): JSX.Element => {
    return (
        <>
            {/* <!--Start Back To Top Button--> */}
            <Link to="#" className="back-to-top">
                <i className='bx bxs-up-arrow-alt'></i>
            </Link>
            {/* <!--End Back To Top Button--> */}
        </>
    );
};

export default BackOnTop;