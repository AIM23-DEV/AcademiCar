import {Link} from "react-router-dom";
import {ChatAvatar} from "./ChatAvatar.tsx";

interface ChatListTileProps {
    chat: IChat,
}

export const ChatListTile = (props: ChatListTileProps) => {
    return (
        <li key={props.chat.id}>
            <Link to={props.chat.hasMoreThan2 ? `/chat/trip/${props.chat.id}` : `/chat/personal/${props.chat.id}`}
                  className="w-full h-full flex flex-row justify-between">
                <div className="flex flex-row">
                    {/* Todo load the right avatars */}
                    <ChatAvatar
                        avatars={["/src/assets/women_mock.jpg", "/src/assets/krucziii.jpg", "/src/assets/c5.jpg", "/src/assets/react.jpg"]}
                        alt="avatar"
                        className="mr-4"/>
                    <div className="flex flex-col">
                        {/* Todo correct user or chat name */}
                        <span
                            className="subtitle"> {`${props.chat.user?.firstName!} ${props.chat.user?.lastName!}`} </span>
                        <span className="body-2 line-clamp-2 text-gray-500">
                            Todo: Die neuste Chat Nachricht sollte hier angezeigt werden.
                        </span>
                    </div>
                    <div className="flex flex-col items-end w-min space-y-1">
                        <span
                            className="body-2 text-gray-500">{new Date(props.chat.updatedAt).getHours() + ':' + new Date(props.chat.updatedAt).getMinutes()}</span>
                        <span
                            className="flex justify-center items-center text-center caption font-bold bg-primary-600 text-white rounded-full icon">
                            {/* Todo load the real unread count */}
                            2
                        </span>
                    </div>
                </div>
            </Link>
        </li>
    )
}