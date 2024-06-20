// @ts-ignore
import * as signalR from '@microsoft/signalr';
import {Input} from "../../../components/FormFields.tsx";
import {Button} from "../../../components/Buttons.tsx";
import { useState, useEffect } from 'react';

interface ChatProps {
    userId: string | undefined;
    chatId: string | undefined;
    messages: {id: string, senderId: string, text: string}[]
}

export const Chat = (props: ChatProps) => {
    const [messages, setMessages] = useState<{ user: string; message: string }[]>([]);
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

                    connection.on('ReceiveMessage', (user: string, message: string ,chatId: string) => {
                        if(props.chatId == chatId)
                            setMessages(messages => [...messages, { user, message, chatId }]);
                    });
                })
                .catch((e: any) => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const sendPersonalMessage = async () => {
        if (connection?.state === signalR.HubConnectionState.Connected) {
            try {
                await connection.send('SendPersonalMessage', props.userId, message, props.chatId);
                setMessage('');
            } catch (e) {
                console.error(e);
            }
        } else {
            alert('No connection to server yet.');
        }
    };

    const sendGroupMessage = async () => {
        if (connection?.state === signalR.HubConnectionState.Connected) {
            try {
                await connection.send('SendGroupMessage', props.userId, message, props.chatId);
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
            <ul className="message-list">
                {props.messages.map((message) => {
                    return (
                        <li key={message.id} className="message">
                            <div>{message.senderId}</div>
                            <div>{message.text}</div>
                        </li>
                    );
                })}
            </ul>

            <ul className="message-list">
                {messages.map((msg, index) => {
                    return (
                        <li key={index} className="message">
                            <div>{msg.user}</div>
                            <div>{msg.message}</div>
                        </li>
                    );
                })}
            </ul>
            <div>
                <Input placeholder="Nachricht ..."
                       type="text"
                       value={message}
                       onChange={e => setMessage(e.target.value)}/>
                <Button onClick={sendGroupMessage}
                        text="Send Group"/>
                <Button onClick={sendPersonalMessage}
                        text="Send Personal"/>
            </div>
        </div>
    );
};