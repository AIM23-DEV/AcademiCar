import {useEffect, useState} from 'react';
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

export type VehicleOptions = {
    [key: number]: string;
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
        place: addressStr,
        longitude: "",
        latitude: "",
    };
}

function getDate(dateStr: string, timeStr: string): Date {
    const dateFields = dateStr.split('-');
    const timeFields = timeStr.split(':');

    if (dateFields.length != 3 || timeFields.length != 2)
        return new Date(2020, 1, 1, 12, 0, 0)

    const year = Number(dateFields[0])
    const month = Number(dateFields[1])
    const day = Number(dateFields[2])
    const hours = Number(timeFields[0])
    const minutes = Number(timeFields[1])

    return new Date(year, month - 1, day, hours, minutes, 0);
}

export const CreateTripPage = () => {
    const [t] = useTranslation(["common", "pages/create"]);
    const pageTitle = t("pages/create:Common.title_create");
    const createButtonText = t("pages/create:CreateTripPage.button_create");
    const paginationPageText = t("pages/create:Pagination.page");
    const paginationPreviousButtonText = t("pages/create:Pagination.button_previous");
    const paginationNextButtonText = t("pages/create:Pagination.button_next");
    SetPageTitle(pageTitle);

    const {loggedInUserId} = useParams();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [startAddress, setStartAddress] = useState<string>("");
    const [endAddress, setEndAddress] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [tripVehicleId, setTripVehicleId] = useState<number | undefined>();
    const [availableSeats, setAvailableSeats] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [error, setError] = useState<string | null>();
    const [vehicleOptions, setVehicleOptions] = useState<VehicleOptions>({});

    useEffect(() => {
        fetch(`/api/create/vehicles/${loggedInUserId}`)
            .then(response => response.json())
            .then((fetchedVehicles: IVehicle[]) => {
                const options = fetchedVehicles.reduce((options: VehicleOptions, vehicle) => {
                    const key = vehicle.id ?? -999
                    options[key] = vehicle.brandModel + " | " + vehicle.licensePlate;
                    return options;
                }, {});
                setVehicleOptions(options);
            })
            .catch(error => console.error(error));
    }, []);

    // Buttons
    function isDataReady(): boolean {
        return !!(startAddress && endAddress && startDate && startTime && endDate && endTime && tripVehicleId);
    }

    const createAddress = async (address: IAddress): Promise<IAddress> => {
        const response = await fetch(`/api/create/address`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
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

            const tripResponse = await fetch(`/api/create/trip`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newTrip)
            });

            // Create GroupChat
            const createdTrip = await tripResponse.json();
            const newGroupChat: IGroupChat = {
                id: createdTrip.id,
                fK_Trip: createdTrip.id,
                tripTitle: createdTrip.title,
                updatedAt: new Date(),
                lastMessageContent: ""
            };

            const groupChatResponse = await fetch(`/api/create/groupchat`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newGroupChat)
            });
            const createdGroupChat = await groupChatResponse.json();
            
            // Create GroupChatUser
            const newGroupChatUser: IGroupChatUser = {
                fK_User: loggedInUserId,
                fK_GroupChat: createdGroupChat.id
            };

            await fetch(`/api/create/groupchatUser`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newGroupChatUser)
            });

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
                        vehicleOptions={vehicleOptions}
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

            <div className="w-full flex flex-col space-y-6 mt-6 mb-24">
                {renderCurrentSection()}
            </div>

            <div className="fixed bottom-20 inset-x-6 space-y-2">
                <Pagination
                    page={currentPage}
                    setPage={setCurrentPage}
                    totalPages={4}
                    showPages={true}

                    textPage={paginationPageText}
                    textPrev={paginationPreviousButtonText}
                    textNext={paginationNextButtonText}
                    button={currentPage === 4 ?
                        <Button
                            disabled={!isDataReady()}
                            type="submit"
                            variant="primary"
                            text={createButtonText}
                            onClick={createTrip}
                            fullWidth
                            className="p-3"
                        />
                        : undefined}
                />
            </div>

            <BottomNavigationBar selected="create"/>
        </>
    )
        ;
};
