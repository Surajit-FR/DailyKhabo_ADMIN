import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../services/slices/AuthSlice";
import { useDispatch } from "react-redux";
import { DecryptData } from "../../../helper/EncryptDecrypt";
import { dropdownItemsType } from "../../../config/DataTypes.config";

const UserDropdown = (): JSX.Element => {
    const user: string | null = window.localStorage.getItem("user");
    const _USER_DATA = DecryptData(user ?? 'null');

    const dispatch: any = useDispatch();
    const navigate: any = useNavigate();

    // Logout function
    const userLogout = () => {
        dispatch(logoutUser(navigate));
    }

    // Define an array of dropdown items
    const dropdownItems: Array<dropdownItemsType> = [
        { icon: "bi bi-person-fill", text: "Profile", link: "/user/profile" },
        // { icon: "bi bi-gear-fill", text: "Setting", link: "#" },
        { icon: "bi bi-speedometer", text: "Dashboard", link: "/dashboard" },
        // { icon: "bi bi-piggy-bank-fill", text: "Earnings", link: "#" },
        // { icon: "bi bi-cloud-arrow-down-fill", text: "Downloads", link: "#" }
    ];

    return (
        <>
            <li className="nav-item dropdown dropdown-user-setting">
                <Link className="nav-link dropdown-toggle dropdown-toggle-nocaret" to="#" data-bs-toggle="dropdown">
                    <div className="user-setting d-flex align-items-center">
                        <img src="/assets/images/avatars/avatar-1.png" className="user-img" alt="" />
                    </div>
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                        <Link className="dropdown-item" to="#">
                            <div className="d-flex align-items-center">
                                <img src="/assets/images/avatars/avatar-1.png" alt="" className="rounded-circle" width="54" height="54" />
                                <div className="ms-3">
                                    <h6 className="mb-0 dropdown-user-name">{_USER_DATA?.full_name}</h6>
                                    <small className="mb-0 dropdown-user-designation text-secondary">{_USER_DATA?.role?.name}</small>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>

                    {/* Dynamically generate dropdown items */}
                    {dropdownItems.map((item, index) => (
                        <li key={index}>
                            <Link className="dropdown-item" to={item.link}>
                                <div className="d-flex align-items-center">
                                    <div className=""><i className={item.icon}></i></div>
                                    <div className="ms-3"><span>{item.text}</span></div>
                                </div>
                            </Link>
                        </li>
                    ))}

                    <li>
                        <hr className="dropdown-divider" />
                    </li>

                    <li>
                        <Link className="dropdown-item" to="#" onClick={userLogout}>
                            <div className="d-flex align-items-center">
                                <div className=""><i className="bi bi-lock-fill"></i></div>
                                <div className="ms-3"><span>Logout</span></div>
                            </div>
                        </Link>
                    </li>
                </ul>
            </li>
        </>
    );
};

export default UserDropdown;