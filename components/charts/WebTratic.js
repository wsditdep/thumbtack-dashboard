import Trafic from "./analytics/Trafic";
import Analytics from "./analytics/analytics";

const WebTrafic = () => {
    return (
        <>
            <div className="webtrafic-wrapper">
                <div className="webtrafic-parents">
                    <div className="webtrafic-childs">
                        <div className="show-recent-users">
                            <div className="d-card">
                                <div className="d-card-header">
                                    <p>PROGRESS</p>
                                    <h3>Recent Users</h3>
                                </div>
                                <div className="d-card-body">
                                    <ul>
                                        <li>
                                            <div className="useranalytic-profile-picture">
                                                <div className="useranalytic-profile-picture-inner">
                                                    <img src="https://tokyo-black-nextjs-js.bloomui.com/static/images/avatars/1.jpg" alt="useranalytics" />
                                                </div>
                                                <div className="useranalytic-profile-picture-inner">
                                                    <h2>Munroe Dacks</h2>
                                                    <p>Senior Cost Accountant at</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="card-action-btn">
                                                <span className="recent-user-date">30 Aug 2023 - 3:35PM</span>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <div className="useranalytic-profile-picture">
                                                <div className="useranalytic-profile-picture-inner">
                                                    <img src="https://tokyo-black-nextjs-js.bloomui.com/static/images/avatars/2.jpg" alt="useranalytics" />
                                                </div>
                                                <div className="useranalytic-profile-picture-inner">
                                                    <h2>Munroe Dacks</h2>
                                                    <p>Senior Cost Accountant at</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="card-action-btn">
                                                <span className="recent-user-date">28 Aug 2023 - 3:35PM</span>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <div className="useranalytic-profile-picture">
                                                <div className="useranalytic-profile-picture-inner">
                                                    <img src="https://tokyo-black-nextjs-js.bloomui.com/static/images/avatars/3.jpg" alt="useranalytics" />
                                                </div>
                                                <div className="useranalytic-profile-picture-inner">
                                                    <h2>Munroe Dacks</h2>
                                                    <p>Senior Cost Accountant at</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="card-action-btn">
                                                <span className="recent-user-date">25 Aug 2023 - 3:35PM</span>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <div className="useranalytic-profile-picture">
                                                <div className="useranalytic-profile-picture-inner">
                                                    <img src="https://tokyo-black-nextjs-js.bloomui.com/static/images/avatars/4.jpg" alt="useranalytics" />
                                                </div>
                                                <div className="useranalytic-profile-picture-inner">
                                                    <h2>Munroe Dacks</h2>
                                                    <p>Senior Cost Accountant at</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="card-action-btn">
                                                <span className="recent-user-date">22 Aug 2023 - 9:00PM</span>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <div className="useranalytic-profile-picture">
                                                <div className="useranalytic-profile-picture-inner">
                                                    <img src="https://tokyo-black-nextjs-js.bloomui.com/static/images/avatars/5.jpg" alt="useranalytics" />
                                                </div>
                                                <div className="useranalytic-profile-picture-inner">
                                                    <h2>Munroe Dacks</h2>
                                                    <p>Senior Cost Accountant at</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="card-action-btn">
                                                <span className="recent-user-date">21 Aug 2023 - 4:35PM</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="webtrafic-childs">
                        <Trafic />
                    </div>
                </div>
            </div>
            <div className="mt">
                <Analytics />
            </div>
        </>
    )
}

export default WebTrafic;