import PerfectScrollbar from "perfect-scrollbar";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const CustomerReviews = (): JSX.Element => {
    const customerReviewRef = useRef(null);

    useEffect(() => {
        const customerReviewContainer = customerReviewRef.current;
        if (customerReviewContainer) {
            new PerfectScrollbar(customerReviewContainer);
        }
    }, []);

    return (
        <>
            <div className="col-12 col-lg-6 col-xl-6 d-flex">
                <div className="card rounded-4 w-100">
                    <div className="card-header bg-transparent">
                        <div className="d-flex align-items-center">
                            <h6 className="mb-0">Customer Reviews</h6>
                            <div className="fs-5 ms-auto dropdown">
                                <div className="dropdown-toggle dropdown-toggle-nocaret cursor-pointer" data-bs-toggle="dropdown"><i
                                    className="bi bi-three-dots"></i></div>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="#">Action</Link></li>
                                    <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="review-list" ref={customerReviewRef}>
                            <div className="d-flex align-items-start">
                                <div className="review-user">
                                    <img src="assets/images/avatars/avatar-1.png" width="65" height="65" className="rounded-circle" alt="" />
                                </div>
                                <div className="review-content ms-3">
                                    <div className="rates cursor-pointer fs-6">
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <h6 className="mb-0">James Caviness</h6>
                                        <p className="mb-0 ms-auto">February 16, 2021</p>
                                    </div>
                                    <p>Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg
                                        carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth.</p>
                                </div>
                            </div>
                            <hr />
                            <div className="d-flex align-items-start">
                                <div className="review-user">
                                    <img src="assets/images/avatars/avatar-2.png" width="65" height="65" className="rounded-circle" alt="" />
                                </div>
                                <div className="review-content ms-3">
                                    <div className="rates cursor-pointer fs-6">
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <h6 className="mb-0">David Buckley</h6>
                                        <p className="mb-0 ms-auto">February 22, 2021</p>
                                    </div>
                                    <p>Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg
                                        carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth.</p>
                                </div>
                            </div>
                            <hr />
                            <div className="d-flex align-items-start">
                                <div className="review-user">
                                    <img src="assets/images/avatars/avatar-3.png" width="65" height="65" className="rounded-circle" alt="" />
                                </div>
                                <div className="review-content ms-3">
                                    <div className="rates cursor-pointer fs-6">
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <h6 className="mb-0">Peter Costanzo</h6>
                                        <p className="mb-0 ms-auto">February 26, 2021</p>
                                    </div>
                                    <p>Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg
                                        carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth.</p>
                                </div>
                            </div>
                            <hr />
                            <div className="d-flex align-items-start">
                                <div className="review-user">
                                    <img src="assets/images/avatars/avatar-4.png" width="65" height="65" className="rounded-circle" alt="" />
                                </div>
                                <div className="review-content ms-3">
                                    <div className="rates cursor-pointer fs-6">
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <h6 className="mb-0">Peter Costanzo</h6>
                                        <p className="mb-0 ms-auto">February 26, 2021</p>
                                    </div>
                                    <p>Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg
                                        carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth.</p>
                                </div>
                            </div>
                            <hr />
                            <div className="d-flex align-items-start">
                                <div className="review-user">
                                    <img src="assets/images/avatars/avatar-5.png" width="65" height="65" className="rounded-circle" alt="" />
                                </div>
                                <div className="review-content ms-3">
                                    <div className="rates cursor-pointer fs-6">
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <h6 className="mb-0">Peter Costanzo</h6>
                                        <p className="mb-0 ms-auto">February 26, 2021</p>
                                    </div>
                                    <p>Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg
                                        carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth.</p>
                                </div>
                            </div>
                            <hr />
                            <div className="d-flex align-items-start">
                                <div className="review-user">
                                    <img src="assets/images/avatars/avatar-6.png" width="65" height="65" className="rounded-circle" alt="" />
                                </div>
                                <div className="review-content ms-3">
                                    <div className="rates cursor-pointer fs-6">
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <h6 className="mb-0">Peter Costanzo</h6>
                                        <p className="mb-0 ms-auto">February 26, 2021</p>
                                    </div>
                                    <p>Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg
                                        carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth.</p>
                                </div>
                            </div>
                            <hr />
                            <div className="d-flex align-items-start">
                                <div className="review-user">
                                    <img src="assets/images/avatars/avatar-7.png" width="65" height="65" className="rounded-circle" alt="" />
                                </div>
                                <div className="review-content ms-3">
                                    <div className="rates cursor-pointer fs-6">
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                        <i className="bx bxs-star text-warning"></i>
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <h6 className="mb-0">Peter Costanzo</h6>
                                        <p className="mb-0 ms-auto">February 26, 2021</p>
                                    </div>
                                    <p>Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg
                                        carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth.</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerReviews;