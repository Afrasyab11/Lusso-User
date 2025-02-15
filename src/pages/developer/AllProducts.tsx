import ProductTable from "../../components/tables/ProductsTable";
const AllProducts = () => {
    return (
        <div style={{ overflow: "auto", width: "100%", height: "100%" }} className="flex-1">
            <ProductTable />
        </div>
    )
}

export default AllProducts;