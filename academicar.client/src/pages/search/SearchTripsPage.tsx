import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {SearchForm} from "./partials/SearchForm.tsx";
import {SearchHistory} from "./partials/SearchHistory.tsx";
import {useTranslation} from "react-i18next";

export const SearchTripsPage = () => {
    const [t] = useTranslation(['common', 'pages/search']);
    const pageTitle = t("pages/search:SearchTripsPage.title");
    SetPageTitle(pageTitle);

    return (
        <>
            <TitleBar text={pageTitle}/>

            <div className="w-full flex flex-col items-center">
                <SearchForm/>
                <SearchHistory/>
            </div>

            <BottomNavigationBar selected="search"/>
        </>
    );
};
