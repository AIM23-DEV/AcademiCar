import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {useTranslation} from "react-i18next";

// TODO add content components and follow up pages
export const CreateTripPage = () => {
    const [t] = useTranslation(["common", "pages/trips"]);
    const pageTitle = t("pages/trips:CreateTripPage.title");
    SetPageTitle(pageTitle);

    return (
        <>
            <TitleBar text={pageTitle} hasBackAction/>

            <div className="w-full flex flex-col items-center">
                {/* Todo */}
            </div>

            <BottomNavigationBar selected="create"/>
        </>
    );
};
