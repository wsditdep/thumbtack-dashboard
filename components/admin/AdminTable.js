"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import AddAdmin from "./AddAdmin";
import UpdateAdmin from "./UpdateAdmin";
import DeleteAdmin from "./DeleteAdmin";
import moment from "moment";

const AdminTable = ({ list, user }) => {
    const [cardView, setCardView] = useState(false);
    const [isAddAdmin, setIsAddAdmin] = useState(false);
    const [isUpdateAdmin, setIsUpdateAdmin] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [dataForModel, setDataForModel] = useState();

    const copyToClipboard = (val) => {
        navigator.clipboard.writeText(val);
        return toast.success(`Copied - (${val})`);
    }

    const proceedToUpdate = (val) => {
        setDataForModel(val);
        setIsUpdateAdmin(true);
        return;
    }

    const proceedToDelete = (val) => {
        setDataForModel(val);
        setIsDelete(true);
        return;
    }

    return (
        <>
            {isAddAdmin ? <AddAdmin setIsAddAdmin={setIsAddAdmin} /> : <></>}
            {isUpdateAdmin ? <UpdateAdmin setIsUpdateAdmin={setIsUpdateAdmin} details={dataForModel} /> : <></>}
            {isDelete ? <DeleteAdmin setIsDelete={setIsDelete} details={dataForModel} /> : <></>}
            <div className="d-tables">
                <div className="d-card">
                    <div className="d-card-header d-card-header-bg-color d-card-heading-font card-header-padding">
                        <div className="data-table-parent">
                            <div className="data-table-inner">
                                <p>ADMINISTRATION LIST</p>
                                <h3>ADMINISTRATION</h3>
                            </div>
                            <div className="data-table-inner">
                                <div className="view-options">
                                    <button className="tool-tip-parent" onClick={() => setCardView(true)}>
                                        <i className="fa fa-table"></i>
                                        <div className="tool-tip-child">
                                            <p>Grid View</p>
                                        </div>
                                    </button>
                                    <button className="tool-tip-parent" onClick={() => setCardView(false)}>
                                        <i className="fa fa-th"></i>
                                        <div className="tool-tip-child">
                                            <p>List View</p>
                                        </div>
                                    </button>
                                </div>
                                {
                                    user.role === "superAdmin"
                                        ?
                                        <button className="d-btn d-btn-bright-radial" onClick={() => setIsAddAdmin(true)}>New <i className="fa fa-angle-right"></i></button>
                                        :
                                        <></>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="d-card-body card-body-padding d-card-body-bg-color">
                        {
                            cardView
                                ?
                                <>
                                    <div className="app-card-parent fadeUpAnimation">
                                        {
                                            list?.map((data, index) => (
                                                <div className="app-card" key={index}>
                                                    <div className="app-card-profile">
                                                        <div className="app-card-profile-wrapper">
                                                            <p>{data?.username[0].toUpperCase()}</p>
                                                        </div>
                                                        <h3 className="mt">{data.username}</h3>
                                                        <span className="user-tag">User</span>
                                                    </div>
                                                    <ul className="mt">
                                                        <li>
                                                            <p>Username</p>
                                                            <span>{data?.username}</span>
                                                        </li>
                                                        <li>
                                                            <p>Phone</p>
                                                            <span>{data?.phone}</span>
                                                        </li>
                                                        <li>
                                                            <p>Role</p>
                                                            <span>{data?.role}</span>
                                                        </li>
                                                        <li>
                                                            <p>Account Status</p>
                                                            <span>{data?.accountStatus}</span>
                                                        </li>
                                                        <li>
                                                            <p>Account Balance</p>
                                                            <span>$ {data?.accountBalance}</span>
                                                        </li>
                                                    </ul>
                                                    {/* <div className="table-actions-with-card">
                                                        <ul>
                                                            <li className="includes-icon"><i className="fa fa-eye"></i></li>
                                                            <li className="includes-icon"><i className="fa fa-pen"></i></li>
                                                            <li className="includes-btns">
                                                                More<i className="fa fa-angle-down ml4"></i>
                                                                <div className="table-action-inner">
                                                                    <ol onClick={() => openRechargeModal(data)}><i className="fa fa-angle-right mr4"></i>Add Debit</ol>
                                                                    <ol><i className="fa fa-angle-right mr4"></i>Set Continuous Single</ol>
                                                                    <ol><i className="fa fa-angle-right mr4"></i>Reset Journey</ol>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div> */}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </>
                                :
                                <>
                                    <table className="fadeUpAnimation">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Profile</th>
                                                <th>Role</th>
                                                <th>Ref No.</th>
                                                <th>Username</th>
                                                <th>Account Status</th>
                                                <th>Created At</th>
                                                {
                                                    user?.role === "superAdmin"
                                                        ?
                                                        <th>Action</th>
                                                        :
                                                        <></>
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                list?.map((data, index) => (
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td className="table-profile flexCenter">
                                                            <div className="table-profile-wrappers flexCenter">
                                                                <p>{data?.username[0].toUpperCase()}</p>
                                                            </div>
                                                        </td>
                                                        <td><span className={data?.role === "superAdmin" ? "superadmin_bg uppercase" : "admin_bg uppercase"}>{data?.role}</span></td>
                                                        <td onClick={() => copyToClipboard(data?.refCode)} className="ref_id">{data?.refCode}</td>
                                                        <td>{data?.username}</td>
                                                        <td className="capitalize">{data?.accountStatus}</td>
                                                        <td className="table-date">{moment(data?.createdAt).format("Do MMM YYYY, h:mm a")}</td>
                                                        {
                                                            user?.role === "superAdmin"
                                                                ?
                                                                <td className="table-actions">
                                                                    <ul>
                                                                        <li className="includes-icon" onClick={() => proceedToUpdate(data)}><i className="fa fa-pen"></i></li>
                                                                        <li className="includes-icon"  onClick={() => proceedToDelete(data)}><i className="fa fa-trash-alt"></i></li>
                                                                    </ul>
                                                                </td>
                                                                :
                                                                <></>
                                                        }
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminTable;