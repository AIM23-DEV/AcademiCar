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

function getAddress(addressStr: string): IAddress {
    const addressFields = addressStr.split(' ');
    return addressFields.length == 4 ? {
        street: addressFields[0],
        number: parseInt(addressFields[1]),
        zip: parseInt(addressFields[2]),
        place: addressFields[3],
        longitude: "",
        latitude: "",
    } : {
        street: addressStr,
        number: 0,
        zip: 0,
        place: addressStr,
        longitude: "",
        latitude: "",
    };
}
function getDate(dateStr: string, timeStr: string): Date {
    const dateFields = dateStr.split('.');
    const timeFields = timeStr.split(':');
    if (dateFields.length != 3 || timeFields.length != 2)
        return new Date(2020, 1, 1, 12, 0,0)

    const day = Number(dateFields[0])
    const month = Number(dateFields[1])
    const year = Number(dateFields[2])
    const hours = Number(timeFields[0])
    const minutes = Number(timeFields[1])

    return new Date(year, month, day, hours, minutes, 0);
}

export const UpdateTripPage = () => {
    const [t] = useTranslation(["common", "pages/create"]);
    const pageTitle = t("pages/create:Common.title_update");
    const routeTabText = t("pages/create:UpdateTripPage.tab_route");
    const timeTabText = t("pages/create:UpdateTripPage.tab_time");
    const vehicleTabText = t("pages/create:UpdateTripPage.tab_vehicle");
    const pricingTabText = t("pages/create:UpdateTripPage.tab_pricing");
    const updateButtonText = t("pages/create:UpdateTripPage.button_update");
    SetPageTitle(pageTitle);

    const { loggedInUserId, tripId } = useParams();
    const [trip, setTrip] = useState<ITrip>();
    const [startAddress, setStartAddress] = useState<IAddress>();
    const [endAddress, setEndAddress] = useState<IAddress>();
    const [startDate, setStartDate] = useState<string>();
    const [startTime, setStartTime] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const [endTime, setEndTime] = useState<string>();
    const [tripVehicle, setTripVehicle] = useState<IVehicle>();
    const [tripVehicleId, setTripVehicleId] = useState<number>();
    const [availableSeats, setAvailableSeats] = useState<number>();
    const [price, setPrice] = useState<number>(0);
    const [error, setError] = useState<string | null>();

    // Loading
    useEffect(() => {
        fetch(`https://localhost:5173/api/create/${tripId}`)
        .then(response => response.json())
        .then(data => setTrip(data))
        .catch(error => {
            setError("There was an error fetching the trip details!");
            console.error(error);
        });
    }, [tripId]);

    if (error) return <div>{`There was an error: ${error}`}</div>
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
    
    if (trip && !tripVehicle) {
        fetch(`https://localhost:5173/api/create/vehicle/${trip?.fK_Vehicle}`)
            .then(response => response.json())
            .then(data => setTripVehicle(data))
            .catch(error => {
                setError("There was an error fetching the vehicle!");
                console.error(error);
            });
    }
    
    // Handling change
    const onChangeStartAddress = (val: string) => setStartAddress(getAddress(val));
    const onChangeEndAddress = (val: string) => setEndAddress(getAddress(val));
    

    // Buttons
    const updateTrip = () => {
        if (!startAddress || !endAddress
        || !startDate || !startTime || !endDate || !endTime
        || !tripVehicleId || !availableSeats
        ) return;

        const fullStartDate: Date = getDate(startDate, startTime);
        const fullEndDate: Date = getDate(endDate, endTime);
        const updatedTrip: ITrip = {
            title: `${startAddress?.place} -> ${endAddress?.place}`,
            fK_Driver: `${loggedInUserId}`,
            fK_StartAddress: startAddress.id,
            fK_EndAddress: startAddress.id,
            startTime: fullStartDate,
            endTime: fullEndDate,
            fK_Vehicle: tripVehicleId,
            availableSeats: availableSeats,
            price: price,
            paymentMethod: trip.paymentMethod,
            status: trip.status
        }

        fetch(`https://localhost:5173/api/create/${tripId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTrip)
        })
            .catch(error => {
                setError(`There was an error updating the trip!`);
                console.error("Error:", error);
            });
    };

    if (!loggedInUserId) return <div>Invalid user!</div>
    
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
                            <TripTimeCreationForm
                                startDate={startDate}
                                startTime={startTime}
                                endDate={endDate}
                                endTime={endTime}
                                
                                setStartDate={setStartDate}
                                setStartTime={setStartTime}
                                setEndDate={setEndDate}
                                setEndTime={setEndTime}
                            />
                        </TabPanel>
                        
                        <TabPanel>
                            <TripVehicleCreationForm
                                driverId={loggedInUserId}
                                vehicleId={trip.fK_Vehicle}
                                availableSeats={trip.availableSeats}
                                
                                setVehicleId={setTripVehicleId}
                                setAvailableSeats={setAvailableSeats}
                            />
                        </TabPanel>
                        
                        <TabPanel>
                            <TripPricingCreationForm
                                price={price}
                                
                                setPrice={setPrice}
                            />
                        </TabPanel>
                    </TabPanels>
                }
            />
            
            <Button type="submit" variant="primary" text={updateButtonText} onClick={updateTrip} />
        </>
    );
};
