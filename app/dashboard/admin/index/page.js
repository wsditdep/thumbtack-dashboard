import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import DashboardLayout from "../../page";
import AdminTable from "@/components/admin/AdminTable";
import { globalLink } from "@/utils/globalLink";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const fetchUsers = async () => {
    try {
        const res = await fetch(`${globalLink}/api/admin`, {
            cache: "no-store"
        });

        const data = await res.json();

        if (!data.success) return [];

        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export default async function UserIndex() {
    const users = await fetchUsers();

    const { user } = await getServerSession(authOptions);

    return (
        <DashboardLayout>
            <Breadcrumb
                icon="fa fa-users"
                heading="Manage Admin"
                subheading="You can manage admins"
                isButtons={true}
            />
            <div className="dashboard-content">
                <AdminTable list={users} user={user}/>
            </div>
        </DashboardLayout>
    )
}
