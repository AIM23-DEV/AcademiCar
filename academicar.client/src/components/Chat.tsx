import React, { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<{ user: string; message: string }[]>([]);
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [message, setMessage] = useState<string>('');
    const [user, setUser] = useState<string>('');

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7194/chat/chathub")
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log('Connected!');

                    connection.on('ReceiveMessage', (user: string, message: string) => {
                        setMessages(messages => [...messages, { user, message }]);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const sendMessage = async () => {
        if (connection?.state === signalR.HubConnectionState.Connected) {
            try {
                await connection.send('SendMessage', user, message);
                setMessage('');
            } catch (e) {
                console.error(e);
            }
        } else {
            alert('No connection to server yet.');
        }
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={user}
                    onChange={e => setUser(e.target.value)}
                    placeholder="Name"
                />
            </div>
            <div>
                <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Message"
                />
                <button onClick={sendMessage}>Send</button>
            </div>
            <div>
                <h2>Messages</h2>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}><strong>{msg.user}</strong>: {msg.message}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Chat;
