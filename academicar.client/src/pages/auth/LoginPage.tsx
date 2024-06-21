import {Button} from "../../components/Buttons";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../AuthContext.tsx";

export const LoginPage = () => {
    const [t] = useTranslation(["common", "pages/auth"]);
    const { selectIdP } = useAuth();
    
    return (
        <>
            <div className="w-full h-dvh flex flex-col items-center justify-center gap-14">
                <img
                    src="/../src/assets/logo_bildtext.png"
                    alt="logo"
                />

                <Button
                    text={t("pages/auth:LoginPage.buttons.edu_id")}
                    type="submit"
                    textAlign="center"
                    variant="outline"
                    fullWidth={true}
                    onClick={selectIdP}
                />
            </div>
        </>
    );
};
