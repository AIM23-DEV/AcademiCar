import {useParams} from 'react-router-dom';
import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {useTranslation} from 'react-i18next';
import {Card} from "../../components/Cards.tsx";
import {
    BiCar, BiChevronRight, BiEdit, BiErrorAlt, BiGroup,
    BiMap, BiMessageCheck, BiMessageX, BiPalette, BiRadioCircleMarked, BiShare, BiShieldX, BiShoppingBag,
    BiSolidStar,
    BiUserCircle
} from "react-icons/bi";
import {TextButton} from "../../components/Buttons.tsx";
import React from "react";
import {Divider} from "../../components/Divider.tsx";
import {useNavigate} from "react-router-dom";


interface Request {
    time: string;
    user: string;
    score: number;
}

interface RequestProps {
    requests: Request[];
}

interface Passenger {
    user: string;
    score: number;
}

interface PassengerProps {
    passengers: Passenger[];
}

interface Stop {
    location: string;
    time: string;
    freeSeats: number;
}

interface RouteProps {
    startPoint: Stop;
    endPoint: Stop;
    stops: Stop[];
    duration: string;
    distance: number;
    price: number;
}

const Route: React.FC<RouteProps> = ({startPoint, endPoint, stops, duration, distance, price}) => {
    const [t] = useTranslation(["common", "pages/trips"]);
    return (
        <div>
            <div className="flex gap-4">
                <div className="flex flex-col items-center">
                    <span><BiRadioCircleMarked className="icon-md text-primary-600"/></span>
                    {stops.map((_, index) => (
                        <React.Fragment key={index}>
                            <span className="h-full border-gray-400 border-r-2 border-dashed"></span>
                            <span><BiMap className="icon text-primary-600"/></span>
                        </React.Fragment>
                    ))}
                    <span className="h-full border-gray-400 border-r-2 border-dashed"></span>
                    <span><BiMap className="icon text-primary-600"/></span>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <div className="text-gray-400 text-xs">{t('common:trip.start')}</div>
                            <div className="body-1">{startPoint.location}</div>
                        </div>
                        <div className="body-2 text-sm">{startPoint.time} {t('common:time.time')}</div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                    <span className="flex">
                        {Array.from({length: 4 - startPoint.freeSeats}).map((_, index) => (
                            <BiUserCircle key={index} className="icon text-gray-600"/>
                        ))}
                        {Array.from({length: startPoint.freeSeats}).map((_, index) => (
                            <BiUserCircle key={index} className="icon text-primary-600"/>
                        ))}
                    </span>
                        <span
                            className="text-gray-400 text-xs">{startPoint.freeSeats} {t('common:trip.freeSpots')}</span>
                    </div>
                    {stops.map((stop, index) => (
                        <React.Fragment key={index}>
                            <div className="flex flex-row justify-between items-center">
                                <div>
                                    <div className="text-gray-400 text-xs">{t('common:trip.stop')}</div>
                                    <div className="body-1">{stop.location}</div>
                                </div>
                                <div className="body-2 text-sm">{stop.time} {t('common:time.time')}</div>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                            <span className="flex">
                                {Array.from({length: 4 - stop.freeSeats}).map((_, index) => (
                                    <BiUserCircle key={index} className="icon text-gray-600"/>
                                ))}
                                {Array.from({length: stop.freeSeats}).map((_, index) => (
                                    <BiUserCircle key={index} className="icon text-primary-600"/>
                                ))}
                            </span>
                                <span
                                    className="text-gray-400 text-xs">{stop.freeSeats} {t('common:trip.freeSpots')}</span>
                            </div>
                        </React.Fragment>
                    ))}
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <div className="text-gray-400 text-xs">{t('common:trip.destination')}</div>
                            <div className="body-1">{endPoint.location}</div>
                        </div>
                        <div className="body-2 text-sm">{endPoint.time} {t('common:time.time')}</div>
                    </div>
                </div>
            </div>
            <Divider
                className="my-4"
            />
            <div className="grid grid-cols-3 gap-4 text-center divide-x-2 divide-gray-300">
                <div>
                    {duration}
                    <div className="text-gray-400 text-xs">
                        {t('pages/trips:ShowTripPage.duration')}
                    </div>
                </div>
                <div>
                    {distance} {t('pages/trips:ShowTripPage.km')}
                    <div className="text-gray-400 text-xs">
                        {t('pages/trips:ShowTripPage.distance')}
                    </div>
                </div>
                <div>
                    {price} €
                    <div className="text-gray-400 text-xs">
                        {t('pages/trips:ShowTripPage.price')}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Req: React.FC<RequestProps> = ({requests}) => {
    const [t] = useTranslation(["common", "pages/trips"]);
    return (
        <div>
            {requests.map((request, index) => (
                <React.Fragment key={index}>
                    {index != 0 ? (
                        <Divider className="my-4"/>
                    ) : (
                        <></>
                    )}
                    <div className="mb-4">
                        <b>{t('pages/trips:RequestCard.requested')}</b> {request.time} {t('common:time.time')}
                    </div>
                    <a href={"/Users/" + index}>
                        <div className="flex flex-row gap-4">
                            <div className="flex justify-center">
                                <img
                                    src="/../src/assets/react.svg"
                                    alt="avatar"
                                    className="border-gray-600 rounded-full"
                                />
                            </div>
                            <div className="w-full">
                                <div>{request.user}</div>
                                <div className="flex items-center">
                                    {Array.from({length: Math.floor(request.score)}).map((_, idx) => (
                                        <BiSolidStar key={idx} className="icon text-yellow-400"/>
                                    ))}
                                    {Array.from({length: 5 - Math.floor(request.score)}).map((_, idx) => (
                                        <BiSolidStar key={idx} className="icon text-gray-300"/>
                                    ))}
                                    <span className="ml-2">({request.score})</span>
                                </div>
                            </div>
                            
                            
                            <div className="flex items-center">
                                <span><BiChevronRight className="icon"/></span>
                            </div>
                            
                        </div>
                    </a>
                    <div className="grid grid-cols-2 justify-items-center">
                        <div className="mt-4">
                            <a href={"/trips/details/driver"}>
                                <TextButton
                                    variant="accent"
                                    fullWidth
                                    text={t('pages/trips:RequestCard.cancel')}
                                    textAlign="left"
                                    textFullWidth
                                    leading={<BiMessageX className="icon"/>}
                                    type="button"
                                    disabled={false}
                                    className="mt-2"
                                    onClick={() => {
                                        alert("Test");
                                    }}
                                />
                            </a>
                        </div>
                        <div className="mt-4">
                            <a href={"/trips/details/driver"}>
                            <TextButton
                                variant="primary"
                                fullWidth
                                text={t('pages/trips:RequestCard.accept')}
                                textAlign="left"
                                textFullWidth
                                leading={<BiMessageCheck className="icon"/>}
                                type="button"
                                disabled={false}
                                className="mt-2"
                            />
                            </a>
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export const Pas: React.FC<PassengerProps> = ({passengers}) => {
    return (
        <div className="w-full">
            {passengers.map((passenger, index) => (
                <React.Fragment key={index}>
                    {index != 0 ? (
                        <Divider className="my-4"/>
                    ) : (
                        <></>
                    )}
                    <div className="flex justify-center gap-4 items-center">
                        <div className="flex justify-center">
                            <img
                                src="/../src/assets/react.svg"
                                alt="avatar"
                                className="rounded-full w-11 h-11"
                            />
                        </div>
                        <div>
                            <div>{passenger.user}</div>
                            <div className="flex items-center">
                                {Array.from({length: Math.floor(passenger.score)}).map((_, idx) => (
                                    <BiSolidStar key={idx} className="icon text-yellow-400"/>
                                ))}
                                {Array.from({length: 5 - Math.floor(passenger.score)}).map((_, idx) => (
                                    <BiSolidStar key={idx} className="icon text-gray-300"/>
                                ))}
                                <span className="ml-2">({passenger.score})</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-end w-full">
                            <span><BiChevronRight className="icon"/></span>
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};
export const ShowTripPage = () => {
    const [t] = useTranslation(["common", "pages/trips"]);
    const {id} = useParams();
    const pageTitle = t("pages/trips:ShowTripPage.title", {id: id});
    SetPageTitle(pageTitle);
    const navigate = useNavigate();

    const requests = [
        {time: "30.12.2023, 14:13", user: "Fred Windsor", score: 5.0},
        {time: "30.12.2023, 14:13", user: "Fred Windsor", score: 4.0},
        {time: "30.12.2023, 14:13", user: "Fred Windsor", score: 5.0}
    ];
    const passengers = [
        {user: "Fred Windsor", score: 4.0},
        {user: "Hans Windsor", score: 5.0},
        {user: "Klaus Windsor", score: 5.0}
    ]

    const startPoint = {location: "Graz Hauptbahnhof", time: "13:00", freeSeats: 2};
    const endPoint = {location: "Wien Flughafen", time: "15:30", freeSeats: 2};
    const stops = [
        {location: "St. Pölten Hauptbahnhof", time: "14:45", freeSeats: 3}
    ];
    const duration = "2h 30min";
    const distance = 205;
    const price = 12.80;
    const details = {car: "Golf GTI", color: "Schwarz", seats: 5, suitcases: 4};
    const preferences = [("Kein Rauchen"), ("Keine Tiere")];
    
    return (
        <>
            <TitleBar text={pageTitle} hasBackAction/>
            <Card
                id="eine-id"
                label={t("pages/trips:ShowTripPage.drive")}
                labelPosition="outside"
                padding="base"
                className="mt-8"
            >
                <Route startPoint={startPoint} endPoint={endPoint} stops={stops} duration={duration} distance={distance}
                       price={price}/>
            </Card>
            <Card
                id="eine-id"
                label={t("pages/trips:ShowTripPage.requests")}
                labelPosition="outside"
                padding="base"
                className="mt-8"
            >
                <Req requests={requests}/>
            </Card>
            <Card
                id="eine-id"
                label={t("pages/trips:ShowTripPage.passengers")}
                labelPosition="outside"
                padding="base"
                className="mt-8"
            >
                <Pas passengers={passengers}/>
            </Card>
            <Card
                id="eine-id"
                label={t("pages/trips:ShowTripPage.vehicleDetails")}
                labelPosition="outside"
                padding="base"
                className="mt-8"
            >
                <div>
                    <div className="flex flex-row gap-4">
                        <div className="flex justify-center">
                            <img
                                src="/../src/assets/react.svg"
                                alt="avatar"
                                className="border-gray-600 rounded-full"
                            />
                        </div>
                        <div className="w-full grid grid-cols-2">
                            <div>
                                <div className="flex gap-4">
                                    <BiCar className="icon"/>
                                    {details.car}
                                </div>
                                <div className="flex gap-4">
                                    <BiPalette className="icon"/>
                                    {details.color}
                                </div>
                            </div>
                            <div>
                                <div className="flex gap-4">
                                    <BiGroup className="icon"/>
                                    {details.seats} {t("pages/trips:ShowTripPage.label_seats")}
                                </div>
                                <div className="flex gap-4">
                                    <BiShoppingBag className="icon"/>
                                    {details.suitcases} {t("pages/trips:ShowTripPage.extra_suitcase")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            <Card
                id="eine-id"
                label={t("pages/trips:ShowTripPage.preferences")}
                labelPosition="outside"
                padding="base"
                className="mt-8"
            >
                <div className="flex flex-row gap-4">
                    <BiErrorAlt className="icon text-red-600"/>
                    <div>{preferences[0]}</div>
                </div>
                <div className="flex flex-row gap-4">
                    <BiErrorAlt className="icon text-red-600"/>
                    <div>{preferences[1]}</div>
                </div>
                <p></p>
                <p></p>
            </Card>

            <Card
                id="eine-id"
                label={t("pages/trips:ShowTripPage.actions")}
                labelPosition="outside"
                padding="base"
                className="mt-8 mb-24"
            >
                <div>
                </div>
                <TextButton
                    variant="secondary"
                    fullWidth
                    text={t("pages/trips:ShowTripPage.editDrive")}
                    textAlign="left"
                    textFullWidth
                    leading={<BiEdit className="icon"/>}
                    type="button"
                    disabled={false}
                    onClick={() => navigate("/create/createUpdateRoute")}
                />
                <TextButton
                    variant="secondary"
                    fullWidth
                    text={t("pages/trips:ShowTripPage.shareDrive")}
                    textAlign="left"
                    textFullWidth
                    leading={<BiShare className="icon"/>}
                    type="button"
                    disabled={false}
                    className="mt-2"
                    onClick={() => navigate("404")}
                />
                <TextButton
                    variant="accent"
                    fullWidth
                    text={t("pages/trips:ShowTripPage.cancelDrive")}
                    textAlign="left"
                    textFullWidth
                    leading={<BiShieldX className="icon"/>}
                    type="button"
                    disabled={false}
                    className="mt-2"
                    onClick={() => navigate("trips/tripsMainRoute")}

                />
            </Card>
            <BottomNavigationBar selected="trips"/>
        </>
    );
};