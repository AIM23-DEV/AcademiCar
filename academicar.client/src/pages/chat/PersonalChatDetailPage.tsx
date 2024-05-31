import {useTranslation} from "react-i18next";
import {TitleBar} from "../../components/TitleBar.tsx";
import {Button} from "../../components/Buttons.tsx";
import {Card} from "../../components/Cards.tsx";

export const PersonalChatDetailPage = () => {
    const [t] = useTranslation(["common", "pages/chat"]);
    const profileButtonText = t("pages/chat:PersonalChatDetailPage.button_to_profile");
    const actionCardLabelText = t("pages/chat:PersonalChatDetailPage.label_actions");
    const reportUserActionText = t("pages/chat:PersonalChatDetailPage.action_report_user");
    const deleteChatActionText = t("pages/chat:PersonalChatDetailPage.action_delete_chat");

    const navigateToProfile = () => { /* TODO nav logic */ };
    const handleReportUser = () => { /* TODO report logic */ };
    const handleDeleteChat = () => { /* TODO delete logic */ };
    
        
    return (
        <>
            <TitleBar hasBackAction={true} />

            <h1>TODO - Max Kruse</h1>
            <h2>TODO - FH Joanneum Graz</h2>

            <Button text={profileButtonText} onClick={navigateToProfile} />

            <Card label={actionCardLabelText}>
                <Button text={reportUserActionText} onClick={handleReportUser} />
                <Button text={deleteChatActionText} onClick={handleDeleteChat} />
            </Card>
        </>
    );
};
