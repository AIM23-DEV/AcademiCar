import {useTranslation} from "react-i18next";
import {TitleBar} from "../../components/TitleBar";
import {TextButton} from "../../components/Buttons";
import {LanguageSelector} from "../../components/LanguageSelector.tsx";
import {useNavigate} from "react-router-dom";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import React from "react";

export const SettingsPage: React.FC = () => {
    const [t] = useTranslation(['common', 'pages/profile']);

    const navigate = useNavigate();

    const pageTitle = t("pages/profile:SettingsPage.title");
    SetPageTitle(pageTitle);

    return (
        <>
            <TitleBar text={pageTitle} hasBackAction={true}/>

            <div className="w-full flex flex-col items-center mt-6 mb-24 space-y-6">
                <LanguageSelector/>

                <TextButton
                    text={t("pages/profile:SettingsPage.agbs")}
                    type="button"
                    fullWidth
                    textAlign="center"
                    variant="secondary"
                    onClick={() => navigate("/auth/login")}
                    className="underline"
                />
            </div>
        </>
    );
};

export default SettingsPage;
