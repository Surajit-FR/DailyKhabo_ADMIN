/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { clearInvoiceDetailsData } from "../services/slices/UtilitySlice";
import { formatDateTime } from "../helper/FormatDateTime";
import axios from "axios";
import { REACT_APP_BASE_URL } from '../config/App.config';

interface InvoiceModal_Props {
    modalId: string;
    orderID: string;
    _TOKEN: string
}

const InvoiceModal = ({ modalId, _TOKEN, orderID }: InvoiceModal_Props): JSX.Element => {
    const { invoice_details_data } = useSelector((state: any) => state.utilitySlice);
    const dispatch: Dispatch<any> = useDispatch();

    const CUSTOMER_ADDRS = `${invoice_details_data?.customer?.address}, ${invoice_details_data?.customer?.apartment}, ${invoice_details_data?.customer?.country}, ${invoice_details_data?.customer?.state}, ${invoice_details_data?.customer?.city}, ${invoice_details_data?.customer?.postalCode}`

    const handleDownloadPdf = async () => {
        const invoiceContainer = document.getElementById('invoice-container');
        if (invoiceContainer) {
            try {
                const requestData = {
                    invoiceDetails: invoice_details_data
                };

                // Make a POST request to your backend API
                const response = await axios.post(`${REACT_APP_BASE_URL}/admin/api/generate-pdf`, requestData, {
                    headers: { Authorization: `Bearer ${_TOKEN}` },
                    responseType: 'blob'
                });

                // Create a Blob from the response data
                const blob = new Blob([response.data], { type: 'application/pdf' });

                // Create a URL for the Blob
                const url = window.URL.createObjectURL(blob);

                // Create a link element to trigger the download
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'invoice.pdf';  // Set filename for download

                // Append the link to the body and click it programmatically
                document.body.appendChild(a);
                a.click();

                // Clean up: remove the link and revoke the URL
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error("Error downloading PDF:", error);
            }
        } else {
            console.error("Invoice container not found.");
        }
    };


    // Define styles for print
    const printStyles = css`
        @media print {
            body * {
                visibility: hidden;
            }
            .modal-dialog,
            .modal-dialog * {
                visibility: visible;
            }
            .modal-dialog {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
        }
    `;

    return (
        <>
            <div css={printStyles}>
                <div className="modal fade" id={modalId} tabIndex={-1} aria-hidden="true" data-bs-backdrop="static">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => dispatch(clearInvoiceDetailsData())}></button>
                            </div>
                            <div className="modal-body">
                                <div className="container" id='invoice-container'>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="invoice-title">
                                                <h4 className="float-end font-size-15">Order ID #{invoice_details_data?.orderId}
                                                    {
                                                        invoice_details_data?.payment === 'cod' ?
                                                            <span className="badge bg-warning font-size-12 ms-2">Unpaid</span>
                                                            : <span className="badge bg-success font-size-12 ms-2">Paid</span>
                                                    }
                                                </h4>
                                                <div className="mb-4">
                                                    <h2 className="mb-1 text-muted">Daily Khao</h2>
                                                </div>
                                                <div className="text-muted">
                                                    <p className="mb-1"><i className="fa fa-map-marker me-1"></i>4321 Example Address, Pin 717171</p>
                                                    <p className="mb-1"><i className="fa fa-envelope me-1"></i>email@example.com</p>
                                                    <p><i className="fa fa-phone me-1"></i>012-345-6789</p>
                                                </div>
                                            </div>

                                            <hr className="my-4" />

                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="text-muted">
                                                        <h5 className="font-size-16 mb-3">Billed To:</h5>
                                                        <h5 className="font-size-15 mb-2">{invoice_details_data?.customer?.full_name}</h5>
                                                        <p className="mb-1"><i className="fa fa-map-marker me-1"></i>{CUSTOMER_ADDRS}</p>
                                                        <p className="mb-1"><i className="fa fa-envelope me-1"></i>{invoice_details_data?.customer?.email}</p>
                                                        <p><i className="fa fa-phone me-1"></i>+91{invoice_details_data?.customer?.phone}</p>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="text-muted text-sm-end">
                                                        <div>
                                                            <h5 className="font-size-15 mb-1">Payment Mode:</h5>
                                                            <p>{invoice_details_data?.payment?.toUpperCase()}</p>
                                                        </div>
                                                        <div className="mt-4">
                                                            <h5 className="font-size-15 mb-1">Order Date:</h5>
                                                            <p>{formatDateTime(invoice_details_data?.createdAt)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="py-2">
                                                <h5 className="font-size-15">Order Summary</h5>

                                                <div className="table-responsive">
                                                    <table className="table align-middle table-nowrap table-centered mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th style={{ width: "70px" }}>No.</th>
                                                                <th>Item</th>
                                                                <th>Price</th>
                                                                <th>Quantity</th>
                                                                <th className="text-end" style={{ width: "120px" }}>Total</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {
                                                                invoice_details_data?.items?.length > 0 && invoice_details_data?.items?.map((item: any, index: any) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <th scope="row">{index + 1}</th>
                                                                            <td>
                                                                                <div>
                                                                                    <h5 className="text-truncate font-size-14 mb-1">{item?.product?.productTitle}</h5>
                                                                                    <p className="text-muted mb-0">{item?.product?.category?.category_name}</p>
                                                                                </div>
                                                                            </td>
                                                                            <td>₹ {item?.product?.finalPrice}</td>
                                                                            <td>{item?.quantity}</td>
                                                                            <td className="text-end">₹ {(item?.product?.finalPrice * item?.quantity)}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }

                                                            <tr>
                                                                <th scope="row" colSpan={4} className="text-end">Sub Total</th>
                                                                <td className="text-end">₹ {invoice_details_data?.subtotal}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row" colSpan={4} className="border-0 text-end">
                                                                    Discount :</th>
                                                                <td className="border-0 text-end">- ₹ {invoice_details_data?.discount}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row" colSpan={4} className="border-0 text-end">
                                                                    Shipping Charge :</th>
                                                                <td className="border-0 text-end">₹ {invoice_details_data?.shipping?.cost}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row" colSpan={4} className="border-0 text-end">Total</th>
                                                                <td className="border-0 text-end"><h4 className="m-0 fw-semibold">₹ {invoice_details_data?.total}</h4></td>
                                                            </tr>
                                                        </tbody>

                                                    </table>
                                                </div>

                                                <div className="d-print-none mt-4">
                                                    <div className="float-end">
                                                        <button onClick={handleDownloadPdf} className="btn btn-success"><i className="fa fa-print me-1"></i>Print</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InvoiceModal;