import {useTranslation} from "react-i18next";
import {Card} from "../../../components/Cards.tsx";
import {ChatListTile} from "./ChatListTile.tsx";
import {EmptyChat} from "./EmptyChat.tsx";

interface ChatsListProps {
    chats: IChat[],
    searchActive: boolean
    className: string
}

export const ChatsList = (props: ChatsListProps) => {
    const [t] = useTranslation(["common", "pages/chat"]);
    const chatsListLabelText = t("pages/chat:IndexChatsPage.label_chats");
    const resultsListLabelText = t("pages/chat:IndexChatsPage.label_results");

    if (props.chats.length === 0) {
        return <EmptyChat type={props.searchActive ? "searchResult" : "chatResult"} className={props.className}/>;
    }

    return (
        <Card
            label={props.searchActive ? resultsListLabelText : chatsListLabelText} className={props.className}>
            <ul>
                {props.chats.map((chat) => (
                    <ChatListTile chat={chat} key={chat.id}/>
                ))}
            </ul>
        </Card>
    );
}