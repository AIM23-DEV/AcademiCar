// @ts-ignore
import * as signalR from '@microsoft/signalr';
import {Input} from "../../../components/FormFields.tsx";
import {Button} from "../../../components/Buttons.tsx";
import {useState, useEffect} from 'react';
import {BiSend} from 'react-icons/bi';
import {ChatMessage} from "./ChatMessage.tsx";
import {useParams} from "react-router-dom";

interface ChatProps {
    userId: string | undefined;
    chatId: string | undefined;
    messages: MessageProps[]
    type: "group" | "personal"
}

export interface MessageProps {
    id: string;
    senderId: string;
    text: string;
    sentAt: Date;
}

export const Chat = (props: ChatProps) => {
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [message, setMessage] = useState<string>('');
    const [users, setUsers] = useState<IUser[]>([]);
    const {loggedInUserId} = useParams();

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("/chat/chathub")
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);

        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.debug('Connected!');

                    connection.on('ReceiveMessage', (user: string, message: string, chatId: string, sentAt: Date) => {
                        if (props.chatId == chatId) {
                            setMessages(messages => [...messages, {
                                senderId: user,
                                text: message,
                                id: chatId,
                                sentAt: sentAt
                            }]);
                            updateChatScroll();
                        }
                    });
                })
                .catch((e: any) => console.error('Connection failed: ', e));
        }
    }, [connection]);

    useEffect(() => {
        if (props.messages.length > 0 && users.length === 0) {
            setMessages(props.messages);
            fetchUsers();
            updateChatScroll();
        }
    }, [props.messages]);

    const sendMessage = async () => {
        if (message === "") return;

        if (connection?.state === signalR.HubConnectionState.Connected) {
            try {
                await connection.send(props.type == "group" ? 'SendGroupMessage' : 'SendPersonalMessage', props.userId, message, props.chatId, Date.now());
                setMessage('');
            } catch (e) {
                console.error(e);
            }
        } else {
            alert('No connection to server yet.');
        }
    };

    // Fetch users
    const fetchUsers = () => {
        const user999: IUser = {
            id: "-999",
            email: "admin.test@academi.car",
            firstName: "Admin",
            lastName: "Test",
            pictureSrc: "/src/assets/krucziii.jpg",
            fK_Address: -999,
            fK_Stats: -999,
            phoneNumber: "0650 123 12 12",
        };
        const user998: IUser = {
            id: "-998",
            email: "academi.car@academi.car",
            firstName: "Academi",
            lastName: "Car",
            pictureSrc: "/src/assets/c1.jpg",
            fK_Address: -999,
            fK_Stats: -998,
            phoneNumber: "0664 123 34 56",
        };
        const user997: IUser = {
            id: "-997",
            email: "car.los@academi.car",
            firstName: "Car",
            lastName: "Los",
            pictureSrc: "/src/assets/c5.jpg",
            fK_Stats: -997,
            fK_Address: -996,
            phoneNumber: "0600 321 21 21",
        };
        const user996: IUser = {
            id: "-996",
            email: "driver.test@academi.car",
            firstName: "Driver",
            lastName: "Test",
            pictureSrc: "/src/assets/women_mock.jpg",
            fK_Address: -999,
            fK_Stats: -996,
            phoneNumber: "1234 123 12 12",
        };
        const user1: IUser = {
            id: "1",
            email: "max.mueller@academi.car",
            firstName: "Max",
            lastName: "Müller",
            pictureSrc: "https://fastly.picsum.photos/id/1012/200/200.jpg?hmac=kENwT0f1ecqbPzBGAw3ITKIrm1xoJdF0oh5tq6nosuM",
            fK_Address: 1,
            fK_Stats: 1,
            phoneNumber: "+43 (0) 650 123 22 33",
        };
        const user2: IUser = {
            id: "2",
            email: "anna.schmidt@academi.car",
            firstName: "Anna",
            lastName: "Schmidt",
            pictureSrc: "https://fastly.picsum.photos/id/996/200/200.jpg?hmac=nRtkfqKyD3p2uHiFO5LmGt31UcH3NKWg80H5yUkZ8_k",
            fK_Address: 2,
            fK_Stats: 2,
            phoneNumber: "+43 (0) 664 123 34 56",
        };
        const user3: IUser = {
            id: "3",
            email: "jane.smith@academi.car",
            firstName: "Jane",
            lastName: "Smith",
            pictureSrc: "https://fastly.picsum.photos/id/633/200/200.jpg?hmac=3ZyIOtFWRly1tYi_sTXjhSKzDlB-94qs6KCeIdeiCJo",
            fK_Address: 3,
            fK_Stats: 3,
            phoneNumber: "0600 321 21 21",
        };
        const user4: IUser = {
            id: "4",
            email: "john.doe@academi.car",
            firstName: "John",
            lastName: "Doe",
            pictureSrc: "https://fastly.picsum.photos/id/338/200/200.jpg?hmac=5S5SeR5xW8mbN3Ml7wTTJPePX392JafhcFMGm7IFNy0",
            fK_Address: 4,
            fK_Stats: 4,
            phoneNumber: "1234 123 12 12",
        };

        const userList = [user1, user2, user3, user4, user999, user998, user997, user996];

        // Todo get actual users from db once UserManager is fixed
        // props.messages.forEach(async (m) => {
        //     if (userList.find((u: IUser) => u.id == m.senderId) === undefined) {
        //         fetch('/api/user/GetUserbyId?id=' + m.senderId)
        //             .then(response => console.log(response))
        //             // .then(response => response.json())
        //             // .then((user: IUser) => {
        //             //     console.log(user);
        //             //     // add to userList
        //             // })
        //             .catch(error => console.log(error));
        //     }
        // });

        setUsers(userList);
    };

    const updateChatScroll = () => {
        if (document?.scrollingElement?.scrollTop !== document?.scrollingElement?.scrollHeight) {
            setTimeout(() => window.scrollTo({
                top: (document.scrollingElement?.scrollHeight ?? 0) + 96,
                behavior: document.scrollingElement?.scrollTop === 0 ? 'instant' : 'smooth'
            }), 50)
        }
    }

    return (
        <div id="chat-container" className="w-full h-full overflow-y-auto mb-24">
            <ul className="flex flex-col w-full space-y-4">
                {messages.map((msg, index) => {
                    return (
                        <ChatMessage key={index} text={msg.text} type={msg.senderId === loggedInUserId ? "sent" : "received"}
                                     sentAt={msg.sentAt} sender={users.find(u => u.id == msg.senderId)!}
                                     showSender={props.type === "group"}/>
                    );
                })}
            </ul>

            {/* Fixed message input and send button */}
            <div
                className="fixed bottom-0 bg-gray-100 inset-x-0 h-16 z-20 max-w-2xl mx-auto">
                <div className="flex flex-row space-x-3.5 px-[1.125rem] mb-[1.125rem]">
                    <Input placeholder="Nachricht ..."
                           fullWidth
                           type="text"
                           value={message}
                           onChange={e => setMessage(e.target.value)}
                           onKeyDown={async event => {
                               if (event.key === "Enter") {
                                   await sendMessage();
                               }
                           }}
                    />

                    <Button onClick={sendMessage}
                            leading={<BiSend className="icon-md"/>}
                            className="h-max -mt-0.5" disabled={message.length === 0}/>
                </div>
            </div>
        </div>
    );
};
