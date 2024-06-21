// import {useTranslation} from "react-i18next";
// import {JoinRequestCard} from "./partials/JoinRequestCard.tsx";
import {TitleBar} from "../../components/TitleBar.tsx";
import {useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import {Chat, MessageProps} from "./partials/Chat.tsx";
import {TextLink} from "../../components/Buttons.tsx";
import {BiDotsVerticalRounded} from "react-icons/bi";

export const PersonalChatPage = () => {
    // const [t] = useTranslation(["common", "pages/chat"]);
    // const joinRequestLabelText = t("pages/chat:PersonalChatPage.label_join_request");
    // const joinRequestLinkText = t("pages/chat:PersonalChatPage.link_trip");
    // const joinRequestDenyText = t("pages/chat:PersonalChatPage.button_deny");
    // const joinRequestAcceptText = t("pages/chat:PersonalChatPage.button_accept");
    const {chatId} = useParams();
    const [messages, setMessages] = useState<IPersonalMessage[]>([]);
    const [filteredMessages, setFilteredMessages] = useState<MessageProps[]>([]);
    const [chat, setChat] = useState<IPersonalChat>();

    // Fetch chat
    useEffect(() => {
        fetch('https://localhost:5173/api/chat/GetPersonalChatById?id=' + chatId)
            .then(response => response.json())
            .then((c: IPersonalChat) => {
                setChat(c);
            });
    }, []);

    // Fetch messages
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
                text: message.content,
                sentAt: new Date(message.sentAt),
            })).sort((a: MessageProps, b: MessageProps) => a.sentAt.getTime() - b.sentAt.getTime());

        setFilteredMessages(filtered);
    };

    return (
        <>
            <TitleBar hasBackAction={true}
                      text={`${chat?.driverUser?.firstName! ?? ""} ${chat?.driverUser?.lastName! ?? ""}`}
                      className="fixed bg-gray-100 px-4"
                      trailing={
                          <TextLink className="mb-3" variant="outline" link={`${chatId}/detail`} leading={
                              <BiDotsVerticalRounded className="icon-md"/>
                          }/>}
            />

            <div className="w-full flex flex-col items-center mt-20">
                {/*<JoinRequestCard*/}
                {/*    labelText={joinRequestLabelText}*/}
                {/*    linkText={joinRequestLinkText}*/}
                {/*    denyButtonText={joinRequestDenyText}*/}
                {/*    acceptButtonText={joinRequestAcceptText}*/}
                {/*/>*/}
                <Chat userId="-999" chatId={chatId} messages={filteredMessages} type="personal"/>
            </div>
        </>
    );
};
