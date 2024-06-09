import {TitleBar} from "../../components/TitleBar";
import {BottomNavigationBar} from "../../components/BottomNavigationBar";
import {TextLink} from "../../components/Buttons";
import {useTranslation} from "react-i18next";
import {
    BiBlock, BiBook, BiBuildingHouse, BiCheckCircle, BiMessageRoundedDots, BiMusic, BiParty, BiSolidStar, BiUserCircle, BiWorld
} from "react-icons/bi";
import {Divider} from "../../components/Divider";
import {Card} from "../../components/Cards.tsx";
import {RequestCard} from "./partials/RequestCard.tsx";

// TODO add content components and follow up pages
export const PassengerDetailsPage = () => {
    const [t] = useTranslation(['common', 'pages/trips']);
   //const navigate = useNavigate();

    const passenger = {
        name: "Jane Passenger",
            score: 5,
            ratings: 5,
            avatar: "/../src/assets/react.svg"
    };

    const requests = [
        {time: "30.12.2023, 18:05", user: passenger.name, score: passenger.score}
    ];
    
    return (
        <>
            <TitleBar hasBackAction/>
            
                <div className="mt-8">
                    <img
                        src={passenger.avatar}
                        alt="avatar"
                        className="rounded-full w-32 h-32"
                    />
                </div>
                <h1 className="headline-2">{passenger.name}</h1>

                <div className="flex items-center">
                    {Array.from({length: Math.floor(passenger.score)}).map((_, idx) => (
                        <BiSolidStar key={idx} className="icon text-yellow-400"/>
                    ))}
                    {Array.from({length: 5 - Math.floor(passenger.score)}).map((_, idx) => (
                        <BiSolidStar key={idx} className="icon text-gray-300"/>
                    ))}
                </div>
                
                <span className="ml-2"> {passenger.ratings} {t("pages/trips:PassengerDetailsPage.ratings")} ({passenger.score.toFixed(1)})</span>
                      
                <Divider className="mt-8"/>
            
                <Card className={"mt-6"} label={t("pages/trips:PassengerDetailsPage.requests")} labelPosition={"outside"}>
                    <RequestCard requests={requests}/>
                </Card>
            
                <Card className={"mt-6"} label={t("pages/trips:PassengerDetailsPage.studies")} labelPosition={"outside"}>
                    <TextLink
                        text={"Soziale Arbeit"}
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

                <Card className={"mt-6"} label={t("pages/trips:PassengerDetailsPage.interests")} labelPosition={"outside"}>
                    <TextLink
                        text={"Musik, Bücher, Joggen"}
                        variant={"outline"}
                        leading={<BiParty className="icon-md"/>}
                        className={"body-2"}
                        textAlign={"right"}
                        disabled={true}
                    />
                </Card>

                <Card className={"mt-6"} label={t("pages/trips:DriverDetailsPage.music")} labelPosition={"outside"}>
                    <TextLink
                        text={"Techno, Podcasts "}
                        variant={"outline"}
                        leading={<BiMusic className="icon-md"/>}
                        className={"body-2"}
                        textAlign={"right"}
                        disabled={true}
                    />
                </Card>

                <Card className={"mt-8"} label={t("pages/trips:PassengerDetailsPage.preferences")} labelPosition={"outside"}>
                    <TextLink
                        text={"Kein Rauchen"}
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


                <Card className={"mt-6"} label={t("pages/trips:PassengerDetailsPage.background")} labelPosition={"outside"}>
                    <TextLink
                        text={"Österreich"}
                        variant={"outline"}
                        leading={<BiWorld className="icon-md"/>}
                        className={"body-2"}
                        textAlign={"right"}
                        disabled={true}
                    />
                    <TextLink
                        text={"Deutsch, Englisch"}
                        variant={"outline"}
                        leading={<BiMessageRoundedDots className="icon-md"/>}
                        className={"body-2"}
                        textAlign={"right"}
                        disabled={true}
                    />
                </Card>

                <Card className={"mt-6"} label={t("pages/trips:PassengerDetailsPage.memberStatus")} labelPosition={"outside"}>
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
                </Card>
            
            <div className={"mt-20"}/>

            <BottomNavigationBar selected="trips"/>
        </>
    );
};
