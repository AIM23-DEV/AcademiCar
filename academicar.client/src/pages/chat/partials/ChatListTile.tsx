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
                        avatars={isPersonalChat(props.chat) ? ["https://fastly.picsum.photos/id/1012/200/200.jpg?hmac=kENwT0f1ecqbPzBGAw3ITKIrm1xoJdF0oh5tq6nosuM"] : ["https://fastly.picsum.photos/id/1012/200/200.jpg?hmac=kENwT0f1ecqbPzBGAw3ITKIrm1xoJdF0oh5tq6nosuM", "https://fastly.picsum.photos/id/338/200/200.jpg?hmac=5S5SeR5xW8mbN3Ml7wTTJPePX392JafhcFMGm7IFNy0", "https://fastly.picsum.photos/id/338/200/200.jpg?hmac=5S5SeR5xW8mbN3Ml7wTTJPePX392JafhcFMGm7IFNy0", "https://fastly.picsum.photos/id/633/200/200.jpg?hmac=3ZyIOtFWRly1tYi_sTXjhSKzDlB-94qs6KCeIdeiCJo"]}
                        alt="avatar"
                        className="mr-4"/>
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row justify-between">
                            <span className="subtitle">
                                {isPersonalChat(props.chat) ? `${props.chat?.driverUser?.firstName!} ${props.chat.driverUser?.lastName!}` : props.chat.tripTitle}
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