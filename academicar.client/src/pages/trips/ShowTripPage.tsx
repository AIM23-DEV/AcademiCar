import {useParams} from 'react-router-dom';
import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {useTranslation} from 'react-i18next';
import {Card} from "../../components/Cards.tsx";
import {
    BiCar, BiEdit, BiErrorAlt, BiGroup,
    BiMap, BiMessageCheck, BiMessageX, BiPalette, BiRadioCircleMarked, BiShare, BiShieldX, BiShoppingBag,
    BiUserCircle
} from "react-icons/bi";
import {TextButton} from "../../components/Buttons.tsx";
import React, {useEffect, useState} from "react";
import {Divider} from "../../components/Divider.tsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../AuthContext.tsx";


interface RouteProps {
    startAddress: IAddress | undefined;
    endAddress: IAddress | undefined;
    stops?: ITripStop[] | undefined;
    freeSeats: number;
    duration: string;
    distance: number;
    price: number;
}
interface RequestProps {
    tripId: string | undefined;
    requestUsers: IUser[] | undefined;
}
interface PassengerProps {
    passengers: IUser[] | undefined;
}

export const Route = (props: RouteProps) => {
    const [t] = useTranslation(["common", "pages/trips"]);
    const startText = t('common:trip.start');
    const timeText = t('common:time.time');
    const freespotsText = t('common:trip.freeSpots');
    const stopText = t('common:trip.stop');
    const destinationText = t('common:trip.destination');
    const durationText = t('pages/trips:ShowTripPage.duration');
    const kmText = t('pages/trips:ShowTripPage.km');
    const distanceText = t('pages/trips:ShowTripPage.distance');
    const priceText = t('pages/trips:ShowTripPage.price');
    
    return (
        <div>
            <div className="flex gap-4">
                <div className="flex flex-col items-center">
                    <span><BiRadioCircleMarked className="icon-md text-primary-600" /></span>
                    
                    {props.stops?.map((_, index) => (
                        <React.Fragment key={index}>
                            <span className="h-full border-gray-400 border-r-2 border-dashed"></span>
                            <span><BiMap className="icon text-primary-600" /></span>
                        </React.Fragment>
                    ))}
                    
                    <span className="h-full border-gray-400 border-r-2 border-dashed" />
                    
                    <span><BiMap className="icon text-primary-600" /></span>
                </div>
                
                <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <div className="text-gray-400 text-xs">{startText}</div>
                            <div className="body-1">{props.startAddress?.street}</div>
                        </div>
                    </div>
                    
                    <div className="flex flex-row items-center gap-2">
                        <span className="flex">
                            {Array.from({length: 4 - props.freeSeats}).map((_, index) => (
                                <BiUserCircle key={index} className="icon text-gray-600"/>
                            ))}
                            {Array.from({length: props.freeSeats}).map((_, index) => (
                                <BiUserCircle key={index} className="icon text-primary-600"/>
                            ))}
                        </span>
                        <span className="text-gray-400 text-xs">{props.freeSeats} {freespotsText}</span>
                    </div>
                    
                    {props.stops?.map((stop, index) => (
                        <React.Fragment key={index}>
                            <div className="flex flex-row justify-between items-center">
                                <div>
                                    <div className="text-gray-400 text-xs">{stopText}</div>
                                    <div className="body-1">{stop.fK_StopAddress}</div>
                                </div>
                                <div className="body-2 text-sm">{stop.stopDurationInMinutes} {timeText}</div>
                            </div>
                            
                            <div className="flex flex-row items-center gap-2">
                                <span className="flex">
                                    {Array.from({length: 4 - props.freeSeats}).map((_, index) => (
                                        <BiUserCircle key={index} className="icon text-gray-600"/>
                                    ))}
                                    {Array.from({length: props.freeSeats}).map((_, index) => (
                                        <BiUserCircle key={index} className="icon text-primary-600"/>
                                    ))}
                                </span>
                                <span className="text-gray-400 text-xs">{props.freeSeats} {freespotsText}</span>
                            </div>
                        </React.Fragment>
                    ))}
                    
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <div className="text-gray-400 text-xs">{destinationText}</div>
                            <div className="body-1">{props.endAddress?.street}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Divider className="my-4" />
            
            <div className="grid grid-cols-3 gap-4 text-center divide-x-2 divide-gray-300">
                <div>
                    {props.duration}
                    <div className="text-gray-400 text-xs">{durationText} </div>
                </div>
                
                <div>
                    {props.distance} {kmText}
                    <div className="text-gray-400 text-xs">{distanceText}</div>
                </div>
                
                <div>
                    {props.price} €
                    <div className="text-gray-400 text-xs">{priceText}</div>
                </div>
            </div>
        </div>
    );
};

