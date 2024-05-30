import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {useTranslation} from "react-i18next";
import {MessagesList} from "./partials/MessagesList.tsx";
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
    SetPageTitle(pageTitle);
    
    return (
        <>
            <TitleBar text={pageTitle}/>

            <MessagesList messages={DUMMY_DATA} />

            <SendMessageForm />

            <BottomNavigationBar selected="chat"/>
        </>
    );
}
