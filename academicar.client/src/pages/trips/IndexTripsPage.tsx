import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {IconButton} from "../../components/Buttons.tsx";
import {useNavigate} from "react-router-dom";
import {LinkCard} from "../../components/Cards.tsx";
import {BiMap, BiPlus, BiRadioCircleMarked, BiSolidStar, BiUserCircle} from "react-icons/bi";
import {Divider} from "../../components/Divider.tsx";
import {useTranslation} from "react-i18next";
import React from "react";

// TODO add list of trips for the current user

interface Stop {
    location: string;
    time: string;
    freeSeats: number;
}

interface RouteProps {
    startPoint: Stop;
    endPoint: Stop;
    stops: Stop[];
}
const Route: React.FC<RouteProps> = ({ startPoint, endPoint, stops }) => {
    const [t] = useTranslation();

    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <span><BiRadioCircleMarked className="icon-md text-primary-600" /></span>
                {stops.map((_, index) => (
                    <React.Fragment key={index}>
                        <span className="h-full border-gray-400 border-r-2 border-dashed"></span>
                        <span><BiMap className="icon text-primary-600" /></span>
                    </React.Fragment>
                ))}
                <span className="h-full border-gray-400 border-r-2 border-dashed"></span>
                <span><BiMap className="icon text-primary-600" /></span>
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
                        {Array.from({ length: 3 - startPoint.freeSeats }).map((_, index) => (
                            <BiUserCircle key={index} className="icon text-gray-400" />
                        ))}
                        {Array.from({ length: startPoint.freeSeats }).map((_, index) => (
                            <BiUserCircle key={index} className="icon text-primary-600" />
                        ))}
                    </span>
                    <span className="text-gray-400 text-xs">{startPoint.freeSeats} {t('common:trip.freeSpots')}</span>
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
                                 {Array.from({ length: 3 - stop.freeSeats }).map((_, index) => (
                                     <BiUserCircle key={index} className="icon text-gray-400" />
                                 ))}

                                {Array.from({ length: stop.freeSeats }).map((_, index) => (
                                    <BiUserCircle key={index} className="icon text-primary-600" />
                                ))}
                            </span>
                            <span className="text-gray-400 text-xs">{stop.freeSeats} {t('common:trip.freeSpots')}</span>
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
    );
};

