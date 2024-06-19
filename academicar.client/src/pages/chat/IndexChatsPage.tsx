import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {useTranslation} from "react-i18next";
import {Button} from "../../components/Buttons.tsx";
import {OpenRequestsList} from "./partials/OpenRequestsList.tsx";
import {ChatsList} from "./partials/ChatsList.tsx";
import {ChatSearchResultsList} from "./partials/ChatSearchResultsList.tsx";
import {Input} from "../../components/FormFields.tsx";
import {BiSearch, BiX} from "react-icons/bi";
import {useEffect, useState} from "react";
import {EmptyChat} from "./partials/EmptyChat.tsx";

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

    // Chat
    const [chats, setChats] = useState(new Array<IChat>());
    useEffect(() => {
        fetch('https://localhost:5173/api/chat/user/-999') // Todo replace with current user id
            .then(response => response.json())
            .then((c: IChat[]) => setChats(c))
            .catch(error => console.error(error));
    }, []);

    // Search
    const [search, setSearch] = useState("");
    const [searchActive, setSearchActive] = useState(false);
    const SearchButton = () => {
        return (<Button variant="outline"
                        leading={searchActive ? <BiX className="icon-md"/> : <BiSearch className="icon-md"/>}
                        onClick={() => setSearchActive(!searchActive)}/>);
    };

    return searchActive ? (
        <>
            <TitleBar text={pageTitle} trailing={<SearchButton/>}/>

            <div className="w-full flex flex-col items-center space-y-6">
                <Input fullWidth leading={<BiSearch className="icon-md"/>}
                       className="mt-6"
                       placeholder="Suche nach einem Namen..." value={search}
                       onChange={(val) => setSearch(val.target.value)}/>

                {chats.length === 0 ? <EmptyChat type="searchResult"/> : <ChatSearchResultsList
                    personalResults={chats.filter(c => !c.hasMoreThan2 && (search === "" || `${c.user?.firstName!} ${c.user?.lastName!}`.toLowerCase().includes(search.toLowerCase())))}
                    tripResults={chats.filter(c => c.hasMoreThan2 && (search === "" || `${c.user?.firstName!} ${c.user?.lastName!}`.toLowerCase().includes(search.toLowerCase())))}
                    labelText={resultsListLabelText}
                    noResultsTitleText={noResultsTitleText}
                    noResultsInfoText={noResultsInfoText}
                />}

            </div>

            <BottomNavigationBar selected="chat"/>
        </>
    ) : (
        <>
            <TitleBar text={pageTitle} trailing={<SearchButton/>}/>

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

            <BottomNavigationBar selected="chat"/>
        </>
    );
};