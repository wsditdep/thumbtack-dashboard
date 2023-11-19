"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const AddDebit = ({ setIsRecharge, data, authenticatedUser }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [userVal, setUserVal] = useState({
        _id: data._id,
        balance: "",
    });

    const [selectedValue, setSelectedValue] = useState("credit");

    const onChangeHandler = (e) => {
        setUserVal({ ...userVal, [e.target.name]: e.target.value });
    }

    const submitHandler = async () => {
        if(userVal.balance === "") {
            return toast.error("Please enter amount");
        }

        try {
            setLoading(true);
            const res = await fetch(`/api/recharge`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    id: userVal._id,
                    processType: selectedValue,
                    balance: userVal.balance,
                    authenticatedUser: authenticatedUser
                })
            });

            const data = await res.json();

            if (res.ok) {
                if (data.status === 201) {
                    router.refresh();
                    setIsRecharge(false);
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
            <div className="app-modal-weapper" onClick={() => setIsRecharge(false)}>
                <div className="app-modal-inner modal-animation" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-title">
                        <h3>ADD DEBIT</h3>
                        <span><i className="fa fa-times" onClick={() => setIsRecharge(false)}></i></span>
                    </div>
                    <form className="global-form" onSubmit={(e) => e.preventDefault()}>
                        <p>Add amount for user "{data.username}"</p>
                        <div className="input-group">
                            <input
                                type="text"
                                readOnly
                                value={data.username}
                            />
                            <label>Member Username | Account</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                name="balance"
                                value={userVal.balance}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            <label>Amount</label>
                        </div>
                        <div className="input-group include-radio">
                            <div>
                                <input
                                    type="radio"
                                    value="credit"
                                    checked={selectedValue === "credit"}
                                    onChange={(e) => setSelectedValue(e.target.value)}
                                />
                                <span>Add</span>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    value="debit"
                                    checked={selectedValue === "debit"}
                                    onChange={(e) => setSelectedValue(e.target.value)}
                                />
                                <span>Subtract</span>
                            </div>
                        </div>
                        <div className="global-submit-btn">
                            <button
                                onClick={() => submitHandler()}
                                disabled={loading}
                            >
                                {loading ? <i className="fa fa-spinner g-loader"></i> : "PROCEED"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddDebit;