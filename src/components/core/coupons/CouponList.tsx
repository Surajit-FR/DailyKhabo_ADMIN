import { useDispatch, useSelector } from 'react-redux';
import { CouponListType } from '../../../config/DataTypes.config';
import Pagination from '../../../util/Pagination';
import Coupon from './Coupon';
import CustomAlert from '../../../util/CustomAlert';
import { clearCouponDelResp, clearDelError } from '../../../services/slices/UtilitySlice';
import { Dispatch } from 'redux';
import { handleCSVDownload } from '../../../helper/DownloadFile';
import { useState } from 'react';
import Loader from '../../../util/Loader';

type categoryList_props = {
    newData: Array<CouponListType>,
    pageCount: number,
    pageNumber: number,
    changePage: (data: { selected: number }) => void,
    selectedCoupons: string[],
    handleSelectAll: () => void,
    handleClearAll: () => void,
    handleCheckboxChange: (couponId: string, isChecked: boolean) => void,
    _TOKEN: any,
    itemsPerPage: number,
}

const CouponList = (
    {
        newData,
        pageCount,
        pageNumber,
        changePage,
        selectedCoupons,
        handleSelectAll,
        handleClearAll,
        handleCheckboxChange,
        _TOKEN,
        itemsPerPage,
    }: categoryList_props
): JSX.Element => {
    const { coupon_del_resp, del_error } = useSelector((state: any) => state.utilitySlice);
    const dispatch: Dispatch<any> = useDispatch();
    const allSelected = newData?.length > 0 && selectedCoupons.length === newData?.length;
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <>
            <Loader loading={loading} />
            
            <div className="col-12 col-lg-8 d-flex">
                <div className="card border shadow-none w-100">
                    <div className="card-body">
                        {/* Alert */}
                        {del_error?.success === false ? <CustomAlert type="danger" message={del_error?.message} onClose={() => dispatch(clearDelError())} /> : null}
                        {coupon_del_resp?.success === true ? <CustomAlert type="success" message={coupon_del_resp?.message} onClose={() => dispatch(clearCouponDelResp())} /> : null}

                        <div style={{ position: "sticky", top: 0, padding: "10px" }}>
                            <div className="my-2 d-flex justify-content-between align-items-center">
                                <div>
                                    {/* Select All & Clear All Button */}
                                    <button className={`btn btn-${!allSelected ? "primary" : "secondary"} me-4`} onClick={!allSelected ? handleSelectAll : handleClearAll}>
                                        {!allSelected ? "Select All" : "Clear All"}
                                    </button>
                                    {/* Delete Button */}
                                    {selectedCoupons?.length > 0 && (
                                        <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                            <i className="fa-solid fa-trash-can fa-shake me-2"></i> Delete Selected
                                        </button>
                                    )}
                                </div>
                                <div>
                                    {/* Download Excel Button */}
                                    <button className="btn btn-outline-success" onClick={() => handleCSVDownload(_TOKEN, setLoading)}>
                                        <i className='fa-solid fa-download fa-bounce me-2'></i>Download
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Coupon table */}
                        <div className="table-responsive" style={{ height: "600px" }}>

                            <table className="table align-middle">
                                <thead className="table-secondary" style={{ position: "sticky", top: 0, zIndex: 99, padding: "10px" }}>
                                    <tr>
                                        <th>#</th>
                                        <th>Coupon</th>
                                        <th>Discount Amount</th>
                                        <th>Coupon Status</th>
                                        <th>Expiry Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newData?.map((item, index) => (
                                        <Coupon
                                            index={index + pageNumber * itemsPerPage}
                                            key={item?._id}
                                            data={item}
                                            isSelected={selectedCoupons.includes(item._id)}
                                            handleCheckboxChange={handleCheckboxChange}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <nav className="float-end mt-3" aria-label="Page navigation">
                            <Pagination
                                pageNumber={pageNumber}
                                pageCount={pageCount}
                                changePage={changePage}
                            />
                        </nav>
                    </div>
                </div>
            </div >
        </>
    );
};

export default CouponList;