export const Req = (props: RequestProps) => {
    const [t] = useTranslation(["common", "pages/trips"]);
    const cancelText = t('pages/trips:RequestCard.cancel');
    const acceptText = t('pages/trips:RequestCard.accept');
    
    const declineTripRequest = (userId: string) => {
        fetch(`/api/chat/GetTripRequest/${userId}/${props.tripId}`)
            .then(response => response.json())
            .then(tripRequest => {
                if (tripRequest) {
                    tripRequest.status = "Declined";
            
                    fetch(`/api/chat/chat/updateRequest`, {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(tripRequest)
                    });
                }
            });
    }
    const acceptTripRequest = (userId: string) => {
        fetch(`/api/chat/GetTripRequest/${userId}/${props.tripId}`)
            .then(response => response.json())
            .then(tripRequest => {
                if (tripRequest) {
                    tripRequest.status = "Accepted";

                    fetch(`/api/chat/chat/updateRequest`, {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(tripRequest)
                    });

                    // Create GroupChatUser
                    const newGroupChatUser: IGroupChatUser = {
                        fK_User: tripRequest?.fK_PotentialPassenger,
                        fK_GroupChat: tripRequest.fK_Trip
                    };

                    fetch(`/api/create/groupchatUser`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newGroupChatUser)
                    });

                    // Create TripPassenger
                    const newTripPassenger: ITripPassenger = {
                        fK_Trip: tripRequest?.fK_Trip,
                        fK_PassengerUser: tripRequest?.fK_PotentialPassenger
                    };

                    fetch(`/api/create/tripPassenger`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newTripPassenger)
                    });
                }
            });
    }
    
    return (
        <div>
            {props.requestUsers?.map((requestUser, index) => (
                <React.Fragment key={index}>
                    {index != 0 ? (
                        <Divider className="my-4" />
                    ) : (
                        <></>
                    )}
                    <a>
                        <div className="flex flex-row gap-4">
                            <div className="flex justify-center">
                                <img
                                    src={requestUser.pictureSrc}
                                    alt="avatar"
                                    className="border-gray-600 rounded-full"
                                />
                            </div>
                            
                            <div className="w-full">
                                <div>{`${requestUser.firstName} ${requestUser.lastName}`}</div>
                            </div>
                        </div>
                    </a>
                    
                    <div className="grid grid-cols-2 justify-items-center">
                        <div className="mt-4">
                            <a>
                                <TextButton
                                    variant="accent"
                                    fullWidth
                                    text={cancelText}
                                    textAlign="left"
                                    textFullWidth
                                    leading={<BiMessageX className="icon" />}
                                    type="button"
                                    disabled={false}
                                    className="mt-2"
                                    onClick={() => declineTripRequest(requestUser.id)}
                                />
                            </a>
                        </div>
                        
                        <div className="mt-4">
                            <a>
                                <TextButton
                                    variant="primary"
                                    fullWidth
                                    text={acceptText}
                                    textAlign="left"
                                    textFullWidth
                                    leading={<BiMessageCheck className="icon" />}
                                    type="button"
                                    disabled={false}
                                    className="mt-2"
                                    onClick={() => acceptTripRequest(requestUser.id)}
                                />
                            </a>
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export const Pas = (props: PassengerProps) => {
    return (
        <div className="w-full">
            {props.passengers?.map((passenger, index) => (
                <React.Fragment key={index}>
                    {index != 0 ? (
                        <Divider className="my-4" />
                    ) : (
                        <></>
                    )}
                    <div className="flex justify-center gap-4 items-center">
                        <div className="flex justify-center">
                            <img
                                src={passenger.pictureSrc}
                                alt="avatar"
                                className="rounded-full w-11 h-11"
                            />
                        </div>
                        
                        <div>
                            <div>{`${passenger.firstName} ${passenger.lastName}`}</div>
                        </div>
                        
                        <div className="flex items-center justify-end w-full">
                            <span></span>
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

function calculateDuration(startDate: Date, endDate: Date): string {
    // Calculate the difference in milliseconds
    const sDate = (startDate instanceof Date) ? startDate : new Date(startDate);
    const eDate = (endDate instanceof Date) ? endDate : new Date(endDate);
    
    const differenceInMs = eDate.getTime() - sDate.getTime();

    // Calculate the difference in minutes
    const totalMinutes = Math.floor(differenceInMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    // Return the formatted duration string
    return `${hours}h : ${minutes.toString().padStart(2, '0')}min`;
}

export const ShowTripPage = () => {
    const [t] = useTranslation(["common", "pages/trips"]);
    const { loggedInUserId, tripId } = useParams();
    const pageTitle = t("pages/trips:ShowTripPage.title", {id: tripId});
    const driveText = t("pages/trips:ShowTripPage.drive");
    const requestsText = t("pages/trips:ShowTripPage.requests");
    const passengersText = t("pages/trips:ShowTripPage.passengers");
    const vehicleDetailsText = t("pages/trips:ShowTripPage.vehicleDetails");
    const seatsLabelText = t("pages/trips:ShowTripPage.label_seats");
    const preferencesText = t("pages/trips:ShowTripPage.preferences");
    const actionsLabelText = t("pages/trips:ShowTripPage.actions");
    const bookTripButtonText = t("pages/trips:ShowTripPage.bookTrip");
    const tripBookedButtonText = t("pages/trips:ShowTripPage.tripRequestWasSent");
    const editDriveButtonText = t("pages/trips:ShowTripPage.editDrive");
    const shareDriveButtonText = t("pages/trips:ShowTripPage.shareDrive");
    const cancelDriveButtonText = t("pages/trips:ShowTripPage.cancelDrive");
    SetPageTitle(pageTitle);

    const navigate = useNavigate();
    const auth = useAuth();
    const [trip, setTrip] = useState<ITrip>();
    const [startAddress, setStartAddress] = useState<IAddress>();
    const [endAddress, setEndAddress] = useState<IAddress>();
    const [driver, setDriver] = useState<IUser>();
    const [requestUsers, setRequestUsers] = useState<IUser[]>();
    const [passengers, setPassengers] = useState<IUser[]>();
    const [vehicle, setVehicle] = useState<IVehicle>();
    const [driverTravelPreferences, setDriverTravelPreferences] = useState<ITravelPreference[]>();
    const [error, setError] = useState<string | null>();

    useEffect(() => {
        fetch(`/api/create/${tripId}`)
            .then(response => response.json())
            .then(data => setTrip(data))
            .catch(error => {
                setError("There was an error fetching the trip details!");
                console.error(error);
            });

        fetch(`/api/trip/requestUsers/${tripId}`)
            .then(response => response.json())
            .then(data => setRequestUsers(data))
            .catch(error => {
                setError("There was an error fetching the request user details!");
                console.error(error);
            });
        
        fetch(`/api/trip/passengers/${tripId}`)
            .then(response => response.json())
            .then(data => setPassengers(data))
            .catch(error => {
                setError("There was an error fetching the passenger details!");
                console.error(error);
            });
    }, [tripId]);

    if (!auth.user?.id && !loggedInUserId) return <div>Invalid user!</div>;
    if (error) return <div>{`There was an error: ${error}`}</div>;
    if (!trip) return <div>Loading trip information...</div>;

    if (trip && !startAddress) {
        fetch(`/api/create/address/${trip?.fK_StartAddress}`)
            .then(response => response.json())
            .then(fetchedAddress => setStartAddress(fetchedAddress))
            .catch(error => {
                setError("There was an error fetching the start address!");
                console.error(error);
            });
    }
    
    if (trip && !endAddress) {
        fetch(`/api/create/address/${trip?.fK_EndAddress}`)
            .then(response => response.json())
            .then(fetchedAddress => setEndAddress(fetchedAddress))
            .catch(error => {
                setError("There was an error fetching the end address!");
                console.error(error);
            });
    }
    
    if (trip && !driver) {
        fetch(`/api/admin/users/${trip.fK_Driver}`)
            .then(response => response.json())
            .then(data => setDriver(data))
            .catch(error => {
                setError("There was an error fetching the driver details!");
                console.error(error);
            });
    }

    if (trip && !vehicle) {
        fetch(`/api/profile/vehicle/${trip.fK_Vehicle}`)
            .then(response => response.json())
            .then((data) => setVehicle(data))
            .catch(error => {
                setError("There was an error fetching the vehicle details!");
                console.error(error);
            });
    }

    if (driver && !driverTravelPreferences) {
        fetch(`/api/admin/preferences/travel/${driver.id}`)
            .then(response => response.json())
            .then((data) => setDriverTravelPreferences(data))
            .catch(error => {
                setError("There was an error fetching the vehicle details!");
                console.error(error);
            });
    }

    const sendTripRequest = () => {
        fetch(`/api/chat/CreateTripRequest/${auth.user?.id}/${tripId}`, {method: 'POST'})
            .then(response => {
                if (response)
                    alert(tripBookedButtonText);
        });
    }
    
    return (
        <>
            <TitleBar text={pageTitle} hasBackAction />
            
            <Card
                id="showTripPage_routeCard"
                label={driveText}
                labelPosition="outside"
                padding="base"
                className="mt-8"
            >
                <Route
                    startAddress={startAddress}
                    endAddress={endAddress}
                    freeSeats={trip.availableSeats}
                    duration={calculateDuration(trip.startTime, trip.endTime)}
                    distance={100}
                    price={trip.price}
                />
            </Card>

            {
                trip.fK_Driver == auth.user?.id
                    ? <>
                        <Card
                            id="showTripPage_requestsCard"
                            label={requestsText}
                            labelPosition="outside"
                            padding="base"
                            className="mt-8"
                        >
                            <Req requestUsers={requestUsers} tripId={tripId} />
                        </Card>
                    </>
                    : <>
                        <TextButton
                            variant="primary"
                            fullWidth
                            text={bookTripButtonText}
                            textAlign="center"
                            textFullWidth
                            type="button"
                            disabled={false}
                            className="mt-2"
                            onClick={sendTripRequest}
                        />
                        
                        {/* TODO Driver info card */}
                    </>
            }

            {
                false
                    ? <Card
                        id="showTripPage_passengersCard"
                        label={passengersText}
                        labelPosition="outside"
                        padding="base"
                        className="mt-8"
                    >
                        <Pas passengers={passengers} />
                    </Card>
                    : <></>
            }

            <Card
                id="showTripPage_vehicleDetailsCard"
                label={vehicleDetailsText}
                labelPosition="outside"
                padding="base"
                className="mt-8"
            >
                <div>
                    <div className="flex flex-row gap-4">
                        <div className="flex justify-center">
                            <img
                                src={vehicle?.pictureSrc}
                                alt="avatar"
                                className="border-gray-600 rounded-full"
                            />
                        </div>
                        
                        <div className="w-full grid grid-cols-2">
                            <div>
                                <div className="flex gap-4">
                                    <BiCar className="icon" />
                                    {vehicle?.type}
                                </div>
                                
                                <div className="flex gap-4">
                                    <BiPalette className="icon" />
                                    {vehicle?.color}
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex gap-4">
                                    <BiGroup className="icon"/>
                                    {vehicle?.seats} {seatsLabelText}
                                </div>
                                
                                <div className="flex gap-4">
                                    <BiShoppingBag className="icon"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            
            <Card
                id="showTripPage_preferencesCard"
                label={preferencesText}
                labelPosition="outside"
                padding="base"
                className="mt-8"
            >
                {driverTravelPreferences?.map((travelPref, index) => (
                    <React.Fragment key={index}>
                        <div className="flex flex-row gap-4">
                            <BiErrorAlt className="icon text-red-600"/>
                            <div>{travelPref.preferenceText}</div>
                        </div>
                    </React.Fragment>
                ))}
                
                <p></p>
                <p></p>
            </Card>

            {
                trip.fK_Driver == auth.user?.id
                    ? <>
                        <Card
                            id="showTripPage_actionsCard"
                            label={actionsLabelText}
                            labelPosition="outside"
                            padding="base"
                            className="mt-8 mb-24"
                        >
                            <div></div>

                            <TextButton
                                variant="secondary"
                                fullWidth
                                text={editDriveButtonText}
                                textAlign="left"
                                textFullWidth
                                leading={<BiEdit className="icon"/>}
                                type="button"
                                disabled={false}
                                onClick={() => navigate(`/create/${auth.user?.id}/update/${tripId}`)}
                            />

                            {
                                false
                                    ? <TextButton
                                        variant="secondary"
                                        fullWidth
                                        text={shareDriveButtonText}
                                        textAlign="left"
                                        textFullWidth
                                        leading={<BiShare className="icon"/>}
                                        type="button"
                                        disabled={false}
                                        className="mt-2"
                                        onClick={() => navigate("404")}
                                    />
                                    : <></>
                            }

                            <TextButton
                                variant="accent"
                                fullWidth
                                text={cancelDriveButtonText}
                                textAlign="left"
                                textFullWidth
                                leading={<BiShieldX className="icon" />}
                                type="button"
                                disabled={false}
                                className="mt-2"
                                onClick={() => history.back()}
                            />
                        </Card>
                    </>
                    : <></>
            }
            
            <BottomNavigationBar selected="trips" />
        </>
    );
};