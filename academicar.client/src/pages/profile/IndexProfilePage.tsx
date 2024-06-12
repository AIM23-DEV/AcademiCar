import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title";
import {BottomNavigationBar} from "../../components/BottomNavigationBar";
import {Button, TextButton} from "../../components/Buttons";
import {useNavigate} from "react-router-dom";
import {BiCar, BiChevronRight, BiLogOut, BiStats, BiUser} from "react-icons/bi";
import {LanguageSelector} from "../../components/LanguageSelector";
import {useTranslation} from "react-i18next";
import {BsPencilSquare} from "react-icons/bs";
import {TbCurrencyEuro} from "react-icons/tb";
import {CiTrophy} from "react-icons/ci";
import {IoSettingsOutline} from "react-icons/io5";
import {Divider} from "../../components/Divider";

const BUTTONS = [
    { textKey: "personalData", icon: BiUser, path: "edit" },
    { textKey: "profile", icon: BsPencilSquare, path: "facesheet" },
    { textKey: "vehicles", icon: BiCar, path: "cars" },
    { textKey: "balance", icon: TbCurrencyEuro, path: "/auth/login" },
    { textKey: "statistics", icon: BiStats, path: "/profile/stats" },
    { textKey: "rewards", icon: CiTrophy, path: "/profile/rewards" },
    { textKey: "settings", icon: IoSettingsOutline, path: "/profile/settings" },
];

interface IndexProfilePageProps {
    avatarUrl?: string;
    userName?: string;
}

// TODO add content components and follow up pages
export const IndexProfilePage: React.FC<IndexProfilePageProps> = ({avatarUrl = "/../src/assets/react.svg",
userName = "Maximilian Bauer"
}) => {
    const [t] = useTranslation(['common', 'pages/profile']);
    const navigate = useNavigate();

    const pageTitle = t("pages/profile:IndexProfilePage.title");
    
    SetPageTitle(pageTitle);

    return (
        <>
            <TitleBar text={pageTitle}/>

            <div className="w-full flex flex-col items-center py-6">
                <LanguageSelector/>

                <div className="mt-6">
                    <img
                        src={avatarUrl}
                        alt="avatar"
                        className="border-gray-600 rounded-full"
                    />
                </div>


                <h1 className="headline-2">{userName}</h1>

                <Divider className="mt-2"/>

                {BUTTONS.map((button, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        fullWidth
                        text={t(`pages/profile:IndexProfilePage.${button.textKey}`)}
                        textAlign="left"
                        textFullWidth
                        leading={<button.icon className="text-green-600" />}
                        trailing={<BiChevronRight className="icon" />}
                        type="button"
                        className="mt-6"
                        onClick={() => navigate(button.path)}
                    />
                ))}

                <TextButton
                    text={t("common:actions.logout")}
                    type="button"
                    fullWidth
                    textAlign="center"
                    variant="accent"
                    onClick={() => navigate("/auth/login")}
                    leading={<BiLogOut className="icon-md"/>}
                    className="mt-6 mb-16"
                />
            </div>

            <BottomNavigationBar selected="profile"/>
        </>
    );
};
