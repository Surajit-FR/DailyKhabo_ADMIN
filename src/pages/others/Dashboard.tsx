import AtaglanceSection from "../../components/core/Index/AtaglanceSection";
import AtaglanceSection2 from "../../components/core/Index/AtaglanceSection2";
import ChartSection from "../../components/core/Index/ChartSection";
import CircularProgressBarSection from "../../components/core/Index/CircularProgressBarSection";
import CountriesTopSellingProducts from "../../components/core/Index/CountriesTopSellingProducts";
import CustomerReviewChatBox from "../../components/core/Index/CustomerReviewChatBox";

const Dashboard = (): JSX.Element => {
    return (
        <>
            <main className="page-content">
                {/* AtaGlance section */}
                <AtaglanceSection />
                {/* Chart Section */}
                <ChartSection />
                {/* Circular Progress Bar Section */}
                <CircularProgressBarSection />
                {/* Countries Map TopSelling Products */}
                <CountriesTopSellingProducts />
                {/* AtaGlance section2 */}
                <AtaglanceSection2 />
                {/* Customer review & Chat box */}
                <CustomerReviewChatBox />
            </main>
        </>
    );
};

export default Dashboard;