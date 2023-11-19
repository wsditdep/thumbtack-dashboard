import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import DashboardLayout from "../../page";
import ProductTable from "@/components/table/product/ProductTable";
import { globalLink } from "@/utils/globalLink";

const fetchProducts = async () => {
    try {
        const res = await fetch(`${globalLink}/api/product`, {
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

export default async function ProductIndex() {

    const products = await fetchProducts();

    return (
        <DashboardLayout>
            <Breadcrumb
                icon="fa fa-box"
                heading="Manage Products"
                subheading="You can manage the products"  
                isButtons={false}
            />
            <div className="dashboard-content">
                <ProductTable list={products} />
            </div>
        </DashboardLayout>
    )
}