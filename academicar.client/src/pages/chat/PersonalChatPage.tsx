import {useTranslation} from "react-i18next";
import {SendMessageForm} from "./partials/SendMessageForm.tsx";
import {JoinRequestCard} from "./partials/JoinRequestCard.tsx";
import {TitleBar} from "../../components/TitleBar.tsx";

export const PersonalChatPage = () => {
    const [t] = useTranslation(["common", "pages/chat"]);
    const messageFormPlaceholderText = t("pages/chat:PersonalChatPage.placeholder_message");
    const joinRequestLabelText = t("pages/chat:PersonalChatPage.label_join_request");
    const joinRequestLinkText = t("pages/chat:PersonalChatPage.link_trip");
    const joinRequestDenyText = t("pages/chat:PersonalChatPage.button_deny");
    const joinRequestAcceptText = t("pages/chat:PersonalChatPage.button_accept");

    return (
        <>
            <TitleBar hasBackAction={true} />
            
            <div className="w-full flex flex-col items-center">
                <JoinRequestCard
                    labelText={joinRequestLabelText}
                    linkText={joinRequestLinkText}
                    denyButtonText={joinRequestDenyText}
                    acceptButtonText={joinRequestAcceptText}
                />

                <SendMessageForm
                    isMember={true}
                    placeholderText={messageFormPlaceholderText}
                />
            </div>
        </>
    );
};
