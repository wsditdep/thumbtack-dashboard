"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const AddCommission = ({ setIsAddPop }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [userVal, setUserVal] = useState({
        commissionName: "",
        commissionValue: ""
    });

    const onChangeHandler = (e) => {
        setUserVal({ ...userVal, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        if (!userVal.commissionName || !userVal.commissionValue) {
            return toast.error("Please fill the data properly and try again!");
        }

        try {
            setLoading(true);
            const res = await fetch(`/api/commission`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    commissionName: userVal.commissionName,
                    commissionValue: userVal.commissionValue
                })
            });

            const data = await res.json();

            if (res.ok) {
                if (data.success) {
                    router.refresh();
                    setIsAddPop(false);
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
            <div className="app-modal-weapper">
                <div className="app-modal-inner modal-animation">
                    <div className="modal-title">
                        <h3>ADD NEW COMMISSION | ACCOUNT LEVEL</h3>
                        <span><i className="fa fa-times" onClick={() => setIsAddPop(false)}></i></span>
                    </div>
                    <form className="global-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="input-group">
                            <input
                                type="number"
                                name="commissionValue"
                                value={userVal.commissionValue}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            <label>Commission Value</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                name="commissionName"
                                value={userVal.commissionName}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            <label>Commission Name</label>
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

export default AddCommission;