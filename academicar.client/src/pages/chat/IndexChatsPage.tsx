import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {useTranslation} from "react-i18next";
import {Button} from "../../components/Buttons.tsx";
import {OpenRequestsList} from "./partials/OpenRequestsList.tsx";
import {ChatsList} from "./partials/ChatsList.tsx";
import {Input} from "../../components/FormFields.tsx";
import {BiSearch, BiX} from "react-icons/bi";
import {useEffect, useState} from "react";
import {Spinner} from "../../components/Spinner.tsx";

export const IndexChatsPage = () => {
    // General
    const [loading, setLoading] = useState(true);

    // Translations
    const [t] = useTranslation(["common", "pages/chat"]);
    const pageTitle = t("pages/chat:IndexChatsPage.title");
    const requestsListLabelText = t("pages/chat:IndexChatsPage.label_requests");
    const searchPlaceholderText = t("pages/chat:IndexChatsPage.search_placeholder");
    SetPageTitle(pageTitle);

    // Requests
    const [requests, setRequests] = useState(new Array<ITripRequest>());
    useEffect(() => {
        setTimeout(() => setRequests(new Array<ITripRequest>()), 0);
        // Todo fetch open requests
    }, []);

    // Chat
    const [chats, setChats] = useState(new Array<IChat>());
    useEffect(() => {
        fetch('https://localhost:5173/api/chat/user/-999') // Todo replace with current user id
            .then(response => response.json())
            .then((c: IChat[]) => setChats(c))
            .then(() => setLoading(false))
            .catch(error => console.error(error));
    }, []);

    // Search
    const [search, setSearch] = useState("");
    const [searchActive, setSearchActive] = useState(false);
    const SearchButton =
        <Button variant="outline"
                leading={searchActive ? <BiX className="icon-md"/> : <BiSearch className="icon-md"/>}
                onClick={() => {
                    setSearchActive(!searchActive);
                    setSearch("");
                    setTimeout(() => document.getElementById("chat-search-input")?.focus(), 100);
                }}/>;

    return (
        <>
            <TitleBar text={pageTitle} trailing={SearchButton}/>

            {loading ?
                // Todo better loading state
                <div className="w-full flex flex-col items-center space-y-6 mt-8">
                    <Spinner className="icon-lg text-primary-600"/>
                </div> :
                <div className="w-full flex flex-col items-center space-y-6">
                    {/* Search input field if searching */}
                    {searchActive ?
                        <Input id="chat-search-input" fullWidth leading={<BiSearch className="icon-md"/>}
                               className="mt-6"
                               placeholder={searchPlaceholderText} value={search}
                               onChange={(val) => setSearch(val.target.value)}/>
                        : <></>}

                    {/* Open requests */}
                    {!searchActive && requests.length > 0 ?
                        <OpenRequestsList
                            requests={[]}
                            labelText={requestsListLabelText}
                        /> : <></>}

                    {/* Chats or search results */}
                    <ChatsList className="mt-8"
                               chats={chats.filter(c => search === "" || `${c.user?.firstName!} ${c.user?.lastName!}`.toLowerCase().includes(search.toLowerCase()))}
                               searchActive={searchActive}/>
                </div>
            }

            <BottomNavigationBar selected="chat"/>
        </>
    );
};