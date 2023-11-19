"use client";

import bot from "@/public/bot.gif";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ResetUser = ({ setIsReset, data: detail }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const resetFunction = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/journey/reset`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    id: detail?._id
                })
            });

            const data = await res.json();

            if (res.ok) {
                if (data.status === 201) {
                    router.refresh();
                    setLoading(false);
                    setIsReset(false);
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
            <div className="approval-pop">
                <div className="approval-pop-inner">
                    <div className="approval-pop-inner-childs">
                        <Image
                            src={bot}
                            alt="bot"
                            height={100}
                            width={100}
                            draggable={false}
                        />
                    </div>
                    <div className="approval-pop-inner-childs">
                        <h3>Wait...Please confirm before proceeding!</h3>
                        <p>Username: "{detail?.username}" | Stage: "{detail?.journeyCurrentStage}/{detail?.journeyMaxStage}"</p>
                        <h4>Are you sure for reset?</h4>
                        <div className="approval-action">
                            <button className="approve" disabled={loading} onClick={() => resetFunction()}> {loading ? <i className="fa fa-spinner g-loader"></i> : "Yes, Reset It"}</button>
                            <button className="cancel" disabled={loading} onClick={() => setIsReset(false)}>No</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetUser;