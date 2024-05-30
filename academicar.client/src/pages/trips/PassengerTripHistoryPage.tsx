import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title";
import {BottomNavigationBar} from "../../components/BottomNavigationBar";
import {useTranslation} from "react-i18next";

// TODO add list of trips for the current user
export const PassengerTripHistoryPage = () => {
    const [t] = useTranslation(["common", "pages/trips"]);
    const pageTitle = t("pages/trips:PassengerTripHistoryPage.title");
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
