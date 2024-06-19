import {useTranslation} from "react-i18next";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {TitleBar} from "../../components/TitleBar.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {Divider} from "../../components/Divider.tsx";
import { BiSolidStar, BiChevronRight } from "react-icons/bi";
import {TextButton} from "../../components/Buttons.tsx";
import {Card} from "../../components/Cards.tsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

interface TotalRating {
    rating: number;
}
export const StatsPage = () => {
    const { id } = useParams();
    const [user, setUser] = useState<IUser>();
    const [stats, setStats] = useState<IStats>();
    const [rating, setRating] = useState<TotalRating | null>();
    const [review, setReview] = useState<number | null>();
    const [error, setError] = useState<string | null>();
    const [t] = useTranslation();
    const pageTitle = t("pages/profile:StatsPage.title");
    SetPageTitle(pageTitle);

    useEffect(() => {
        fetch(`https://localhost:5173/api/admin/users/${id}`)
            .then(response => response.json())
            .then((data: IUser) => setUser(data))
            .catch(error => {
                setError("There was an error fetching the user details!");
                console.error(error);
            });
    }, [id]);

    if (error) return <div>{error}</div>;
    if (!user) return <div>Loading user...</div>;
    
    if (user && !stats) {
        fetch(`https://localhost:5173/api/admin/users/stats/${user?.fK_Stats}`)
            .then(response => response.json())
            .then(data => setStats(data))
            .catch(error => {
                setError("There was an error fetching the stats details!");
                console.error(error);
            });
    }

    if (!stats) return <div>Loading stats...</div>;

    if (user && !rating) {
        fetch(`https://localhost:5173/api/admin/users/rating/${user.id}`)
            .then(response => response.json())
            .then(data => setRating(data))
            .catch(error => {
                setError("There was an error fetching the Admin rating!");
                console.error(error);
            });
    }
    if (!rating) return <div>Loading stats...</div>;
    
    if (user && !review) {
        fetch(`https://localhost:5173/api/admin/users/review/${user.id}`)
            .then(response => response.json())
            .then(data => setReview(data))
            .catch(error => {
                setError("There was an error fetching the Admin rating!");
                console.error(error);
            });
    }
    if (!setReview) return <div>Loading stats...</div>;
    
    return (
        <>
            <TitleBar hasBackAction={true} text={pageTitle}/>
            
            <div className="w-full flex flex-col items-center gap-10 pb-24">
                <div className="flex flex-col gap-5">
                    <div className="flex justify-center">
                        <img
                            src={user.pictureSrc}
                            alt="avatar"
                            className="border-gray-600 rounded-full w-28 h-28"
                        />
                    </div>
                    
                    <div className="headline-2 flex justify-center">{user.firstName} {user.lastName}</div>
                    
                    <div className="flex justify-center">
                        {Array.from({length: Math.floor(rating.rating) }).map((_, idx) => (
                            <BiSolidStar key={idx} className="icon text-yellow-400" />
                        ))}
                        {Array.from({ length: 5 - Math.floor(rating.rating) }).map((_, idx) => (
                            <BiSolidStar key={idx} className="icon text-gray-300" />
                        ))}
                    </div>
                    
                    <div className="flex justify-center">
                        <TextButton
                            text={review + " " +  t("pages/profile:StatsPage.ratings") + " (" + rating.rating + ")"}
                            trailing={<BiChevronRight className="icon" />}
                        />
                    </div>
                </div>

                <Divider/>

                <div className="w-full flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-5">
                        <Card
                            label={t('pages/profile:StatsPage.km_full')}
                            labelPosition="inside"
                            padding="sm"
                        >
                            <div className="flex justify-center headline-1 text-primary-600">
                                {stats.driverKilometres + stats.passengerKilometres} km
                            </div>
                        </Card>

                        <Card
                            label={t('pages/profile:StatsPage.drive_count')}
                            labelPosition="inside"
                            padding="sm"
                        >
                            <div className="flex justify-center headline-1 text-primary-600">
                                {stats.nrTrips ? stats.nrTrips : 0}
                            </div>
                        </Card>
                    </div>
                    
                    <Card
                        label={t('pages/profile:StatsPage.km_driver')}
                        labelPosition="outside"
                    >
                        <div className="flex justify-center headline-1 text-primary-600">
                            {stats.driverKilometres} km
                        </div>
                    </Card>

                    <Card
                        label={t('pages/profile:StatsPage.km_passenger')}
                        labelPosition="outside"
                    >
                        <div className="flex justify-center headline-1 text-primary-600">
                            {stats.passengerKilometres} km
                        </div>
                    </Card>

                    <div className="grid grid-cols-2 gap-5">
                        <Card
                            label={t('pages/profile:StatsPage.co2_savings')}
                            labelPosition="inside"
                            padding="sm"
                        >
                            <div className="flex justify-center headline-1 text-primary-600">
                                {stats.cO2Savings} g/kwH
                            </div>
                        </Card>

                        <Card
                            label={t('pages/profile:StatsPage.trees')}
                            labelPosition="inside"
                            padding="sm"
                        >
                            <div className="flex justify-center headline-1 text-primary-600">
                                {Math.floor((stats.cO2Savings) / 22)} {t('pages/profile:StatsPage.trees')}
                                {/*
                                    a tree absorbs about 22 kg of CO2 per year
                                    1 tree = 22 kg CO2 saved
                                */}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            <BottomNavigationBar selected="profile"/>
        </>
    )
}