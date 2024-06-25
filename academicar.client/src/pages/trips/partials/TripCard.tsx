import {BiMap, BiRadioCircleMarked, BiSolidStar, BiUserCircle} from "react-icons/bi";
import {Divider} from "../../../components/Divider.tsx";
import {LinkCard} from "../../../components/Cards.tsx";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {CurrentLocale} from "../../../hooks/react_i18next.tsx";

interface TripCardProps {
    cardIndex: number;
    driverId: string | undefined
    tripId: number | undefined
    price: number | undefined
    hideShadow?: boolean
}

interface Stop {
    location: string;
    time: string; // This time string has to be ISO 8601
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
                    <div className="body-2 text-sm text-right">{new Date(startPoint.time).toLocaleDateString(CurrentLocale(),
                        {
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        }
                    )} {t('common:time.time')}</div>
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
                            <div className="body-2 text-sm text-right">{new Date(stop.time).toLocaleDateString(CurrentLocale(),
                                {
                                    day: 'numeric',
                                    month: 'numeric',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }
                            )} {t('common:time.time')}</div>
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
                    <div className="body-2 text-sm text-right">{new Date(endPoint.time).toLocaleDateString(CurrentLocale(),
                        {
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        }
                        )} {t('common:time.time')}</div>
                </div>
            </div>
        </div>
    );
};

export const TripCard: React.FC<TripCardProps> = (props:TripCardProps) => {
    const [driver, setDriver] = useState<IUser>();
    const [startAddress, setStartAddress] = useState<Stop | undefined>();
    const [endAddress, setEndAddress] = useState<Stop  | undefined>();
    const [stops, setStops] = useState<Stop[]  | undefined>([]);
    const defaultStop : Stop = {location : "", time : "", freeSeats : 0};
    
    useEffect(() => {
        if (!props.driverId)
            return;
        
        fetch(`https://localhost:5173/api/trip/tripCard/driver/${props.driverId}`)
            .then(response => response.json())
            .then((fetchedDriver: IUser) => {
                setDriver(fetchedDriver);
            });
    }, [props.driverId]);

    useEffect(() => {
        if (!props.tripId)
            return;
        
        fetch(`https://localhost:5173/api/trip/tripCard/stops/${props.tripId}`)
            .then(response => response.json())
            .then((fetchedStops: Stop[]) => {
                setStops(fetchedStops);
            });
    }, [props.tripId]);

    useEffect(() => {
        if (!props.tripId)
            return;
        
        fetch(`https://localhost:5173/api/trip/tripCard/start/${props.tripId}`)
            .then(response => response.json())
            .then((fetchedStops: Stop) => {
                setStartAddress(fetchedStops);
            });
    }, [props.tripId]);

    useEffect(() => {
        if (!props.tripId)
            return;
        
        fetch(`https://localhost:5173/api/trip/tripCard/end/${props.tripId}`)
            .then(response => response.json())
            .then((fetchedStops: Stop) => {
                setEndAddress(fetchedStops);
            });
    }, [props.tripId]);
    
    return (
        <LinkCard key={props.cardIndex} link={`${props.driverId}/${props.tripId}`} className={props.hideShadow ? "overflow-hidden" : ""} padding="sm" labelPosition="inside">
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-row gap-4">
                        <div className="flex justify-center">
                            <img
                                src={driver?.pictureSrc}
                                alt="avatar"
                                className="border-gray-600 rounded-full w-14 h-14 object-cover"
                            />
                        </div>
                        <div>
                            <div>{driver?.firstName} {driver?.lastName}</div>
                            <div className="flex items-center">
                                {Array.from({length: Math.floor(5)}).map((_, idx) => (
                                    <BiSolidStar key={idx} className="icon text-yellow-400" />
                                ))}
                                {Array.from({length: 5 - Math.floor(5)}).map((_, idx) => (
                                    <BiSolidStar key={idx} className="icon text-gray-300" />
                                ))}
                                <span className="ml-2">({5})</span>
                            </div>
                        </div>
                    </div>
                    <div className="subtitle">€ {props.price?.toFixed(2)}</div>
                </div>

                <Divider/>

                <Route
                    startPoint={startAddress ? startAddress : defaultStop }
                    endPoint={endAddress ? endAddress : defaultStop }
                    stops={stops ? stops : [defaultStop] }
                />
            </div>
        </LinkCard>
    );
};