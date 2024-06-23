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
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {Pagination} from "../../components/Pagination.tsx";

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
    const [t] = useTranslation(["common", "components/pagination", "pages/create"]);
    const pageTitle = t("pages/create:Common.title_create");
    const createButtonText = t("pages/create:CreateTripPage.button_create");
    SetPageTitle(pageTitle);

    const { loggedInUserId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
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
    
    const createTrip = () => {
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
            fK_EndAddress: startAddress.id,
            startTime: fullStartDate,
            endTime: fullEndDate,
            fK_Vehicle: tripVehicleId,
            availableSeats: availableSeats,
            price: price,
            paymentMethod: "None",
            status: "Open"
        }

        fetch(`https://localhost:5173/api/create/address`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(startAddress)
        })
            .catch(error => {
                setError(`There was an error saving the start address!`);
                console.error("Error:", error);
            });

        fetch(`https://localhost:5173/api/create/address`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(endAddress)
        })
            .catch(error => {
                setError(`There was an error saving the start address!`);
                console.error("Error:", error);
            });

        fetch(`https://localhost:5173/api/create/trip`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTrip)
        })
            .catch(error => {
                setError(`There was an error creating the trip!`);
                console.error("Error:", error);
            });
    };

    if (error) return <div>{`There was an error: ${error}`}</div>
    if (!loggedInUserId) return <div>Invalid user!</div>

    const renderCurrentSection = () => {
        switch (currentPage) {
            case 1:
                return (
                    <TripRouteCreationForm
                        startAddress={startAddress}
                        endAddress={endAddress}
    
                        setStartAddress={onChangeStartAddress}
                        setEndAddress={onChangeEndAddress}
                    />
                )                
            case 2:
                return (
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
                );
            case 3:
                return (
                    <TripVehicleCreationForm
                        driverId={loggedInUserId}
                        vehicleId={tripVehicleId}
                        availableSeats={availableSeats}

                        setVehicleId={setTripVehicleId}
                        setAvailableSeats={setAvailableSeats}
                    />
                );
            case 4:
                return (
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
                );
            default:
                return (
                    <TripRouteCreationForm
                        startAddress={startAddress}
                        endAddress={endAddress}

                        setStartAddress={onChangeStartAddress}
                        setEndAddress={onChangeEndAddress}
                    />
                )
        }
    };
    
    // Render
    return (
        <>
            <TitleBar text={pageTitle} hasBackAction={true}/>

            {renderCurrentSection()}

            <Pagination page={currentPage} setPage={setCurrentPage} totalPages={4} showPages={true} />

            <BottomNavigationBar selected="create"/>
        </>
    );
};
