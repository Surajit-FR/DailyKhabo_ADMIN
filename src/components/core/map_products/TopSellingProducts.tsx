import { Link } from "react-router-dom";

const TopSellingProducts = (): JSX.Element => {
    return (
        <>
            <div className="col-12 col-lg-6 col-xl-6 d-flex">
                <div className="card rounded-4 w-100">
                    <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                            <h6 className="mb-0">Top Selling Products</h6>
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
                        <div className="">
                            <div className="d-flex align-items-start gap-3">
                                <div className="product-box border">
                                    <img src="assets/images/products/05.png" alt="product img" />
                                </div>
                                <div className="flex-grow-1">
                                    <div className="progress-wrapper">
                                        <p className="my-2">iPhone 11 - A24512 <span className="float-end">(4,216 Orders) <span
                                            className="ms-3 fw-bold">42%</span></span></p>
                                        <div className="progress" style={{ height: "4px" }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: "42%" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="d-flex align-items-start gap-3">
                                <div className="product-box border">
                                    <img src="assets/images/products/07.png" alt="product img" />
                                </div>
                                <div className="flex-grow-1">
                                    <div className="progress-wrapper">
                                        <p className="my-2">iPhone 11 - A24512 <span className="float-end">(4,216 Orders) <span
                                            className="ms-3 fw-bold">42%</span></span></p>
                                        <div className="progress" style={{ height: "4px" }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: "42%" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="d-flex align-items-start gap-3">
                                <div className="product-box border">
                                    <img src="assets/images/products/09.png" alt="product img" />
                                </div>
                                <div className="flex-grow-1">
                                    <div className="progress-wrapper">
                                        <p className="my-2">iPhone 11 - A24512 <span className="float-end">(4,216 Orders) <span
                                            className="ms-3 fw-bold">42%</span></span></p>
                                        <div className="progress" style={{ height: "4px" }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: "42%" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="d-flex align-items-start gap-3">
                                <div className="product-box border">
                                    <img src="assets/images/products/02.png" alt="product img" />
                                </div>
                                <div className="flex-grow-1">
                                    <div className="progress-wrapper">
                                        <p className="my-2">iPhone 11 - A24512 <span className="float-end">(4,216 Orders) <span
                                            className="ms-3 fw-bold">42%</span></span></p>
                                        <div className="progress" style={{ height: "4px" }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: "42%" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="d-flex align-items-start gap-3">
                                <div className="product-box border">
                                    <img src="assets/images/products/04.png" alt="product img" />
                                </div>
                                <div className="flex-grow-1">
                                    <div className="progress-wrapper">
                                        <p className="my-2">iPhone 11 - A24512 <span className="float-end">(4,216 Orders) <span
                                            className="ms-3 fw-bold">42%</span></span></p>
                                        <div className="progress" style={{ height: "4px" }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: "42%" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopSellingProducts;