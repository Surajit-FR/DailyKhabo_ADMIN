import axios from 'axios';
import { REACT_APP_BASE_URL } from '../config/App.config';
import { showToast } from './Toast';

// handleDownloadPdf helper func.
export const handleDownloadPdf = async (invoiceDetails: any, _TOKEN: string, setLoading: (loading: boolean) => void) => {
    setLoading(true);
    try {
        const requestData = {
            invoiceDetails
        };

        // Make a POST request to your backend API
        const response = await axios.post(`${REACT_APP_BASE_URL}/admin/api/generate/invoice-pdf`, requestData, {
            headers: { Authorization: `Bearer ${_TOKEN}` },
            responseType: 'blob'
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });

        // Generate a unique filename with timestamp
        const timestamp = new Date().toISOString().replace(/[-T:Z.]/g, '');
        const filename = `invoice_${timestamp}.pdf`;

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename;

        document.body.appendChild(a);
        a.click();

        // Clean up: remove the link and revoke the URL
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        showToast({ message: "Failed to download the PDF. Please try again.", type: 'error', durationTime: 3000, position: "top-center" });
    } finally {
        setLoading(false);
    }
};

// handlePrintPdf helper func.
export const handlePrintPdf = async (invoiceDetails: any, _TOKEN: string, setLoading: (loading: boolean) => void) => {
    setLoading(true);
    try {
        const requestData = {
            invoiceDetails
        };

        // Make a POST request to your backend API
        const response = await axios.post(`${REACT_APP_BASE_URL}/admin/api/generate/invoice-pdf`, requestData, {
            headers: { Authorization: `Bearer ${_TOKEN}` },
            responseType: 'blob'
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const newWindow = window.open(url, '_blank');

        if (newWindow) {
            newWindow.onload = () => {
                setTimeout(() => {
                    newWindow.print();
                }, 1000);
            };
        } else {
            alert('Please allow popups for this site to print the PDF.');
        }

        // Clean up: revoke the URL
        window.URL.revokeObjectURL(url);
    } catch (error) {
        showToast({ message: "Failed to print the PDF. Please try again.", type: 'error', durationTime: 3000, position: "top-center" });
    } finally {
        setLoading(false);
    };
};

// handleCSVDownload helper func.
export const handleCSVDownload = async (_TOKEN: string, setLoading: (loading: boolean) => void) => {
    setLoading(true);
    try {
        const response = await axios.get(`${REACT_APP_BASE_URL}/admin/api/coupons/download-csv`, {
            headers: { Authorization: `Bearer ${_TOKEN}` },
            responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        const filename = `coupons_${(new Date()).toLocaleDateString()}.csv`;

        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();

        // Clean up and remove the link
        if (link.parentNode) {
            link.parentNode.removeChild(link);
        };
        // Clean up the object URL
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading the CSV', error);
    } finally {
        setLoading(false);
    };
};
