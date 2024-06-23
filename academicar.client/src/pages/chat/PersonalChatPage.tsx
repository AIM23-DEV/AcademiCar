import {useTranslation} from "react-i18next";
import {JoinRequestCard} from "./partials/JoinRequestCard.tsx";
import {TitleBar} from "../../components/TitleBar.tsx";
import {useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import {Chat, MessageProps} from "./partials/Chat.tsx";
import {TextLink} from "../../components/Buttons.tsx";
import {BiDotsVerticalRounded} from "react-icons/bi";

export const PersonalChatPage = () => {
    const [t] = useTranslation(["common", "pages/chat"]);
    const joinRequestLabelText = t("pages/chat:PersonalChatPage.label_join_request");
    const joinRequestLinkText = t("pages/chat:PersonalChatPage.link_trip");
    const joinRequestDenyText = t("pages/chat:PersonalChatPage.button_deny");
    const joinRequestAcceptText = t("pages/chat:PersonalChatPage.button_accept");
    const {chatId} = useParams();
    const [messages, setMessages] = useState<IPersonalMessage[]>([]);
    const [filteredMessages, setFilteredMessages] = useState<MessageProps[]>([]);
    const [chat, setChat] = useState<IPersonalChat>();
    const [trip, setTrip] = useState<ITrip>();

    // Fetch chat and trip
    useEffect(() => {
        const fetchChatAndTrip = async () => {
            try {
                const chatResponse = await fetch('https://localhost:5173/api/chat/GetPersonalChatById?id=' + chatId);
                const chatData: IPersonalChat = await chatResponse.json();
                setChat(chatData);

                if (chatData.fK_Trip) {
                    const tripResponse = await fetch('https://localhost:5173/api/create/' + chatData.fK_Trip);
                    const tripData: ITrip = await tripResponse.json();
                    setTrip(tripData);
                }
            } catch (error) {
                console.error("Failed to fetch chat or trip data", error);
            }
        };

        fetchChatAndTrip();
    }, [chatId]);

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
                <JoinRequestCard
                    labelText={joinRequestLabelText}
                    linkText={joinRequestLinkText}
                    denyButtonText={joinRequestDenyText}
                    acceptButtonText={joinRequestAcceptText}
                    driverId={chat?.driverUser?.id}
                    tripId={chat?.fK_Trip}
                    price={trip?.price != null ? trip?.price : 0}
                />
                <Chat userId="-999" chatId={chatId} messages={filteredMessages} type="personal"/>
            </div>
        </>
    );
};
