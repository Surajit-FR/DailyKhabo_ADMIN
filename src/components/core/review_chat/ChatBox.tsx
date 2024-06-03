import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PerfectScrollbar from 'perfect-scrollbar';


const ChatBox = (): JSX.Element => {
    const chatTalkRef = useRef(null);

    useEffect(() => {
        const chatTalkContainer = chatTalkRef.current;
        if (chatTalkContainer) {
            new PerfectScrollbar(chatTalkContainer);
        }
    }, []);

    return (
        <>
            <div className="col-12 col-lg-6 col-xl-6 d-flex">
                <div className="card rounded-4 w-100">
                    <div className="card-header bg-transparent">
                        <div className="d-flex align-items-center">
                            <h6 className="mb-0">Chat Box</h6>
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
                    <div className="card-body p-0">
                        <div className="chat-talk d-flex flex-column gap-4 p-3" ref={chatTalkRef}>
                            <div className="d-flex align-items-end gap-3">
                                <div className="chat-user">
                                    <img src="assets/images/avatars/avatar-7.png" width="55" height="55" className="rounded-circle" alt="" />
                                </div>
                                <div className="chat-msg border flex-grow-1 rounded-4 p-3">
                                    Hello , Codervent
                                </div>
                            </div>
                            <div className="d-flex align-items-end gap-3">
                                <div className="chat-msg border flex-grow-1 rounded-4 p-3 bg-light">
                                    Hello , Codervent
                                </div>
                                <div className="chat-user">
                                    <img src="assets/images/avatars/avatar-7.png" width="55" height="55" className="rounded-circle" alt="" />
                                </div>
                            </div>
                            <div className="d-flex align-items-end gap-3">
                                <div className="chat-user">
                                    <img src="assets/images/avatars/avatar-7.png" width="55" height="55" className="rounded-circle" alt="" />
                                </div>
                                <div className="chat-msg border flex-grow-1 rounded-4 p-3">
                                    Hello , Codervent
                                </div>
                            </div>
                            <div className="d-flex align-items-end gap-3">
                                <div className="chat-msg border flex-grow-1 rounded-4 p-3 bg-light">
                                    Hello , Codervent
                                </div>
                                <div className="chat-user">
                                    <img src="assets/images/avatars/avatar-7.png" width="55" height="55" className="rounded-circle" alt="" />
                                </div>
                            </div>
                            <div className="d-flex align-items-end gap-3">
                                <div className="chat-user">
                                    <img src="assets/images/avatars/avatar-7.png" width="55" height="55" className="rounded-circle" alt="" />
                                </div>
                                <div className="chat-msg border flex-grow-1 rounded-4 p-3">
                                    Hello , Codervent
                                </div>
                            </div>
                            <div className="d-flex align-items-end gap-3">
                                <div className="chat-msg border flex-grow-1 rounded-4 p-3 bg-light">
                                    Hello , Codervent
                                </div>
                                <div className="chat-user">
                                    <img src="assets/images/avatars/avatar-7.png" width="55" height="55" className="rounded-circle" alt="" />
                                </div>
                            </div>
                            <div className="d-flex align-items-end gap-3">
                                <div className="chat-user">
                                    <img src="assets/images/avatars/avatar-7.png" width="55" height="55" className="rounded-circle" alt="" />
                                </div>
                                <div className="chat-msg border flex-grow-1 rounded-4 p-3">
                                    Hello , Codervent
                                </div>
                            </div>
                            <div className="d-flex align-items-end gap-3">
                                <div className="chat-msg border flex-grow-1 rounded-4 p-3 bg-light">
                                    Hello , Codervent
                                </div>
                                <div className="chat-user">
                                    <img src="assets/images/avatars/avatar-7.png" width="55" height="55" className="rounded-circle" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer bg-transparent">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Type your message" />
                                <button className="btn btn-primary" type="button"><i className="bi bi-send"></i></button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatBox;