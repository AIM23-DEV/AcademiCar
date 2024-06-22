import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title";
import {BottomNavigationBar} from "../../components/BottomNavigationBar";
import {Button, TextButton} from "../../components/Buttons";
import {useNavigate, useParams} from "react-router-dom";
import {BiCar, BiChevronRight, BiLogOut, BiStats, BiUser} from "react-icons/bi";
import {useTranslation} from "react-i18next";
import {BsPencilSquare} from "react-icons/bs";
import {TbCurrencyEuro} from "react-icons/tb";
import {CiTrophy} from "react-icons/ci";
import {IoSettingsOutline} from "react-icons/io5";
import {Divider} from "../../components/Divider";
import {useEffect, useState} from "react";

const BUTTONS = [
    { textKey: "personalData", icon: BiUser, path: "edit" },
    { textKey: "profile", icon: BsPencilSquare, path: "facesheet" },
    { textKey: "vehicles", icon: BiCar, path: "cars" },
    { textKey: "balance", icon: TbCurrencyEuro, path: "balance" },
    { textKey: "statistics", icon: BiStats, path: "stats" },
    { textKey: "rewards", icon: CiTrophy, path: "rewards" },
    { textKey: "settings", icon: IoSettingsOutline, path: "settings" },
];

export const IndexProfilePage = () => {
    const { loggedInUserId } = useParams();
    const [user, setUser] = useState<IUser>();
    const [error, setError] = useState<string | null>();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://localhost:5173/api/admin/users/${loggedInUserId}`)
            .then(response => response.json())
            .then((data: IUser) => setUser(data))
            .catch(e => {
                setError(`There was an error fetching the user: ${e}`);
                console.error(error);
            });
    }, [loggedInUserId]);
    
    const [t] = useTranslation(['common', 'pages/profile']);
    const pageTitle = t("pages/profile:IndexProfilePage.title");
    SetPageTitle(pageTitle);

    if (error) return <div>{error}</div>;
    if (!user) return <div>Loading user...</div>;
    
    return (
        <>
            <TitleBar text={pageTitle}/>

                <div className="mt-6">
                    <img
                        src={user.pictureSrc}
                        alt="avatar"
                        className="border-gray-600 rounded-full"
                    />
                </div>


                <h1 className="headline-2">{`${user.firstName} ${user.lastName}`}</h1>

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

            <BottomNavigationBar selected="profile"/>
        </>
    );
};
