import {useTranslation} from "react-i18next";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {TitleBar} from "../../components/TitleBar.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {Divider} from "../../components/Divider.tsx";
import { BiSolidStar, BiChevronRight } from "react-icons/bi";
import {TextButton} from "../../components/Buttons.tsx";
import {Card} from "../../components/Cards.tsx";

const DATA = {
    avatar: "/../src/assets/react.svg",
    name: "Maximilian Bauer",
    rating: {
        stars: 5.0,
        count: 5
    },
    stats: {
        km_full: 1833,
        count: 17,
        km_diver: 1100,
        km_passenger: 733,
        co2_saving: 87,
        trees: 17
    }
}
export const StatsPage = () => {
    const [t] = useTranslation();
    const pageTitle = t("pages/profile:StatsPage.title");
    SetPageTitle(pageTitle);
    
    return (
        <>
            <TitleBar hasBackAction={true} text={pageTitle}/>
            
            <div className="w-full flex flex-col items-center gap-10 pb-24">
                <div className="flex flex-col gap-5">
                    <div className="flex justify-center">
                        <img
                            src={DATA.avatar}
                            alt="avatar"
                            className="border-gray-600 rounded-full w-28 h-28"
                        />
                    </div>
                    
                    <div className="headline-2">{DATA.name}</div>
                    
                    <div className="flex justify-center">
                        {Array.from({length: Math.floor(DATA.rating.stars) }).map((_, idx) => (
                            <BiSolidStar key={idx} className="icon text-yellow-400" />
                        ))}
                        {Array.from({ length: 5 - Math.floor(DATA.rating.stars) }).map((_, idx) => (
                            <BiSolidStar key={idx} className="icon text-gray-300" />
                        ))}
                    </div>
                    
                    <div className="flex justify-center">
                        <TextButton
                            text={DATA.rating.count + " " +  t("pages/profile:StatsPage.ratings") + " (" + DATA.rating.stars + ")"}
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
                                {DATA.stats.km_full} km
                            </div>
                        </Card>

                        <Card
                            label={t('pages/profile:StatsPage.drive_count')}
                            labelPosition="inside"
                            padding="sm"
                        >
                            <div className="flex justify-center headline-1 text-primary-600">
                                {DATA.stats.count}
                            </div>
                        </Card>
                    </div>
                    
                    <Card
                        label={t('pages/profile:StatsPage.km_driver')}
                        labelPosition="outside"
                    >
                        <div className="flex justify-center headline-1 text-primary-600">
                            {DATA.stats.km_diver} km
                        </div>
                    </Card>

                    <Card
                        label={t('pages/profile:StatsPage.km_passenger')}
                        labelPosition="outside"
                    >
                        <div className="flex justify-center headline-1 text-primary-600">
                            {DATA.stats.km_passenger} km
                        </div>
                    </Card>

                    <div className="grid grid-cols-2 gap-5">
                        <Card
                            label={t('pages/profile:StatsPage.co2_savings')}
                            labelPosition="inside"
                            padding="sm"
                        >
                            <div className="flex justify-center headline-1 text-primary-600">
                                {DATA.stats.co2_saving} g/kwH
                            </div>
                        </Card>

                        <Card
                            label={t('pages/profile:StatsPage.trees')}
                            labelPosition="inside"
                            padding="sm"
                        >
                            <div className="flex justify-center headline-1 text-primary-600">
                                {DATA.stats.trees} {t('pages/profile:StatsPage.trees')}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            <BottomNavigationBar selected="profile"/>
        </>
    )
}