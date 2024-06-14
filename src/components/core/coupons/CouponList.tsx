import { useDispatch, useSelector } from 'react-redux';
import { CouponListType, PermissionCheckResult } from '../../../config/DataTypes.config';
import Pagination from '../../../util/Pagination';
import Coupon from './Coupon';
import CustomAlert from '../../../util/CustomAlert';
import { clearCouponDelResp, clearDelError } from '../../../services/slices/UtilitySlice';
import { Dispatch } from 'redux';

type categoryList_props = {
    newData: Array<CouponListType>,
    pageCount: number,
    pageNumber: number,
    changePage: (data: { selected: number }) => void,
    selectedCoupons: string[],
    handleSelectAll: () => void,
    handleClearAll: () => void,
    handleCheckboxChange: (couponId: string, isChecked: boolean) => void,
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
        handleCheckboxChange
    }: categoryList_props
): JSX.Element => {
    const { coupon_del_resp, del_error } = useSelector((state: any) => state.utilitySlice);
    const dispatch: Dispatch<any> = useDispatch();

    const allSelected = newData?.length > 0 && selectedCoupons.length === newData?.length;

    return (
        <div className="col-12 col-lg-8 d-flex">
            <div className="card border shadow-none w-100">
                <div className="card-body">
                    {/* Alert */}
                    {del_error?.success === false ? <CustomAlert type="danger" message={del_error?.message} onClose={() => dispatch(clearDelError())} /> : null}
                    {coupon_del_resp?.success === true ? <CustomAlert type="success" message={coupon_del_resp?.message} onClose={() => dispatch(clearCouponDelResp())} /> : null}

                    <div style={{ position: "sticky", top: 0, padding: "10px" }}>
                        <div className="my-2 d-flex justify-content-between align-items-center">
                            <div>
                                <button className={`btn btn-${!allSelected ? "primary" : "secondary"} me-2`} onClick={!allSelected ? handleSelectAll : handleClearAll}>
                                    {!allSelected ? "Select All" : "Clear All"}
                                </button>
                            </div>
                            <div>
                                {/* Delete Button */}
                                {selectedCoupons?.length > 0 && (
                                    <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                        Delete Selected Coupons
                                    </button>
                                )}
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
                                        index={index}
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
    );
};

export default CouponList;