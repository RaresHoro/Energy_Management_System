import React, { useEffect, useState } from 'react';


const AdminChat = () => {
    const [chatRooms, setChatRooms] = useState([]);
    const [activeChatRoomId, setActiveChatRoomId] = useState(null);

    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                const response = await fetch('http://localhost:8082/chat');
                const data = await response.json();
                setChatRooms(data);
            } catch (error) {
                console.error('Failed to fetch chat rooms:', error);
            }
        };

        fetchChatRooms();
    }, []);

    
};
