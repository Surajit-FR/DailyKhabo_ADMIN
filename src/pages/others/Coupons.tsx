import { Link } from "react-router-dom";
import AddCoupon from "../../components/core/coupons/AddCoupon";
import CouponList from "../../components/core/coupons/CouponList";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CouponListType } from "../../config/DataTypes.config";
import { deleteCoupons, getAllCoupons } from "../../services/slices/UtilitySlice";
import ConfModal from "../../util/ConfModal";
import { REACT_APP_CATEGORY_PER_PAGE } from "../../config/App.config";
import { DecryptData } from "../../helper/EncryptDecrypt";
import { checkPermissions, permissionsToCheck } from "../../helper/CheckPermissions";

const Coupons = (): JSX.Element => {
    const { coupon_data, coupon_del_resp } = useSelector((state: any) => state.utilitySlice);
    const dispatch: any = useDispatch();

    const token: string | null = window.localStorage.getItem("token");
    const _TOKEN = JSON.parse(token ?? 'null');
    const user: string | null = window.localStorage.getItem("user");
    const userData = DecryptData(user ?? 'null');

    const header = useMemo(() => ({
        headers: {
            Authorization: `Bearer ${_TOKEN}`
        }
    }), [_TOKEN]);

    const [pageNumber, setPageNumber] = useState<number>(0);
    const [couponData, setCouponData] = useState<CouponListType[]>([]);
    const [selectedCoupons, setSelectedCoupons] = useState<string[]>([]);
    const [filter, setFilter] = useState<string>("");

    const dataPerPage = REACT_APP_CATEGORY_PER_PAGE;
    const pageCount = coupon_data?.totalPages;

    const changePage = ({ selected }: { selected: number }) => {
        setPageNumber(selected);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
    };

    // permissionCheck
    const permissionCheckResult = checkPermissions(userData, permissionsToCheck);

    const handleSelectAll = () => {
        const allIds = couponData?.map(coupon => coupon._id);
        setSelectedCoupons(allIds);
    };

    const handleClearAll = useCallback(() => {
        setSelectedCoupons([]);
    }, []);

    const handleCheckboxChange = (couponId: string, isChecked: boolean) => {
        setSelectedCoupons(prevSelected =>
            isChecked ? [...prevSelected, couponId] : prevSelected.filter(id => id !== couponId)
        );
    };

    const handleDelete = () => {
        if (couponData) {
            dispatch(deleteCoupons({
                selectedIDs: selectedCoupons,
                page: (pageNumber + 1),
                pageSize: dataPerPage,
                header
            }));
        }
    };

    useEffect(() => {
        dispatch(getAllCoupons({
            page: (pageNumber + 1),
            pageSize: dataPerPage,
            isExpired: filter,
            header
        }));
    }, [dispatch, header, pageNumber, dataPerPage, filter]);

    useEffect(() => {
        setCouponData(coupon_data?.data);
    }, [coupon_data]);

    useEffect(() => {
        if (coupon_del_resp?.success) {
            handleClearAll();
        }
    }, [coupon_del_resp, handleClearAll]);

    return (
        <>
            {/* Delete Modal */}
            <ConfModal
                modalId="deleteModal"
                modalHeading="Want To Delete The Selected Coupons?"
                onDelete={handleDelete}
            />

            <main className="page-content">
                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                    <div className="breadcrumb-title pe-3">Pricing</div>
                    <div className="ps-3">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0 p-0">
                                <li className="breadcrumb-item"><Link to="#"><i className="bx bx-home-alt"></i></Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Create Coupons</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-10" />
                            <div className="col-md-2 text-end py-2">
                                <select className="form-select" value={filter} onChange={handleFilterChange}>
                                    <option value="">All</option>
                                    <option value="false">Active</option>
                                    <option value="true">Expired</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {
                                (permissionCheckResult?.write_create || permissionCheckResult?.all) &&
                                <AddCoupon
                                    pageCount={pageCount}
                                    pageNumber={pageNumber}
                                    changePage={changePage}
                                />
                            }

                            <CouponList
                                newData={couponData}
                                pageCount={pageCount}
                                pageNumber={pageNumber}
                                itemsPerPage={dataPerPage}
                                changePage={changePage}
                                selectedCoupons={selectedCoupons}
                                handleSelectAll={handleSelectAll}
                                handleClearAll={handleClearAll}
                                handleCheckboxChange={handleCheckboxChange}
                                _TOKEN={_TOKEN}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Coupons;