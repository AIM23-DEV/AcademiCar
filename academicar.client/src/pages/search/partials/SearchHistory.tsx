import {useTranslation} from "react-i18next";
//import { Link } from 'react-router-dom';
import {Card} from "../../../components/Cards.tsx";
import {Divider} from "../../../components/Divider.tsx";
import { BiChevronRight, BiRightArrowAlt, BiCalendar, BiTimeFive } from "react-icons/bi";

const DATA = [
    {
        startPoint: "Graz Puntigam",
        endPoint: "Linz",
        date: "23.02.2024",
        time: "15:00"
    },
    {
        startPoint: "Linz Hauptbahnhof",
        endPoint: "Graz",
        date: "20.02.2024",
        time: "10:00"
    }
]
interface Trip {
    // TODO implement Trip type globally...
}

function GetTripHistory(): Trip[] {
    // TODO implement history loading...

    return [];
}

// TODO re-layout
export const SearchHistory = () => {
    const [t] = useTranslation();
    //const pastTrips: Trip[] = GetTripHistory();

    return (
        <Card
            label={t("pages/search:SearchTripsPage.latest")}
            className="mt-8"
        >
            <div className="w-full grid grid-cols-1 gap-5">
                {DATA.map((entry, index) =>
                    <>
                        <a href="" className="flex justify-between items-center">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    {entry.startPoint} <BiRightArrowAlt
                                    className="icon-md"/> {entry.endPoint}
                                </div>
                                <div className="flex items-center gap-5 text-gray-500">
                        <span className="flex items-center gap-1">
                            <BiCalendar className="icon-md"/>{entry.date}
                        </span>
                                    <span className="flex items-center gap-1">
                            <BiTimeFive className="icon-md"/>{entry.time} {t("common:time.time")}
                        </span>
                                </div>
                            </div>

                            <div>
                                <BiChevronRight className="icon"/>
                            </div>
                        </a>

                        {index != DATA.length - 1 ? (
                            <Divider/>
                        ) : null}
                    </>
                )}
            </div>

            {/*<ul>
                {pastTrips.map((trip, index) => (
                    <li key={index}>
                        <Link to={`/detail/trip/${index}`}>{trip.toString()}</Link> //.toString added only for now
                    </li>
                ))}
            </ul>*/}
        </Card>
    );
};
