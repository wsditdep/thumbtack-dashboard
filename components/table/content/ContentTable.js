"use client";

import { useState } from "react";
import AddContent from "./AddContent";
import moment from "moment";
import DeleteContent from "./DeleteContent";
import UpdateContent from "./UpdateContent";

const ContentTable = ({ list }) => {
    const [isAddContent, setIsAddContent] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [dataForModel, setDataForModel] = useState();

    const proceedToDelete = (val) => {
        setDataForModel(val);
        setIsDelete(true);
        return;
    }

    const proceedToUpdate = (val) => {
        setDataForModel(val);
        setIsUpdate(true);
        return;
    }

    return (
        <>
            {isAddContent ? <AddContent setIsAddContent={setIsAddContent} /> : <></>}
            {isDelete ? <DeleteContent setIsDelete={setIsDelete} details={dataForModel} /> : <></>}
            {isUpdate ? <UpdateContent setIsUpdate={setIsUpdate} details={dataForModel} /> : <></>}
            <div className="d-tables">
                <div className="d-card">
                    <div className="d-card-header d-card-header-bg-color d-card-heading-font card-header-padding">
                        <div className="data-table-parent">
                            <div className="data-table-inner">
                                <p>CONTENT LIST</p>
                                <h3>Contents</h3>
                            </div>
                            <div className="data-table-inner">
                                <button className="d-btn d-btn-bright-radial" onClick={() => setIsAddContent(true)}>New <i className="fa fa-angle-right"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="d-card-body card-body-padding d-card-body-bg-color">
                        <table className="fadeUpAnimation">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Created</th>
                                    <th>Updated</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list?.map((data, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{data.title}</td>
                                            <td>{moment(data?.createdAt).format("Do MMM YYYY, h:mm a")}</td>
                                            <td>{moment(data?.updatedAt).format("Do MMM YYYY, h:mm a")}</td>
                                            <td className="table-actions">
                                                <ul>
                                                    <li className="includes-icon" onClick={() => proceedToUpdate(data)}><i className="fa fa-pen"></i></li>
                                                    <li className="includes-icon" onClick={() => proceedToDelete(data)}><i className="fa fa-trash"></i></li>
                                                </ul>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContentTable;