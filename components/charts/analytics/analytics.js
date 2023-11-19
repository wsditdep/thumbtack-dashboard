"use client";

import CommissionAnalytics from "./CommissionAnalytic";
import AccountAnalysis from "./AccountAnalysis";

const Analytics = () => {
    return (
        <>
            <div className="analytics-wrapper">
                <div className="analytics-wrapper-parents">
                    <div className="analytics-wrapper-childs">
                        <div className="d-card">
                            <div className="d-card-header">
                                <p>ANALYTICS</p>
                                <h3>Account Level</h3>
                            </div>
                            <div className="d-card-body d-card-body-bg-color card-body-padding">
                                <CommissionAnalytics />
                            </div>
                        </div>
                    </div>
                    <div className="analytics-wrapper-childs">
                        <div className="d-card">
                            <div className="d-card-header">
                                <p>ANALYTICS</p>
                                <h3>Account Status</h3>
                            </div>
                            <div className="d-card-body d-card-body-bg-color card-body-padding">
                                <AccountAnalysis />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Analytics;
