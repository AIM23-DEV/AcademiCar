import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {TextButton} from "../../components/Buttons.tsx";
import {useNavigate} from "react-router-dom";
import {BiLogOut} from "react-icons/bi";
import {LanguageSelector} from "../../components/LanguageSelector";
import {useTranslation} from "react-i18next";

// TODO add content components and follow up pages
export const IndexProfilePage = () => {
    const [t] = useTranslation(['common', 'pages/profile']);
    const navigate = useNavigate();

    const pageTitle = t("pages/profile:IndexProfilePage.title");
    SetPageTitle(pageTitle);

    return (
        <>
            <TitleBar text={pageTitle}/>

            <div className="w-full flex flex-col items-center py-6">
                <LanguageSelector/>

                <TextButton
                    text={t("common:actions.logout")}
                    type="button"
                    fullWidth
                    textAlign="center"
                    variant="accent"
                    onClick={() => navigate("/auth/login")}
                    leading={<BiLogOut className="icon-md"/>}
                    className="mt-8"
                />
            </div>

            <BottomNavigationBar selected="profile"/>
        </>
    );
};
