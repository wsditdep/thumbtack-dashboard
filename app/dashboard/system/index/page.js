import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import DashboardLayout from "../../page";
import System from "@/components/system/System";

export default async function SystemInfo() {

    return (
        <DashboardLayout>
            <Breadcrumb
                icon="fa fa-robot"
                heading="System Infomation"
                subheading="Monitor the updates and security levels of the platform"
                isButtons={false}
            />
            <div className="dashboard-content">
               <System />
            </div>
        </DashboardLayout>
    )
}
