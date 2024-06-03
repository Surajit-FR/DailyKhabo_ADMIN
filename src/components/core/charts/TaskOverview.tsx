import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { renderChart2 } from '../../../util/charts/Chart';

const TaskOverview = (): JSX.Element => {
    const [completeData, setCompleteData] = useState<number>(100); // Single number instead of array
    const [inProgressData, setInProgressData] = useState<number>(80); // Single number instead of array
    const [startedData, setStartedData] = useState<number>(20); // Single number instead of array
    const [categories, setCategories] = useState<string[]>(['Completed', 'In Progress', 'Started']);

    useEffect(() => {
        renderChart2([completeData], [inProgressData], [startedData], categories); // Convert single number to array when passing to renderChart2
    }, [completeData, inProgressData, startedData, categories]);

    // Example function to update the chart data dynamically
    const updateChartData = () => {
        setCompleteData(130);
        setInProgressData(100);
        setStartedData(80);
        setCategories(['Updated Tasks']);
    };

    console.log("TaskOverview", updateChartData);


    return (
        <>
            <div className="col-12 col-lg-4 col-xl-4 d-flex">
                <div className="card w-100 rounded-4">
                    <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                            <h6 className="mb-0">Task Overview</h6>
                            <div className="fs-5 ms-auto dropdown">
                                <div className="dropdown-toggle dropdown-toggle-nocaret cursor-pointer" data-bs-toggle="dropdown"><i
                                    className="bi bi-three-dots"></i></div>
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
                        <div id="chart2"></div>
                    </div>
                    <ul className="list-group list-group-flush mb-0 shadow-none">
                        <li className="list-group-item bg-transparent border-top"><i
                            className="bi bi-circle-fill me-2 font-weight-bold text-primary"></i> Complete <span
                                className="float-end">{completeData}</span></li>
                        <li className="list-group-item bg-transparent"><i
                            className="bi bi-circle-fill me-2 font-weight-bold text-orange"></i> In Progress <span
                                className="float-end">{inProgressData}</span></li>
                        <li className="list-group-item bg-transparent"><i
                            className="bi bi-circle-fill me-2 font-weight-bold text-info"></i> Started <span
                                className="float-end">{startedData}</span></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default TaskOverview;