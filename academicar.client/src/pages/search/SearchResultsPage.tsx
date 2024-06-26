import {useTranslation} from "react-i18next";
import {TitleBar} from "../../components/TitleBar.tsx";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {SearchResultForm} from "./partials/SearchResultForm.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {LinkCard} from "../../components/Cards.tsx";
import {Divider} from "../../components/Divider.tsx";
import { BiRadioCircleMarked, BiMap, BiUserCircle, BiSolidStar } from "react-icons/bi";
import { useLocation } from 'react-router-dom';
import {useEffect, useState} from "react";

interface ExtendedTrip {
    tripId: number
    startPoint: IAddress,
    startTime: Date,
    endPoint: IAddress,
    endTime: Date,
    duration: number,
    driver: IUser,
    seatsAvailable: number,
    price: number,
    additionalStop: Array<ExtendedTrip>,
    rating: number,
    ratingCount: number,
}

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

export const SearchResultsPage = () => {
    const [t] = useTranslation();
    const pageTitle = t("pages/search:SearchTripsPage.title");
    SetPageTitle(pageTitle);

    const query = useQuery();
    const startPoint = query.get('start') || '';
    const destination = query.get('end') || '';
    const date = query.get('date') || '';
    const time = query.get('time') || '';

    const [radioValue, setRadioValue] = useState("");

    const [trips, setTrips] = useState<ITrip[]>([]);
    const [extendedTrips, setExtendedTrips] = useState<ExtendedTrip[]>([]);
    const [error, setError] = useState<string | null>();

    useEffect(() => {
        fetch(`/api/trip/trips/extended`)
            .then(response => response.json())
            .then((data) => {
                setTrips(data)
                setExtendedTrips(data)
            })
            .catch(error => {
                setError("There was an error fetching the Trip details!");
                console.error(error);
            });
    }, []);

    if (error) return <div>{error}</div>;
    if (!trips) return <div>Loading trip...</div>;

    const formatDate = (datetimeString: Date) => {
        const dateObject = new Date(datetimeString);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(dateObject.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    };

    const formatTime = (datetimeString: Date) => {
        const dateObject = new Date(datetimeString);
        const hours = String(dateObject.getHours()).padStart(2, '0');
        const minutes = String(dateObject.getMinutes()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;

        return formattedTime;
    };
    
    const sortTrips = () => {
        if (radioValue == "price") {
            extendedTrips.sort((a, b) => a.price - b.price)
        }
        else if(radioValue == "fastest") {
            extendedTrips.sort((a, b) => a.duration - b.duration)
        }
        else if (radioValue == "best") {
            // TODO: Testing
            extendedTrips.sort((a, b) => {
                let avgRatingA;
                let avgRatingB;
                
                if (a.ratingCount == 0 && b.ratingCount == 0) {
                    avgRatingA = 0;
                    avgRatingB = 0;
                }
                else if (a.ratingCount == 0) {
                    avgRatingA = 0;
                    avgRatingB = b.rating / b.ratingCount;
                }
                else if (b.ratingCount == 0) {
                    avgRatingA = a.rating / a.ratingCount;
                    avgRatingB = 0;
                }
                else {
                    avgRatingA = a.rating / a.ratingCount;
                    avgRatingB = b.rating / b.ratingCount;
                }
                
                return avgRatingB - avgRatingA;
            })
        }
        /*else if (radioValue == "stops") {
            console.log("sort by stops")
        }*/
    }
    
    sortTrips();
    
    return(
        <>
            <TitleBar hasBackAction={true} text={pageTitle}/>

            <div className="w-full flex flex-col items-center pb-24">
                <SearchResultForm radioValue={radioValue} setRadioValue={setRadioValue} startPoint={startPoint} destination={destination} date={date} time={time}/>
                
                <div className="w-full mt-6 flex flex-col gap-5">
                    {extendedTrips.map((item) =>
                        <>
                            {(!startPoint && !destination && !time && !date) ||
                            item.startPoint.street.toLowerCase().includes(startPoint.toLowerCase()) ||
                            item.startPoint.place.toLowerCase().includes(startPoint.toLowerCase()) ||
                            formatTime(item.startTime) === time ||
                            formatDate(item.startTime) === date ||
                            item.endPoint.street.toLowerCase().includes(destination.toLowerCase()) ||
                            item.endPoint.place.toLowerCase().includes(destination.toLowerCase()) ||
                            formatTime(item.endTime) === time ||
                            formatDate(item.endTime) === date ? (
                                <LinkCard
                                    link={"/trips/" + item.driver.id + "/" + item.tripId}
                                >
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-row gap-4">
                                                <div className="flex justify-center">
                                                    <img
                                                        src={item.driver.pictureSrc}
                                                        alt="avatar"
                                                        className="border-gray-600 rounded-full h-14 w-14 object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <div>{item.driver.firstName} {item.driver.lastName}</div>
                                                    <div className="flex items-center">
                                                        {(item.ratingCount == 0) ? (
                                                            <></>
                                                        ) : (
                                                            <>
                                                                {Array.from({ length: Math.floor(item.rating/item.ratingCount) }).map((_, idx) => (
                                                                    <BiSolidStar key={idx} className="icon text-yellow-400" />
                                                                ))}
                                                                {Array.from({ length: 5 - Math.floor(item.rating/item.ratingCount) }).map((_, idx) => (
                                                                    <BiSolidStar key={idx} className="icon text-gray-300" />
                                                                ))}
                                                                <span className="ml-2">({item.rating/item.ratingCount})</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="subtitle">€ {item.price}</div>
                                        </div>

                                        <Divider/>

                                        <div className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <span><BiRadioCircleMarked className="icon-md text-primary-600"/></span>
                                                <span className="h-full border-gray-400 border-r-2 border-dashed"></span>
                                                {/*{item.stops ? (
                                                    <>
                                                        {item.stops.map(() =>
                                                            <>
                                                                <span><BiMap className="icon text-primary-600"/></span>
                                                                <span className="h-full border-gray-400 border-r-2 border-dashed"></span>
                                                            </>
                                                        )}
                                                    </>
                                                ) : (
                                                    <></>
                                                )}*/}
                                                <span><BiMap className="icon text-primary-600"/></span>
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {/*Startpoint*/}
                                                <div className="flex flex-row justify-between items-center">
                                                    <div>
                                                        <div className="text-gray-400 text-xs">{t("pages/search:SearchResultsPage.start")}</div>
                                                        <div className="body-1">{item.startPoint.street} {item.startPoint.number}</div>
                                                    </div>
                                                    <div className="body-2 text-sm">{formatTime(item.startTime)} Uhr</div>
                                                </div>
                                                <div className="flex flex-row items-center gap-2">
                                            <span className="flex">
                                                {Array.from({ length: 4 - item.seatsAvailable }).map((_, index) => (
                                                    <BiUserCircle key={index} className="icon text-gray-400" />
                                                ))}

                                                {Array.from({ length: item.seatsAvailable }).map((_, index) => (
                                                    <BiUserCircle key={index} className="icon text-primary-600" />
                                                ))}
                                            </span>
                                                    <span className="text-gray-400 text-xs">{item.seatsAvailable} {t('pages/search:SearchResultsPage.freeSpots')}</span>
                                                </div>

                                                {/*Intermediate Stops*/}
                                                {/*{!item.additionalStop ? (
                                                    <>
                                                        {item.additionalStop.map((stop) =>
                                                            <>
                                                                <div className="flex flex-row justify-between items-center">
                                                                    <div>
                                                                        <div
                                                                            className="text-gray-400 text-xs">{t("pages/search:SearchFilterPage.stops")}</div>
                                                                        <div className="body-1">{stop.location}</div>
                                                                    </div>
                                                                    <div className="body-2 text-sm">{stop.time} Uhr
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-row items-center gap-2">
                                                            <span className="flex">
                                                                {Array.from({length: 4 - stop.freeSeats}).map((_, index) => (
                                                                    <BiUserCircle key={index} className="icon text-gray-400"/>
                                                                ))}

                                                                {Array.from({length: stop.freeSeats}).map((_, index) => (
                                                                    <BiUserCircle key={index} className="icon text-primary-600"/>
                                                                ))}
                                                            </span>
                                                                    <span
                                                                        className="text-gray-400 text-xs">{t('pages/search:SearchResultsPage.freeSpots')}</span>
                                                                </div>
                                                            </>
                                                        )}
                                                    </>
                                                ) : (
                                                    <></>
                                                )}*/}

                                                {/*Endpoint*/}
                                                <div className="flex flex-row justify-between items-center">
                                                    <div>
                                                        <div
                                                            className="text-gray-400 text-xs">{t('pages/search:SearchResultsPage.end')}</div>
                                                        <div className="body-1">{item.endPoint.street} {item.endPoint.number}</div>
                                                    </div>
                                                    <div className="body-2 text-sm">{formatTime(item.endTime)} Uhr</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </LinkCard>
                            ) : null }
                        </>
                    )}
                </div>
            </div>

            <BottomNavigationBar selected="search"/>
        </>
    );
}
