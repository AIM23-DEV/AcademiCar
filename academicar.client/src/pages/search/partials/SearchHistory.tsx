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

// TODO re-layout
export const SearchHistory = () => {
    const [t] = useTranslation();
    //const pastTrips: Trip[] = GetTripHistory();

    return (
        <Card
            label={t("pages/search:SearchTripsPage.latest")}
            className="mt-8"
        >
            <div key="search-history-card-container" className="w-full grid grid-cols-1 gap-5">
                {DATA.map((entry, index) =>
                    <div key={`search-history-card-${index}`}>
                        <a href="" key={`a-center-flex-${index}`} className="flex justify-between items-center">
                            <div key={`gap2-${index}`} className="flex flex-col gap-2">
                                <div key={`center-items-${index}`} className="flex items-center gap-2">
                                    {entry.startPoint} <BiRightArrowAlt key={`RightArrow-${index}`} className="icon-md"/> {entry.endPoint}
                                </div>
                                <div key={`date-container-${index}`} className="flex items-center gap-5 text-gray-500">
                                    <span key={`date-${index}`} className="flex items-center gap-1">
                                        <BiCalendar className="icon-md"/>{entry.date}
                                    </span>
                                    <span key={`time-${index}`} className="flex items-center gap-1">
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
                    </div>
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
