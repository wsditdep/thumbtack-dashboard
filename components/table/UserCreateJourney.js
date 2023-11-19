"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const UserCreateJourney = ({ setIsCreateJourney, data, products }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [userVal, setUserVal] = useState({
        id: data?._id,
        journeyMaxStage: data?.journeyMaxStage,
        pointCommission: data?.pointCommission,
        stage: 1
    });

    const [productList, setProductList] = useState(data.journey);

    const [newPrice, setNewPrice] = useState();
    const [subStage, setSubStage] = useState();

    const onChangeHandler = (e) => {
        setUserVal({ ...userVal, [e.target.name]: e.target.value });
    }

    const addProductFunc = (val) => {

        let highestPointProduct = null;

        highestPointProduct = productList.reduce((highest, current) => {
            return current.stage > highest.stage ? current : highest;
        }, productList[0]);

        if (typeof(highestPointProduct) === "undefined") {
            var newObj = {
                status: "pointed",
                commission: "",
                stage: Number(userVal.stage),
                product: {
                    _id: val._id,
                    productName: val.productName,
                    productPrice: Number(val.productPrice),
                    public_id: val.public_id,
                    url: val.url,
                    createdAt: val.createdAt,
                    updatedAt: val.updatedAt,
                }
            };
        } else {
            var newObj = {
                status: "pointed",
                commission: "",
                stage: Number(highestPointProduct.stage) + 1,
                product: {
                    _id: val._id,
                    productName: val.productName,
                    productPrice: Number(val.productPrice),
                    public_id: val.public_id,
                    url: val.url,
                    createdAt: val.createdAt,
                    updatedAt: val.updatedAt,
                }
            };
        }

        setNewPrice(val.productPrice);
        setProductList([...productList, newObj]);
        return;
    }

    const removeProduct = (id) => {
        const newProductList = productList.filter(item => item.product._id !== id);
        return setProductList(newProductList);
    }

    const updateHandler = (id) => {

        const isIdAlreadyPresent = productList.some(item => item.stage === Number(subStage));

        if (isIdAlreadyPresent) {
            return toast.error("This stage is already in the Journey!");
        }

        const updatedProductList = productList.map(item => {
            if (item.product._id === id) {
                return {
                    ...item,
                    stage: subStage === undefined ? item.stage : Number(subStage),
                    product: {
                        ...item.product,
                        productPrice: newPrice === undefined ? item.product.productPrice : Number(newPrice)
                    }
                };
            }
            return item;
        });

        setNewPrice(undefined);
        setSubStage(undefined);
        setProductList(updatedProductList);
        return;
    }

    const resetAll = () => {
        return setProductList([]);
    }

    const submitHandler = async () => {
        try {
            setLoading(true)
            const res = await fetch(`/api/journey/createJourney`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    id: userVal.id,
                    journeyMaxStage: userVal.journeyMaxStage,
                    pointCommission: userVal.pointCommission,
                    userJourney: productList
                })
            });

            const data = await res.json();

            if (res.ok) {
                router.refresh();
                setIsCreateJourney(false);
                setLoading(false);
                return toast.success(data.message);
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
            <div className="app-modal-weapper" onClick={() => setIsCreateJourney(false)}>
                <div className="app-modal-inner modal-animation" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-title">
                        <h3>SET JOURNEY</h3>
                        {/* <span><i className="fa fa-times" onClick={() => setIsCreateJourney(false)}></i></span> */}
                    </div>
                    <form className="global-form" onSubmit={(e) => e.preventDefault()}>
                        <p>Set journey for user "{data.username}"</p>
                        <div className="input-group">
                            <input
                                type="number"
                                name="journeyMaxStage"
                                value={userVal.journeyMaxStage}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            <label>Maximum orders received by level</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="number"
                                name="pointCommission"
                                step="any"
                                value={userVal.pointCommission}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            <label>Point Commission</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="number"
                                name="stage"
                                value={userVal.stage}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            <label>Start continuous orders after several orders</label>
                        </div>
                        <div className="list-products">
                            <ul>
                                {
                                    productList?.length === 0
                                        ?
                                        <h3 className="empty-notify">PLEASE SELECT THE PRODUCTS - NO PRODUCT SELECTED</h3>
                                        :
                                        <>
                                            {
                                                productList?.map((data, index) => (
                                                    <li className="mb fadeUpAnimation" key={index}>
                                                        <div className="list-product-title">
                                                            <p>({data?.stage}). {data?.product?.productName} | <span>Stage: {data?.stage}</span> | <span>Price: $ {data?.product?.productPrice}</span></p>
                                                        </div>
                                                        <div className="list-product">
                                                            <div className="list-product-child">
                                                                <label>Stage:</label>
                                                                <input
                                                                    type="number"
                                                                    step="any"
                                                                    name="subStage"
                                                                    defaultValue={data?.stage}
                                                                    onChange={(e) => setSubStage(e.target.value)}
                                                                    onKeyPress={(e) => {
                                                                        if (e.key === "Enter") {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="list-product-child">
                                                                <label>Price:</label>
                                                                <input
                                                                    type="number"
                                                                    name="newPrice"
                                                                    step="any"
                                                                    defaultValue={data?.product?.productPrice}
                                                                    onChange={(e) => setNewPrice(e.target.value)}
                                                                    onKeyPress={(e) => {
                                                                        if (e.key === "Enter") {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="list-btns">
                                                            <button className="set" onClick={() => updateHandler(data?.product?._id)}>SET</button>
                                                            <button className="remove" onClick={() => removeProduct(data?.product?._id)}>REMOVE</button>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                            <div className="global-submit-btn mt">
                                                <button onClick={() => submitHandler()}> {loading ? <i className="fa fa-spinner g-loader"></i> : "PROCEED"} </button>
                                                <button onClick={() => resetAll()}> {loading ? <i className="fa fa-spinner g-loader"></i> : "RESET ALL"} </button>
                                            </div>
                                        </>
                                }

                            </ul>
                        </div>
                    </form>
                </div>
                <div className="app-modal-inner modal-animation ml" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-title">
                        <h3>AVAILABLE PRODUCTS</h3>
                        <span><i className="fa fa-times" onClick={() => setIsCreateJourney(false)}></i></span>
                    </div>
                    <table className="journet-table fadeUpAnimation">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products?.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            <Image
                                                src={data?.url}
                                                height={100}
                                                width={100}
                                                priority
                                                alt="product"
                                                draggable={false}
                                            />
                                        </td>
                                        <td>{data.productName}</td>
                                        <td>$ {data.productPrice}</td>
                                        <td className="table-actions">
                                            <ul>
                                                <button
                                                    onClick={() => addProductFunc(data)}
                                                    disabled={productList.some(item => item?.product?._id === data?._id)}
                                                    className={productList.some(item => item?.product?._id === data?._id) ? "disabled-button" : ""}
                                                >
                                                    Add to Continuous Order
                                                </button>
                                            </ul>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default UserCreateJourney;