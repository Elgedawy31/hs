import { AiOutlineHome } from "react-icons/ai";
import UniHeading from "../components/UniHeading";

const HomePage = () => {
    const handleNotificationClick = () => {
        console.log("Send notification clicked");
    };

    return (
        <div>
            <UniHeading
                icon={AiOutlineHome}
                text="Dashboard Overview"
                showButton={true}
                onButtonClick={handleNotificationClick}
            />
        </div>
    );
};

export default HomePage;
