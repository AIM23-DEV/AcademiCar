import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/SetPageTitle.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {TextButton} from "../../components/Buttons.tsx";
import {useNavigate} from "react-router-dom";
import {BiLogOut} from "react-icons/bi";

// TODO add content components and follow up pages
export const IndexProfilePage = () => {
    const pageTitle = "Mein Account";
    SetPageTitle(pageTitle);

    const navigate = useNavigate();

    return (
        <>
            <TitleBar text={pageTitle}/>

            <div className="w-full flex flex-col items-center">
                <TextButton
                    text="Logout"
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
