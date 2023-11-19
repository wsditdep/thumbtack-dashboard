"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const UpdateAdmin = ({ setIsUpdateAdmin, details }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [userVal, setUserVal] = useState({
        id: details?._id,
        accountStatus: details?.accountStatus,
        password: "",
        role: details?.role,
        walletAddress: details?.withdrawalAddress
    });

    const onChangeHandler = (e) => {
        setUserVal({ ...userVal, [e.target.name]: e.target.value });
    }

    const submitHandler = async () => {
        if (!userVal.accountStatus || !userVal.role) {
            return toast.error("Please fill the data properly and try again!");
        }

        try {
            setLoading(true);
            const res = await fetch(`/api/admin`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    id: userVal.id,
                    accountStatus: userVal.accountStatus,
                    password: userVal.password,
                    role: userVal.role,
                    walletAddress: userVal.walletAddress
                })
            });

            const data = await res.json();

            if (res.ok) {
                if (data.success) {
                    router.refresh();
                    setIsUpdateAdmin(false);
                    setLoading(false);
                    return toast.success(data.message);
                }
                setLoading(false);
                return toast.error(data.message);
            } else {
                setLoading(false);
                throw new Error("Faild to create new commission !");
            }

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }
    return (
        <>
            <div className="app-modal-weapper" onClick={() => setIsUpdateAdmin(false)}>
                <div className="app-modal-inner modal-animation" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-title">
                        <h3>UPDATE USER</h3>
                        <span><i className="fa fa-times" onClick={() => setIsUpdateAdmin(false)}></i></span>
                    </div>
                    <form className="global-form" onSubmit={(e) => e.preventDefault()}>
                        <p>Edit and save the details of admin "{details.username}"</p>
                        <div className="input-group">
                            <select
                                name="accountStatus"
                                value={userVal.accountStatus}
                                onChange={(e) => onChangeHandler(e)}
                            >
                                <option value="active">Active</option>
                                <option value="block">Block</option>
                            </select>
                            <label>Account Status</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                name="password"
                                placeholder="New Password"
                                value={userVal.password}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            <label>Password</label>
                        </div>
                        <div className="input-group">
                            <select
                                name="role"
                                value={userVal.role}
                                onChange={(e) => onChangeHandler(e)}
                            >
                                <option value="admin">Admin</option>
                                <option value="superAdmin">Super-Admin</option>
                            </select>
                            <label>Role</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                name="walletAddress"
                                value={userVal.walletAddress}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            <label>Wallet Address</label>
                            <p>This wallet address is binded with the relevant practice account</p>
                        </div>
                        <div className="global-submit-btn">
                            <button onClick={() => submitHandler()}> {loading ? <i className="fa fa-spinner g-loader"></i> : "PROCEED"} </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateAdmin;