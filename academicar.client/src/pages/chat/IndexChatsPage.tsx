import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {useTranslation} from "react-i18next";

// TODO add content components and follow up pages
export const IndexChatsPage = () => {
    const [t] = useTranslation(["common", "pages/chat"]);
    const pageTitle = t("pages/chat:IndexChatsPage.title");
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
