import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {useTranslation} from "react-i18next";

// TODO add list of trips for the current user
export const DriverTripHistoryPage = () => {
    const [t] = useTranslation(["common", "pages/trips"]);
    const pageTitle = t("pages/trips:DriverTripHistoryPage.title");
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
