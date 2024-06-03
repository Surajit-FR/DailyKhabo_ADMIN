import React from "react";

const Loader = ({ loading }: { loading: boolean }): JSX.Element => {
    const containerStyle: React.CSSProperties = {
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "#4a62686e",
        zIndex: "99999",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const spinnerStyle1: React.CSSProperties = {
        width: "2.6rem",
        height: "2.6rem",
    };

    const spinnerStyle2: React.CSSProperties = {
        width: "2rem",
        height: "2rem",
    };

    return (
        <>
            {loading && (
                <div style={containerStyle}>
                    <div className="spinner-grow" role="status" style={spinnerStyle2}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow mx-2" role="status" style={spinnerStyle1}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow" role="status" style={spinnerStyle2}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default Loader;