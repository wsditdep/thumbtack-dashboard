import notFound from "@/public/notFound.gif";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
    return (
        <>
            <div className="notfound-page-wrapper">
                <div className="not-found-page-inner-wrapper">
                    <Image
                        src={notFound}
                        alt="not-found"
                        unoptimized={true}
                        draggable={false}
                    />
                    <div className="back-btn">
                        <Link href={"/dashboard/landing/index"}>
                            <button>
                                BACK TO SITE <i className="fa fa-arrow-right"></i>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound;