"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const AddContent = ({ setIsAddContent }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [userVal, setUserVal] = useState({
        title: "",
        description: ""
    });

    const onChangeHandler = (e) => {
        setUserVal({ ...userVal, [e.target.name]: e.target.value });
    }

    const submitHandler = async () => {
        if (!userVal.title || !userVal.description) {
            return toast.error("Please fill the data properly and try again!");
        }

        try {
            setLoading(true);
            const res = await fetch(`/api/content`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    title: userVal.title,
                    description: userVal.description
                })
            });

            const data = await res.json();

            if (res.ok) {
                if (data.status === 201) {
                    router.refresh();
                    setIsAddContent(false);
                    setLoading(false);
                    return toast.success(data.message);
                }
                setLoading(false);
                return toast.error(data.message);
            } else {
                setLoading(false);
                throw new Error("Faild to create new content!");
            }

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <>
            <div className="app-modal-weapper" onClick={() => setIsAddContent(false)}>
                <div className="app-modal-inner modal-animation" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-title">
                        <h3>ADD NEW CONTENT</h3>
                        <span><i className="fa fa-times" onClick={() => setIsAddContent(false)}></i></span>
                    </div>
                    <form className="global-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="input-group">
                            <input
                                type="text"
                                name="title"
                                value={userVal.title}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            <label>Title</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                name="description"
                                value={userVal.description}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            <label>Description</label>
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

export default AddContent;