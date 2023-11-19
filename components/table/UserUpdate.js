"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import MultiRangeSlider from "multi-range-slider-react";

const UserUpdate = ({ setIsUserUpdate, data, commission, authenticatedUser }) => {
    const router = useRouter();

    const [minValue, set_minValue] = useState(data.rangeValueMin);
    const [maxValue, set_maxValue] = useState(data.rangeValueMax);
    const [scoreVal, setScoreVal] = useState(data.creditScore);

    const handleInput = (e) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
    };

    const [loading, setLoading] = useState(false);
    const [userVal, setUserVal] = useState({
        _id: data._id,
        username: data.username,
        phone: data.phone,
        accountStatus: data.accountStatus,
        accountLevel: data.accountLevel,
        accountBalance: data.accountBalance,
        accountCommission: data.accountCommission,
        password: "",
        withdrawalPin: data.withdrawalPin,
        withdrawalAddress: data.withdrawalAddress,
    });

    const onChangeHandler = (e) => {
        setUserVal({ ...userVal, [e.target.name]: e.target.value });
    }

    const handleScoreVal = (selectedRating) => {
        setScoreVal(selectedRating);
    };

    const submitHandler = async () => {
        if (userVal?.withdrawalPin?.toString()?.length !== 4) {
            return toast.error("Withdrawal PIN shoud be 4 digit!");
        }

        try {
            setLoading(true);
            if (userVal.password === "") {
                var res = await fetch(`/api/users`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        id: userVal._id,
                        username: userVal.username,
                        phone: userVal.phone,
                        accountStatus: userVal.accountStatus,
                        accountLevel: userVal.accountLevel,
                        accountBalance: userVal.accountBalance,
                        accountCommission: userVal.accountCommission,
                        withdrawalPin: userVal.withdrawalPin,
                        withdrawalAddress: userVal.withdrawalAddress,
                        rangeValueMin: minValue,
                        rangeValueMax: maxValue,
                        creditScore: scoreVal,
                        authenticatedUser: authenticatedUser
                    })
                });
            } else {
                var res = await fetch(`/api/users`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        id: userVal._id,
                        username: userVal.username,
                        phone: userVal.phone,
                        accountStatus: userVal.accountStatus,
                        accountLevel: userVal.accountLevel,
                        accountBalance: userVal.accountBalance,
                        accountCommission: userVal.accountCommission,
                        password: userVal.password,
                        withdrawalPin: userVal.withdrawalPin,
                        withdrawalAddress: userVal.withdrawalAddress,
                        rangeValueMin: minValue,
                        rangeValueMax: maxValue,
                        creditScore: scoreVal,
                        authenticatedUser: authenticatedUser
                    })
                });
            }

            const data = await res.json();

            if (res.ok) {
                if (data.status === 201) {
                    router.refresh();
                    setIsUserUpdate(false);
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
            <div className="app-modal-weapper" onClick={() => setIsUserUpdate(false)}>
                <div className="app-modal-inner modal-animation" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-title">
                        <h3>UPDATE USER DETAILS</h3>
                        <span><i className="fa fa-times" onClick={() => setIsUserUpdate(false)}></i></span>
                    </div>
                    <form className="global-form" onSubmit={(e) => e.preventDefault()}>
                        <p>Edit and save the details of user "{data.username}"</p>
                        <div className="input-group">
                            <input
                                type="text"
                                name="username"
                                value={userVal.username}
                                onChange={(e) => onChangeHandler(e)}
                                readOnly
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
                            <select
                                type="number"
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
                            <select
                                type="number"
                                name="accountLevel"
                                value={userVal.accountLevel}
                                onChange={(e) => onChangeHandler(e)}
                            >
                                {
                                    commission?.map((data, index) => (
                                        <option key={index} value={data.commissionName}>{data.commissionName}</option>
                                    ))
                                }
                            </select>
                            <label>Account Level</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="number"
                                name="accountBalance"
                                value={userVal.accountBalance}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            <label>Account Balance</label>
                        </div>
                        {
                            authenticatedUser?.role === "superAdmin"
                                ?
                                <div className="input-group">
                                    <input
                                        type="number"
                                        name="accountCommission"
                                        value={userVal.accountCommission}
                                        onChange={(e) => onChangeHandler(e)}
                                    />
                                    <label>Account Commission</label>
                                </div>
                                :
                                <></>
                        }
                        <div className="input-group">
                            <input
                                type="text"
                                name="password"
                                value={userVal.password}
                                onChange={(e) => onChangeHandler(e)}
                                placeholder="New Password"
                            />
                            <label>Password</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="number"
                                name="withdrawalPin"
                                value={userVal.withdrawalPin}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            <label>WithdrawalPin</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                name="withdrawalAddress"
                                value={userVal.withdrawalAddress}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            <label>Wallet Address</label>
                        </div>
                        <div className="input-group">
                            <div className="multi-slider">
                                <div className="min_max_val">
                                    <h3>{minValue}</h3>
                                    <h3>{maxValue}</h3>
                                </div>
                                <MultiRangeSlider
                                    min={0}
                                    max={100}
                                    step={5}
                                    subSteps={false}
                                    minValue={minValue}
                                    maxValue={maxValue}
                                    onInput={(e) => {
                                        handleInput(e);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <div className="creditScore">
                                <p>CreditScore</p>
                                <div className="creditScoreWrapper">
                                    <ul>
                                        {[1, 2, 3, 4, 5, 6].map((val, index) => (
                                            <li
                                                key={index}
                                                className={val <= scoreVal ? "scoreActive" : ""}
                                                onClick={() => handleScoreVal(val)}
                                            >{val}</li>
                                        ))}
                                    </ul>
                                </div>
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

export default UserUpdate;