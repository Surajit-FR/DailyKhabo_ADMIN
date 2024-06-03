import RevenueHistory from "../charts/RevenueHistory";
import TaskOverview from "../charts/TaskOverview";

const ChartSection = (): JSX.Element => {
    return (
        <>
            <div className="row">
                {/* Revenue History */}
                <RevenueHistory />
                {/* Task Overview */}
                <TaskOverview />
            </div>
        </>
    );
};

export default ChartSection;