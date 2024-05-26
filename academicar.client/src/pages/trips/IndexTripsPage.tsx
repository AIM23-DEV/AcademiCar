import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";

// TODO add list of trips for the current user
export const IndexTripsPage = () => {
    const pageTitle = "Aktuelle Fahrten";
    SetPageTitle(pageTitle);

    return (
        <>
            <TitleBar text={pageTitle}/>

            <div className="w-full flex flex-col items-center">
                {/* Todo */}
            </div>

            <BottomNavigationBar selected="trips"/>
        </>
    );
};
