"use client";

import { useState } from "react";
import AddProduct from "./AddProduct";
import Image from "next/image";
import moment from "moment";
import DeleteProduct from "./DeleteProduct";

const ProductTable = ({ list }) => {

    const [cardView, setCardView] = useState(true);
    const [isProductList, setIsProductPop] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [dataForModel, setDataForModel] = useState();

    const proceedToDelete = (val) => {
        setDataForModel(val);
        setIsDelete(true);
        return;
    }

    return (
        <>
            {isDelete ? <DeleteProduct setIsDelete={setIsDelete} details={dataForModel} /> : <></>}
            {isProductList ? <AddProduct setIsProductPop={setIsProductPop} /> : <></>}
            <div className="d-tables">
                <div className="d-card">
                    <div className="d-card-header d-card-header-bg-color d-card-heading-font card-header-padding">
                        <div className="data-table-parent">
                            <div className="data-table-inner">
                                <p>PRODUCTS LIST</p>
                                <h3>Products</h3>
                            </div>
                            <div className="data-table-inner">
                                <div className="view-options">
                                    <button className="tool-tip-parent" onClick={() => setCardView(true)}>
                                        <i className="fa fa-table"></i>
                                        <div className="tool-tip-child">
                                            <p>Grid View</p>
                                        </div>
                                    </button>
                                    <button className="tool-tip-parent" onClick={() => setCardView(false)}>
                                        <i className="fa fa-th"></i>
                                        <div className="tool-tip-child">
                                            <p>List View</p>
                                        </div>
                                    </button>
                                </div>
                                <button className="d-btn d-btn-bright-radial" onClick={() => setIsProductPop(true)}>New <i className="fa fa-angle-right"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="d-card-body card-body-padding d-card-body-bg-color">
                        {
                            cardView
                                ?
                                <>
                                    <div className="app-card-parent fadeUpAnimation">
                                        {
                                            list?.map((data, index) => (
                                                <div className="app-card" key={index}>
                                                    <div className="product-image">
                                                        <Image
                                                            src={data?.url}
                                                            width={100}
                                                            height={100}
                                                            alt="product"
                                                            draggable={false}
                                                            priority
                                                        />
                                                    </div>
                                                    <div className="product-details">
                                                        <h3>Product Name: {data?.productName}</h3>
                                                        <p>Price: $ {data?.productPrice}</p>
                                                    </div>
                                                    <div className="circle-card-action">
                                                        <button className="delete" onClick={() => proceedToDelete(data)}>DELETE</button>
                                                        {/* <button className="update">UPDATE</button> */}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </>
                                :
                                <>
                                    <table className="fadeUpAnimation">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Image</th>
                                                <th>Product Name</th>
                                                <th>Product Price</th>
                                                <th>Created At</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                list?.map((data, index) => (
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td className="table-image">
                                                            <Image
                                                                src={data?.url}
                                                                width={100}
                                                                height={100}
                                                                alt="product"
                                                                priority
                                                                draggable={false}
                                                            />
                                                        </td>
                                                        <td>{data?.productName}</td>
                                                        <td>$ {data?.productPrice}</td>
                                                        <td>{moment(data?.createdAt).format("Do MMM YYYY")}</td>
                                                        <td className="table-actions">
                                                            <ul>
                                                                <li className="includes-icon"><i className="fa fa-eye"></i></li>
                                                                <li className="includes-icon"><i className="fa fa-pen"></i></li>
                                                                <li className="includes-icon"><i className="fa fa-trash"></i></li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <div className="table-pagination">
                                        <div className="pagination-childs"></div>
                                        <div className="pagination-childs">
                                            <div className="show-pagination-page">
                                                <p>1-5 of 100</p>
                                            </div>
                                            <div className="show-pagination-page">
                                                <li><i className="fa fa-angle-left"></i></li>
                                                <li><i className="fa fa-angle-right"></i></li>
                                            </div>
                                        </div>
                                    </div>

                                </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductTable;