"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const DeleteCommission = ({ setIsDelete, details }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/commission`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    id: details._id,
                })
            });

            const data = await res.json();

            if (res.ok) {
                router.refresh();
                setIsDelete(false);
                setLoading(false);
                return toast.success(data.message);
            } else {
                setLoading(false);
                throw new Error("Faild to delete!");
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
                        <h3>ALERT!!! Do you want to delete commission <span className="bold-text">"{details.commissionName}"</span></h3>
                        <span><i className="fa fa-times" onClick={() => setIsDelete(false)}></i></span>
                    </div>
                    <div className="global-submit-btn-alt">
                        <button onClick={() => submitHandler()} className="delete-btn"> {loading ? <i className="fa fa-spinner g-loader"></i> : "DELETE NOW"} </button>
                        <button onClick={() => setIsDelete(false)} className="cancel-btn"> CANCEL</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteCommission;