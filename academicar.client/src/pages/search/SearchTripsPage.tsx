import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/SetPageTitle.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {SearchForm} from "./partials/SearchForm.tsx";
import {SearchHistory} from "./partials/SearchHistory.tsx";

export const SearchTripsPage = () => {
    const pageTitle = "Mitfahrgelegenheit finden";
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
