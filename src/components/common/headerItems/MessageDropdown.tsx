import { Link } from "react-router-dom";
import { useEffect, useRef } from 'react';
import PerfectScrollbar from "perfect-scrollbar";

const MessageDropdown = (): JSX.Element => {
    const chatRef = useRef(null);

    useEffect(() => {
        const chatContainer = chatRef.current;
        if (chatContainer) {
            new PerfectScrollbar(chatContainer);
        }
    }, []);

    return (
        <>
            <li className="nav-item dropdown dropdown-large">
                <Link className="nav-link dropdown-toggle dropdown-toggle-nocaret" to="#" data-bs-toggle="dropdown">
                    <div className="messages">
                        <span className="notify-badge">5</span>
                        <i className="bi bi-chat-right-fill"></i>
                    </div>
                </Link>
                <div className="dropdown-menu dropdown-menu-end p-0">
                    <div className="p-2 border-bottom m-2">
                        <h5 className="h5 mb-0">Messages</h5>
                    </div>
                    <div className="header-message-list p-2" ref={chatRef}>
                        <Link className="dropdown-item" to="#">
                            <div className="d-flex align-items-center">
                                <img src="assets/images/avatars/avatar-1.png" alt="" className="rounded-circle" width="50"
                                    height="50" />
                                <div className="ms-3 flex-grow-1">
                                    <h6 className="mb-0 dropdown-msg-user">Amelio Joly <span className="msg-time float-end text-secondary">1
                                        m</span></h6>
                                    <small className="mb-0 dropdown-msg-text text-secondary d-flex align-items-center">The standard
                                        chunk of lorem...</small>
                                </div>
                            </div>
                        </Link>
                        <Link className="dropdown-item" to="#">
                            <div className="d-flex align-items-center">
                                <img src="assets/images/avatars/avatar-2.png" alt="" className="rounded-circle" width="50"
                                    height="50" />
                                <div className="ms-3 flex-grow-1">
                                    <h6 className="mb-0 dropdown-msg-user">Althea Cabardo <span
                                        className="msg-time float-end text-secondary">7 m</span></h6>
                                    <small className="mb-0 dropdown-msg-text text-secondary d-flex align-items-center">Many desktop
                                        publishing</small>
                                </div>
                            </div>
                        </Link>
                        <Link className="dropdown-item" to="#">
                            <div className="d-flex align-items-center">
                                <img src="assets/images/avatars/avatar-3.png" alt="" className="rounded-circle" width="50"
                                    height="50" />
                                <div className="ms-3 flex-grow-1">
                                    <h6 className="mb-0 dropdown-msg-user">Katherine Pechon <span
                                        className="msg-time float-end text-secondary">2 h</span></h6>
                                    <small className="mb-0 dropdown-msg-text text-secondary d-flex align-items-center">Making this the
                                        first true</small>
                                </div>
                            </div>
                        </Link>
                        <Link className="dropdown-item" to="#">
                            <div className="d-flex align-items-center">
                                <img src="assets/images/avatars/avatar-4.png" alt="" className="rounded-circle" width="50"
                                    height="50" />
                                <div className="ms-3 flex-grow-1">
                                    <h6 className="mb-0 dropdown-msg-user">Peter Costanzo <span
                                        className="msg-time float-end text-secondary">3 h</span></h6>
                                    <small className="mb-0 dropdown-msg-text text-secondary d-flex align-items-center">It was
                                        popularised in the 1960</small>
                                </div>
                            </div>
                        </Link>
                        <Link className="dropdown-item" to="#">
                            <div className="d-flex align-items-center">
                                <img src="assets/images/avatars/avatar-5.png" alt="" className="rounded-circle" width="50"
                                    height="50" />
                                <div className="ms-3 flex-grow-1">
                                    <h6 className="mb-0 dropdown-msg-user">Thomas Wheeler <span
                                        className="msg-time float-end text-secondary">1 d</span></h6>
                                    <small className="mb-0 dropdown-msg-text text-secondary d-flex align-items-center">If you are going
                                        to use a passage</small>
                                </div>
                            </div>
                        </Link>
                        <Link className="dropdown-item" to="#">
                            <div className="d-flex align-items-center">
                                <img src="assets/images/avatars/avatar-6.png" alt="" className="rounded-circle" width="50"
                                    height="50" />
                                <div className="ms-3 flex-grow-1">
                                    <h6 className="mb-0 dropdown-msg-user">Johnny Seitz <span
                                        className="msg-time float-end text-secondary">2 w</span></h6>
                                    <small className="mb-0 dropdown-msg-text text-secondary d-flex align-items-center">All the Lorem
                                        Ipsum generators</small>
                                </div>
                            </div>
                        </Link>
                        <Link className="dropdown-item" to="#">
                            <div className="d-flex align-items-center">
                                <img src="assets/images/avatars/avatar-1.png" alt="" className="rounded-circle" width="50"
                                    height="50" />
                                <div className="ms-3 flex-grow-1">
                                    <h6 className="mb-0 dropdown-msg-user">Amelio Joly <span className="msg-time float-end text-secondary">1
                                        m</span></h6>
                                    <small className="mb-0 dropdown-msg-text text-secondary d-flex align-items-center">The standard
                                        chunk of lorem...</small>
                                </div>
                            </div>
                        </Link>
                        <Link className="dropdown-item" to="#">
                            <div className="d-flex align-items-center">
                                <img src="assets/images/avatars/avatar-2.png" alt="" className="rounded-circle" width="50"
                                    height="50" />
                                <div className="ms-3 flex-grow-1">
                                    <h6 className="mb-0 dropdown-msg-user">Althea Cabardo <span
                                        className="msg-time float-end text-secondary">7 m</span></h6>
                                    <small className="mb-0 dropdown-msg-text text-secondary d-flex align-items-center">Many desktop
                                        publishing</small>
                                </div>
                            </div>
                        </Link>
                        <Link className="dropdown-item" to="#">
                            <div className="d-flex align-items-center">
                                <img src="assets/images/avatars/avatar-3.png" alt="" className="rounded-circle" width="50"
                                    height="50" />
                                <div className="ms-3 flex-grow-1">
                                    <h6 className="mb-0 dropdown-msg-user">Katherine Pechon <span
                                        className="msg-time float-end text-secondary">2 h</span></h6>
                                    <small className="mb-0 dropdown-msg-text text-secondary d-flex align-items-center">Making this the
                                        first true</small>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="p-2">
                        <div>
                            <hr className="dropdown-divider" />
                        </div>
                        <Link className="dropdown-item" to="#">
                            <div className="text-center">View All Messages</div>
                        </Link>
                    </div>
                </div>
            </li>
        </>
    );
};

export default MessageDropdown;