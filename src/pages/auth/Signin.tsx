import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, loginUser } from '../../services/slices/AuthSlice';
import Cookies from 'js-cookie';
import { DecryptData } from '../../helper/EncryptDecrypt';
import { useFormik } from 'formik';
import { loginValidationSchema } from '../../helper/FormValidation';
import CustomAlert from '../../util/CustomAlert';
import Loader from '../../util/Loader';


const userCookie = Cookies.get("user");
const user = DecryptData(userCookie ? userCookie : "");

const Signin = (): JSX.Element => {
    const token: string | null = window.localStorage.getItem("token");
    const _TOKEN = JSON.parse(token ?? 'null');
    const { error, auth_loading } = useSelector((state: any) => state.authSlice);
    const location = useLocation();
    const dispatch: any = useDispatch();
    const navigate: any = useNavigate();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isValid } = useFormik({
        initialValues: {
            credential: user?.credential ? user?.credential : "",
            password: user?.password ? user?.password : "",
            user_type: "SuperAdmin",
            remember_me: user?.remember_me ? user?.remember_me : false
        },
        validationSchema: loginValidationSchema,
        onSubmit: (values) => {
            dispatch(loginUser({ data: values, navigate }));
        }
    });

    useEffect(() => {
        // Add the class to the body tag
        document.body.classList.add('bg-forgot-password');
        // Cleanup function to remove the class when the component is unmounted
        return () => {
            document.body.classList.remove('bg-forgot-password');
        };
    }, [location]);

    useEffect(() => {
        if (_TOKEN && navigate) {
            navigate("/dashboard");
        } else if (navigate) {
            navigate("/admin/signin");
        }
        return () => {
            dispatch(clearAuthError());
        };
    }, [_TOKEN, navigate, dispatch]);

    const renderError = (error: any) => {
        if (typeof error === "string") {
            return <p className='text-danger m-1' style={{ fontSize: "11.5px" }}>*{error}</p>;
        }
        return null;
    };


    return (
        <>
            {/* Loader */}
            <Loader loading={auth_loading} />

            <div className="wrapper">
                <main className="authentication-content">
                    <div className="container-fluid">
                        <div className="authentication-card">
                            <div className="card shadow rounded-5 overflow-hidden">
                                <div className="row g-0">
                                    <div className="col-lg-6 d-flex align-items-center justify-content-center border-end">
                                        <img src="https://img.freepik.com/free-vector/secure-data-concept-illustration_114360-2510.jpg?w=740&t=st=1662791352~exp=1662791952~hmac=d90f717a99823008ce52a92f59fc382488f46baa82e2bfb150908a693efadd4b" className="img-fluid" alt="" />
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="card-body p-4 p-sm-5">
                                            <h5 className="card-title">Sign In</h5>
                                            <p className="card-text mb-5">See your growth and get consulting support!</p>
                                            <form className="form-body" onSubmit={handleSubmit}>
                                                {/* Error alert */}
                                                {error && <CustomAlert type="danger" message={error?.message} onClose={() => dispatch(clearAuthError())} />}

                                                <div className="row g-3">
                                                    {/* Email Input */}
                                                    <div className="col-12">
                                                        <label htmlFor="inputEmailAddress" className="form-label">Email Address</label>
                                                        <div className="ms-auto position-relative">
                                                            <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                                                                <i className="bi bi-envelope-fill"></i>
                                                            </div>
                                                            <input
                                                                type="email"
                                                                className="form-control radius-30 ps-5"
                                                                id="inputEmailAddress"
                                                                placeholder="Email Address"
                                                                name='credential'
                                                                value={values?.credential || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                style={{ border: touched?.credential && errors?.credential ? "1px solid red" : "" }}
                                                            />
                                                        </div>
                                                        {touched?.credential && renderError(errors?.credential)}
                                                    </div>

                                                    {/* Password Input */}
                                                    <div className="col-12">
                                                        <label htmlFor="inputChoosePassword" className="form-label">Enter Password</label>
                                                        <div className="ms-auto position-relative">
                                                            <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                                                                <i className="bi bi-lock-fill"></i>
                                                            </div>
                                                            <input
                                                                type="password"
                                                                className="form-control radius-30 ps-5"
                                                                id="inputChoosePassword"
                                                                placeholder="•••••••••••"
                                                                name='password'
                                                                value={values?.password || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                style={{ border: touched?.password && errors?.password ? "1px solid red" : "" }}
                                                            />
                                                        </div>
                                                        {touched?.password && renderError(errors?.password)}
                                                    </div>

                                                    {/* Remember me Input */}
                                                    <div className="col-12">
                                                        <div className="form-check form-switch">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="flexSwitchCheckChecked"
                                                                name="remember_me"
                                                                checked={values?.remember_me}
                                                                onChange={handleChange}
                                                            />
                                                            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Remember Me</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="d-grid gap-3">
                                                            <button
                                                                type="submit"
                                                                className="btn btn-warning radius-30"
                                                                disabled={!isValid}
                                                            >Sign In</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </main >
            </div >
        </>
    );
};

export default Signin;