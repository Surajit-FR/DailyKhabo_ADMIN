const AtaglanceSection = (): JSX.Element => {
    return (
        <>
            <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-4">
                <div className="col">
                    <div className="card rounded-4">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="">
                                    <p className="mb-1">Total Orders</p>
                                    <h4 className="mb-0">5.8K</h4>
                                    <p className="mb-0 mt-2 font-13"><i className="bi bi-arrow-up"></i><span>22.5% from last week</span></p>
                                </div>
                                <div className="ms-auto widget-icon bg-primary text-white">
                                    <i className="bi bi-basket2"></i>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card rounded-4">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="">
                                    <p className="mb-1">Total Income</p>
                                    <h4 className="mb-0">$9,786</h4>
                                    <p className="mb-0 mt-2 font-13"><i className="bi bi-arrow-up"></i><span>13.2% from last week</span></p>
                                </div>
                                <div className="ms-auto widget-icon bg-success text-white">
                                    <i className="bi bi-currency-dollar"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card rounded-4">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="">
                                    <p className="mb-1">Total Views</p>
                                    <h4 className="mb-0">875</h4>
                                    <p className="mb-0 mt-2 font-13"><i className="bi bi-arrow-up"></i><span>12.3% from last week</span></p>
                                </div>
                                <div className="ms-auto widget-icon bg-orange text-white">
                                    <i className="bi bi-emoji-heart-eyes"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card rounded-4">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="">
                                    <p className="mb-1">New Clients</p>
                                    <h4 className="mb-0">9853</h4>
                                    <p className="mb-0 mt-2 font-13"><i className="bi bi-arrow-up"></i><span>32.7% from last week</span></p>
                                </div>
                                <div className="ms-auto widget-icon bg-info text-white">
                                    <i className="bi bi-people-fill"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AtaglanceSection;