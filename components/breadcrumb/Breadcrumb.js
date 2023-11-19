const Breadcrumb = ({ icon, heading, subheading, isButtons }) => {
    return (
        <>
            <div className="breadcrumb-wrapper">
                <div className="breadbrumb-parent">
                    <div className="breadbrumb-childs">
                        <div className="breadcrumb-inner-parent">
                            <div className="breadcrumb-inner-childs">
                                <i className={icon}></i>
                            </div>
                            <div className="breadcrumb-inner-childs">
                                <h3>{heading}</h3>
                                <p>{subheading}</p>
                            </div>
                        </div>
                    </div>
                    <div className="breadbrumb-childs">
                        {
                            isButtons
                                ?
                                <div className="bread-crumb-action-btns-parents">
                                    <button className="d-btn d-btn-outline-bright mr">Last Year<i className="fa fa-angle-down ml6"></i></button>
                                    <button className="d-btn d-btn-bright">Export<i className="fa fa-file-alt ml6"></i></button>
                                </div>
                                :
                                <></>}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Breadcrumb;