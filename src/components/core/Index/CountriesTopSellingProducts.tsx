import SalesByCountries from "../map_products/SalesByCountries";
import TopSellingProducts from "../map_products/TopSellingProducts";

const CountriesTopSellingProducts = (): JSX.Element => {
    return (
        <>
            <div className="row">
                {/* Sales By Countries */}
                <SalesByCountries />
                {/* Top Selling Products */}
                <TopSellingProducts />
            </div>
        </>
    );
};

export default CountriesTopSellingProducts;