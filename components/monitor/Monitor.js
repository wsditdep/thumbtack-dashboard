"use client";

import { useEffect, useState } from "react";
import moment from "moment";
import Image from "next/image";
import ai_image from "../../public/ai_animation.gif";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Monitor = ({ history, authenticatedUser }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([]);
    const [type, setType] = useState("all");

    const [lastPage, setLastPage] = useState("cal...");
    const [pageNumber, setPageNumber] = useState(1);

    const filterType = async (type) => {

        setType(type);

        try {
            setLoading(true);
            const res = await fetch(`/api/monitor?historyType=${type}`, {
                cache: "no-store",
                method: "GET",
            });

            const data = await res.json();

            if (res.ok) {
                if (data.status === 201) {
                    setLoading(false);
                    setList(data.data.history);
                    setPageNumber(1);
                    return toast.success(data.message);
                }
                setLoading(false);
                return toast.error(data.message);
            } else {
                setLoading(false);
                throw new Error("Faild to filter!");
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
            const res = await fetch(`/api/monitor?historyType=${type}`, {
                cache: "no-store",
                method: "GET",
            });
            const data = await res.json();

            if (res.ok) {
                if (data.status === 201) {
                    setLoading(false);
                    setList(data.data.history);
                    setLastPage(data.totalPages);
                    setPageNumber(newPageNumber); // Update the pageNumber state
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

    const refreshFunc = () => {
        return router.refresh();
    }

    useEffect(() => {
        setList(history?.history);
        if(authenticatedUser?.role !== "superAdmin") {
            toast.error("Access Denied");
            router.push("/dashboard/users/index");
        }
    }, [history]);

    return (
        <>
            <section className="monitor-section">
                <div className="monitor-wrapper">
                    <h3>SCANNING.......</h3>
                    <ul>
                        <li>
                            <button
                                disabled={loading}
                                onClick={() => filterType("all")}>{loading ? <i className="fa fa-spinner g-loader"></i> : <><p>Show All</p><i className="fa fa-angle-right"></i></>}</button>
                        </li>
                        <li>
                            <button
                                disabled={loading}
                                onClick={() => filterType("transaction")}>{loading ? <i className="fa fa-spinner g-loader"></i> : <><p>Transactions</p><i className="fa fa-angle-right"></i></>}</button>
                        </li>
                        <li>
                            <button
                                disabled={loading}
                                onClick={() => filterType("withdrawal")}>{loading ? <i className="fa fa-spinner g-loader"></i> : <><p>Withdrawal</p><i className="fa fa-angle-right"></i></>}</button>
                        </li>
                        <li>
                            <button
                                disabled={loading}
                                onClick={() => filterType("walletaddress")}>{loading ? <i className="fa fa-spinner g-loader"></i> : <><p>Withdrawal Address</p><i className="fa fa-angle-right"></i></>}</button>
                        </li>
                        <li>
                            <button
                                disabled={loading}
                                onClick={() => filterType("withdrawalpin")}>{loading ? <i className="fa fa-spinner g-loader"></i> : <><p>Withdrawal PIN</p><i className="fa fa-angle-right"></i></>}</button>
                        </li>
                        <li>
                            <button
                                disabled={loading}
                                onClick={() => filterType("password")}>{loading ? <i className="fa fa-spinner g-loader"></i> : <><p>Password</p><i className="fa fa-angle-right"></i></>}</button>
                        </li>
                        <li>
                            <button
                                disabled={loading}
                                onClick={() => filterType("edited")}>{loading ? <i className="fa fa-spinner g-loader"></i> : <><p>Recent Edit</p><i className="fa fa-angle-right"></i></>}</button>
                        </li>
                    </ul>
                    <div className="intro">
                        <Image
                            src={ai_image}
                            alt="logo"
                            height={100}
                            width={100}
                            unoptimized={true}
                            draggable={false}
                        />
                    </div>
                    <div className="sub-monitoring">
                        <ul>
                            <li>
                                <h5>Platform Users</h5>
                                <h4><i className="fa fa-check-circle"></i> {history.allUser} Active</h4>
                            </li>
                            <li>
                                <h5>Admin</h5>
                                <h4><i className="fa fa-check-circle"></i> {history.adminCount} Active</h4>
                            </li>
                            <li>
                                <h5>Super Admin</h5>
                                <h4><i className="fa fa-check-circle"></i> {history.superAdminCount} Active</h4>
                            </li>
                            <li>
                                <h5>Customers</h5>
                                <h4><i className="fa fa-check-circle"></i> {history.superAdminCount} Active</h4>
                            </li>
                            <li>
                                <h5>Practice Accounts</h5>
                                <h4><i className="fa fa-check-circle"></i> {history.practiceCount} Active</h4>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="monitor-wrapper">
                    <h3>{type} | <button onClick={() => refreshFunc()}>Refresh <i className="fa fa-refresh"></i></button></h3>
                    <div className="am-monitor">
                        {
                            list?.length === 0
                                ?
                                <div className="no-history">
                                    <h3>No History </h3>
                                </div>
                                :
                                <>
                                    {
                                        list?.map((data, index) => (
                                            <div className="monitor-list-parent" key={index}>
                                                <div className="monitor-list-childs">
                                                    <div className="monitor-list-childs-inner">
                                                        <div className="icon-container">
                                                            {
                                                                data?.historyType === "withdrawal"
                                                                    ?
                                                                    <i className="fa fa-exchange"></i>
                                                                    :
                                                                    data?.historyType === "password"
                                                                        ?
                                                                        <i className="fa fa-key"></i>
                                                                        :
                                                                        data?.historyType === "walletaddress"
                                                                            ?
                                                                            <i className="fa fa-wallet"></i>
                                                                            :
                                                                            data?.historyType === "edited"
                                                                                ?
                                                                                <i className="fa fa-pen-alt"></i>
                                                                                :
                                                                                <i className="fa fa-usd"></i>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="monitor-list-childs-inner">
                                                        <h3>{moment(data?.createdAt).format("Do MMM YYYY, h:mm a")}</h3>
                                                        {
                                                            data?.historyType === "password"
                                                                ?
                                                                <h2>Alert!! - "{data?.sender}" changed password of user "{data?.receiver}"</h2>
                                                                : data?.historyType === "edited"
                                                                    ?
                                                                    <h2>Alert!! - "{data?.sender}" edited user "{data?.receiver}"</h2>
                                                                    :
                                                                    <h2>Sender: {data?.sender} | Receiver: {data?.receiver}</h2>
                                                        }
                                                        <p>{data?.historyMessage}</p>
                                                        <h4>Type: {data?.historyType} |  <span className={data?.historyStatus === "credited" ? "credited" : "debited"}>{data?.historyStatus}</span></h4>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>
                        }
                    </div>
                    {
                        list?.length === 0
                            ?
                            <></>
                            :
                            <>
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
            </section>
        </>
    )
}

export default Monitor;