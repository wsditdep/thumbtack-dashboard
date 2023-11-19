import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import DashboardLayout from "../../page";
import Table from "@/components/table/Table";
import { globalLink } from "@/utils/globalLink";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const getAuthenticatedUser = async (id) => {
    try {
        const res = await fetch(`${globalLink}/api/users/getAuthenticatedUser`, {
            method: "POST",
            body: JSON.stringify({
                userId: id
            })
        });

        const data = await res.json();

        if (!data.success) return {};

        return data.data;
    } catch (error) {
        console.log(error);
    }
}

const fetchUsers = async (id) => {
    try {
        const res = await fetch(`${globalLink}/api/users?authUser=${id}`, {
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

const fetchProducts = async () => {
    try {
        const res = await fetch(`${globalLink}/api/product`, {
            cache: "no-store",
            method: "GET"
        });

        const data = await res.json();

        if (!data.success) return [];

        return data.data;
    } catch (error) {
        console.log(error);
    }
}

const fetchCommission = async () => {
    try {
        const res = await fetch(`${globalLink}/api/commission`, {
            cache: "no-store",
            method: "GET"
        });

        const data = await res.json();

        if (!data.success) return [];

        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export default async function UserIndex() {
    const { user } = await getServerSession(authOptions);

    const authUser = await getAuthenticatedUser(user?._id);
    const users = await fetchUsers(user?._id);
    const products = await fetchProducts();
    const commission = await fetchCommission();

    return (
        <DashboardLayout>
            <Breadcrumb
                icon="fa fa-users"
                heading="Manage Users"
                subheading="You can manage the users"
                isButtons={false}
            />
            <div className="dashboard-content">
                <Table
                    list={users}
                    products={products}
                    commission={commission}
                    authenticatedUser={authUser}
                />
            </div>
        </DashboardLayout>
    )
}
