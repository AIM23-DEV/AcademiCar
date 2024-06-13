import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {useTranslation} from "react-i18next";
import {Pagination} from "../../components/Pagination.tsx";
import {TripRouteCreationForm} from "./partials/TripRouteCreationForm.tsx";

export const CreateTripPage1 = () => {
    const [t] = useTranslation(["common", "pages/create"]);
    const pageTitle = t("pages/create:Common.title_create");
    SetPageTitle(pageTitle);

    return (
        <>
            <TitleBar text={pageTitle} hasBackAction={true} />

            <TripRouteCreationForm />
            
            <Pagination page={1} totalPages={4} />
            
            <BottomNavigationBar selected="create"/>
        </>
    );
};
