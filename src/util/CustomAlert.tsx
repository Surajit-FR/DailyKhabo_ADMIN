import { CustomAlertProps } from "../config/DataTypes.config";

const alertStyles = {
    success: {
        bgClass: 'bg-light-success',
        textClass: 'text-success',
        iconClass: 'bi bi-check-circle-fill'
    },
    danger: {
        bgClass: 'bg-light-danger',
        textClass: 'text-danger',
        iconClass: 'bi bi-x-circle-fill'
    },
    warning: {
        bgClass: 'bg-light-warning',
        textClass: 'text-warning',
        iconClass: 'bi bi-exclamation-triangle-fill'
    },
    info: {
        bgClass: 'bg-light-info',
        textClass: 'text-info',
        iconClass: 'bi bi-info-circle-fill'
    },
    dark: {
        bgClass: 'bg-light-dark',
        textClass: 'text-dark',
        iconClass: 'bi bi-bell-fill'
    },
};

const CustomAlert = ({ type, message, onClose }: CustomAlertProps): JSX.Element => {
    const styles = alertStyles[type];

    return (
        <div className={`alert border-0 ${styles.bgClass} alert-dismissible fade show py-2`}>
            <div className="d-flex align-items-center">
                <div className={`fs-3 ${styles.textClass}`}><i className={styles.iconClass}></i></div>
                <div className="ms-3">
                    <div className={styles.textClass}>{message}</div>
                </div>
            </div>
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={onClose} // Add this line
            ></button>
        </div>
    );
};

export default CustomAlert;
