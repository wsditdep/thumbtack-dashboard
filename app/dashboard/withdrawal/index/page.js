import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import DashboardLayout from "../../page";
import WithdrawalTable from "@/components/table/withdrawal/WithdrawalTable";
import { globalLink } from "@/utils/globalLink";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const fetchWithdrawal = async () => {
    try {
        const res = await fetch(`${globalLink}/api/withdrawal`, {
            cache: "no-store",
            method: "GET",
        });

        const data = await res.json();

        if (!data.success) return [];

        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export default async function Withdrawal() {
    const users = await fetchWithdrawal();

    const { user } = await getServerSession(authOptions);

    return (
        <DashboardLayout>
            <Breadcrumb
                icon="fa fa-exchange"
                heading="Withdrawal Request"
                subheading="Monitor and give response to customer"
                isButtons={false}
            />
            <div className="dashboard-content">
                <WithdrawalTable list={users} authenticatedUser={user} />
            </div>
        </DashboardLayout>
    )
}
