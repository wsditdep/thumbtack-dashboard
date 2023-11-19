import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import DashboardLayout from "../../page";
import CommissionTable from "@/components/table/commission/ComissionTable";
import { globalLink } from "@/utils/globalLink";


const fetchCommissions = async () => {
    try {
        const res = await fetch(`${globalLink}/api/commission`, {
            cache: "no-store"
        });

        const data = await res.json();

        if (!data.success) return [];

        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export default async function CommissionIndex() {
    const commissions = await fetchCommissions();
    return (
        <DashboardLayout>
            <Breadcrumb
                icon="fa fa-share"
                heading="Manage Commission | Account Level"
                subheading="You can manage account level or commission"
                isButtons={false}
            />
            <div className="dashboard-content">
                <CommissionTable list={commissions} />
            </div>
        </DashboardLayout>
    )
}
