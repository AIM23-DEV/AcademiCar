import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {useTranslation} from "react-i18next";
import {Button} from "../../components/Buttons.tsx";
import {OpenRequestsList} from "./partials/OpenRequestsList.tsx";
import {ChatList} from "./partials/ChatList.tsx";
import {Input} from "../../components/FormFields.tsx";
import {useEffect, useState} from "react";
import {Spinner} from "../../components/Spinner.tsx";
import {BiSearch, BiX} from "react-icons/bi";
import * as signalR from '@microsoft/signalr';

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
    const [chats, setChats] = useState(new Array<IPersonalChat | IGroupChat>());

    function fetchAllChats() {
        let allChats = new Array<IPersonalChat | IGroupChat>();
        fetch('https://localhost:5173/api/chat/GetPersonalChats')
            .then(response => response.json())
            .then((personalChats: IPersonalChat[]) => {
                allChats = personalChats;
                return fetch('https://localhost:5173/api/chat/GetGroupChats');
            })
            .then(response => response.json())
            .then((groupChats: IGroupChat[]) => {
                allChats = allChats.concat(groupChats)
                    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
                setChats(allChats);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.error(error);
            });
    }

    useEffect(() => {
        fetchAllChats();
    }, []);

    // SignalR
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7194/chat/chathub")
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);
    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.debug('Connected!');

                    connection.on('ReceiveMessage', () => {
                        fetchAllChats();
                    });
                })
                .catch((e: any) => console.log('Connection failed: ', e));
        }
    }, [connection]);

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

    function isGroupChat(chat: IPersonalChat | IGroupChat): chat is IGroupChat {
        return "trip" in chat && chat.trip !== undefined && chat.trip !== null;
    }

    // Todo websocket connection for live updates of all chats

    return (
        <>
            <TitleBar text={pageTitle} trailing={SearchButton}/>

            {loading ?
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
                    <ChatList className="mt-8 mb-24"
                              chats={chats.filter(c => search === "" || (isGroupChat(c) ?
                                  c.trip?.title.toLowerCase().includes(search.toLowerCase()) :
                                  `${c.driverUser?.firstName!} ${c.driverUser?.lastName!}`.toLowerCase().includes(search.toLowerCase())))}
                              searchActive={searchActive}/>
                </div>
            }

            <BottomNavigationBar selected="chat"/>
        </>
    );
};
