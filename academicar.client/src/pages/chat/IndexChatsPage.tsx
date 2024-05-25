import { TitleBar } from "../../components/TitleBar";
import SetPageTitle from "../../hooks/SetPageTitle.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";

// TODO add content components and follow up pages
export const IndexChatsPage = () => {
    const pageTitle = "Nachrichten";
    SetPageTitle(pageTitle);

    return (
        <>
            <TitleBar text={pageTitle}/>

            <div className="w-full flex flex-col items-center">
                {/* Todo */}
            </div>

            <BottomNavigationBar selected="chat"/>
        </>
    );
};
