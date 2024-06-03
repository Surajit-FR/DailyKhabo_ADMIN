import { Link, useNavigate } from "react-router-dom";

const ErrorPage = (): JSX.Element => {
    const navigate: any = useNavigate();

    const handleBackClick = () => {
        navigate(-1);  // Navigate back in the browser history
    };

    return (
        <>
            <main style={{ marginTop: "5rem" }}>
                <div className="error-404 d-flex align-items-center justify-content-center">
                    <div className="container">
                        <div className="card py-5">
                            <div className="row g-0">
                                <div className="col col-xl-5">
                                    <div className="card-body p-4">
                                        <h1 className="display-1">
                                            <span className="text-danger">4</span>
                                            <span className="text-primary">0</span>
                                            <span className="text-success">3</span>
                                        </h1>
                                        <h2 className="font-weight-bold display-4">Access Denied</h2>
                                        <p>You Do Not Have The Permission,
                                            <br /> To Access This Page On This Server.
                                            <br />Execute access forbidden.
                                        </p>
                                        <div className="mt-5">
                                            <Link to="#" className="btn btn-outline-dark btn-lg ms-3 px-md-5 radius-30" onClick={handleBackClick}>Back</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-7">
                                    <img src="/assets/images/error/403.png" className="img-fluid" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ErrorPage;