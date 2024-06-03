import { useEffect, useState } from 'react';
import { renderChart3, renderChart4, renderChart5, renderChart6 } from '../../../util/charts/Chart';

const CircularProgressBarSection = (): JSX.Element => {
    const [orders, setOrders] = useState<number>(70);
    const [uniqueVisitors, setUniqueVisitors] = useState<number>(85);
    const [impressions, setImpressions] = useState<number>(60);
    const [followers, setFollowers] = useState<number>(90);

    useEffect(() => {
        renderChart3(orders);
        renderChart4(uniqueVisitors);
        renderChart5(impressions);
        renderChart6(followers);
    }, [orders, uniqueVisitors, impressions, followers]);

    console.log("CircularProgressBarSection", {
        setOrders,
        setUniqueVisitors,
        setImpressions,
        setFollowers,
    });


    return (
        <>
            <div className="row row-cols-1 row-cols-lg-4 radial-charts g-4">
                <div className="col">
                    <div className="card rounded-4">
                        <div className="card-body">
                            <div className="text-center">
                                <p className="mb-1">Orders</p>
                                <h4 className="">9,254</h4>
                            </div>
                            <div className="">
                                <div id="chart3"></div>
                            </div>
                            <div className="text-center">
                                <p className="mb-1">Completed</p>
                                <h4 className="">5632</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card rounded-4">
                        <div className="card-body">
                            <div className="text-center">
                                <p className="mb-1">Unique Visitors</p>
                                <h4 className="">5,2684</h4>
                            </div>
                            <div className="">
                                <div id="chart4"></div>
                            </div>
                            <div className="text-center">
                                <p className="mb-1">Increased since Last Week</p>
                                <h4 className="">25%</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card rounded-4">
                        <div className="card-body">
                            <div className="text-center">
                                <p className="mb-1">Impressions</p>
                                <h4 className="">7,362</h4>
                            </div>
                            <div className="">
                                <div id="chart5"></div>
                            </div>
                            <div className="text-center">
                                <p className="mb-1">Increased since Last Week</p>
                                <h4 className="">45%</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card rounded-4">
                        <div className="card-body">
                            <div className="text-center">
                                <p className="mb-1">Followers</p>
                                <h4 className="">4278K</h4>
                            </div>
                            <div className="">
                                <div id="chart6"></div>
                            </div>
                            <div className="text-center">
                                <p className="mb-1">Increased since Last Week</p>
                                <h4 className="">55%</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CircularProgressBarSection;
