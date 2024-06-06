import {Button} from "../../../components/Buttons.tsx";

interface TripChatActionModalProps {
    selectedUserName: string,
    removeFromTripButtonText: string,
    seeProfileButtonText: string,
    contactButtonText: string,
    closeButtonText: string
}

export const TripChatActionModal = (props: TripChatActionModalProps) => {
    const handleRemoveFromTrip = () => { /* TODO nav logic */ };
    const handleSeeProfile = () => { /* TODO report logic */ };
    const handleContact = () => { /* TODO delete logic */ };
    const handleClose = () => { /* TODO delete logic */ };
    
    
    return (
        <>
            <h3 className="headline-2 flex-1">{props.selectedUserName}</h3>

            <Button text={props.removeFromTripButtonText} onClick={handleRemoveFromTrip} />
            <Button text={props.seeProfileButtonText} onClick={handleSeeProfile} />
            <Button text={props.contactButtonText} onClick={handleContact} />
            <Button text={props.closeButtonText} onClick={handleClose} />
        </>
    )
}