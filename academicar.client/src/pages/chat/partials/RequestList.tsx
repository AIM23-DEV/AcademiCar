import {useTranslation} from "react-i18next";
import {Card} from "../../../components/Cards.tsx";
import {ChatListTile} from "./ChatListTile.tsx";
import {EmptyChat} from "./EmptyChat.tsx";
import {Divider} from "../../../components/Divider.tsx";

interface ChatsListProps {
    chats: (IPersonalChat | IGroupChat)[],
    searchActive: boolean
    className?: string
    loggedInUserId: string | undefined
}

export const RequestList = (props: ChatsListProps) => {
    const [t] = useTranslation(["common", "pages/chat"]);
    const requestsListLabelText = t("pages/chat:IndexChatsPage.label_requests");

    if (props.chats.length === 0) {
        return <EmptyChat type={props.searchActive ? "searchResult" : "chatResult"} className={props.className}/>;
    }

    return (
        <Card
            label={requestsListLabelText} className={props.className}>
            <ul className="space-y-3" key="ChatList">
                {props.chats.map((chat, index) => (
                    <div key={`${chat.id}:${index}`}>
                        <ChatListTile chat={chat} loggedInUserId={props.loggedInUserId}/>
                        {index < props.chats.length - 1 ? <Divider/> : <></>}
                    </div>
                ))}
               
            </ul>
        </Card>
    );
}