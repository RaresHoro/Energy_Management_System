import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const ChatBox = ({ chatRoomId, userId, role, onSendMessage }) => {
    const [client, setClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [page, setPage] = useState(0);
    const [hasMoreMessages, setHasMoreMessages] = useState(true);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (chatRoomId) {
            fetchChatHistory();
        }
    }, [chatRoomId]);

    const fetchChatHistory = async () => {
        try {
            const response = await fetch(`http://localhost:8082/chat/${chatRoomId}/messages?page=${page}&size=10`);
            const data = await response.json();
            if (data.length > 0) {
                setMessages((prevMessages) => [...data.reverse(), ...prevMessages]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMoreMessages(false);
            }
        } catch (error) {
            console.error('Failed to fetch chat history:', error);
        }
    };

    const handleScroll = (e) => {
        if (e.target.scrollTop === 0 && hasMoreMessages) {
            fetchChatHistory();
        }
    };
    const handleSendMessage = () => {
        if (message.trim()) {
            setMessage('');  // Clear the input field immediately
            if (client && chatRoomId) {
                const chatMessage = {
                    sender: role === 'admin' ? 'Administrator' : userId,
                    content: message.trim(),
                    timestamp: new Date(),
                };
    
                client.publish({
                    destination: `/app/chatroom-${chatRoomId}`,
                    body: JSON.stringify(chatMessage),
                });
    
                setMessages((prevMessages) => [...prevMessages, chatMessage]);
                if (onSendMessage) onSendMessage(chatMessage);
            }
        }
    };
    
    useEffect(() => {
        const socket = new SockJS('http://localhost:8082/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log(str),
            onConnect: () => {
                if (chatRoomId) {
                    stompClient.subscribe(`/topic/chatroom-${chatRoomId}`, (msg) => {
                        const receivedMessage = JSON.parse(msg.body);
                        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                    });
                }
            },
            onDisconnect: () => console.log('Disconnected'),
        });

        stompClient.activate();
        setClient(stompClient);

        return () => stompClient.deactivate();
    }, [chatRoomId]);

    return (
        <div className="chat-box">
            <div
                className="chat-messages"
                onScroll={handleScroll}
                style={{ height: '300px', overflowY: 'auto' }}
            >
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.sender === userId ? 'sent' : 'received'}`}>
                        <strong>{msg.sender === userId ? 'You' : msg.sender}:</strong> {msg.content}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatBox;
