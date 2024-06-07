import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {useTranslation} from "react-i18next";
import {Pagination} from "../../components/Pagination.tsx";
import {TripVehicleCreationForm} from "./partials/TripVehicleCreationForm.tsx";

export const CreateTripPage3 = () => {
    const [t] = useTranslation(["pages/create"]);
    const pageTitle = t("pages/create:Common.title_create");
    SetPageTitle(pageTitle);

    return (
        <>
            <TitleBar text={pageTitle} hasBackAction={true} />

            <TripVehicleCreationForm />

            <Pagination page={3} totalPages={4}/>

            <BottomNavigationBar selected="create"/>
        </>
    );
};
