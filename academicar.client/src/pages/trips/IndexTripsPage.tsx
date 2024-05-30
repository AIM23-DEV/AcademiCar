import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {useTranslation} from "react-i18next";
import {IconButton} from "../../components/Buttons.tsx";
import {useNavigate} from "react-router-dom";
import {GoPlus} from "react-icons/go";
import {LinkCard} from "../../components/Cards.tsx";
import {BiMap, BiRadioCircleMarked, BiSolidStar, BiUserCircle} from "react-icons/bi";
import {Divider} from "../../components/Divider.tsx";

// TODO add list of trips for the current user
export const IndexTripsPage = () => {
    const [t] = useTranslation(["common", "pages/trips"]);
    const navigate = useNavigate();
    const pageTitle = t("pages/trips:IndexTripsPage.title");
    SetPageTitle(pageTitle);

    return (
        <>
            <TitleBar text={pageTitle}/>

            <div className="w-full flex flex-col items-center">
                <LinkCard 
                    label="Meine Fahrten" 
                    className="mt-6"
                    outsideLinkText="Archiv"
                    outsideLink="/trips/history/driver">
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
                <LinkCard
                    label="Passagier"
                    className="mt-6 mb-24"
                    outsideLinkText="Archiv"
                    outsideLink="/trips/history/passenger">
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
                <IconButton
                    variant="primary"
                    icon={<GoPlus className="icon"/>}
                    type="button"
                    className="fixed bottom-20 right-4"
                    onClick={() => navigate("/trips/create")}>
                </IconButton>
            </div>

            
            
            
        

    <BottomNavigationBar selected="trips"/>
</>
    );
};
