import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {useTranslation} from "react-i18next";
import {Pagination} from "../../components/Pagination.tsx";
import {TripTimeCreationForm} from "./partials/TripTimeCreationForm.tsx";

export const CreateTripPage2 = () => {
    const [t] = useTranslation(["pages/create"]);
    const pageTitle = t("pages/create:Common.title_create");
    SetPageTitle(pageTitle);

    return (
        <>
            <TitleBar text={pageTitle} hasBackAction={true} />

            <TripTimeCreationForm />
            
            <Pagination page={2} totalPages={4} />
            
            <BottomNavigationBar selected="create"/>
        </>
    );
};
