import {Card} from "../../../components/Cards.tsx";
import {Button} from "../../../components/Buttons.tsx";
import {TripCard} from "../../trips/partials/TripCard.tsx";
import {useState} from "react";

interface JoinRequestCardProps {
    labelText: string,
    linkText: string,
    denyButtonText: string,
    acceptButtonText: string
    tripId?: number 
    driverId?: string 
    price?: number | undefined
    loggedInUserId: string | undefined
    tripRequest?: ITripRequest
}

export const JoinRequestCard = (props: JoinRequestCardProps) => {

    const [error, setError] = useState<string | null>();

    const handleUpdateAccepted = () => {
        if (props.tripRequest)
            props.tripRequest.status = "Accepted";
        
        fetch(`https://localhost:5173/api/chat/chat/updateRequest`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(props.tripRequest)
        })
            .catch(e => {
                setError(`There was an error saving the user details: ${e}`);
                console.error(error);
            });
    }

    const handleUpdateDeclined = () => {
        if (props.tripRequest)
            props.tripRequest.status = "Declined";

        fetch(`https://localhost:5173/api/chat/chat/updateRequest`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(props.tripRequest)
        })
            .catch(e => {
                setError(`There was an error saving the user details: ${e}`);
                console.error(error);
            });
    }

    if (props.driverId != props.loggedInUserId) {
        return (
            <Card
                label={props.labelText}
                outsideLink="/trips/:id"
                outsideLinkText={props.linkText}
                padding="sm">

                <TripCard tripId={props.tripId} cardIndex={0} driverId={props.driverId} price={props.price} hideShadow/>
            </Card>
        )
    } else
    {    
    // @ts-ignore
        return (
        <Card
            label={props.labelText}
            outsideLink="/trips/:id"
            outsideLinkText={props.linkText}
            padding="sm">

            <TripCard tripId={props.tripId} cardIndex={0} driverId={props.driverId} price={props.price} hideShadow/>
            <div className="flex gap-2 w-full">
                <Button text={props.denyButtonText} variant={"accent"} onClick={handleUpdateDeclined}/>
                <Button text={props.acceptButtonText} onClick={handleUpdateAccepted}/>
            </div>
        </Card>
    )}
}