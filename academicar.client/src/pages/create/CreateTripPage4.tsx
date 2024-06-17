import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {useTranslation} from "react-i18next";
import {Pagination} from "../../components/Pagination.tsx";
import {TripPricingCreationForm} from "./partials/TripPricingCreationForm.tsx";

export const CreateTripPage4 = () => {
    const [t] = useTranslation(["pages/create"]);
    const pageTitle = t("pages/create:Common.title_create");
    SetPageTitle(pageTitle);

    return (
        <>
            <TitleBar text={pageTitle} hasBackAction={true} />

            <TripPricingCreationForm />

            <Pagination page={4} totalPages={4}/>

            <BottomNavigationBar selected="create"/>
        </>
    );
};
