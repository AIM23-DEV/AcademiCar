import {Card} from "../../../components/Cards.tsx";
import {Link} from "react-router-dom";

interface OpenRequestsListProps {
    requests: IPersonalChat[],
    labelText: string
}

export const OpenRequestsList = (props: OpenRequestsListProps) => {
    return (
        <Card label={props.labelText} className="mt-8">
            <h1>Todo</h1>
            <ul>
                {props.requests.map((chat, index) => (
                    <li key={index}>
                        <Link to={`/chat/personal/${index}`}>{chat.toString()}</Link>
                    </li>
                ))}
            </ul>
        </Card>
        
        
    )
}