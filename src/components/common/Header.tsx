import { Link, useNavigate } from 'react-router-dom';
import UserDropdown from './headerItems/UserDropdown';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { logoutUser } from '../../services/slices/AuthSlice';
import toast from 'react-hot-toast';
// import BoxDropDown from './headerItems/BoxDropDown';
// import MessageDropdown from './headerItems/MessageDropdown';
// import NotiDropdown from './headerItems/NotiDropdown';
// import SearchBar from './headerItems/SearchBar';

const Header = (): JSX.Element => {
    const token: string | null = window.localStorage.getItem("token");
    const _TOKEN = JSON.parse(token ?? 'null');

    const dispatch: Dispatch<any> = useDispatch()
    const navigate: any = useNavigate()

    useEffect(() => {
        if (_TOKEN) {
            const decodedJwt = jwtDecode(_TOKEN);
            const isExpired = decodedJwt?.exp ? decodedJwt.exp < Date.now() / 1000 : false;
            if (isExpired) {
                dispatch(logoutUser(navigate));
                toast.error("Session Expired. You've been logged out. Please signin again.", {
                    duration: 4000,
                    style: {
                        background: "#000",
                        color: "#fff"
                    },
                    iconTheme: {
                        primary: "#fff",
                        secondary: "#f00"
                    },
                })
            }
        } else {
            navigate('/admin/signin')
        }
    }, [dispatch, navigate, _TOKEN]);

    return (
        <>
            {/* <!--start top header--> */}
            <header className="top-header">
                <nav className="navbar navbar-expand gap-3 align-items-center">
                    <div className="mobile-toggle-icon fs-3">
                        <i className="bi bi-list"></i>
                    </div>

                    {/* Searchbar */}
                    {/* <SearchBar /> */}

                    <div className="top-navbar-right ms-auto">
                        <ul className="navbar-nav align-items-center">
                            <li className="nav-item search-toggle-icon">
                                <Link className="nav-link" to="#">
                                    <div className="">
                                        <i className="bi bi-search"></i>
                                    </div>
                                </Link>
                            </li>

                            {/* Dropdown Large */}
                            {/* <BoxDropDown /> */}

                            {/* Message Drop down */}
                            {/* <MessageDropdown /> */}

                            {/* Notification Drop down */}
                            {/* <NotiDropdown /> */}

                            {/* User Drop down */}
                            <UserDropdown />
                        </ul>
                    </div>
                </nav>
            </header>
            {/* <!--end top header--> */}
        </>
    )
}

export default Header