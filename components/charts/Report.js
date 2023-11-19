const Report = ({ reportData }) => {
    return (
        <>
            <div className="report-card-wrapper">
                <div className="report-card-parent">
                    <div className="report-card-childs">
                        <div className="report-card-inner-parent">
                            <div className="report-card-inner-childs report-primary">
                                <i className="fa fa-toggle-on"></i>
                            </div>
                            <div className="report-card-inner-childs">
                                <p>ACTIVE USER</p>
                            </div>
                        </div>
                        <div className="report-counter">
                            <i className="fa fa-arrow-up increase"></i><h3>{reportData?.allUser}</h3>
                        </div>
                    </div>
                    <div className="report-card-childs">
                        <div className="report-card-inner-parent">
                            <div className="report-card-inner-childs report-bright">
                                <i className="fa fa-chart-line"></i>
                            </div>
                            <div className="report-card-inner-childs">
                                <p>ADMINISTRATOR</p>
                            </div>
                        </div>
                        <div className="report-counter">
                            <i className="fa fa-arrow-up increase"></i><h3>{reportData?.adminCount}</h3>
                        </div>
                    </div>
                    <div className="report-card-childs">
                        <div className="report-card-inner-parent">
                            <div className="report-card-inner-childs report-green">
                                <i className="fa fa-users"></i>
                            </div>
                            <div className="report-card-inner-childs">
                                <p>CUSTOMER</p>
                            </div>
                        </div>
                        <div className="report-counter">
                            <i className="fa fa-arrow-up increase"></i><h3>{reportData?.userCount}</h3>
                        </div>
                    </div>
                    <div className="report-card-childs">
                        <div className="report-card-inner-parent">
                            <div className="report-card-inner-childs report-purple">
                                <i className="fa fa-phone"></i>
                            </div>
                            <div className="report-card-inner-childs">
                                <p>PRACTICE ACCOUNT</p>
                            </div>
                        </div>
                        <div className="report-counter">
                            <i className="fa fa-arrow-up increase"></i><h3>{reportData?.practiceCount}</h3>
                        </div>
                    </div>
                </div>
            </div></>
    )
}

export default Report;