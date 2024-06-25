// import {useTranslation} from "react-i18next";
// import {JoinRequestCard} from "./partials/JoinRequestCard.tsx";
import {TitleBar} from "../../components/TitleBar.tsx";
import {useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import {Chat, MessageProps} from "./partials/Chat.tsx";
import {TextLink} from "../../components/Buttons.tsx";
import {BiDotsVerticalRounded} from "react-icons/bi";

export const TripChatPage = () => {
    // const [t] = useTranslation(["common", "pages/chat"]);
    // const joinRequestLabelText = t("pages/chat:TripChatPage.label_join_request");
    // const joinRequestLinkText = t("pages/chat:TripChatPage.link_trip");
    // const joinRequestDenyText = t("pages/chat:TripChatPage.button_deny");
    // const joinRequestAcceptText = t("pages/chat:TripChatPage.button_accept");
    const {chatId} = useParams();
    const [messages, setMessages] = useState<IGroupMessage[]>([]);
    const [filteredMessages, setFilteredMessages] = useState<MessageProps[]>([]);
    const [chat, setChat] = useState<IGroupChat>();
    const {loggedInUserId} = useParams();

    // Fetch chat
    useEffect(() => {
        fetch('https://localhost:5173/api/chat/GetGroupChatById?id=' + chatId)
            .then(response => response.json())
            .then((c: IGroupChat) => {
                setChat(c);
            });
    }, []);

    // Fetch messages
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
                text: message.content,
                sentAt: new Date(message.sentAt),
            })).sort((a: MessageProps, b: MessageProps) => a.sentAt.getTime() - b.sentAt.getTime());

        setFilteredMessages(filtered);
    };

    return (
        <>
            <TitleBar hasBackAction={true}
                      text={chat?.tripTitle ?? ""}
                      className="fixed bg-gray-100 px-4"
                      trailing={
                          <TextLink className="mb-3" variant="outline" link={`${chatId}/detail`} leading={
                              <BiDotsVerticalRounded className="icon-md"/>
                          }/>}
            />

            <div className="w-full flex flex-col items-center mt-24">
                <Chat userId={loggedInUserId} chatId={chatId} messages={filteredMessages} type="group"/>
            </div>
        </>
    );
};
