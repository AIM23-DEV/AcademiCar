import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title";
import {BottomNavigationBar} from "../../components/BottomNavigationBar";
import {Button, TextButton} from "../../components/Buttons";
import {useNavigate, useParams} from "react-router-dom";
import {
    BiCar,
    BiChevronRight,
    BiCog,
    BiEuro,
    BiLogOut,
    BiMessageSquareEdit,
    BiStats,
    BiTrophy,
    BiUser
} from "react-icons/bi";
import {useTranslation} from "react-i18next";
import {Divider} from "../../components/Divider";
import {useEffect, useState} from "react";
import {useAuth} from "../../AuthContext.tsx";

const BUTTONS = [
    {textKey: "personalData", icon: BiUser, path: "edit"},
    {textKey: "profile", icon: BiMessageSquareEdit, path: "facesheet"},
    {textKey: "vehicles", icon: BiCar, path: "cars"},
    {textKey: "balance", icon: BiEuro, path: "balance"},
    {textKey: "statistics", icon: BiStats, path: "stats"},
    {textKey: "rewards", icon: BiTrophy, path: "rewards"},
    {textKey: "settings", icon: BiCog, path: "settings"},
];

export const IndexProfilePage = () => {
    const {loggedInUserId} = useParams();
    const [user, setUser] = useState<IUser>();
    const [error, setError] = useState<string | null>();
    const navigate = useNavigate();
    const auth = useAuth();

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
                    className="icon-2xl border-gray-600 rounded-full"
                />
            </div>


            <h1 className="headline-1">{`${user.firstName} ${user.lastName}`}</h1>

            <Divider className="mt-2"/>

            {BUTTONS.map((button, index) => (
                <Button
                    key={index}
                    variant="outline"
                    fullWidth
                    text={t(`pages/profile:IndexProfilePage.${button.textKey}`)}
                    textAlign="left"
                    textFullWidth
                    leading={<button.icon className="icon-md text-primary-600"/>}
                    trailing={<BiChevronRight className="icon-md"/>}
                    type="button"
                    className="mt-6 body-1"
                    onClick={() => navigate(button.path)}
                />
            ))}

            <TextButton
                text={t("common:actions.logout")}
                type="button"
                fullWidth
                textAlign="center"
                variant="accent"
                onClick={() => auth.adminLogout().then(() => navigate("/auth/login"))}
                leading={<BiLogOut className="icon-md"/>}
                className="mt-6 mb-24"
            />

            <BottomNavigationBar selected="profile"/>
        </>
    );
};
