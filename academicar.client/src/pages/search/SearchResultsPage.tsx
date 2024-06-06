import {useTranslation} from "react-i18next";
import {TitleBar} from "../../components/TitleBar.tsx";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {SearchResultForm} from "./partials/SearchResultForm.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {LinkCard} from "../../components/Cards.tsx";
import {Divider} from "../../components/Divider.tsx";
import { BiRadioCircleMarked, BiMap, BiUserCircle, BiSolidStar } from "react-icons/bi";
import {Button} from "../../components/Buttons.tsx";

const DATA = [
    {
        startPoint: { location: "Graz Hauptbahnhof", time: "13:00", freeSeats: 2 },
        endPoint: { location: "Wien Flughafen", time: "15:30", freeSeats: 2 },
        price: "12,80",
        driver: {
            name: "John Doe",
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
        price: "15,00",
        driver: {
            name: "Jane Smith",
            rating: 4.5,
            avatar: "/../src/assets/react.svg"
        }
    }
]

export const SearchResultsPage = () => {
    const [t] = useTranslation();
    const pageTitle = t("pages/search:SearchTripsPage.title");
    SetPageTitle(pageTitle);
    
    return(
        <>
            <TitleBar hasBackAction={true} text={pageTitle}/>

            <div className="w-full flex flex-col items-center pb-24">
                <SearchResultForm/>
                
                <div className="w-full mt-6 flex flex-col gap-5">
                    {DATA.map((item, index) =>
                        <LinkCard>
                            {index != 0 ? (
                                <Divider/>
                            ) : (
                                <></>
                            )}
                            <div>
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-row gap-4">
                                        <div className="flex justify-center">
                                            <img
                                                src="/../src/assets/react.svg"
                                                alt="avatar"
                                                className="border-gray-600 rounded-full"
                                            />
                                        </div>
                                        <div>
                                            <div>{item.driver.name}</div>
                                            <div className="flex items-center">
                                                {Array.from({ length: Math.floor(item.driver.rating) }).map((_, idx) => (
                                                    <BiSolidStar key={idx} className="icon text-yellow-400" />
                                                ))}
                                                {Array.from({ length: 5 - Math.floor(item.driver.rating) }).map((_, idx) => (
                                                    <BiSolidStar key={idx} className="icon text-gray-300" />
                                                ))}
                                                <span className="ml-2">({item.driver.rating})</span>
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
                                        {item.stops ? (
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
                                        )}
                                        <span><BiMap className="icon text-primary-600"/></span>
                                    </div>
                                    <div className="w-full flex flex-col gap-4">
                                        {/*Startpoint*/}
                                        <div className="flex flex-row justify-between items-center">
                                            <div>
                                                <div className="text-gray-400 text-xs">{t("pages/search:SearchResultsPage.start")}</div>
                                                <div className="body-1">{item.startPoint.location}</div>
                                            </div>
                                            <div className="body-2 text-sm">{item.startPoint.time} Uhr</div>
                                        </div>
                                        <div className="flex flex-row items-center gap-2">
                                            <span className="flex">
                                                {Array.from({ length: 4 - item.startPoint.freeSeats }).map((_, index) => (
                                                    <BiUserCircle key={index} className="icon text-gray-400" />
                                                ))}
                                                
                                                {Array.from({ length: item.startPoint.freeSeats }).map((_, index) => (
                                                    <BiUserCircle key={index} className="icon text-primary-600" />
                                                ))}
                                            </span>
                                            <span className="text-gray-400 text-xs">{item.startPoint.freeSeats} {t('pages/search:SearchResultsPage.freeSpots')}</span>
                                        </div>
                                        
                                        {/*Intermediate Stops*/}
                                        {item.stops ? (
                                            <>
                                                {item.stops.map((stop) =>
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
                                        )}

                                        {/*Endpoint*/}
                                        <div className="flex flex-row justify-between items-center">
                                            <div>
                                                <div
                                                    className="text-gray-400 text-xs">{t('pages/search:SearchResultsPage.end')}</div>
                                                <div className="body-1">{item.endPoint.location}</div>
                                            </div>
                                            <div className="body-2 text-sm">{item.endPoint.time} Uhr</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </LinkCard>
                    )}

                    <LinkCard>
                        <div>
                            <div className="flex justify-between items-center">
                                <div className="flex flex-row gap-4">
                                    <div className="flex justify-center">
                                        <img
                                            src="/../src/assets/react.svg"
                                            alt="avatar"
                                            className="rounded-full w-24"
                                        />
                                    </div>
                                    
                                    <div>
                                        <div>John Doe</div>
                                        <div className="flex items-center">
                                            <span><BiSolidStar className="icon text-yellow-400"/></span>
                                            <span><BiSolidStar className="icon text-yellow-400"/></span>
                                            <span><BiSolidStar className="icon text-yellow-400"/></span>
                                            <span><BiSolidStar className="icon text-yellow-400"/></span>
                                            <span><BiSolidStar className="icon text-gray-300"/></span>
                                            <span className="ml-2">(4,0)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="subtitle">€ 12,80</div>
                            </div>

                            <Divider/>

                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <span><BiRadioCircleMarked className="icon-md text-primary-600"/></span>
                                    <span className="h-full border-gray-400 border-r-2 border-dashed"></span>
                                    <span><BiMap className="icon text-primary-600"/></span>
                                </div>
                                <div className="w-full flex flex-col gap-4">
                                    <div className="flex flex-row justify-between items-center">
                                        <div>
                                            <div className="text-gray-400 text-xs">Startpunkt</div>
                                            <div className="body-1">Graz Hauptbahnhof</div>
                                        </div>
                                        <div className="body-2 text-sm">13:00 Uhr</div>
                                    </div>
                                    <div className="flex flex-row items-center gap-2">
                                    <span className="flex">
                                        <BiUserCircle className="icon text-primary-600"/>
                                        <BiUserCircle className="icon text-primary-600"/>
                                        <BiUserCircle className="icon text-primary-600"/>
                                        <BiUserCircle className="icon text-primary-600"/>
                                    </span>
                                        <span className="text-gray-400 text-xs">freie Plätze</span>
                                    </div>
                                    <div className="flex flex-row justify-between items-center">
                                        <div>
                                            <div className="text-gray-400 text-xs">Ziel</div>
                                            <div className="body-1">Wien Flughafen</div>
                                        </div>
                                        <div className="body-2 text-sm">15:30 Uhr</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </LinkCard>
                    
                </div>
            </div>

            <BottomNavigationBar selected="search"/>
        </>
    );
}
