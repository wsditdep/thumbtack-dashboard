"use client";

import moment from "moment";
import UserDetail from "../UserDetail";
import { useState } from "react";
import toast from "react-hot-toast";

const WithdrawalTable = ({ list, authenticatedUser  }) => {
    const [dataForModel, setDataForModel] = useState();
    const [isUserDetail, setIsUserDetail] = useState(false);

    const openUserDetail = (val) => {
        setIsUserDetail(true);
        setDataForModel(val);
        return;
    }

    const copyToClipboard = (val) => {
        navigator.clipboard.writeText(val);
        return toast.success(`Copied - (${val})`);
    }

    const reloadPage = () => {
        return router.refresh();
    }

    return (
        <>
            {isUserDetail ? <UserDetail setIsUserDetail={setIsUserDetail} data={dataForModel} authenticatedUser={authenticatedUser} /> : <></>}
            <div className="d-tables">
                <div className="d-card">
                    <div className="d-card-header d-card-header-bg-color d-card-heading-font card-header-padding">
                        <div className="data-table-parent">
                            <div className="data-table-inner">
                                <p>WITHDRAWAL REQUEST</p>
                                <h3>Requested User</h3>
                            </div>
                            <div className="data-table-inner">
                                <div className="view-options">
                                    <button className="refresh-btn" onClick={()=> reloadPage()}>Refresh <i className="ml4 fa fa-refresh"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-card-body card-body-padding d-card-body-bg-color">
                        {
                            <table className="fadeUpAnimation">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Profile</th>
                                        <th>Role</th>
                                        <th>Username</th>
                                        <th>Parent</th>
                                        <th>Phone</th>
                                        <th>Ref No.</th>
                                        <th>Stage</th>
                                        <th>Account Level</th>
                                        <th>Account</th>
                                        <th>Withdrawal PIN</th>
                                        <th>Balance</th>
                                        <th>Joined Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        list?.map((data, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td className="table-profile flexCenter">
                                                    <div onClick={data?.withdrawalResponse?.status === "pending" ? () => openUserDetail(data) : undefined} className={data?.withdrawalResponse?.status === "pending" ? "table-profile-wrappers flexCenter withdrawalAnimation" : "table-profile-wrappers flexCenter"}>
                                                        {
                                                            data?.withdrawalResponse?.status === "pending"
                                                                ?
                                                                <i className="fa fa-bell withdrawal-request-bell"></i>
                                                                :
                                                                <p>{data?.username[0].toUpperCase()}</p>
                                                        }
                                                    </div>
                                                </td>
                                                <td><span className={data?.role === "user" ? "user_bg uppercase" : "practice_bg uppercase"}>{data?.role}</span></td>
                                                <td>{data?.username}</td>
                                                <td>{data?.adminRefCode}</td>
                                                <td>{data?.phone}</td>
                                                <td onClick={() => copyToClipboard(data?.refCode)} className="ref_id">{data?.refCode}</td>
                                                <td>{data?.journeyCurrentStage}/{data?.journeyMaxStage}</td>
                                                <td>{data?.accountLevel}</td>
                                                <td className="includeActiveSlider">{data?.accountStatus}</td>
                                                <td>{data?.withdrawalPin}</td>
                                                <td className={data?.accountBalance < 0 ? "identidy-negative cursor-pointer" : "cursor-pointer"}>${data?.accountBalance.toFixed(2)}</td>
                                                <td className="table-date">{moment(data?.createdAt).format("Do MMM YYYY, h:mm a")}</td>
                                                <td className="table-actions">
                                                    <ul>
                                                        <li className="includes-icon tool-tip-parent" onClick={() => openUserDetail(data)}>
                                                            <i className="fa fa-eye"></i>
                                                            <div className="tool-tip-child">
                                                                <p>View Details</p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default WithdrawalTable;