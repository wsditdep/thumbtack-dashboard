"use client";

import { useState } from "react";
import AddCommission from "./AddCommission";
import DeleteCommission from "./DeleteCommission";
import UpdateCommission from "./UpdateCommission";

const CommissionTable = ({ list }) => {
    const [isAddPop, setIsAddPop] = useState(false);
    const [isUpdatePop, setIsUpdatePop] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [dataForModel, setDataForModel] = useState();

    const proceedToDelete = (val) => {
        setDataForModel(val);
        setIsDelete(true);
        return;
    }

    const proceedToUpdate = (val) => {
        setDataForModel(val);
        setIsUpdatePop(true);
        return;
    }

    return (
        <>
            {isAddPop ? <AddCommission setIsAddPop={setIsAddPop} /> : <></>}
            {isDelete ? <DeleteCommission setIsDelete={setIsDelete} details={dataForModel} /> : <></>}
            {isUpdatePop ? <UpdateCommission setIsUpdatePop={setIsUpdatePop} details={dataForModel} /> : <></>}

            <div className="d-tables">
                <div className="d-card">
                    <div className="d-card-header d-card-header-bg-color d-card-heading-font card-header-padding">
                        <div className="data-table-parent">
                            <div className="data-table-inner">
                                <p>COMMISSION LIST</p>
                                <h3>Commission | Account Level</h3>
                            </div>
                            <div className="data-table-inner">
                                <button className="d-btn d-btn-bright-radial" onClick={() => setIsAddPop(true)}>New <i className="fa fa-angle-right"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="d-card-body card-body-padding d-card-body-bg-color">
                        <div className="app-card-parent fadeUpAnimation">
                            {
                                list?.length === 0
                                    ?
                                    <h3 className="data-not-found">Data Not Found</h3>
                                    :
                                    <>
                                        {
                                            list?.map((data, index) => (
                                                <div className="app-card app-card-hover-effect" key={index}>
                                                    <div className="circle-card-wrapper">
                                                        <div className="circle-card">
                                                            <h4>{data?.commissionValue}</h4>
                                                        </div>
                                                    </div>
                                                    <p className="circle-info">{data?.commissionName}</p>
                                                    <div className="circle-card-action">
                                                        <button className="delete" onClick={() => proceedToDelete(data)}>DELETE</button>
                                                        <button className="update" onClick={()=> proceedToUpdate(data)}>UPDATE</button>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommissionTable;