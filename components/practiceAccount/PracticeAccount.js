"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const PracticeAccount = ({ setIsPracticeAccount, data, authenticatedUser }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [userVal, setUserVal] = useState({
        username: "",
        phone: "",
        password: "",
        withdrawalPassword: "",
        adminRefCode: authenticatedUser?.refCode,
        connectedAccount: data._id,
        walletAddress: authenticatedUser?.withdrawalAddress,
    });


    const onChangeHandler = (e) => {
        setUserVal({ ...userVal, [e.target.name]: e.target.value });
    }

    const submitHandler = async () => {
        if (!userVal.username || !userVal.phone || !userVal.password || !userVal.withdrawalPassword) {
            return toast.error("Required field is missing!");
        }

        if (userVal.withdrawalPassword.length !== 4) {
            return toast.error("Withdrawal PIN shoud be 4 digit!");
        }

        try {
            setLoading(true);
            const res = await fetch(`/api/users`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    username: userVal.username,
                    phone: userVal.phone,
                    password: userVal.password,
                    withdrawalPassword: userVal.withdrawalPassword,
                    adminRefCode: userVal.adminRefCode,
                    connectedAccount: userVal.connectedAccount
                })
            });

            const data = await res.json();
            console.log(data)

            if (res.ok) {
                if (data.status === 201) {
                    router.refresh();
                    setIsPracticeAccount(false);
                    setLoading(false);
                    return toast.success(data.message);
                }
                setLoading(false);
                return toast.error(data.message);
            } else {
                setLoading(false);
                throw new Error("Faild to recharge!");
            }

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <>
            <div className="app-modal-weapper" onClick={() => setIsPracticeAccount(false)}>
                <div className="app-modal-inner modal-animation" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-title">
                        <h3>CREATE PRACTICE ACCOUNT | DEMO ACCOUNT</h3>
                        <span onClick={() => setIsPracticeAccount(false)}><i className="fa fa-times"></i></span>
                    </div>
                    <form className="global-form" onSubmit={(e) => e.preventDefault()}>
                        <p>Create practice account for<span className="bold-text ml4">{`${data.username}`}</span></p>
                        <div className="input-group">
                            <input
                                type="text"
                                name="username"
                                value={userVal.username}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            <label>Username</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="number"
                                name="phone"
                                value={userVal.phone}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            <label>Phone</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                name="password"
                                value={userVal.password}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            <label>Password</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="number"
                                name="withdrawalPassword"
                                maxLength="4"
                                value={userVal.withdrawalPassword}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            <label>Withdrawal Password</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                readOnly
                                name="adminRefCode"
                                value={userVal.adminRefCode}
                            />
                            <label>Admin Reference Code</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                readOnly
                                name="walletAddress"
                                value={userVal.walletAddress}
                            />
                            <label>Wallet Address</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                readOnly
                                name="connectedAccount"
                                value={userVal.connectedAccount}
                            />
                            <label>Connected Account</label>
                        </div>
                        <div className="global-submit-btn">
                            <button onClick={() => submitHandler()}> {loading ? <i className="fa fa-spinner g-loader"></i> : "CREATE ACCOUNT"} </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PracticeAccount;