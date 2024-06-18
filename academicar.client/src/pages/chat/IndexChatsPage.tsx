import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {useTranslation} from "react-i18next";
import {Button} from "../../components/Buttons.tsx";
import {OpenRequestsList} from "./partials/OpenRequestsList.tsx";
import {ChatsList} from "./partials/ChatsList.tsx";
import {ChatSearchResultsList} from "./partials/ChatSearchResultsList.tsx";
import {Input} from "../../components/FormFields.tsx";
import Chat from "../../components/Chat.tsx";

export const IndexChatsPage = () => {
    const [t] = useTranslation(["common", "pages/chat"]);
    const pageTitle = t("pages/chat:IndexChatsPage.title");
    const requestsListLabelText = t("pages/chat:IndexChatsPage.label_requests");
    const chatsListLabelText = t("pages/chat:IndexChatsPage.label_chats");
    const resultsListLabelText = t("pages/chat:IndexChatsPage.label_results");
    const noResultsTitleText = t("pages/chat:IndexChatsPage.modal_title_no_results");
    const noResultsInfoText = t("pages/chat:IndexChatsPage.modal_info_no_results");
    const noChatsTitleText = t("pages/chat:IndexChatsPage.modal_title_no_chats");
    const noChatsInfoText = t("pages/chat:IndexChatsPage.modal_info_no_chats");
    SetPageTitle(pageTitle);

    let isSearchActive = false;
    
    
    return isSearchActive ? (
        <>
            <TitleBar text={pageTitle} />
            <Button />

            <div className="w-full flex flex-col items-center">
                <Input />
                
                <ChatSearchResultsList
                    personalResults={[]}
                    tripResults={[]}
                    labelText={resultsListLabelText}
                    noResultsTitleText={noResultsTitleText}
                    noResultsInfoText={noResultsInfoText}
                />
            </div>

            <BottomNavigationBar selected="chat"/>
        </>
    ) : (
        <>
            <TitleBar text={pageTitle} />
            <Button />

            <div className="w-full flex flex-col items-center">
                <OpenRequestsList
                    requests={[]}
                    labelText={requestsListLabelText}
                />
                
                <ChatsList
                    personalChats={[]}
                    tripChats={[]}
                    labelText={chatsListLabelText}
                />
            </div>

            <div>
                <h1>{noChatsTitleText}</h1>
                <p>{noChatsInfoText}</p>
            </div>
            
            <div>
                <Chat/>
            </div>

            <BottomNavigationBar selected="chat"/>
        </>
    );
};
