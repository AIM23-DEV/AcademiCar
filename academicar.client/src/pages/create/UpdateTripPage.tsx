﻿import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import { TitleBar } from "../../components/TitleBar";
import { Button } from "../../components/Buttons.tsx";
import { Tabs } from "../../components/Tabs.tsx";
import { TripRouteCreationForm } from "./partials/TripRouteCreationForm.tsx";
import { TripVehicleCreationForm } from "./partials/TripVehicleCreationForm.tsx";
import { TripPricingCreationForm } from "./partials/TripPricingCreationForm.tsx";
import { TripTimeCreationForm } from "./partials/TripTimeCreationForm.tsx";

export const UpdateTripPage = () => {
    const [t] = useTranslation(["common", "pages/create"]);
    const [trip, setTrip] = useState<ITrip>();
    const { id } = useParams();
    const pageTitle = t("pages/create:Common.title_create");
    const routeTabText = t("pages/create:UpdateTripPage.tab_route");
    const timeTabText = t("pages/create:UpdateTripPage.tab_time");
    const vehicleTabText = t("pages/create:UpdateTripPage.tab_vehicle");
    const pricingTabText = t("pages/create:UpdateTripPage.tab_pricing");
    const updateButtonText = t("pages/create:UpdateTripPage.button_update");
    SetPageTitle(pageTitle);

    /*
    useEffect(() => {
        fetch(`api/create/${id}`)
            .then(response => response.json())
            .then((responseTrip: ITrip) => setTrip(responseTrip));
    }, [id]);
*/
    useEffect(() => {
        axios.get(`api/create/${id}`)
            .then(response => setTrip(response.data))
            .catch((err) => console.error(err));
    }, [id]);
    
    const updateTrip = () => {
        console.log(trip);
        console.log(trip?.id);
    }
    
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
            
            <Button variant={"primary"} text={updateButtonText} onClick={updateTrip} />
        </>
    );
};
