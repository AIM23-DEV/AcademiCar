import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {IconButton} from "../../components/Buttons.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {BiPlus} from "react-icons/bi";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {useEffect} from "react";
import {TripCard} from "./partials/TripCard.tsx";
import {Card} from "../../components/Cards.tsx";
// TODO add list of trips for the current user

export const IndexTripsPage = () => {
    const [t] = useTranslation(["common", "pages/trips"]);
    const pageTitle = t("pages/trips:IndexTripsPage.title");
    const driverLabel: string = t('pages/trips:IndexTripsPage.myTrips');
    const passengerLabel: string = t('pages/trips:IndexTripsPage.passenger');
    SetPageTitle(pageTitle);
    
    const {loggedInUserId} = useParams();
    const [driverTrips, setDriverTrips] = useState<ITrip[]>([]);
    const [passengersTrips, setPassengerTrips] = useState<ITrip[]>([]);
    const navigate = useNavigate();

    // Fetch trips from API
    useEffect(() => {
        fetch(`https://localhost:5173/api/trip/driver/${loggedInUserId}`)
            .then(response => response.json())
            .then((fetchedTrips: ITrip[]) => {
                setDriverTrips(fetchedTrips);
            });
    }, []);

    useEffect(() => {
        fetch(`https://localhost:5173/api/trip/passenger/${loggedInUserId}`)
            .then(response => response.json())
            .then((fetchedTrips: ITrip[]) => {
                setPassengerTrips(fetchedTrips);
            });
    }, []);

    return (
        <>
            <TitleBar text={pageTitle} />
            
            <div className="w-full flex flex-col items-center pb-24">
                <Card
                    label={driverTrips ? driverLabel : ""}
                    outsideLinkText={t('pages/trips:IndexTripsPage.archive')}
                    outsideLink={"/trips/history/driver"}
                >
                    {driverTrips.map((trip, index) => (
                        (trip.id && trip.fK_Driver) ?
                        <TripCard
                            key={trip.id}
                            tripId={trip.id}
                            cardIndex={index}
                            driverId={trip.fK_Driver}
                            price={trip.price}
                            hideShadow
                        /> : <></>
                    ))}
                </Card>
                
                <div className="mt-8" />
                
                <Card
                    label={passengersTrips ? passengerLabel : ""}
                    outsideLinkText={t('pages/trips:IndexTripsPage.archive')}
                    outsideLink={"/trips/history/passenger"}
                >
                    {passengersTrips.map((trip, index) => (
                        (trip.id && trip.fK_Driver) ?
                        <TripCard
                            key={trip.id}
                            tripId={trip.id}
                            cardIndex={index}
                            driverId={trip.fK_Driver}
                            price={trip.price}
                        /> : <></>
                    ))}
                </Card>
            </div>
            
            <div className="fixed bottom-20 flex flex-row items-center justify-end w-full z-50 max-w-5xl px-6">
                <IconButton
                    variant="primary"
                    icon={<BiPlus className="icon-md"/>}
                    type="button"
                    className="mr-4"
                    onClick={() => navigate(`/create/${loggedInUserId}`)}
                />
            </div>
            
            <BottomNavigationBar selected="trips"/>
        </>
    );
};