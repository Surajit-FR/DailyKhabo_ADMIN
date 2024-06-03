import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { renderChart1 } from '../../../util/charts/Chart';

const RevenueHistory = (): JSX.Element => {
    const [revenueData, setRevenueData] = useState<number[]>([50, 80, 37, 70, 41, 98, 53, 40, 66, 75, 55, 60]);
    const [investmentData, setInvestmentData] = useState<number[]>([70, 91, 40, 75, 50, 120, 59, 53, 81, 100, 80, 95]);
    const [categories, setCategories] = useState<string[]>(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);

    useEffect(() => {
        renderChart1(revenueData, investmentData, categories);
    }, [revenueData, investmentData, categories]);

    // Example function to update the chart data dynamically
    const updateChartData = () => {
        setRevenueData([60, 90, 45, 80, 50, 110, 65, 50, 75, 85, 65, 70]);
        setInvestmentData([80, 100, 50, 85, 60, 130, 70, 60, 90, 110, 90, 105]);
        setCategories(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
    };

    console.log("RevenueHistory", updateChartData);

    return (
        <>
            <div className="col-12 col-lg-8 col-xl-8 d-flex">
                <div className="card w-100 rounded-4">
                    <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                            <h6 className="mb-0">Revenue History</h6>
                            <div className="fs-5 ms-auto dropdown">
                                <div className="dropdown-toggle dropdown-toggle-nocaret cursor-pointer" data-bs-toggle="dropdown">
                                    <i className="bi bi-three-dots"></i>
                                </div>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="#">Action</Link></li>
                                    <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <div>
                                <h4 className="text-success mb-0">$9,279</h4>
                                <p className="mb-0">Revenue</p>
                            </div>
                            <div className="vr"></div>
                            <div>
                                <h4 className="text-pink mb-0">$5,629</h4>
                                <p className="mb-0">Investment</p>
                            </div>
                        </div>
                        <div id="chart1"></div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default RevenueHistory;