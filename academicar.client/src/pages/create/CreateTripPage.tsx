import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {TitleBar} from "../../components/TitleBar";
import {Button} from "../../components/Buttons.tsx";
import {TripRouteCreationForm} from "./partials/TripRouteCreationForm.tsx";
import {TripVehicleCreationForm} from "./partials/TripVehicleCreationForm.tsx";
import {TripPricingCreationForm} from "./partials/TripPricingCreationForm.tsx";
import {TripTimeCreationForm} from "./partials/TripTimeCreationForm.tsx";
import {Pagination} from "../../components/Pagination.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";

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

export const CreateTripPage = () => {
    const [t] = useTranslation(["common", "pages/create"]);
    const pageTitle = t("pages/create:Common.title_create");
    const createButtonText = t("pages/create:CreateTripPage.button_create");
    SetPageTitle(pageTitle);

    const { loggedInUserId } = useParams();
    let currentPage: number = 1;
    const [startAddress, setStartAddress] = useState<IAddress>();
    const [endAddress, setEndAddress] = useState<IAddress>();
    const [startDate, setStartDate] = useState<string>();
    const [startTime, setStartTime] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const [endTime, setEndTime] = useState<string>();
    const [tripVehicleId, setTripVehicleId] = useState<number>();
    const [availableSeats, setAvailableSeats] = useState<number>();
    const [price, setPrice] = useState<number>(0);
    const [error, setError] = useState<string | null>();

    // Handling change
    const onChangeStartAddress = (val: string) => setStartAddress(getAddress(val));
    const onChangeEndAddress = (val: string) => setEndAddress(getAddress(val));

    // Buttons
    function isDataReady(): boolean {
        if (!startAddress || !endAddress) return false;
        if (!startDate || !startTime || !endDate || !endTime) return false;
        if (!tripVehicleId || !availableSeats) return false;
        
        return true;
    }

    const createTrip = async () => {
        if (!startAddress || !endAddress
            || !startDate || !startTime || !endDate || !endTime
            || !tripVehicleId || !availableSeats
        ) return;

        const fullStartDate: Date = getDate(startDate, startTime);
        const fullEndDate: Date = getDate(endDate, endTime);
        const newTrip: ITrip = {
            title: `${startAddress?.place} -> ${endAddress?.place}`,
            fK_Driver: `${loggedInUserId}`,
            fK_StartAddress: startAddress.id,
            fK_EndAddress: endAddress.id,
            startTime: fullStartDate,
            endTime: fullEndDate,
            fK_Vehicle: tripVehicleId,
            availableSeats: availableSeats,
            price: price,
            paymentMethod: "None",
            status: "Open"
        }

        try {
            await fetch(`https://localhost:5173/api/create/address`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(startAddress)
            });

            await fetch(`https://localhost:5173/api/create/address`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(endAddress)
            });

            const tripResponse = await fetch(`https://localhost:5173/api/create/trip`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTrip)
            });
            const createdTrip = await tripResponse.json();
            const newGroupChat: IGroupChat = {
                fK_Trip: createdTrip.id,
                trip: createdTrip,
                updatedAt: new Date(),
                lastMessageContent: ""
            };

            await fetch(`https://localhost:5173/api/chat/CreateGroupChat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newGroupChat)
            });
        } catch (error) {
            setError(`There was an error creating the trip!`);
            console.error("Error:", error);
        }
    };

    if (error) return <div>{`There was an error: ${error}`}</div>
    if (!loggedInUserId) return <div>Invalid user!</div>
    
    // Render
    return (
        <>
            <TitleBar text={pageTitle} hasBackAction={true} />

            { currentPage == 1 ?
                <TripRouteCreationForm
                    startAddress={startAddress}
                    endAddress={endAddress}

                    setStartAddress={onChangeStartAddress}
                    setEndAddress={onChangeEndAddress}
                />
            : currentPage == 2 ?
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
            : currentPage == 3 ?
                <TripVehicleCreationForm
                    driverId={loggedInUserId}
                    vehicleId={tripVehicleId}
                    availableSeats={availableSeats}
                    
                    setVehicleId={setTripVehicleId}
                    setAvailableSeats={setAvailableSeats}
                />
            :
                <>
                    <TripPricingCreationForm
                        price={price}
                        setPrice={setPrice}
                    />
                    
                    <Button
                        disabled={isDataReady()}
                        type="submit"
                        variant="primary"
                        text={createButtonText}
                        onClick={createTrip}
                    />
                </>
            }
            
            <Pagination page={currentPage} totalPages={4} showPages={true} />
            <BottomNavigationBar selected="create"/>
        </>
    );
};
