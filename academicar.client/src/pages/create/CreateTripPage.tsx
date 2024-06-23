import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
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

export const CreateTripPage = () => {
    const [t] = useTranslation(["common", "pages/create"]);
    const pageTitle = t("pages/create:Common.title_create");
    const createButtonText = t("pages/create:CreateTripPage.button_create");
    const paginationPageText = t("pages/create:Pagination.page");
    const paginationPreviousButtonText = t("pages/create:Pagination.button_previous");
    const paginationNextButtonText = t("pages/create:Pagination.button_next");
    SetPageTitle(pageTitle);

    const { loggedInUserId } = useParams();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
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

    // Buttons
    function isDataReady(): boolean {
        return !!(startAddress && endAddress && startDate && startTime && endDate && endTime && tripVehicleId);
    }

    const createAddress = async (address: IAddress): Promise<IAddress> => {
        const response = await fetch(`https://localhost:5173/api/create/address`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(address)
        });

        if (!response.ok) {
            throw new Error('Failed to create address');
        }

        return await response.json();
    };

    const createTrip = async () => {
        try {
            if (!isDataReady()) return;

            const fullStartAddress: IAddress = getAddress(startAddress as string);
            const fullEndAddress: IAddress = getAddress(endAddress as string);
            const createdStartAddress = await createAddress(fullStartAddress);
            const createdEndAddress = await createAddress(fullEndAddress);

            const fullStartDate: Date = getDate(startDate as string, startTime as string);
            const fullEndDate: Date = getDate(endDate as string, endTime as string);

            const newTrip: ITrip = {
                title: `${createdStartAddress.place} -> ${createdEndAddress.place}`,
                fK_Driver: `${loggedInUserId}`,
                fK_StartAddress: createdStartAddress.id as number,
                fK_EndAddress: createdEndAddress.id as number,
                startTime: fullStartDate,
                endTime: fullEndDate,
                fK_Vehicle: tripVehicleId as number,
                availableSeats: availableSeats,
                price: price,
                paymentMethod: "None",
                status: "Open"
            };

            const tripResponse = await fetch(`https://localhost:5173/api/create/trip`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTrip)
            });
            
            // Create GroupChat
            const createdTrip = await tripResponse.json();
            const newGroupChat: IGroupChat = {
                fK_Trip: createdTrip.id,
                tripTitle: createdTrip.title,
                updatedAt: new Date(),
                lastMessageContent: ""
            };

            const groupChatResponse = await fetch(`https://localhost:5173/api/create/groupchat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newGroupChat)
            });
            const createdGroupChat = await groupChatResponse.json();
            if (createdGroupChat.id == createdTrip.id)
            {
                // finish
                alert('Trip created successfully!');
                navigate('/trips/index/' + loggedInUserId);
            }
            
        } catch (error) {
            setError(`There was an error: ${error}`);
            console.error("Error:", error);
        }
    };
    
    if (error) return <div>{`There was an error: ${error}`}</div>
    if (!loggedInUserId || (loggedInUserId && loggedInUserId == "undefined")) return <div>Invalid user!</div>
    
    const renderCurrentSection = () => {
        switch (currentPage) {
            case 1:
                return (
                    <TripRouteCreationForm
                        startAddress={startAddress}
                        endAddress={endAddress}
    
                        setStartAddress={setStartAddress}
                        setEndAddress={setEndAddress}
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
                            disabled={!isDataReady()}
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

                        setStartAddress={setStartAddress}
                        setEndAddress={setEndAddress}
                    />
                )
        }
    };
    
    // Render
    return (
        <>
            <TitleBar text={pageTitle} hasBackAction={true}/>

            {renderCurrentSection()}

            <Pagination
                page={currentPage}
                setPage={setCurrentPage}
                totalPages={4}
                showPages={true}
                
                textPage={paginationPageText}
                textPrev={paginationPreviousButtonText}
                textNext={paginationNextButtonText}
            />

            <BottomNavigationBar selected="create"/>
        </>
    );
};
