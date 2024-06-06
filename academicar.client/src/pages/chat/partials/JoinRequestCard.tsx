import {Card} from "../../../components/Cards.tsx";
import {Button} from "../../../components/Buttons.tsx";

interface JoinRequestCardProps {
    labelText: string,
    linkText: string,
    denyButtonText: string,
    acceptButtonText: string
}

export const JoinRequestCard = (props: JoinRequestCardProps) => {
    return (
        <Card
            label={props.labelText}
            outsideLink="/trips/:id"
            outsideLinkText={props.linkText}
            className="mt-8">
            
            <p>TODO - Insert trip detail component</p>
            <Button text={props.denyButtonText} />
            <Button text={props.acceptButtonText} />
            
        </Card>
    )
}