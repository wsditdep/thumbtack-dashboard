"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PopNotice = ({ notice, setIsPopNotice }) => {
    const router = useRouter();

    const [isNew, setIsNew] = useState(true);
    const [loading, setLoading] = useState(false);

    const [userVal, setUserVal] = useState("");

    const submitHandler = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/popNotice`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    myNotice: userVal
                })
            });

            const data = await res.json();

            if (res.ok) {
                if (data.status === 201) {
                    setLoading(false);
                    setIsPopNotice(false);
                    router.refresh();
                    return toast.success(data.message);
                }
                setLoading(false);
                return toast.error(data.message);
            } else {
                setLoading(false);
                throw new Error("Faild to save pop notice!");
            }

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const updateHandler = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/popNotice`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    id: notice[0]?._id,
                    myNotice: userVal
                })
            });

            const data = await res.json();

            if (res.ok) {
                if (data.status === 201) {
                    setLoading(false);
                    setIsPopNotice(false);
                    router.refresh();
                    return toast.success(data.message);
                }
                setLoading(false);
                return toast.error(data.message);
            } else {
                setLoading(false);
                throw new Error("Faild to update notice!");
            }

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        if (notice?.length === 0) {
            setIsNew(true)
        } else {
            setIsNew(false)
            setUserVal(notice[0]?.notice);
        }
    }, []);

    return (
        <>
            <div className="suboperation-pop-wrapper" onClick={() => setIsPopNotice(false)}>
                <div className="suboperation-pop-childs" onClick={(e) => e.stopPropagation()}>
                    <h3>MANAGE POP NOTICE</h3>
                    <p>This is the popup message that user will see in the platform</p>
                    {
                        isNew
                            ?
                            <div className="not-setted" onClick={() => setIsNew(false)}>
                                <p>Get Started <i className="fa fa-arrow-right"></i></p>
                            </div>
                            :
                            <div className="suboperation-input">
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="sub-operation-input-group">
                                        <textarea
                                            cols="30"
                                            rows="10"
                                            placeholder="Enter notice here"
                                            name="userVal"
                                            value={userVal}
                                            onChange={(e) => setUserVal(e.target.value)}
                                        ></textarea>
                                    </div>
                                    {
                                        notice?.length === 0
                                            ?
                                            <button className="sub-submit" onClick={() => submitHandler()}>{loading ? <i className="fa fa-spinner g-loader"></i> : "CREATE NEW"}</button>
                                            :
                                            <button className="sub-submit" onClick={() => updateHandler()}>{loading ? <i className="fa fa-spinner g-loader"></i> : "UPDATE"}</button>
                                    }
                                </form>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}

export default PopNotice;