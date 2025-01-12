import React, { useEffect, useState } from 'react';
import ChatBox from './ChatBox';

const ClientChat = ({ userId }) => {
    const [chatRoomId, setChatRoomId] = useState(null);

    useEffect(() => {
        const startChat = async () => {
            try {
                const response = await fetch('http://localhost:8082/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: `Chat with ${userId}` }),
                });
                const chatRoom = await response.json();
                setChatRoomId(chatRoom.id);
            } catch (error) {
                console.error('Failed to start chat:', error);
            }
        };

        startChat();
    }, [userId]);

    return chatRoomId ? (
        <ChatBox chatRoomId={chatRoomId} userId={userId} role="client" />
    ) : (
        <p>Loading chat...</p>
    );
};

export default ClientChat;
