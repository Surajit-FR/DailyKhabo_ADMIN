import { useEffect } from "react";
import { renderChart7, renderChart8, renderChart9 } from "../../../util/charts/Chart";

const AtaglanceSection2 = () => {

    useEffect(() => {
        renderChart7([25, 66, 41, 59, 25, 44, 12, 36, 9, 21]);
        renderChart8([25, 66, 41, 59, 25, 44, 12, 36, 9, 21]);
        renderChart9([12, 14, 2, 47, 32, 44, 14, 55, 41, 69]);
    }, []);

    return (
        <>
            <div className="row row-cols-1 row-cols-lg-3">
                <div className="col">
                    <div className="card rounded-4">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="">
                                    <h4 className="mb-0">24.5K</h4>
                                    <p className="mb-0">Facebook Followers</p>
                                </div>
                                <div className="fs-2 text-facebook">
                                    <i className="bi bi-facebook"></i>
                                </div>
                            </div>
                            <div id="chart7"></div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card rounded-4">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="">
                                    <h4 className="mb-0">37.8K</h4>
                                    <p className="mb-0">Twitter Followers</p>
                                </div>
                                <div className="fs-2 text-twitter">
                                    <i className="bi bi-twitter"></i>
                                </div>
                            </div>
                            <div id="chart8"></div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card rounded-4">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="">
                                    <h4 className="mb-0">56.9K</h4>
                                    <p className="mb-0">Youtube Subscribers</p>
                                </div>
                                <div className="fs-2 text-youtube">
                                    <i className="bi bi-youtube"></i>
                                </div>
                            </div>
                            <div id="chart9"></div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default AtaglanceSection2;