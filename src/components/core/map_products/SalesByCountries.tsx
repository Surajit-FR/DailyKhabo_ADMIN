import React from 'react';
import { VectorMap } from '@react-jvectormap/core';
import { worldMill } from '@react-jvectormap/world';
import { Link } from 'react-router-dom';

const SalesByCountries = (): JSX.Element => {
    const data: { [key: string]: number } = {
        RU: 28000,
        AU: 58000,
        US: 72000,
        IN: 68000,
    };

    const colorScale = {
        RU: '#3461ff',
        AU: '#ffcb32',
        US: '#12bf24',
        IN: '#6c757d',
    };

    return (
        <>
            <div className="col-12 col-lg-6 col-xl-6 d-flex">
                <div className="card rounded-4 w-100">
                    <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                            <h6 className="mb-0">Sales By Countries</h6>
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
                        <VectorMap
                            map={worldMill}
                            backgroundColor="transparent"
                            regionStyle={{
                                initial: {
                                    fill: '#e4e4e4',
                                    fillOpacity: 0.9,
                                    stroke: 'none',
                                    strokeWidth: 0,
                                    strokeOpacity: 0
                                },
                            }}
                            series={{
                                regions: [{
                                    values: data,
                                    scale: Object.values(colorScale),
                                    normalizeFunction: 'polynomial',
                                    attribute: ''
                                }]
                            }}
                            onRegionTipShow={(e, el, code) => {
                                if (data[code as keyof typeof data]) {
                                    (el as any).html(`${(el as any).html()} (Sales: ${data[code as keyof typeof data]})`);
                                }
                            }}
                            style={{
                                height: '242px'
                            }}
                        />
                    </div>
                    <div className="table-responsive">
                        <table className="table align-items-center">
                            <tbody>
                                <tr>
                                    <td><i className="flag-icon flag-icon-gb"></i></td>
                                    <td><i className="bi bi-circle-fill me-2 text-primary"></i> Russia</td>
                                    <td>
                                        <p className="mb-0">Sales: <span className="fw-bold">28,000</span></p>
                                    </td>
                                    <td>40%</td>
                                </tr>
                                <tr>
                                    <td><i className="flag-icon flag-icon-au"></i></td>
                                    <td><i className="bi bi-circle-fill me-2" style={{ color: "rgb(41, 192, 37)" }}></i> Australia</td>
                                    <td>
                                        <p className="mb-0">Sales: <span className="fw-bold">58,000</span></p>
                                    </td>
                                    <td>60%</td>
                                </tr>
                                <tr>
                                    <td><i className="flag-icon flag-icon-us"></i></td>
                                    <td><i className="bi bi-circle-fill me-2" style={{ color: "rgb(108, 117, 125)" }}></i> United States</td>
                                    <td>
                                        <p className="mb-0">Sales: <span className="fw-bold">72,000</span></p>
                                    </td>
                                    <td>30%</td>
                                </tr>
                                <tr>
                                    <td><i className="flag-icon flag-icon-in"></i></td>
                                    <td><i className="bi bi-circle-fill me-2" style={{ color: "rgb(80, 140, 97)" }}></i> India</td>
                                    <td>
                                        <p className="mb-0">Sales: <span className="fw-bold">68,000</span></p>
                                    </td>
                                    <td>55%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SalesByCountries;