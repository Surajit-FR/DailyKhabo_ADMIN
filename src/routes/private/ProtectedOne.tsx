import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedOne = (): JSX.Element => {
    const token: string | null = window.localStorage.getItem("token");
    const _TOKEN = JSON.parse(token ?? 'null');
    const location = useLocation();

    return (
        <>
            {
                _TOKEN ? <Outlet /> : <Navigate to="/admin/signin" state={{ from: location }} replace />
            }
        </>
    );
};

export default ProtectedOne;