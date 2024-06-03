import { Link } from "react-router-dom"

const BoxDropDown = (): JSX.Element => {
    return (
        <>
            <li className="nav-item dropdown dropdown-large">
                <Link className="nav-link dropdown-toggle dropdown-toggle-nocaret" to="#" data-bs-toggle="dropdown">
                    <div className="projects">
                        <i className="bi bi-grid-3x3-gap-fill"></i>
                    </div>
                </Link>
                <div className="dropdown-menu dropdown-menu-end">
                    <div className="row row-cols-3 gx-2">
                        <div className="col">
                            <Link to="ecommerce-orders.html">
                                <div className="apps p-2 radius-10 text-center">
                                    <div className="apps-icon-box mb-1 text-white bg-gradient-purple">
                                        <i className="bi bi-basket2-fill"></i>
                                    </div>
                                    <p className="mb-0 apps-name">Orders</p>
                                </div>
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="#">
                                <div className="apps p-2 radius-10 text-center">
                                    <div className="apps-icon-box mb-1 text-white bg-gradient-info">
                                        <i className="bi bi-people-fill"></i>
                                    </div>
                                    <p className="mb-0 apps-name">Users</p>
                                </div>
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="ecommerce-products-grid.html">
                                <div className="apps p-2 radius-10 text-center">
                                    <div className="apps-icon-box mb-1 text-white bg-gradient-success">
                                        <i className="bi bi-trophy-fill"></i>
                                    </div>
                                    <p className="mb-0 apps-name">Products</p>
                                </div>
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="component-media-object.html">
                                <div className="apps p-2 radius-10 text-center">
                                    <div className="apps-icon-box mb-1 text-white bg-gradient-danger">
                                        <i className="bi bi-collection-play-fill"></i>
                                    </div>
                                    <p className="mb-0 apps-name">Media</p>
                                </div>
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="pages-user-profile.html">
                                <div className="apps p-2 radius-10 text-center">
                                    <div className="apps-icon-box mb-1 text-white bg-gradient-warning">
                                        <i className="bi bi-person-circle"></i>
                                    </div>
                                    <p className="mb-0 apps-name">Account</p>
                                </div>
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="#">
                                <div className="apps p-2 radius-10 text-center">
                                    <div className="apps-icon-box mb-1 text-white bg-gradient-voilet">
                                        <i className="bi bi-file-earmark-text-fill"></i>
                                    </div>
                                    <p className="mb-0 apps-name">Docs</p>
                                </div>
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="ecommerce-orders-detail.html">
                                <div className="apps p-2 radius-10 text-center">
                                    <div className="apps-icon-box mb-1 text-white bg-gradient-branding">
                                        <i className="bi bi-credit-card-fill"></i>
                                    </div>
                                    <p className="mb-0 apps-name">Payment</p>
                                </div>
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="#">
                                <div className="apps p-2 radius-10 text-center">
                                    <div className="apps-icon-box mb-1 text-white bg-gradient-desert">
                                        <i className="bi bi-calendar-check-fill"></i>
                                    </div>
                                    <p className="mb-0 apps-name">Events</p>
                                </div>
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="#">
                                <div className="apps p-2 radius-10 text-center">
                                    <div className="apps-icon-box mb-1 text-white bg-gradient-amour">
                                        <i className="bi bi-book-half"></i>
                                    </div>
                                    <p className="mb-0 apps-name">Story</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </li>
        </>
    )
}

export default BoxDropDown;