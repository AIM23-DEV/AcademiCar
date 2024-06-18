import React, { useEffect, useState } from 'react';

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:5117/ws');

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
            const message = event.data;
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        ws.onclose = (event) => {
            console.log('WebSocket closed:', event);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket && input) {
            socket.send(input);
            setInput('');
        }
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') sendMessage();
                }}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
