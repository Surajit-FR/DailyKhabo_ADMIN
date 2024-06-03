import React, { useEffect } from "react";
import { DecryptData } from "../../helper/EncryptDecrypt";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { clearUpdateThemeResp, updateTheme } from "../../services/slices/AuthSlice";

const Switcher = (): JSX.Element => {
    const { update_theme_resp } = useSelector((state: any) => state.authSlice);
    const user: string | null = window.localStorage.getItem("user");
    const _USER_DATA = DecryptData(user ?? 'null');

    const token: string | null = window.localStorage.getItem("token");
    const _TOKEN = JSON.parse(token ?? 'null');

    const header = {
        headers: {
            Authorization: `Bearer ${_TOKEN}`
        }
    };

    const dispatch: Dispatch<any> = useDispatch();

    // Function to handle theme change
    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const web_theme = e.target.id;
        dispatch(updateTheme({ data: { web_theme }, header }));
    };

    // Effect to update the class attribute of <html> tag when selectedTheme changes
    useEffect(() => {
        const htmlTag = document.querySelector('html');
        if (htmlTag) {
            htmlTag.className = _USER_DATA?.web_theme || 'semi-dark';
        }
    }, [_USER_DATA?.web_theme, update_theme_resp]);

    useEffect(() => {
        return () => {
            dispatch(clearUpdateThemeResp());
        }
    }, [dispatch]);

    const switcherContainer: React.CSSProperties = {
        position: "fixed",
        right: "0px",
        top: "33%",
        borderTopRightRadius: "0",
        borderTopLeftRadius: "10px",
        borderBottomRightRadius: "0",
        borderBottomLeftRadius: "10px",
        bottom: "43%"
    };

    return (
        <>
            <div className="switcher-body">
                <button
                    className="btn btn-primary btn-switcher shadow-sm"
                    type="button"
                    data-bs-toggle="offcanvas"
                    style={{ zIndex: "9" }}
                    data-bs-target="#offcanvasScrolling"
                    aria-controls="offcanvasScrolling"
                ><i className="bi bi-paint-bucket me-0"></i>
                </button>
                <div
                    className="offcanvas offcanvas-end shadow border-start-0 p-2"
                    data-bs-scroll="true"
                    data-bs-backdrop="false"
                    tabIndex={-1} id="offcanvasScrolling"
                    style={switcherContainer}
                >
                    <div className="offcanvas-header border-bottom">
                        <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Theme Customizer</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
                    </div>

                    <div className="offcanvas-body">
                        {/* Light Theme */}
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="light-theme"
                                value="option1"
                                checked={_USER_DATA?.web_theme === 'light-theme'}
                                onChange={handleThemeChange}
                            />
                            <label className="form-check-label" htmlFor="light-theme"><i className="lni lni-sun"></i> Light</label>
                        </div>

                        {/* Dark Theme */}
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="dark-theme"
                                value="option2"
                                checked={_USER_DATA?.web_theme === 'dark-theme'}
                                onChange={handleThemeChange}
                            />
                            <label className="form-check-label" htmlFor="dark-theme"><i className="lni lni-night"></i> Dark</label>
                        </div>

                        {/* Semi Dark Theme */}
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="semi-dark"
                                value="option3"
                                checked={_USER_DATA?.web_theme === 'semi-dark'}
                                onChange={handleThemeChange}
                            />
                            <label className="form-check-label" htmlFor="semi-dark"><i className="lni lni-cloudy-sun"></i> Semi Dark</label>
                        </div>

                        {/* Minimal Theme */}
                        <hr />
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="minimal-theme"
                                value="option3"
                                checked={_USER_DATA?.web_theme === 'minimal-theme'}
                                onChange={handleThemeChange}
                            />
                            <label className="form-check-label" htmlFor="minimal-theme"><i className="lni lni-bolt-alt"></i> Minimal Theme</label>
                        </div>
                        <hr />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Switcher;