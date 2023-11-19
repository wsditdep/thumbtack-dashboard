"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const AddAdmin = ({ setIsAddAdmin }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [userVal, setUserVal] = useState({
        username: "",
        password: "",
        adminPassCode: "",
        role: "admin",
        walletAddress: "",
    });

    const onChangeHandler = (e) => {
        setUserVal({ ...userVal, [e.target.name]: e.target.value });
    }

    const submitHandler = async () => {
        if (!userVal.username || !userVal.password || !userVal.adminPassCode || !userVal.role || !userVal.walletAddress) {
            return toast.error("Please fill the data properly and try again!");
        }

        try {
            setLoading(true);
            const res = await fetch(`/api/admin`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    username: userVal.username,
                    password: userVal.password,
                    adminPassCode: userVal.adminPassCode,
                    role: userVal.role,
                    walletAddress: userVal.walletAddress
                })
            });

            const data = await res.json();

            if (res.ok) {
                if (data.success) {
                    router.refresh();
                    setIsAddAdmin(false);
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
            <div className="app-modal-weapper" onClick={() => setIsAddAdmin(false)}>
                <div className="app-modal-inner modal-animation" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-title">
                        <h3>ADD NEW ADMINISTRATOR</h3>
                        <span><i className="fa fa-times" onClick={() => setIsAddAdmin(false)}></i></span>
                    </div>
                    <form className="global-form" onSubmit={(e) => e.preventDefault()}>
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
                                type="text"
                                name="password"
                                value={userVal.password}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            <label>Password</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                name="adminPassCode"
                                maxLength="4"
                                value={userVal.adminPassCode}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            <label>Admin Passcode</label>
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

export default AddAdmin;