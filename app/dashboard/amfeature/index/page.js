import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import DashboardLayout from "../../page";
import Monitor from "@/components/monitor/Monitor";
import { globalLink } from "@/utils/globalLink";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const fetchHistory = async () => {
    try {
        const res = await fetch(`${globalLink}/api/monitor`, {
            method: "GET",
            cache: "no-store",
        });

        const data = await res.json();

        if (!data.success) return [];

        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export default async function Amfeature() {

    const { user } = await getServerSession(authOptions);
    const history = await fetchHistory();

    return (
        <DashboardLayout>
            <Breadcrumb
                icon="fa fa-laptop"
                heading="AM-Advance Monitoring Feature"
                subheading="Monitor all transaction, withdrawal, admin and users"
                isButtons={false}
            />
            <div className="dashboard-content">
                <Monitor history={history} authenticatedUser={user} />
            </div>
        </DashboardLayout>
    )
}
