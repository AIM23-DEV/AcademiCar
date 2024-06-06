import {useTranslation} from "react-i18next";
import {TitleBar} from "../../components/TitleBar.tsx";
import {Button} from "../../components/Buttons.tsx";
import {Card} from "../../components/Cards.tsx";
import {TripChatActionModal} from "./partials/TripChatActionModal.tsx";
import {TripChatMemberList} from "./partials/TripChatMemberList.tsx";

export const TripChatDetailPage = () => {
    const [t] = useTranslation(["common", "pages/chat"]);
    const pageTitle = t("pages/chat:TripChatDetailPage.title");
    const tripButtonText = t("pages/chat:TripChatDetailPage.button_to_trip");
    const memberListLabel = t("pages/chat:TripChatDetailPage.label_members");
    const actionListLabel = t("pages/chat:TripChatDetailPage.label_actions");
    const leaveTripActionText = t("pages/chat:TripChatDetailPage.action_leave_trip");
    const reportChatActionText = t("pages/chat:TripChatDetailPage.action_report_chat");
    const deleteChatActionText = t("pages/chat:TripChatDetailPage.action_delete_chat");
    const driverIndicatorText = t("pages/chat:TripChatDetailPage.indicator_driver");
    const userIndicatorText = t("pages/chat:TripChatDetailPage.indicator_you");
    const tripOverInfoText = t("pages/chat:TripChatDetailPage.info_trip_over");
    const notMemberInfoText = t("pages/chat:TripChatDetailPage.info_not_member");
    const removeFromTripActionText = t("pages/chat:TripChatDetailPage.action_remove_from_trip");
    const seeProfileActionText = t("pages/chat:TripChatDetailPage.action_see_profile");
    const contactActionText = t("pages/chat:TripChatDetailPage.action_contact");
    const closeActionText = t("pages/chat:TripChatDetailPage.action_close");

    const navigateToTrip = () => { /* TODO nav logic */ };
    const handleLeaveTrip = () => { /* TODO report logic */ };
    const handleReportChat = () => { /* TODO report logic */ };
    const handleDeleteChat = () => { /* TODO delete logic */ };
    
    
    return (
        <>
            <TitleBar hasBackAction={true} />

            <h1>TODO - {pageTitle}</h1>
            <h2>TODO - Graz -- Wien</h2>

            <Button text={tripButtonText} onClick={navigateToTrip} />
            <p>TODO - {tripOverInfoText}</p>
            <p>TODO - {notMemberInfoText}</p>

            <TripChatMemberList
                members={[]}
                labelText={memberListLabel}
                driverIndicatorText={driverIndicatorText}
                userIndicatorText={userIndicatorText}
            />

            <Card label={actionListLabel}>
                <Button text={leaveTripActionText} onClick={handleLeaveTrip} />
                <Button text={reportChatActionText} onClick={handleReportChat} />
                <Button text={deleteChatActionText} onClick={handleDeleteChat} />
            </Card>
            
            <TripChatActionModal
                selectedUserName={"TODO - Max Kruse"}
                removeFromTripButtonText={removeFromTripActionText}
                seeProfileButtonText={seeProfileActionText}
                contactButtonText={contactActionText}
                closeButtonText={closeActionText}
            />
        </>
    );
};
