import { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';


interface ChatProps {
    userId: string | undefined;
    chatId: string | undefined;
}

export const Chat = (props: ChatProps) => {
    const [messages, setMessages] = useState<{ userId: string; message: string }[]>([]);
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [message, setMessage] = useState<string>('');


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

                    connection.on('ReceiveMessage', (userId: string, message: string) => {
                        setMessages(messages => [...messages, { userId, message }]);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const sendMessage = async () => {
        if (connection?.state === signalR.HubConnectionState.Connected) {
            try {
                //sendpersonal und sendgroup
                await connection.send('SendMessage', props.userId, props.chatId, message);
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
                        <li key={index}><strong></strong>: {msg.message}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};