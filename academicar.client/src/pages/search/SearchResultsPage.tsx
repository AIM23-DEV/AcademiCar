import {useTranslation} from "react-i18next";
import {TitleBar} from "../../components/TitleBar.tsx";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {SearchResultForm} from "./partials/SearchResultForm.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {LinkCard} from "../../components/Cards.tsx";
import {Divider} from "../../components/Divider.tsx";
import { BiRadioCircleMarked, BiMap, BiUserCircle, BiSolidStar } from "react-icons/bi";

export const SearchResultsPage = () => {
    const [t] = useTranslation();
    const pageTitle = t("pages/search:SearchTripsPage.title");
    SetPageTitle(pageTitle);
    
    return(
        <>
            <TitleBar hasBackAction={true} text={pageTitle}/>

            <div className="w-full flex flex-col items-center">
                <SearchResultForm/>
                
                <div className="w-full mt-6 flex flex-col gap-5">
                    <LinkCard>
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
                                    <span><BiRadioCircleMarked className="icon-md text-primary-600" /></span>
                                    <span className="h-full border-gray-400 border-r-2 border-dashed"></span>
                                    <span><BiMap className="icon text-primary-600" /></span>
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
                                        <BiUserCircle className="icon text-primary-600" />
                                        <BiUserCircle className="icon text-primary-600" />
                                        <BiUserCircle className="icon text-primary-600" />
                                        <BiUserCircle className="icon text-primary-600" />
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
