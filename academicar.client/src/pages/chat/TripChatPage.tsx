import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {useTranslation} from "react-i18next";
import {ChatMessagesList} from "./partials/ChatMessagesList.tsx";
import {SendMessageForm} from "./partials/SendMessageForm.tsx";

const DUMMY_DATA = [
    {
        id: "1",
        senderId: "perborgen",
        text: "who'll win?"
    },
    {
        id: "2",
        senderId: "janedoe",
        text: "who'll win?"
    }
]

export const TripChatPage = () => {
    const [t] = useTranslation(["common", "pages/chat"]);
    const pageTitle = t("pages/chat:TripChatPage.title");
    const messageFormPlaceholderText = t("pages/chat:TripChatPage.placeholder_message");
    const messageFormInfoNotMember = t("pages/chat:TripChatPage.info_not_member");
    SetPageTitle(pageTitle);
    
    return (
        <>
            <TitleBar text={pageTitle} hasBackAction={true} />

            <ChatMessagesList messages={DUMMY_DATA} />

            <SendMessageForm
                isMember={true}
                placeholderText={messageFormPlaceholderText}
                infoNotMember={messageFormInfoNotMember}
            />
        </>
    );
}
