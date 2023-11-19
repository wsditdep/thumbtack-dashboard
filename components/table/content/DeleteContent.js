"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const DeleteContent = ({ setIsDelete, details }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const submitHandler = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/content`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                    id: details._id,
                })
            });

            const data = await res.json();

            if (res.ok) {
                if (data.status === 201) {
                    router.refresh();
                    setIsDelete(false);
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
                        <h3>ALERT!!! Do you want to delete this content <span className="bold-text">"{details.title}"</span></h3>
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

export default DeleteContent;