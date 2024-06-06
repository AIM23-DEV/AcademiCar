import {Card} from "../../../components/Cards.tsx";
import {Link} from "react-router-dom";

interface Chat {
    // TODO implement Chat type globally...
}

interface ChatSearchResultsListProps {
    personalResults: Chat[],
    tripResults: Chat[],
    labelText: string,
    noResultsTitleText: string,
    noResultsInfoText: string
}

export const ChatSearchResultsList = (props: ChatSearchResultsListProps) => {
    return props.personalResults.length == 0 && props.tripResults.length == 0 ? (
        <Card label={props.labelText} className="mt-8">
            <h1>{props.noResultsTitleText}</h1>
            <p>{props.noResultsInfoText}</p>
        </Card>
    ) : (
        <Card label={props.labelText} className="mt-8">
            <h1>Todo</h1>
            <ul>
                {props.personalResults.map((chat, index) => (
                    <li key={index}>
                        <Link to={`/chat/personal/${index}`}>{chat.toString()}</Link>
                    </li>
                ))}
            </ul>
            <ul>
                {props.tripResults.map((chat, index) => (
                    <li key={index}>
                        <Link to={`/chat/trip/${index}`}>{chat.toString()}</Link>
                    </li>
                ))}
            </ul>
        </Card>
    );
}