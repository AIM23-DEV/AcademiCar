import React from "react";
import {BiCalendar, BiChevronRight, BiRightArrowAlt, BiTime} from "react-icons/bi";
import { TextLink} from "../../../components/Buttons.tsx";

// TODO re-layout
export const ActiveTripsCard = () => {
    const trips =[{
            date: "03.01.2024",
            startPoint : {location: "Graz Hauptbahnhof", time: "13:00 Uhr", freeSeats: 2},
            endPoint : {location: "Wien Flughafen", time: "15:30 Uhr", freeSeats: 2}
        }/*, {
            date: "24.05.2024",
            startPoint : {location: "Salzburg Hauptbahnhof", time: "10:00 Uhr", freeSeats: 2},
            endPoint : {location: "Innsbruck Flughafen", time: "12:30 Uhr", freeSeats: 2}
        }*/];
    
    return (
        <div>
            {trips.map((trip, index) => (
                <React.Fragment key={index}>
                        <div className="mb-4 flex items-center">
                            <TextLink
                                className={"body-2"}
                                text={trip.startPoint.location}
                                disabled={true}
                            />
                            <TextLink
                                className={"body-2 place-items-end"}
                                leading={<BiRightArrowAlt/>}
                                text={trip.endPoint.location}
                                disabled={true}
                                trailing={<span><BiChevronRight className={"icon "}/></span>}
                                />
                        </div>
                                    
                        <div className="mb-4 flex items-center ">
                            <TextLink
                                text={trip.date}
                                variant={"outline"}
                                leading={<BiCalendar className="icon"/>}
                                className={"body-2"}
                                textAlign={"right"}
                                disabled={true}
                            />
                            <TextLink
                                text={trip.startPoint.time}
                                variant={"outline"}
                                leading={<BiTime className="icon"/>}
                                className={"body-2"}
                                textAlign={"left"}
                                disabled={true}
                            />
                        </div>
                    
                </React.Fragment>
            ))}
        </div>
    );
};