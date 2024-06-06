import {Card} from "../../../components/Cards.tsx";

interface User {
    // TODO implement User type globally...
}

interface TripChatMemberListProps {
    members: User[],
    labelText: string,
    driverIndicatorText: string,
    userIndicatorText: string
}

export const TripChatMemberList = (props: TripChatMemberListProps) => {
    return (
        <Card label={props.labelText} className="mt-8">
            <h1>Todo</h1>
            <ul>
                {props.members.map((user, index) => (
                    <li key={index}>
                        <p>{user.toString()} {props.userIndicatorText} {props.driverIndicatorText}</p>
                    </li>
                ))}
            </ul>
        </Card>
    )
}