import { LayoutDashboard } from "lucide-react";
import UniHeading from "../components/UniHeading";

const Dashboard = () => {
    const handleNotificationClick = () => {
        console.log("Send notification clicked");
    };

    return (
    <>
      <div className="flex">
        <h1 className="text-xl font-medium">Good Morning <span className="text-xl font-meduim text-gray-600">Admin !</span> </h1>
      </div>
        <div>
            <UniHeading
                icon={LayoutDashboard}
                text="Dashboard Overview"
                showButton={true}
                onButtonClick={handleNotificationClick}
            />
        </div>
    </>
       
    );
};

export default Dashboard;