export const IndexTripsPage = () => {
    const [t] = useTranslation(["common", "pages/trips"]);
    const navigate = useNavigate();
    const pageTitle = t("pages/trips:IndexTripsPage.title");
    SetPageTitle(pageTitle);

    // Example trips data
    const myTrips = [
        {
            startPoint: { location: "Graz Hauptbahnhof", time: "13:00", freeSeats: 2 },
            endPoint: { location: "Wien Flughafen", time: "15:30", freeSeats: 2 },
            stops: [
                { location: "Linz Hauptbahnhof", time: "14:00", freeSeats: 1 },
                { location: "St. Pölten Hauptbahnhof", time: "14:45", freeSeats: 3 }
            ],
            price: "€ 12,80",
            driver: {
                name: "Du (Driver)",
                rating: 4.0,
                avatar: "/../src/assets/react.svg"
            }
        },
        {
            startPoint: { location: "Salzburg Hauptbahnhof", time: "10:00", freeSeats: 1 },
            endPoint: { location: "Innsbruck Hauptbahnhof", time: "12:30", freeSeats: 1 },
            stops: [
                { location: "Wörgl Hauptbahnhof", time: "11:00", freeSeats: 0 },
                { location: "Jenbach Bahnhof", time: "11:45", freeSeats: 2 }
            ],
            price: "€ 15,00",
            driver: {
                name: "Du (Driver)",
                rating: 4.5,
                avatar: "/../src/assets/react.svg"
            }
        }
    ];

    const passengerTrips = [
        {
            startPoint: { location: "Vinzenzgasse 57, Graz", time: "12:30", freeSeats: 2 },
            endPoint: { location: "Klagenfurt, Hbf", time: "14:15", freeSeats: 2 },
            stops: [
                { location: "FH Joanneum Graz", time: "12:34", freeSeats: 2 },
            ],
            price: "€ 10,00",
            driver: {
                name: "Sebastian Kurcz",
                rating: 5.0,
                avatar: "/../src/assets/krucziii.jpg"
            }
        },
        {
            startPoint: { location: "Salzburg Hauptbahnhof", time: "10:00", freeSeats: 1 },
            endPoint: { location: "Innsbruck Hauptbahnhof", time: "12:30", freeSeats: 1 },
            stops: [
                { location: "Wörgl Hauptbahnhof", time: "11:00", freeSeats: 0 },
                { location: "Jenbach Bahnhof", time: "11:45", freeSeats: 2 }
            ],
            price: "€ 13,37",
            driver: {
                name: "Angelina Wolf",
                rating: 2.5,
                avatar: "/../src/assets/women_mock.jpg"
            }
        }
    ];

    return (
        <>
            <TitleBar text={pageTitle}/>
            <div className="w-full flex flex-col items-center pb-24">
                {myTrips.map((trip, index) => (
                    <LinkCard
                        key={index}
                        label={index === 0 ? t('pages/trips:IndexTripsPage.myTrips') : ""}
                        className="mt-6"
                        outsideLinkText={index === 0 ? t('pages/trips:IndexTripsPage.archive') : ""}
                        outsideLink={index === 0 ? "/trips/history/driver" : ""}>
                        <div>
                            <div className="flex justify-between items-center">
                                <div className="flex flex-row gap-4">
                                    <div className="flex justify-center">
                                        <img
                                            src={trip.driver.avatar}
                                            alt="avatar"
                                            className="border-gray-600 rounded-full"
                                        />
                                    </div>
                                    <div>
                                        <div>{trip.driver.name}</div>
                                        <div className="flex items-center">
                                            {Array.from({length: Math.floor(trip.driver.rating)}).map((_, idx) => (
                                                <BiSolidStar key={idx} className="icon text-yellow-400"/>
                                            ))}
                                            {Array.from({length: 5 - Math.floor(trip.driver.rating)}).map((_, idx) => (
                                                <BiSolidStar key={idx} className="icon text-gray-300"/>
                                            ))}
                                            <span className="ml-2">({trip.driver.rating.toFixed(1)})</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="subtitle">{trip.price}</div>
                            </div>

                            <Divider/>

                            <Route startPoint={trip.startPoint} endPoint={trip.endPoint} stops={trip.stops}/>
                        </div>
                    </LinkCard>
                ))}

                {passengerTrips.map((trip, index) => (
                    <LinkCard
                        key={index}
                        label={index === 0 ? t('pages/trips:IndexTripsPage.passenger') : ""}
                        className={`mt-6 ${index === passengerTrips.length - 1 ? "mb-24" : ""}`}
                        outsideLinkText={index === 0 ? t('pages/trips:IndexTripsPage.archive') : ""}
                        outsideLink={index === 0 ? "/trips/history/passenger" : ""}>
                        <div>
                            <div className="flex justify-between items-center">
                                <div className="flex flex-row gap-4">
                                    <div className="flex justify-center">
                                        <img
                                            src={trip.driver.avatar}
                                            alt="avatar"
                                            className="border-gray-600 rounded-full"
                                            style={{width: '55px', height: '55px', objectFit: 'cover'}}
                                        />
                                    </div>

                                    <div>
                                        <div>{trip.driver.name}</div>
                                        <div className="flex items-center">
                                            {Array.from({length: Math.floor(trip.driver.rating)}).map((_, idx) => (
                                                <BiSolidStar key={idx} className="icon text-yellow-400"/>
                                            ))}
                                            {Array.from({length: 5 - Math.floor(trip.driver.rating)}).map((_, idx) => (
                                                <BiSolidStar key={idx} className="icon text-gray-300"/>
                                            ))}
                                            <span className="ml-2">({trip.driver.rating.toFixed(1)})</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="subtitle">{trip.price}</div>
                            </div>

                            <Divider/>

                            <Route startPoint={trip.startPoint} endPoint={trip.endPoint} stops={trip.stops}/>
                        </div>
                    </LinkCard>
                ))}
            </div>

            <div className="fixed bottom-20 flex flex-row items-center justify-end w-full z-50 max-w-5xl px-6">
                <IconButton variant="primary" icon={<BiPlus className="icon-md"/>} type="button" className="mr-4" onClick={() => navigate("/trips/create")}/>
            </div>
            <BottomNavigationBar selected="trips"/>
        </>
    );
};