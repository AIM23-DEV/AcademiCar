import {TitleBar} from "../../components/TitleBar";
import {BottomNavigationBar} from "../../components/BottomNavigationBar";
import {TextLink} from "../../components/Buttons";
//import {useNavigate} from "react-router-dom";

import {useTranslation} from "react-i18next";

import {
    BiBlock,
    BiBook,
    BiBuildingHouse,
    BiCar,
    BiCheckCircle,
    BiIdCard,
    BiMessageRoundedDots,
    BiMusic,
    BiParty,
    BiSolidStar,
    BiUserCircle,
    BiWorld
} from "react-icons/bi";

import {Divider} from "../../components/Divider";
import {Card} from "../../components/Cards.tsx";
import {ActiveTripsCard} from "./partials/ActiveTripsCard.tsx";

// TODO add content components and follow up pages
export const DriverDetailsPage = () => {
    const [t] = useTranslation(['common', 'pages/trips']);
   //const navigate = useNavigate();

    const driver = {
        name: "Joe Driver",
            score: 4.5,
            ratings: 10,
            avatar: "/../src/assets/react.svg"
    };
    
    return (
        <>
            <TitleBar hasBackAction/>

            <div className="mt-8">
                    <img
                        src={driver.avatar}
                        alt="avatar"
                        className="rounded-full w-32 h-32"
                    />
                </div>
                <h1 className="headline-2">{driver.name}</h1>

                <div className="flex items-center">
                    {Array.from({length: Math.floor(driver.score)}).map((_, idx) => (
                        <BiSolidStar key={idx} className="icon text-yellow-400"/>
                    ))}
                    {Array.from({length: 5 - Math.floor(driver.score)}).map((_, idx) => (
                        <BiSolidStar key={idx} className="icon text-gray-300"/>
                    ))}
                </div>
                
                <span className="ml-2"> {driver.ratings} {t("pages/trips:DriverDetailsPage.ratings")} ({driver.score.toFixed(1)})</span>
                      
                <Divider className="mt-8"/>


                <Card className={"mt-6"} label={t("pages/trips:DriverDetailsPage.studies")} labelPosition={"outside"}>
                    <TextLink
                        text={"Wirtschaftsinformatik"}
                        variant={"outline"} 
                        leading={<BiBook className="icon-md"/>} 
                        className={"body-2"} 
                        textAlign={"right"} 
                        disabled={true}
                    />
                    <TextLink
                        text={"FH Joanneum Graz"}
                        variant={"outline"}
                        leading={<BiBuildingHouse className="icon-md"/>}
                        className={"body-2"}
                        textAlign={"right"}
                        disabled={true}
                    />
                </Card>

                <Card className={"mt-6"} label={t("pages/trips:DriverDetailsPage.interests")} labelPosition={"outside"}>
                    <TextLink
                        text={"Singen, Kochen, Reisen, Technik"}
                        variant={"outline"}
                        leading={<BiParty className="icon-md"/>}
                        className={"body-2"}
                        textAlign={"right"}
                        disabled={true}
                    />
                </Card>

                <Card className={"mt-6"} label={t("pages/trips:DriverDetailsPage.music")} labelPosition={"outside"}>
                    <TextLink
                        text={"Pop, Rock, Podcasts "}
                        variant={"outline"}
                        leading={<BiMusic className="icon-md"/>}
                        className={"body-2"}
                        textAlign={"right"}
                        disabled={true}
                    />
                </Card>

                <Card className={"mt-8"} label={t("pages/trips:DriverDetailsPage.preferences")} labelPosition={"outside"}>
                    <TextLink
                        text={"Kein Rauchen"}
                        variant={"outline"}
                        leading={<BiBlock className="icon-md"/>}
                        className={"body-2"}
                        textAlign={"right"}
                        disabled={true}
                    />
                    <TextLink
                        text={"Keine Tiere"}
                        variant={"outline"}
                        leading={<BiBlock className="icon-md"/>}
                        className={"body-2"}
                        textAlign={"right"}
                        disabled={true}
                    />
                    <TextLink
                        text={"Gesprächig"}
                        variant={"outline"}
                        leading={<BiMessageRoundedDots className="icon-md"/>}
                        className={"body-2"}
                        textAlign={"right"}
                        disabled={true}
                    />
                </Card>


                <Card className={"mt-6"} label={t("pages/trips:DriverDetailsPage.background")} labelPosition={"outside"}>
                    <TextLink
                        text={"Österreich"}
                        variant={"outline"}
                        leading={<BiWorld className="icon-md"/>}
                        className={"body-2"}
                        textAlign={"right"}
                        disabled={true}
                    />
                    <TextLink
                        text={"Deutsch, Englisch, Französisch"}
                        variant={"outline"}
                        leading={<BiMessageRoundedDots className="icon-md"/>}
                        className={"body-2"}
                        textAlign={"right"}
                        disabled={true}
                    />
                </Card>

                <Card className={"mt-6"} label={t("pages/trips:DriverDetailsPage.vehicles")} labelPosition={"outside"}>
                  
                </Card>

                <Card className={"mt-6"} label={t("pages/trips:DriverDetailsPage.activeTrips")} labelPosition={"outside"}>
                   <ActiveTripsCard/>
                    
                </Card>


                <Card className={"mt-6"} label={t("pages/trips:DriverDetailsPage.memberStatus")} labelPosition={"outside"}>
                    <TextLink
                        text={"Verifiziertes Mitglied"}
                        variant={"outline"}
                        leading={<BiCheckCircle className="icon-md"/>}
                        className={"body-2"}
                        textAlign={"right"}
                        disabled={true}
                    />
                    <TextLink
                        text={"Mitglied seit 2021"}
                        variant={"outline"}
                        leading={<BiUserCircle className="icon-md"/>}
                        className={"body-2"}
                        textAlign={"right"}
                        disabled={true}
                    />
                    <TextLink
                        text={"Führerschein seit 2018"}
                        variant={"outline"}
                        leading={<BiIdCard className="icon-md"/>}
                        className={"body-2"}
                        textAlign={"right"}
                        disabled={true}
                    />
                    <TextLink
                        text={"54 Fahrten angeboten"}
                        variant={"outline"}
                        leading={<BiCar className="icon-md"/>}
                        className={"body-2"}
                        textAlign={"right"}
                        disabled={true}
                    />
                </Card>
            
            <div className={"mt-20"}/>

            <BottomNavigationBar selected="trips"/>
        </>
    );
};
