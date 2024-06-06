import {Card} from "../../../components/Cards.tsx";
import {Link} from "react-router-dom";

interface Chat {
    // TODO implement Chat type globally...
}

interface ChatsListProps {
    personalChats: Chat[],
    tripChats: Chat[],
    labelText: string
}

export const ChatsList = (props: ChatsListProps) => {
    return (
        <Card label={props.labelText} className="mt-8">
            <h1>Todo</h1>
            <ul>
                {props.personalChats.map((chat, index) => (
                    <li key={index}>
                        <Link to={`/chat/personal/${index}`}>{chat.toString()}</Link>
                    </li>
                ))}
            </ul>
            <ul>
                {props.tripChats.map((chat, index) => (
                    <li key={index}>
                        <Link to={`/chat/trip/${index}`}>{chat.toString()}</Link>
                    </li>
                ))}
            </ul>
        </Card>
    )
}