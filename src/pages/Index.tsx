import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
    const location = useLocation();
    const redirectUrl = "/dashboard";

    useEffect(() => {
        // Redirect only if the current location is not the redirect URL
        if (location.pathname !== redirectUrl) {
            window.location.href = redirectUrl;
        }
    }, [location, redirectUrl]);

    return (
        <></>
    );
};

export default Index;