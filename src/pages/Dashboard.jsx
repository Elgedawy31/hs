import { LayoutDashboard } from "lucide-react";
import UniHeading from "../components/UniHeading";
import AddModal from "../components/AddModal";
import { useState } from "react";
import { Input, Textarea, Select, SelectItem } from "@nextui-org/react";

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({
        title: '',
        message: '',
        type: 'all'
    });

    const handleNotificationClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveNotification = async () => {
        try {
            setIsLoading(true);
            // Here you would typically send the notification data to your backend
            console.log("Sending notification:", notification);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsModalOpen(false);
            // Reset form
            setNotification({
                title: '',
                message: '',
                type: 'all'
            });
        } catch (error) {
            console.error("Error sending notification:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field) => (e) => {
        setNotification(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    return (
        <div className="space-y-4">
            <UniHeading
                icon={LayoutDashboard}
                text="Dashboard Overview"
                showButton={true}
                onButtonClick={handleNotificationClick}
            />
            <AddModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveNotification}
                title="Send Notification"
                saveButtonText="Send"
                isLoading={isLoading}
            >
                <div className="space-y-6 text-text">
                    <Select 
                        label="Notification Type"
                        placeholder="Select notification type"
                        value={notification.type}
                        onChange={handleInputChange('type')}
                        className="w-full bg-background text-text"
                        classNames={{
                            label: "text-text",
                            trigger: "bg-background border-borderColor hover:bg-background",
                            value: "text-text"
                        }}
                    >
                        <SelectItem key="all" value="all">All Users</SelectItem>
                        <SelectItem key="employees" value="employees">Employees Only</SelectItem>
                        <SelectItem key="admins" value="admins">Admins Only</SelectItem>
                    </Select>

                    <Input
                        label="Title"
                        placeholder="Enter notification title"
                        value={notification.title}
                        onChange={handleInputChange('title')}
                        className="w-full bg-background text-text"
                        classNames={{
                            label: "text-text",
                            input: "text-text bg-background",
                            inputWrapper: "bg-background border-borderColor hover:bg-background"
                        }}
                    />

                    <Textarea
                        label="Message"
                        placeholder="Enter your notification message"
                        value={notification.message}
                        onChange={handleInputChange('message')}
                        className="w-full bg-background text-text"
                        classNames={{
                            label: "text-text",
                            input: "text-text bg-background",
                            inputWrapper: "bg-background border-borderColor hover:bg-background"
                        }}
                        minRows={3}
                    />
                </div>
            </AddModal>
        </div>
    );
};

export default Dashboard;
