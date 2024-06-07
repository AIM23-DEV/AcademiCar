import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {useTranslation} from "react-i18next";
import {Button} from "../../components/Buttons.tsx";
import {Tabs} from "../../components/Tabs.tsx";
import {TripRouteCreationForm} from "./partials/TripRouteCreationForm.tsx";
import {TripVehicleCreationForm} from "./partials/TripVehicleCreationForm.tsx";
import {TripPricingCreationForm} from "./partials/TripPricingCreationForm.tsx";
import {TripTimeCreationForm} from "./partials/TripTimeCreationForm.tsx";

export const UpdateTripPage = () => {
    const [t] = useTranslation(["common", "pages/create"]);
    const pageTitle = t("pages/create:Common.title_create");
    const routeTabText = t("pages/create:UpdateTripPage.tab_route");
    const timeTabText = t("pages/create:UpdateTripPage.tab_time");
    const vehicleTabText = t("pages/create:UpdateTripPage.tab_vehicle");
    const pricingTabText = t("pages/create:UpdateTripPage.tab_pricing");
    const updateButtonText = t("pages/create:UpdateTripPage.button_update");
    SetPageTitle(pageTitle);

    // TODO make tabs dynamic...
    return (
        <>
            <TitleBar text={pageTitle} hasBackAction={true} />
            
            <Tabs
                items={[
                    {name: routeTabText},
                    {name: timeTabText},
                    {name: vehicleTabText},
                    {name: pricingTabText}
                ]}
            />

            <TripRouteCreationForm />
            <TripTimeCreationForm />
            <TripVehicleCreationForm />
            <TripPricingCreationForm />
            
            <Button variant={"primary"} text={updateButtonText} />
        </>
    );
};
