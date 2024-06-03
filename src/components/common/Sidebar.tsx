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
                    <li className="menu-label">Manage Product</li>
                    <li>
                        <Link to="#" className="has-arrow">
                            <div className="parent-icon"><i className="bi bi-basket2-fill"></i>
                            </div>
                            <div className="menu-title">Product & Category</div>
                        </Link>
                        <ul>
                            <li>
                                <Link to="/products"><i className="bi bi-circle"></i>Products</Link>
                            </li>
                            <li>
                                <Link to="/product/categories"><i className="bi bi-circle"></i>Categories</Link>
                            </li>
                        </ul>
                    </li>

                    {/* Pricing */}
                    {/* <li className="menu-label">Pricing</li>
                    <li>
                        <Link to="/manage/pricing">
                            <div className="parent-icon"><i className="bi bi-tags-fill"></i>
                            </div>
                            <div className="menu-title">Pricing Tables</div>
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