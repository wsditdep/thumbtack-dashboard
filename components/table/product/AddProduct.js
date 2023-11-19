"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from 'next/image'
import imgPrev from "@/public/image_prev.png";

const AddProduct = ({ setIsProductPop }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [userVal, setUserVal] = useState({
        productName: "",
        productPrice: ""
    });
    const [file, setFile] = useState(null);

    const onChangeHandler = (e) => {
        setUserVal({ ...userVal, [e.target.name]: e.target.value });
    }

    const submitHandler = async () => {
        if (!userVal.productName || !userVal.productPrice) {
            return toast.error("Please fill the data properly and try again!");
        }

        if (file === null) {
            return toast.error("Please choose image!");
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'platform77');

        // upload image to cloudinary::begin
        try {
            setLoading(true);
            const cloud_res = await fetch(`https://api.cloudinary.com/v1_1/dn5zwro9j/image/upload`, {
                method: "POST",
                body: formData
            });

            const cloud_data = await cloud_res.json();

            if (cloud_res.ok) {
                //   save in database::begin
                try {
                    const res = await fetch(`/api/product`, {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                            productName: userVal.productName,
                            productPrice: userVal.productPrice,
                            cloud_public_id: cloud_data.public_id,
                            cloud_url: cloud_data.url
                        })
                    });

                    const data = await res.json();

                    if (res.ok) {
                        if (data.success) {
                            router.refresh();
                            setLoading(false);
                            setIsProductPop(false);
                            return toast.success(data.message);
                        }
                        setLoading(false);
                        return toast.error(data.message);
                    } else {
                        setLoading(false);
                        throw new Error("Faild to create product!");
                    }
                } catch (error) {
                    setLoading(false);
                    console.log(error);
                }
                //   save in database::end
            } else {
                setLoading(false);
                throw new Error("Faild to create product!");
            }

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
        // upload image to cloudinary::end

    }

    return (
        <>
            <div className="app-modal-weapper">
                <div className="app-modal-inner modal-animation">
                    <div className="modal-title">
                        <h3>ADD NEW PRODUCT</h3>
                        <span><i className="fa fa-times" onClick={() => setIsProductPop(false)}></i></span>
                    </div>
                    <form className="global-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="input-group">
                            <input
                                type="text"
                                name="productName"
                                value={userVal.productName}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            <label>Product Name</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="number"
                                name="productPrice"
                                value={userVal.productPrice}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            <label>Product Price</label>
                        </div>
                        <div className="file-input">
                            <input
                                type="file"
                                accept=".png, .jpg, .jpeg, .gif"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            {
                                file === null
                                    ?
                                    <Image
                                        src={imgPrev}
                                        width={100}
                                        height={100}
                                        alt="choosen file"
                                    />
                                    :
                                    <Image
                                        src={URL.createObjectURL(file)}
                                        width={100}
                                        height={100}
                                        alt="file"
                                    />

                            }
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

export default AddProduct;