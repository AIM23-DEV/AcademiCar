import {useTranslation} from "react-i18next";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {TitleBar} from "../../components/TitleBar.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";

export const PersonalChatPage = () => {
    const [t] = useTranslation(["common", "pages/chat"]);
    const pageTitle = t("pages/chat:PersonalChatPage.title");
    SetPageTitle(pageTitle);

    return (
        <>
            <TitleBar text={pageTitle} />

            <div className="w-full flex flex-col items-center">
            </div>

            <BottomNavigationBar selected="chat"/>
        </>
    );
};
