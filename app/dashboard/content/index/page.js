import ContentTable from "@/components/table/content/ContentTable";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import DashboardLayout from "../../page";
import { globalLink } from "@/utils/globalLink";

const fetchContents = async () => {
    try {
        const res = await fetch(`${globalLink}/api/content`, {
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

export default async function ContentManagement() {
    const content = await fetchContents();

    return (
        <DashboardLayout>
            <Breadcrumb
                icon="fa fa-book"
                heading="Manage platform contents"
                subheading="Manage rules, FAQs, agent mode and many more....."
                isButtons={false}
            />
            <div className="dashboard-content">
                <ContentTable list={content} />
            </div>
        </DashboardLayout>
    )
}
