import {Card} from "../../../components/Cards.tsx";
import {Link} from "react-router-dom";
import {EmptyChat} from "./EmptyChat.tsx";

interface ChatSearchResultsListProps {
    personalResults: IChat[],
    tripResults: IChat[],
    labelText: string,
    noResultsTitleText: string,
    noResultsInfoText: string
}

export const ChatSearchResultsList = (props: ChatSearchResultsListProps) => {
    return props.personalResults.length == 0 && props.tripResults.length == 0 ? (
        <EmptyChat type="searchResult"/>
    ) : (
        <Card label={props.labelText} className="mt-8">
            <ul>
                {props.personalResults.map((chat: IChat) => (
                    <li key={chat.id}>
                        <Link to={`/chat/trip/${chat.id}`}
                              className="w-full h-full flex flex-row justify-between">
                            <div className="flex flex-row">
                                {/* Todo load the right avatar */}
                                <img src="/src/assets/women_mock.jpg"
                                     alt="avatar"
                                     className="icon-2xl aspect-1 border-gray-600 rounded-full object-cover mr-4"/>
                                <div className="flex flex-col">
                                    <span
                                        className="subtitle"> {`${chat.user?.firstName!} ${chat.user?.lastName!}`} </span>
                                    <span className="body-2 line-clamp-2 text-gray-500">
                                        Todo: Die neuste Chat Nachricht sollte hier angezeigt werden.
                                    </span>
                                </div>
                                <div className="flex flex-col items-end w-min space-y-1">
                                    <span
                                        className="body-2 text-gray-500">{new Date(chat.updatedAt).getHours() + ':' + new Date(chat.updatedAt).getMinutes()}</span>
                                    <span
                                        className="flex justify-center items-center text-center caption font-bold bg-primary-600 text-white rounded-full icon">
                                        {/* Todo load the unread count */}
                                        2 
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            <ul>
                {props.tripResults.map((chat: IChat) => (
                    <li key={chat.id}>
                        <Link to={`/chat/trip/${chat.id}`}
                              className="w-full h-full flex flex-row justify-between">
                            <div className="flex flex-row">
                                {/* Todo load multiple avatars */}
                                <img src="/src/assets/women_mock.jpg"
                                     alt="avatar"
                                     className="icon-2xl aspect-1 border-gray-600 rounded-full object-cover mr-4"/>
                                <div className="flex flex-col">
                                    <span
                                        className="subtitle"> {`${chat.user?.firstName!} ${chat.user?.lastName!}`} </span>
                                    <span className="body-2 line-clamp-2 text-gray-500">
                                        Todo: Die neuste Chat Nachricht sollte hier angezeigt werden...
                                    </span>
                                </div>
                                <div className="flex flex-col items-end w-min space-y-1">
                                    <span
                                        className="body-2 text-gray-500">{new Date(chat.updatedAt).getHours() + ':' + new Date(chat.updatedAt).getMinutes()}</span>
                                    <span
                                        className="flex justify-center items-center text-center caption font-bold bg-primary-600 text-white rounded-full icon">
                                        {/* Todo load the unread count */}
                                        2 
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </Card>
    );
}