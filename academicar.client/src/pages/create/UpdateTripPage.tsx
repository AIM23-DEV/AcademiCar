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

function getAddressString(address: IAddress): string {
    return `${address.street} ${address.number} ${address.zip} ${address.place}`;
}
function getDateString(timestamp: any): string {
    const date = (timestamp instanceof Date) ? timestamp : new Date(timestamp);
    
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const dayString = day < 10 ? `0${day}` : day.toString();
    const monthString = month < 10 ? `0${month}` : month.toString();

    return `${year}-${monthString}-${dayString}`;
}
function getTimeString(timestamp: any): string {
    const date = (timestamp instanceof Date) ? timestamp : new Date(timestamp);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const hoursString = hours < 10 ? `0${hours}` : hours.toString();
    const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString();

    return `${hoursString}:${minutesString}`;
}
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
        place: "",
        longitude: "",
        latitude: "",
    };
}
function getDate(dateStr: string, timeStr: string): Date {
    const dateFields = dateStr.split('/');
    const timeFields = timeStr.split(':');
    if (dateFields.length != 3 || timeFields.length != 2)
        return new Date(2020, 1, 1, 12, 0,0)

    const day = Number(dateFields[0])
    const month = Number(dateFields[1])
    const year = Number(dateFields[2])
    const hours = Number(timeFields[0])
    const minutes = Number(timeFields[1])

    return new Date(year, month-1, day, hours, minutes, 0);
}

export const UpdateTripPage = () => {
    // translations
    const [t] = useTranslation(["common", "pages/create"]);
    const pageTitle = t("pages/create:Common.title_update");
    const routeTabText = t("pages/create:UpdateTripPage.tab_route");
    const timeTabText = t("pages/create:UpdateTripPage.tab_time");
    const vehicleTabText = t("pages/create:UpdateTripPage.tab_vehicle");
    const pricingTabText = t("pages/create:UpdateTripPage.tab_pricing");
    const updateButtonText = t("pages/create:UpdateTripPage.button_update");
    SetPageTitle(pageTitle);

    // consts
    const { loggedInUserId, tripId } = useParams();
    const [trip, setTrip] = useState<ITrip>();
    const [startAddress, setStartAddress] = useState<string>();
    const [endAddress, setEndAddress] = useState<string>();
    const [startDate, setStartDate] = useState<string>();
    const [startTime, setStartTime] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const [endTime, setEndTime] = useState<string>();
    const [tripVehicleId, setTripVehicleId] = useState<number>();
    const [availableSeats, setAvailableSeats] = useState(0);
    const [price, setPrice] = useState(0);
    const [error, setError] = useState<string | null>();

    // Loading
    useEffect(() => {
        fetch(`/api/create/${tripId}`)
        .then(response => response.json())
        .then(data => {
            setTrip(data);
            if (trip)
            {
                setStartDate(getDateString(trip.startTime))
                setStartTime(getTimeString(trip.startTime))
                setEndDate(getDateString(trip.endTime))
                setEndTime(getTimeString(trip.endTime))
                setTripVehicleId(trip.fK_Vehicle);
                setAvailableSeats(trip.availableSeats);
                setPrice(trip.price);
            }
        })
        .catch(error => {
            setError("There was an error fetching the trip details!");
            console.error(error);
        });
    }, [tripId]);

    if (!loggedInUserId) return <div>Invalid user!</div>
    if (error) return <div>{`There was an error: ${error}`}</div>
    if (!trip) return <div>Loading trip information...</div>;

    if (trip && !startAddress) {
        fetch(`/api/create/address/${trip?.fK_StartAddress}`)
            .then(response => response.json())
            .then(fetchedAddress => setStartAddress(getAddressString(fetchedAddress)))
            .catch(error => {
                setError("There was an error fetching the start address!");
                console.error(error);
        });
    }
    if (trip && !endAddress) {
        fetch(`/api/create/address/${trip?.fK_EndAddress}`)
            .then(response => response.json())
            .then(fetchedAddress => setEndAddress(getAddressString(fetchedAddress)))
            .catch(error => {
                setError("There was an error fetching the end address!");
                console.error(error);
        });
    }
    
    // Buttons
    function isDataReady(): boolean {
        return !!(startAddress && endAddress && startDate && startTime && endDate && endTime && tripVehicleId);
    }

    const createAddress = async (address: IAddress): Promise<IAddress> => {
        const response = await fetch(`/api/create/address`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(address)
        });

        if (!response.ok) {
            throw new Error('Failed to create address');
        }

        return await response.json();
    };
    
    const updateTrip = async () => {
        if (!isDataReady()) return;

        const fullStartAddress: IAddress = getAddress(startAddress as string);
        const fullEndAddress: IAddress = getAddress(endAddress as string);
        const createdStartAddress = await createAddress(fullStartAddress);
        const createdEndAddress = await createAddress(fullEndAddress);

        const fullStartDate: Date = getDate(startDate as string, startTime as string);
        const fullEndDate: Date = getDate(endDate as string, endTime as string);

        const updatedTrip: ITrip = {
            id: tripId as unknown as number,
            title: `${createdStartAddress?.place} -> ${createdEndAddress?.place}`,
            fK_Driver: `${loggedInUserId}`,
            fK_StartAddress: createdStartAddress.id as number,
            fK_EndAddress: createdEndAddress.id as number,
            startTime: fullStartDate,
            endTime: fullEndDate,
            fK_Vehicle: tripVehicleId as number,
            availableSeats: availableSeats,
            price: price,
            paymentMethod: trip.paymentMethod,
            status: trip.status
        }

        const tripResponse = await fetch(`/api/create/${tripId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTrip)
        })

        const updatedTripJson = await tripResponse.json();
        if (updatedTripJson.id == trip.id)
        {
            alert('Trip updated successfully!');
            history.back();
        }
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

                                setStartAddress={setStartAddress}
                                setEndAddress={setEndAddress}
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
