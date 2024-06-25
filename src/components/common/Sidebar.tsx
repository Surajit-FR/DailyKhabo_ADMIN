import { Link } from 'react-router-dom';

const Sidebar = (): JSX.Element => {
    return (
        <>
            {/* <!--start sidebar --> */}
            <aside className="sidebar-wrapper" data-simplebar="true">
                <div className="sidebar-header">
                    <div>
                        <img src="/assets/images/logo-icon.png" className="logo-icon" alt="logo icon" />
                    </div>
                    <div>
                        <h4 className="logo-text">cPannel</h4>
                    </div>
                    <div className="toggle-icon ms-auto"> <i className="bi bi-list"></i>
                    </div>
                </div>

                {/* <!--navigation--> */}
                <ul className="metismenu" id="menu">
                    <li>
                        <Link to="/dashboard">
                            <div className="parent-icon"><i className="bi bi-house-fill"></i></div>
                            <div className="menu-title">Dashboard</div>
                        </Link>
                    </li>

                    {/* Products */}
                    <li className="menu-label">Products</li>
                    <li>
                        <Link to="#" className="has-arrow">
                            <div className="parent-icon"><i className="bi bi-basket2-fill"></i>
                            </div>
                            <div className="menu-title">Product & Category</div>
                        </Link>
                        <ul>
                            <li>
                                <Link to="/product/categories"><i className="bi bi-circle"></i>Categories</Link>
                            </li>
                            <li>
                                <Link to="/products"><i className="bi bi-circle"></i>Products</Link>
                            </li>
                        </ul>
                    </li>

                    {/* Manage Coupons */}
                    <li className="menu-label">Manage Coupons</li>
                    <li>
                        <Link to="/coupons">
                            <div className="parent-icon"><i className="bi bi-tags-fill"></i>
                            </div>
                            <div className="menu-title">Coupons</div>
                        </Link>
                    </li>

                    {/* Manage Customers */}
                    <li className="menu-label">Manage Customers</li>
                    <li>
                        <Link to="/customers">
                            <div className="parent-icon"><i className="bi bi-person-lines-fill"></i>
                            </div>
                            <div className="menu-title">Customers</div>
                        </Link>
                    </li>

                    {/* Manage Orders */}
                    <li className="menu-label">Manage Orders</li>
                    <li>
                        <Link to="/orders">
                            <div className="parent-icon"><i className="bi bi-cart-fill"></i>
                            </div>
                            <div className="menu-title">Orders</div>
                        </Link>
                    </li>

                    {/* Reports and Analytics */}
                    {/* <li className="menu-label">Reports and Analytics</li>
                    <li>
                        <Link to="/reports">
                            <div className="parent-icon"><i className="bi bi-bar-chart-fill"></i>
                            </div>
                            <div className="menu-title">Reports</div>
                        </Link>
                    </li> */}

                    {/* Content Management */}
                    {/* <li className="menu-label">Content Management</li>
                    <li>
                        <Link to="#" className="has-arrow">
                            <div className="parent-icon"><i className="bi bi-file-earmark-text-fill"></i>
                            </div>
                            <div className="menu-title">Content</div>
                        </Link>
                        <ul>
                            <li>
                                <Link to="/blogs-section"><i className="bi bi-circle"></i>Blogs Section</Link>
                            </li>
                            <li>
                                <Link to="/about-section"><i className="bi bi-circle"></i>About Section</Link>
                            </li>
                        </ul>
                    </li> */}

                    {/* Others */}
                    {/* <li className="menu-label">Others</li>
                    <li>
                        <Link to="/settings">
                            <div className="parent-icon"><i className="bi bi-gear-fill"></i>
                            </div>
                            <div className="menu-title">Settings</div>
                        </Link>
                    </li>

                    <li>
                        <Link to="/user">
                            <div className="parent-icon"><i className="bi bi-people-fill"></i>
                            </div>
                            <div className="menu-title">User List</div>
                        </Link>
                    </li> */}
                </ul>
                {/* <!--end navigation--> */}
            </aside>
            {/* <!--end sidebar --> */}
        </>
    )
}

export default Sidebar;