import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {useTranslation} from "react-i18next";
import {Chat} from "./partials/Chat.tsx";
import {useParams} from 'react-router-dom';
import {useEffect, useState} from "react";

export const TripChatPage = () => {
    const [t] = useTranslation(["common", "pages/chat"]);
    const pageTitle = t("pages/chat:TripChatPage.title");

    const { chatId } = useParams();
    const [messages, setMessages] = useState<IGroupMessage[]>([]);
    const [filteredMessages, setFilteredMessages] = useState<{ id: string, senderId: string, text: string }[]>([]);


    SetPageTitle(pageTitle);

    useEffect(() => {
        fetch('https://localhost:5173/api/chat/GetGroupMessages')
            .then(response => response.json())
            .then((fetchedMessages: IGroupMessage[]) => {
                setMessages(fetchedMessages);
            });
    }, []);

    useEffect(() => {
        filterMessages();
    }, [messages, chatId]);

    const filterMessages = () => {
        if (typeof chatId !== 'string') return;

        const filtered = messages
            .filter(message => message.fK_GroupChat === parseInt(chatId))
            .map(message => ({
                id: message.id.toString(),
                senderId: message.fK_SenderUser,
                text: message.content
            }));

        setFilteredMessages(filtered);
    };
    
    return (
        <>
            <TitleBar text={pageTitle} hasBackAction={true} />

            <Chat userId="-999" chatId={chatId} messages={filteredMessages}/>
        </>
    );
}
