import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {useTranslation} from "react-i18next";
import {Button} from "../../components/Buttons.tsx";
import {ChatList} from "./partials/ChatList.tsx";
import {Input} from "../../components/FormFields.tsx";
import {useEffect, useState} from "react";
import {Spinner} from "../../components/Spinner.tsx";
import {BiSearch, BiX} from "react-icons/bi";
import * as signalR from '@microsoft/signalr';
import {useParams} from 'react-router-dom';

export const IndexChatsPage = () => {
    // Translations
    const [t] = useTranslation(["common", "pages/chat"]);
    const pageTitle = t("pages/chat:IndexChatsPage.title");
    //const requestsListLabelText = t("pages/chat:IndexChatsPage.label_requests");
    const searchPlaceholderText = t("pages/chat:IndexChatsPage.search_placeholder");
    SetPageTitle(pageTitle);

    // General
    const [openPersonalChats, setOpenPersonalChats] = useState(new Array<IPersonalChat>());
    const [groupChats, setGroupChats] = useState(new Array<IGroupChat>());
    const [personalChats, setPersonalChats] = useState(new Array<IPersonalChat>());
    const [chats, setChats] = useState(new Array<IPersonalChat | IGroupChat>());
    const {loggedInUserId} = useParams();

    // Requests
    useEffect(() => {
        fetch('https://localhost:5173/api/chat/GetOpenRequestChatsForDriver/' + loggedInUserId)
            .then(response => response.json())
            .then((fetchedChats: IPersonalChat[]) => setOpenPersonalChats(fetchedChats))
    }, [loggedInUserId]);

    useEffect(() => {
        fetch('https://localhost:5173/api/chat/GetPersonalChats/' + loggedInUserId)
            .then(response => response.json())
            .then((fetchedChats: IPersonalChat[]) => setPersonalChats(fetchedChats))
    }, [loggedInUserId]);

    useEffect(() => {
        fetch('https://localhost:5173/api/chat/GetGroupChats/' + loggedInUserId)
            .then(response => response.json())
            .then((fetchedChats: IGroupChat[]) => setGroupChats(fetchedChats))
    }, [loggedInUserId]);

    const spinner = <div className="w-full flex flex-col items-center space-y-6 mt-8">
        <Spinner className="icon-lg text-primary-600"/>
    </div>
    
    
    if(groupChats.length + personalChats.length > chats.length) {
        const combinedChats = [...groupChats, ...personalChats]
        setChats(combinedChats);
    }
    
    if (!openPersonalChats) return <div>{spinner}Loading open requests ...</div>
    if (!groupChats) return <div>{spinner}Loading group chats ...</div>
    if (!personalChats) return <div>{spinner}Loading personal chats ...</div>
    
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
                        location.reload();
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
    
    return (
        <>
            <TitleBar text={pageTitle} trailing={SearchButton}/>

            <div className="w-full flex flex-col items-center space-y-6">
                {/* Search input field if searching */}
                {searchActive ?
                    <Input id="chat-search-input" fullWidth leading={<BiSearch className="icon-md"/>}
                           className="mt-6"
                           placeholder={searchPlaceholderText} value={search}
                           onChange={(val) => setSearch(val.target.value)}/>
                    : <></>}

                {/* Open requests */}
                {!searchActive && openPersonalChats.length > 0 ?
                    <ChatList className="mt-8 mb-24"
                              chats={openPersonalChats.filter(c => search === "" || (isGroupChat(c) ?
                                  c.trip?.title.toLowerCase().includes(search.toLowerCase()) :
                                  `${c.driverUser?.firstName!} ${c.driverUser?.lastName!}`.toLowerCase().includes(search.toLowerCase())))}
                              searchActive={searchActive}/> : <></>
                }

                {/* Chats or search results */}
                <ChatList className="mt-8 mb-24"
                          chats={chats.filter(c => search === "" || (isGroupChat(c) ?
                              c.trip?.title.toLowerCase().includes(search.toLowerCase()) :
                              `${c.driverUser?.firstName!} ${c.driverUser?.lastName!}`.toLowerCase().includes(search.toLowerCase())))}
                          searchActive={searchActive}/>
            </div>


            <BottomNavigationBar selected="chat"/>
        </>
    );
};
