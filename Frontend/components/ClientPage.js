import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ChatBox from "./ChatBox"; // Import the ChatBox component

const ClientPage = () => {
    const [devices, setDevices] = useState([]);
    const location = useLocation(); // Access location to get userId
    const userId = location.state?.userId; // Safely get userId

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                if (userId) {
                    const response = await axios.get(`http://localhost:8081/api/device/user/${userId}`);
                    setDevices(response.data);
                }
            } catch (error) {
                console.error("Error fetching devices:", error);
            }
        };

        fetchDevices();
    }, [userId]);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Client Page</h1>
            <h2 className="text-center mb-4">Your Devices</h2>
            {devices.length > 0 ? (
                <div className="row justify-content-center">
                    <ul className="list-group col-md-6">
                        {devices.map((device) => (
                            <li key={device.id} className="list-group-item">
                                <strong>{device.name}</strong> - {device.type}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="alert alert-info text-center">
                    No devices found for this user.
                </div>
            )}
            
            <h2 className="text-center my-4">Chat with Admin</h2>
      <ChatBox userId={userId} role="client" />
    </div>
    );
};

export default ClientPage;
