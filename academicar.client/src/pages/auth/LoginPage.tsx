import {Button} from "../../components/Buttons";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {TitleBar} from "../../components/TitleBar.tsx";
import {useNavigate} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {useAuth} from "../../AuthContext.tsx";

export const LoginPage = () => {
    const [t] = useTranslation(["common", "pages/auth"]);
    const pageTitle = t("pages/auth:LoginPage.title");
    SetPageTitle(pageTitle);

    const navigate = useNavigate();
    const handleAdminLogin = () => {
        // admin or demo login
        navigate("/admin/login");
    };

    const { selectIdP } = useAuth();
    

    return (
        <>
            <TitleBar text={pageTitle}/>

            <div className="w-full flex flex-col items-center py-6">
                {/* Todo logo */}

                <Button
                    text={t("pages/auth:LoginPage.buttons.edu_id")}
                    type="submit"
                    textAlign="center"
                    variant="outline"
                    fullWidth={true}
                    onClick={selectIdP}
                />

                <Button
                    text={t("pages/auth:LoginPage.buttons.admin_login")}
                    type="submit"
                    textAlign="center"
                    variant="outline"
                    fullWidth={true}
                    onClick={handleAdminLogin}
                />

            </div>
        </>
    );
};
