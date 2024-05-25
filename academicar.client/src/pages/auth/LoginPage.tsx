import {Button} from "../../components/Buttons";
import SetPageTitle from "../../hooks/SetPageTitle.tsx";
import {TitleBar} from "../../components/TitleBar.tsx";
import {useNavigate} from 'react-router-dom';

export const LoginPage = () => {
    const pageTitle = `Login`;
    SetPageTitle(pageTitle);

    const navigate = useNavigate();
    const handleLogin = () => {
        // TODO forward to eduID
        navigate("/");
    };

    return (
        <>
            <TitleBar text={pageTitle}/>

            <div className="w-full flex flex-col items-center">
                {/* Todo logo */}

                <Button
                    text="Login with eduID"
                    type="submit"
                    textAlign="center"
                    variant="outline"
                    fullWidth={true}
                    onClick={handleLogin}
                />

            </div>
        </>
    );
};
