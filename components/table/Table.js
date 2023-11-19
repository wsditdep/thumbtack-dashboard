"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddDebit from "./AddDebit";
import PracticeAccount from "../practiceAccount/PracticeAccount";
import UserDetail from "./UserDetail";
import moment from "moment";
import UserUpdate from "./UserUpdate";
import UserCreateJourney from "./UserCreateJourney";
import { useRouter } from "next/navigation";
import ResetUser from "./ResetUser";

const Table = ({ list: dataList, products, commission, authenticatedUser }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [list, setList] = useState(dataList);

    const [cardView, setCardView] = useState(false);
    const [isRecharge, setIsRecharge] = useState(false);
    const [dataForModel, setDataForModel] = useState();
    const [isPracticeAccount, setIsPracticeAccount] = useState(false);
    const [isUserDetail, setIsUserDetail] = useState(false);
    const [isUserUpdate, setIsUserUpdate] = useState(false);
    const [isCreateJourney, setIsCreateJourney] = useState(false);
    const [isReset, setIsReset] = useState(false);

    const [lastPage, setLastPage] = useState("cal...");
    const [pageNumber, setPageNumber] = useState(1);

    const [searchQuery, setSearchQuery] = useState("");

    const openRechargeModal = (val) => {
        setIsRecharge(true);
        setDataForModel(val);
        return;
    }

    const openCreatePracticeAccount = (val) => {
        setIsPracticeAccount(true);
        setDataForModel(val);
        return;
    }

    const openUserDetail = (val) => {
        setIsUserDetail(true);
        setDataForModel(val);
        return;
    }

    const openUserUpdate = (val) => {
        setIsUserUpdate(true);
        setDataForModel(val);
        return;
    }

    const openUserJourney = (val) => {
        setIsCreateJourney(true);
        setDataForModel(val);
        return;
    }

    const openReset = (val) => {
        setIsReset(true);
        setDataForModel(val);
        return;
    }

    const copyToClipboard = (val) => {
        navigator.clipboard.writeText(val);
        return toast.success(`Copied - (${val})`);
    }

    const reloadPage = () => {
        return router.refresh();
    }

    const searchFunction = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/users/search`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    searchQuery: searchQuery,
                    authenticatedUser: authenticatedUser
                })
            });

            const data = await res.json();

            if (res.ok) {
                if (data.status === 201) {
                    setLoading(false);
                    setList(data.data);
                    return toast.success(data.message);
                }
                setLoading(false);
                return toast.error(data.message);
            } else {
                setLoading(false);
                throw new Error("Faild to search!");
            }

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const blockUser = async (id, status) => {

        var statusVal;

        if (status === "active") {
            statusVal = "block"
        }
        if (status === "block") {
            statusVal = "active"
        }

        try {
            setLoading(true);
            var res = await fetch(`/api/users`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    accountStatus: statusVal,
                    authenticatedUser: authenticatedUser
                })
            });
            const data = await res.json();

            if (res.ok) {
                if (data.status === 201) {
                    router.refresh();
                    setIsUserUpdate(false);
                    setLoading(false);
                    return toast.success(data.message);
                }
                setLoading(false);
                return toast.error(data.message);
            } else {
                setLoading(false);
                throw new Error("Faild to block unblock user!");
            }

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const pagination = async (val) => {
        let newPageNumber = pageNumber;

        if (val === "next") {
            newPageNumber += 1;
        } else if (val === "prev" && pageNumber > 1) {
            newPageNumber -= 1;
        }

        try {
            setLoading(true);
            const res = await fetch(`/api/users?pageNumber=${newPageNumber}&authUser=${authenticatedUser?._id}`, {
                cache: "no-store",
                method: "GET",
            });
            const data = await res.json();

            if (res.ok) {
                if (data.status === 201) {
                    setLoading(false);
                    setList(data.data);
                    setLastPage(data.totalPages);
                    setPageNumber(newPageNumber);
                    return;
                }
                setLoading(false);
                return toast.error(data.message);
            } else {
                setLoading(false);
                throw new Error("Failed to fetch user data!");
            }

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        setList(dataList);
    }, [dataList]);

    return (
        <>
            {isRecharge ? <AddDebit setIsRecharge={setIsRecharge} data={dataForModel} authenticatedUser={authenticatedUser} /> : <></>}
            {isPracticeAccount ? <PracticeAccount setIsPracticeAccount={setIsPracticeAccount} data={dataForModel} authenticatedUser={authenticatedUser} /> : <></>}
            {isUserDetail ? <UserDetail setIsUserDetail={setIsUserDetail} data={dataForModel} authenticatedUser={authenticatedUser} /> : <></>}
            {isUserUpdate ? <UserUpdate setIsUserUpdate={setIsUserUpdate} data={dataForModel} commission={commission} authenticatedUser={authenticatedUser} /> : <></>}
            {isCreateJourney ? <UserCreateJourney setIsCreateJourney={setIsCreateJourney} data={dataForModel} products={products} /> : <></>}
            {isReset ? <ResetUser setIsReset={setIsReset} data={dataForModel} /> : <></>}
            <div className="advance_search">
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="Search...."
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        onClick={() => searchFunction()}
                        className={searchQuery === "" ? "disabled-button" : "enabled-button"}
                    >
                        {loading ? 'Searching...' : 'SEARCH'}
                    </button>
                </form>
            </div>
            <div className="d-tables">
                <div className="d-card">
                    <div className="d-card-header d-card-header-bg-color d-card-heading-font card-header-padding">
                        <div className="data-table-parent">
                            <div className="data-table-inner">
                                <p>USERS LIST</p>
                                <h3>Users</h3>
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
                                    <button className="refresh-btn" onClick={() => reloadPage()}>Refresh <i className="ml4 fa fa-refresh"></i></button>
                                </div>
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
                                                    <div className="app-card-profile">
                                                        <div className="app-card-profile-wrapper">
                                                            <p>{data?.username[0].toUpperCase()}</p>
                                                        </div>
                                                        <h3 className="mt">{data?.username}</h3>
                                                        <span className="user-tag">User</span>
                                                    </div>
                                                    <ul className="mt">
                                                        <li>
                                                            <p>Username</p>
                                                            <span>{data?.username}</span>
                                                        </li>
                                                        <li>
                                                            <p>Phone</p>
                                                            <span>{data?.phone}</span>
                                                        </li>
                                                        <li>
                                                            <p>Role</p>
                                                            <span>{data?.role}</span>
                                                        </li>
                                                        <li>
                                                            <p>Account Status</p>
                                                            <span>{data?.accountStatus}</span>
                                                        </li>
                                                        <li>
                                                            <p>Account Balance</p>
                                                            <span>$ {data?.accountBalance?.toFixed(2)}</span>
                                                        </li>
                                                    </ul>
                                                    {/* <div className="table-actions-with-card">
                                                        <ul>
                                                            <li className="includes-icon"><i className="fa fa-eye"></i></li>
                                                            <li className="includes-icon"><i className="fa fa-pen"></i></li>
                                                            <li className="includes-btns">
                                                                More<i className="fa fa-angle-down ml4"></i>
                                                                <div className="table-action-inner">
                                                                    <ol onClick={() => openRechargeModal(data)}><i className="fa fa-angle-right mr4"></i>Add Debit</ol>
                                                                    <ol><i className="fa fa-angle-right mr4"></i>Set Continuous Single</ol>
                                                                    <ol><i className="fa fa-angle-right mr4"></i>Reset Journey</ol>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div> */}
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
                                                <th>Profile</th>
                                                <th>Role</th>
                                                <th>Parent</th>
                                                <th>Username</th>
                                                <th>Ref No.</th>
                                                <th>Phone</th>
                                                <th>Stage</th>
                                                <th>Account Level</th>
                                                <th>Account</th>
                                                <th>Withdrawal PIN</th>
                                                <th>Balance</th>
                                                <th>Joined Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                list?.map((data, index) => (
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td className="table-profile flexCenter">
                                                            <div onClick={data?.withdrawalResponse?.status === "pending" ? () => openUserDetail(data) : undefined} className={data?.withdrawalResponse?.status === "pending" ? "table-profile-wrappers flexCenter withdrawalAnimation" : "table-profile-wrappers flexCenter"}>
                                                                {
                                                                    data?.withdrawalResponse?.status === "pending"
                                                                        ?
                                                                        <i className="fa fa-bell withdrawal-request-bell"></i>
                                                                        :
                                                                        <p>{data?.username[0].toUpperCase()}</p>
                                                                }
                                                            </div>
                                                        </td>
                                                        <td><span className={data?.role === "user" ? "user_bg uppercase" : "practice_bg uppercase"}>{data?.role}</span></td>
                                                        <td onClick={() => copyToClipboard(data?.adminRefCode)} className="ref_id">{data?.adminRefCode}</td>
                                                        <td>{data?.username}</td>
                                                        <td onClick={() => copyToClipboard(data?.refCode)} className="ref_id">{data?.refCode}</td>
                                                        <td>{data?.phone}</td>
                                                        <td className="include-journey-indicator">
                                                            {data?.journeyCurrentStage}/{data?.journeyMaxStage} <br />
                                                            {
                                                                data?.journey_status === "ongoing"
                                                                    ?
                                                                    <span className="ongoing"><i className="fa fa-arrow-right"></i>({data?.journey_status})</span>
                                                                    :
                                                                    data?.journey_status === "done"
                                                                        ?
                                                                        <span className="done"><i className="fa fa-check"></i>({data?.journey_status})</span>
                                                                        :
                                                                        <span className="initial"><i className="fa fa-stop"></i>({data?.journey_status})</span>
                                                            }
                                                        </td>
                                                        <td>{data?.accountLevel}</td>
                                                        <td className="includeActiveSlider">
                                                            <p>{data?.accountStatus} </p>
                                                            <label className="switch">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={data?.accountStatus === "active" ? true : false}
                                                                    onChange={() => blockUser(data?._id, data?.accountStatus)}
                                                                />
                                                                <span className="slider"></span>
                                                            </label>
                                                        </td>
                                                        <td>{data?.withdrawalPin}</td>
                                                        <td onClick={() => openRechargeModal(data)} className={data?.accountBalance < 0 ? "identidy-negative cursor-pointer" : "cursor-pointer"}>${data?.accountBalance.toFixed(2)}</td>
                                                        <td className="table-date">{moment(data?.createdAt).format("Do MMM YYYY, h:mm a")}</td>
                                                        <td className="table-actions">
                                                            <ul>
                                                                <li className="includes-icon tool-tip-parent" onClick={() => openUserDetail(data)}>
                                                                    <i className="fa fa-eye"></i>
                                                                    <div className="tool-tip-child">
                                                                        <p>View Details</p>
                                                                    </div>
                                                                </li>
                                                                <li className="includes-icon tool-tip-parent" onClick={() => openUserUpdate(data)}>
                                                                    <i className="fa fa-pen"></i>
                                                                    <div className="tool-tip-child">
                                                                        <p>Edit User</p>
                                                                    </div>
                                                                </li>
                                                                {
                                                                    data?.role === "practice"
                                                                        ?
                                                                        <></>
                                                                        :
                                                                        <li className="includes-icon tool-tip-parent" onClick={() => openCreatePracticeAccount(data)}>
                                                                            <i className="fa fa-exchange"></i>
                                                                            <div className="tool-tip-child">
                                                                                <p>Create Practice Account</p>
                                                                            </div>
                                                                        </li>
                                                                }
                                                                <li className="includes-icon tool-tip-parent" onClick={() => openUserJourney(data)}>
                                                                    <i className="fa fa-route"></i>
                                                                    <div className="tool-tip-child">
                                                                        <p>Set Journey</p>
                                                                    </div>
                                                                </li>
                                                                <li className="includes-icon tool-tip-parent" onClick={() => openReset(data)}>
                                                                    <i className="fa fa-refresh"></i>
                                                                    <div className="tool-tip-child">
                                                                        <p>Reset</p>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <div className="pagination">
                                        {
                                            pageNumber === 1
                                                ?
                                                <></>
                                                :
                                                <button onClick={() => pagination("prev")}><i className="fa fa-angle-left"></i> Previous</button>
                                        }
                                        <h3>Page - {pageNumber} of {lastPage}</h3>
                                        {
                                            pageNumber === lastPage
                                                ?
                                                <></>
                                                :
                                                <button onClick={() => pagination("next")}>Next <i className="fa fa-angle-right"></i></button>
                                        }
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Table;