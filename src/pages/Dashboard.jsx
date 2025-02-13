import { LayoutDashboard } from "lucide-react";
import UniHeading from "../components/UniHeading";

const Dashboard = () => {
    const handleNotificationClick = () => {
        console.log("Send notification clicked");
    };

    return (
        <div>
            <UniHeading
                icon={LayoutDashboard}
                text="Dashboard Overview"
                showButton={true}
                onButtonClick={handleNotificationClick}
            />
        </div>
    );
};

export default Dashboard;
