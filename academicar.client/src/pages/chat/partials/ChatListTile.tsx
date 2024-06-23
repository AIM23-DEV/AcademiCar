import {Link} from "react-router-dom";
import {ChatAvatar} from "./ChatAvatar.tsx";
import {formatDate} from "../../../helpers/date_helper.ts";

interface ChatListTileProps {
    chat: IPersonalChat | IGroupChat,
    loggedInUserId: string | undefined
}

export const ChatListTile = (props: ChatListTileProps) => {
    function isPersonalChat(chat: any): chat is IPersonalChat {
        return (chat as IPersonalChat).fK_PassengerUser != undefined;
    }
   
    const unreadCount = !isPersonalChat(props.chat) && props.chat.id === -999 ? 0 : 4; // Todo set correct unread count

    return (
        <li key={props.chat.id} className="w-full">
            <Link to={isPersonalChat(props.chat) ? `/chat/${props.loggedInUserId}/personal/${props.chat.id}` :  `/chat/${props.loggedInUserId}/trip/${props.chat.id}`}
                  className="w-full h-full flex flex-row justify-between">
                <div className="flex flex-row w-full">
                    {/* Todo load the right avatars */}
                    <ChatAvatar
                        avatars={isPersonalChat(props.chat) ? ["/src/assets/c5.jpg"] : ["/src/assets/women_mock.jpg", "/src/assets/krucziii.jpg", "/src/assets/c5.jpg", "/src/assets/react.jpg"]}
                        alt="avatar"
                        className="mr-4"/>
                    <div className="flex flex-col w-full">
                        {/* Todo correct user or chat name */}
                        <div className="flex flex-row justify-between">
                            <span className="subtitle">
                                {isPersonalChat(props.chat) ? `${props.chat?.driverUser?.firstName!} ${props.chat.driverUser?.lastName!}` : props.chat.trip?.title}
                            </span>
                            <div className="body-2 text-gray-500">
                                {formatDate(props.chat.updatedAt)}
                            </div>
                        </div>

                        <div className="flex flex-row justify-between">
                            <span className="body-2 line-clamp-2 text-gray-500">
                                {props.chat.lastMessageContent}
                            </span>
                            {unreadCount > 3 ?
                                <div
                                    className="flex justify-center items-center text-center caption font-bold bg-primary-600 text-white rounded-full icon">
                                    {/* Todo load the real unread count */}
                                    {unreadCount}
                                </div> : <></>
                            }
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    )
}