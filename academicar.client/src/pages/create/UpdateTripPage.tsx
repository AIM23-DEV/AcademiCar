import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {TabPanel, TabPanels} from "@headlessui/react";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {TitleBar} from "../../components/TitleBar";
import {Button} from "../../components/Buttons.tsx";
import {Tabs} from "../../components/Tabs.tsx";
import {TripRouteCreationForm} from "./partials/TripRouteCreationForm.tsx";
import {TripVehicleCreationForm} from "./partials/TripVehicleCreationForm.tsx";
import {TripPricingCreationForm} from "./partials/TripPricingCreationForm.tsx";
import {TripTimeCreationForm} from "./partials/TripTimeCreationForm.tsx";

export const UpdateTripPage = () => {
    const [t] = useTranslation(["common", "pages/create"]);
    const [trip, setTrip] = useState<ITrip | null>();
    const [startAddress, setStartAddress] = useState<IAddress | null>();
    const [endAddress, setEndAddress] = useState<IAddress | null>();
    const [error, setError] = useState<string | null>();
    const { id } = useParams();
    const pageTitle = t("pages/create:Common.title_update");
    const routeTabText = t("pages/create:UpdateTripPage.tab_route");
    const timeTabText = t("pages/create:UpdateTripPage.tab_time");
    const vehicleTabText = t("pages/create:UpdateTripPage.tab_vehicle");
    const pricingTabText = t("pages/create:UpdateTripPage.tab_pricing");
    const updateButtonText = t("pages/create:UpdateTripPage.button_update");
    SetPageTitle(pageTitle);

    // Loading
    useEffect(() => {
        fetch(`https://localhost:5173/api/create/${id}`)
        .then(response => response.json())
        .then(data => setTrip(data))
        .catch(error => {
            setError("There was an error fetching the trip details!");
            console.error(error);
        });
    }, [id]);

    if (error) return <div>{error}</div>;
    if (!trip) return <div>Loading...</div>;

    if (trip && !startAddress) {
        fetch(`https://localhost:5173/api/create/address/${trip?.fK_StartAddress}`)
        .then(response => response.json())
        .then(data => setStartAddress(data))
        .catch(error => {
            setError("There was an error fetching the start address!");
            console.error(error);
        });
    }
    if (trip && !endAddress) {
        fetch(`https://localhost:5173/api/create/address/${trip?.fK_EndAddress}`)
        .then(response => response.json())
        .then(data => setEndAddress(data))
        .catch(error => {
            setError("There was an error fetching the end address!");
            console.error(error);
        });
    }
    
    // Handling change
    const onChangeStartAddress = (val: string) => setStartAddress(AsAddress(val, startAddress));
    const onChangeEndAddress = (val: string) => setEndAddress(AsAddress(val, endAddress));
    
    const AsAddress = (str: string, currentAddress: IAddress | null | undefined): IAddress | null | undefined => {
        if (!currentAddress) return currentAddress;
        
        const valFields = str.split(' ');
        return {
            id: currentAddress.id,
            street: valFields[0],
            number: parseInt(valFields[1]),
            zip: parseInt(valFields[2]),
            place: valFields[3],
            longitude: currentAddress.longitude,
            latitude: currentAddress.latitude,
        };
    }

    // Buttons
    const updateTrip = () => {
        const updatedProduct = { ...trip, startAddress, endAddress };

        fetch(`https://localhost:5173/api/create/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct)
        })
        .then(response => response.json())
        .catch(error => {
            setError(`There was an error updating the trip!`);
            console.error("Error:", error);
        });
    };
    
    // Render
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
                children={            
                    <TabPanels>
                        <TabPanel>
                            <TripRouteCreationForm
                                startAddress={startAddress}
                                endAddress={endAddress}

                                setStartAddress={onChangeStartAddress}
                                setEndAddress={onChangeEndAddress}
                            />
                        </TabPanel>
                        
                        <TabPanel>
                            <TripTimeCreationForm />
                        </TabPanel>
                        
                        <TabPanel>
                            <TripVehicleCreationForm />
                        </TabPanel>
                        
                        <TabPanel>
                            <TripPricingCreationForm />
                        </TabPanel>
                    </TabPanels>
                }
            />
            
            <Button type="submit" variant="primary" text={updateButtonText} onClick={updateTrip} />
        </>
    );
};
