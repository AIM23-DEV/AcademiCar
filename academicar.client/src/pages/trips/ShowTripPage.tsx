import {useParams} from 'react-router-dom';
import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {useTranslation} from 'react-i18next';
import {Card} from "../../components/Cards.tsx";
import {
    BiChevronRight,
    BiJoystick,
    BiMap,
    BiRadioCircleMarked,
    BiSolidStar,
    BiUserCircle
} from "react-icons/bi";
import {TextButton} from "../../components/Buttons.tsx";
import React from "react";
import {Divider} from "../../components/Divider.tsx";

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
                            <div className="text-gray-400 text-xs">Startpunkt</div>
                            <div className="body-1">{startPoint.location}</div>
                        </div>
                        <div className="body-2 text-sm">{startPoint.time}</div>
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
                        <span className="text-gray-400 text-xs">{startPoint.freeSeats} freie Plätze</span>
                    </div>
                    {stops.map((stop, index) => (
                        <React.Fragment key={index}>
                            <div className="flex flex-row justify-between items-center">
                                <div>
                                    <div className="text-gray-400 text-xs">Zwischenstopp</div>
                                    <div className="body-1">{stop.location}</div>
                                </div>
                                <div className="body-2 text-sm">{stop.time}</div>
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
                                <span className="text-gray-400 text-xs">{stop.freeSeats} freie Plätze</span>
                            </div>
                        </React.Fragment>
                    ))}
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <div className="text-gray-400 text-xs">Ziel</div>
                            <div className="body-1">{endPoint.location}</div>
                        </div>
                        <div className="body-2 text-sm">{endPoint.time}</div>
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
                        Dauer
                    </div>
                </div>
                <div>
                    {distance} km
                    <div className="text-gray-400 text-xs">
                        Distanz
                    </div>
                </div>
                <div>
                    {price} €
                    <div className="text-gray-400 text-xs">
                        Kosten
                    </div>
                </div>
            </div>
        </div>
    );
};

const Req: React.FC<RequestProps> = ({requests}) => {
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
                        <b>Angefragt:</b> 30.12.2023, 14:13 Uhr
                    </div>

                    <div>
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
                                <div className="flex items-center right-full">
                                    <span><BiSolidStar className="icon text-yellow-400"/></span>
                                    <span><BiSolidStar className="icon text-yellow-400"/></span>
                                    <span><BiSolidStar className="icon text-yellow-400"/></span>
                                    <span><BiSolidStar className="icon text-yellow-400"/></span>
                                    <span><BiSolidStar className="icon text-gray-300"/></span>
                                    <span className="ml-2">(4,0)</span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span><BiChevronRight className="icon"/></span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 justify-items-center">
                        <div className="mt-4">
                            <TextButton
                                variant="accent"
                                fullWidth
                                text="Ablehnen"
                                textAlign="left"
                                textFullWidth
                                leading={<BiJoystick className="icon"/>}
                                type="button"
                                disabled
                                className="mt-2"
                                onClick={() => {
                                    alert("Test");
                                }}
                            />
                        </div>
                        <div className="mt-4">
                            <TextButton
                                variant="primary"
                                fullWidth
                                text="Annehmen"
                                textAlign="left"
                                textFullWidth
                                leading={<BiJoystick className="icon"/>}
                                type="button"
                                disabled
                                className="mt-2"
                                onClick={() => {
                                    alert("Test");
                                }}
                            />
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

const Pas: React.FC<PassengerProps> = ({passengers}) => {
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

    const requests = [
        {time: "30.12.2023, 14:13", user: "Fred Windsor", score: 5.0},
        {time: "30.12.2023, 14:13", user: "Fred Windsor", score: 5.0},
        {time: "30.12.2023, 14:13", user: "Fred Windsor", score: 5.0}
    ];
    const passengers = [
        {user: "Fred Windsor", score: 4.0},
        {user: "Hans Windsor", score: 5.0},
        {user: "Klaus Windsor", score: 5.0}
    ]

    const startPoint = {location: "Graz Hauptbahnhof", time: "13:00 Uhr", freeSeats: 2};
    const endPoint = {location: "Wien Flughafen", time: "15:30 Uhr", freeSeats: 2};
    const stops = [
        {location: "St. Pölten Hauptbahnhof", time: "14:45 Uhr", freeSeats: 3}
    ];
    const duration = "2h 30min";
    const distance = 205;
    const price = 12.80;

    return (
        <>
            <TitleBar text={pageTitle} hasBackAction/>
            <Card
                id="eine-id"
                label="Fahrt"
                labelPosition="outside"
                outsideLink="/trips/create"
                outsideLinkText="Route anzeigen"
                padding="base"
                className="mt-8"
            >
                <Route startPoint={startPoint} endPoint={endPoint} stops={stops} duration={duration} distance={distance}
                       price={price}/>
            </Card>
            <Card
                id="eine-id"
                label="Anfragen"
                labelPosition="outside"
                padding="base"
                className="mt-8"
            >
                <Req requests={requests}/>
            </Card>
            <Card
                id="eine-id"
                label="Mitfahrende"
                labelPosition="outside"
                padding="base"
                className="mt-8"
            >
                <Pas passengers={passengers}/>
            </Card>
            <Card
                id="eine-id"
                label="Fahrzeug Details"
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
                                    <BiJoystick className="icon"/>
                                    Golf GTI
                                </div>
                                <div className="flex gap-4">
                                    <BiJoystick className="icon"/>
                                    Schwarz
                                </div>
                            </div>
                            <div>
                                <div className="flex gap-4">
                                    <BiJoystick className="icon"/>
                                    5 Sitze
                                </div>
                                <div className="flex gap-4">
                                    <BiJoystick className="icon"/>
                                    4 Gepäckstücke
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            <Card
                id="eine-id"
                label="Präferenzen"
                labelPosition="outside"
                padding="base"
                className="mt-8"
            >
                <div className="flex flex-row gap-4">
                    <BiJoystick className="icon"/>
                    <div>Kein Rauchen</div>
                </div>
                <div className="flex flex-row gap-4">
                    <BiJoystick className="icon"/>
                    <div>Keine Tiere</div>
                </div>
                <p></p>
                <p></p>
            </Card>

            <Card
                id="eine-id"
                label="Aktionen"
                labelPosition="outside"
                padding="base"
                className="mt-8 mb-24"
            >
                <div>
                </div>
                <TextButton
                    variant="secondary"
                    fullWidth
                    text="Fahrt bearbeiten"
                    textAlign="left"
                    textFullWidth
                    leading={<BiJoystick className="icon"/>}
                    type="button"
                    disabled
                    onClick={() => {
                        alert("Test");
                    }}
                />
                <TextButton
                    variant="secondary"
                    fullWidth
                    text="Fahrt teilen"
                    textAlign="left"
                    textFullWidth
                    leading={<BiJoystick className="icon"/>}
                    type="button"
                    disabled
                    className="mt-2"
                    onClick={() => {
                        alert("Test");
                    }}
                />
                <TextButton
                    variant="accent"
                    fullWidth
                    text="Fahrt absagen"
                    textAlign="left"
                    textFullWidth
                    leading={<BiJoystick className="icon"/>}
                    type="button"
                    disabled
                    className="mt-2"
                    onClick={() => {
                        alert("Test");
                    }}
                />
            </Card>
            <BottomNavigationBar selected="trips"/>
        </>
    );
};