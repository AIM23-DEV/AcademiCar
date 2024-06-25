import {Card} from "../../../components/Cards.tsx";
import {Button} from "../../../components/Buttons.tsx";
import {TripCard} from "../../trips/partials/TripCard.tsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
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
    chatId?: string | undefined
}

export const JoinRequestCard = (props: JoinRequestCardProps) => {

    const [error, setError] = useState<string | null>();
    const [isRequestHandled, setIsRequestHandled] = useState<boolean>(false);
    const {loggedInUserId} = useParams();

    useEffect(() => {
        getIsTripRequestHandled();
    }, []);

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
        
        // Create GroupChatUser
            const newGroupChatUser: IGroupChatUser = {
                                fK_User: props.tripRequest?.fK_PotentialPassenger,
                fK_GroupChat: props.tripId
            };
            
            fetch(`https://localhost:5173/api/create/groupchatUser`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newGroupChatUser)
            }).then(()=> console.log(newGroupChatUser));

        // Create GroupChatUser
        const newTripPassenger: ITripPassenger = {
            fK_Trip: props?.tripId,
            fK_PassengerUser: props.tripRequest?.fK_PotentialPassenger
        };

        fetch(`https://localhost:5173/api/create/tripPassenger`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTripPassenger)
        }).then(()=> console.log(newTripPassenger));
        
        setIsRequestHandled(true);
    }

    const getIsTripRequestHandled = async () => {
        if (!props.tripRequest) return;

        try {
            const response = await fetch(`https://localhost:5173/api/chat/GetTripRequestById/${props.tripRequest.id}`)
            //console.log(response)
            const data: ITripRequest = await response.json();
            setIsRequestHandled(data.status !== "Open");
        } catch (error) {
            setError(`Failed to fetch trip request status: ${error}`);
            console.error(error);
        }
    };

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
        setIsRequestHandled(true);
    }

    if (props.driverId != props.loggedInUserId) {
        return (
            <Card
                label={props.labelText}
                outsideLink={"/trips/" + loggedInUserId + "/" + props.tripId}
                outsideLinkText={props.linkText}
                padding="none">

                <TripCard tripId={props.tripId} isNotLink cardIndex={0} driverId={props.driverId} price={props.price} hideShadow/>
            </Card>
        )
    } else
    {    
    // @ts-ignore
        return (
        <Card
            label={props.labelText}
            outsideLink={"/trips/" + loggedInUserId + "/" + props.tripId}
            outsideLinkText={props.linkText}
            padding="none">

            <TripCard tripId={props.tripId} isNotLink cardIndex={0} driverId={props.driverId} price={props.price} hideShadow/>
            {!isRequestHandled && (
                <div className="grid grid-cols-2 gap-2 px-4 pb-4">
                    <Button fullWidth text={props.denyButtonText} variant={"accent"} onClick={handleUpdateDeclined} />
                    <Button fullWidth text={props.acceptButtonText} onClick={handleUpdateAccepted} />
                </div>
            )}
        </Card>
    )}
}