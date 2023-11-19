"use client";

import Image from "next/image";
import bot from "@/public/bot.gif";
import { useState } from "react";
import moment from "moment";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UserDetail = ({ setIsUserDetail, data, authenticatedUser }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [isApprove, setIsApprove] = useState(false);
    const [isReject, setIsReject] = useState(false);
    var userData = data;

    const proceedForApprove = () => {
        return setIsApprove(true);
    }

    const proceedForReject = () => {
        return setIsReject(true);
    }

    const approveWithdrawal = async (val) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/withdrawal`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    id: userData._id,
                    adminResponse: val === "approved" ? "approved" : "rejected",
                    withdrawalAmount: userData?.withdrawalResponse?.withdrawalAmount,
                    authenticatedUser: authenticatedUser
                })
            });

            const data = await res.json();

            if (res.ok) {
                if (data.status === 200) {
                    setIsApprove(false);
                    setIsUserDetail(false)
                    setLoading(false);
                    router.refresh();
                    return toast.success(data.message);
                }
                setLoading(false);
                return toast.error(data.message);
            } else {
                setLoading(false);
                throw new Error("Faild to give the withdrawal response!");
            }

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <>
            {
                isApprove
                    ?
                    <div className="approval-pop">
                        <div className="approval-pop-inner">
                            <div className="approval-pop-inner-childs">
                                <Image
                                    src={bot}
                                    alt="bot"
                                    height={100}
                                    width={100}
                                    draggable={false}
                                />
                            </div>
                            <div className="approval-pop-inner-childs">
                                <h3>Wait...Please cross check before proceeding!</h3>
                                <p>Is everything seems to be good?</p>
                                <h4>Are you sure for approval?</h4>
                                <div className="approval-action">
                                    <button className="approve" onClick={() => approveWithdrawal("approved")}> {loading ? <i className="fa fa-spinner g-loader"></i> : "Yes, I checked"}</button>
                                    <button className="cancel" onClick={() => setIsApprove(false)}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
            }
            {
                isReject
                    ?
                    <div className="approval-pop">
                        <div className="approval-pop-inner">
                            <div className="approval-pop-inner-childs">
                                <Image
                                    src={bot}
                                    alt="bot"
                                    height={100}
                                    width={100}
                                    draggable={false}
                                />
                            </div>
                            <div className="approval-pop-inner-childs">
                                <p>Please confirm before proceeding?</p>
                                <h4>Are you sure for this rejection?</h4>
                                <div className="approval-action">
                                    <button className="approve"  onClick={() => approveWithdrawal("rejected")}>Yes</button>
                                    <button className="cancel" onClick={() => setIsReject(false)}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
            }
            <div className="app-modal-weapper" onClick={() => setIsUserDetail(false)}>
                <div className="app-modal-inner modal-animation" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-title">
                        <h3>USER DETAILS - <span className="bold-text">{data?.username}</span></h3>
                        <span><i className="fa fa-times" onClick={() => setIsUserDetail(false)}></i></span>
                    </div>
                    <div className="show-user-details">
                        <div className="show-user-details-wrapper">
                            <h3>PERSONAL INFO</h3>
                            <ul>
                                <li>
                                    <h2>Username:</h2>
                                    <p>{data?.username}</p>
                                </li>
                                <li>
                                    <h2>Phone:</h2>
                                    <p>{data?.phone}</p>
                                </li>
                                <li>
                                    <h2>Reference Code:</h2>
                                    <p>{data?.refCode}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="show-user-details-wrapper mt-lg-3">
                            <h3>ACCOUNT INFO</h3>
                            <ul>
                                <li>
                                    <h2>Account status:</h2>
                                    <p>{data?.accountStatus}</p>
                                </li>
                                <li>
                                    <h2>Role:</h2>
                                    <p>{data?.role}</p>
                                </li>
                                <li>
                                    <h2>Account Level:</h2>
                                    <p>{data?.accountLevel}</p>
                                </li>
                                <li>
                                    <h2>Account Balnace:</h2>
                                    <p>$ {(data?.accountBalance).toFixed(2)}</p>
                                </li>
                                <li>
                                    <h2>Wallet Address:</h2>
                                    <p>{data?.withdrawalAddress}</p>
                                </li>
                                <li>
                                    <h2>Network Type:</h2>
                                    <p>{data?.networkType}</p>
                                </li>
                            </ul>
                        </div>
                        {
                            data?.withdrawalResponse
                                ?
                                <div className="show-user-details-wrapper mt-lg-3">
                                    <h3>WITHDRAWAL REQUEST</h3>
                                    <ul>
                                        <li>
                                            <h2>Withdrawal status:</h2>
                                            <p>{data?.withdrawalResponse?.status}</p>
                                        </li>
                                        <li>
                                            <h2>Withdrawal Name:</h2>
                                            <p>{data?.withdrawalResponse?.withdrawalName}</p>
                                        </li>
                                        <li>
                                            <h2>Withdrawal Address:</h2>
                                            <p>{data?.withdrawalResponse?.withdrawalAddress}</p>
                                        </li>
                                        <li>
                                            <h2>Network Type:</h2>
                                            <p>{data?.withdrawalResponse?.networkType}</p>
                                        </li>
                                        <li>
                                            <h2>Withdrawal Request Time:</h2>
                                            <p>{moment(data?.withdrawalResponse?.timeStamp).format("Do MMM YYYY, h:mm a")}</p>
                                        </li>
                                        <li>
                                            <h2>Withdrawal Amount:</h2>
                                            <p>$ {(data?.withdrawalResponse?.withdrawalAmount).toFixed(2)}</p>
                                        </li>
                                    </ul>
                                    <div className="withdrawal-actions">
                                        <button className="approrve" onClick={() => proceedForApprove()}>APPROVE</button>
                                        <button className="reject" onClick={() => proceedForReject()}>REJECT</button>
                                    </div>
                                </div>
                                :
                                <></>

                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserDetail;