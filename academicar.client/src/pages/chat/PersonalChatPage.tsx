import {useTranslation} from "react-i18next";
import {JoinRequestCard} from "./partials/JoinRequestCard.tsx";
import {TitleBar} from "../../components/TitleBar.tsx";
import {Chat} from "../../components/Chat.tsx";
import {useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import {ChatMessagesList} from "./partials/ChatMessagesList.tsx";

export const PersonalChatPage = () => {
    const [t] = useTranslation(["common", "pages/chat"]);
    const joinRequestLabelText = t("pages/chat:PersonalChatPage.label_join_request");
    const joinRequestLinkText = t("pages/chat:PersonalChatPage.link_trip");
    const joinRequestDenyText = t("pages/chat:PersonalChatPage.button_deny");
    const joinRequestAcceptText = t("pages/chat:PersonalChatPage.button_accept");
    const { chatId } = useParams();
    const [messages, setMessages] = useState<IPersonalMessage[]>([]);
    const [filteredMessages, setFilteredMessages] = useState<{ id: string, senderId: string, text: string }[]>([]);

    useEffect(() => {
        fetch('https://localhost:5173/api/chat/GetPersonalMessages')
            .then(response => response.json())
            .then((fetchedMessages: IPersonalMessage[]) => {
                setMessages(fetchedMessages);
            });
    }, []);

    useEffect(() => {
        filterMessages();
    }, [messages, chatId]);

    const filterMessages = () => {
        if (typeof chatId !== 'string') return;

        const filtered = messages
            .filter(message => message.fK_PersonalChat === parseInt(chatId))
            .map(message => ({
                id: message.id.toString(),
                senderId: message.fK_SenderUser,
                text: message.content
            }));

        setFilteredMessages(filtered);
    };

    return (
        <>
            <TitleBar hasBackAction={true} />
            
            <div className="w-full flex flex-col items-center">
                <JoinRequestCard
                    labelText={joinRequestLabelText}
                    linkText={joinRequestLinkText}
                    denyButtonText={joinRequestDenyText}
                    acceptButtonText={joinRequestAcceptText}
                />
                <ChatMessagesList messages={filteredMessages}/>

                <Chat userId="-999" chatId={chatId}/>
            </div>
        </>
    );
};
