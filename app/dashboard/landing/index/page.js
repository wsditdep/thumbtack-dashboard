import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import DashboardLayout from "../../page";
import Report from "@/components/charts/Report";
import WebTrafic from "@/components/charts/WebTratic";
import { globalLink } from "@/utils/globalLink";

const fetchReport = async () => {
    try {
        const res = await fetch(`${globalLink}/api/report`, {
            method: "POST"
        });

        const data = await res.json();

        if (!data.success) return {};

        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export default async function Landing() {
    const reportData = await fetchReport();

    return (
        <DashboardLayout>
            <Breadcrumb
                icon="fa fa-chart-line"
                heading="Welcome | e-Platform"
                subheading="e-Platform | Easy, reliable and secure"
                isButtons={true}
            />
            <div className="dashboard-content">
                <Report reportData={reportData} />
                <WebTrafic />
            </div>
        </DashboardLayout>
    )
}
