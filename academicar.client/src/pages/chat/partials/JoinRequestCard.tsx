import {Card} from "../../../components/Cards.tsx";
import {Button} from "../../../components/Buttons.tsx";
import {TripCard} from "../../trips/partials/TripCard.tsx";

interface JoinRequestCardProps {
    labelText: string,
    linkText: string,
    denyButtonText: string,
    acceptButtonText: string
    tripId?: number 
    driverId?: string 
    price?: number | undefined
}

export const JoinRequestCard = (props: JoinRequestCardProps) => {
    return (
        <Card
            label={props.labelText}
            outsideLink="/trips/:id"
            outsideLinkText={props.linkText}
            className="mt-8">

            <TripCard tripId={props.tripId} cardIndex={0} driverId={props.driverId} price={props.price}/>
            <div className="flex gap-2 w-full">
                <Button text={props.denyButtonText} variant={"accent"} />
                <Button text={props.acceptButtonText} />
            </div>
        </Card>
    )
}