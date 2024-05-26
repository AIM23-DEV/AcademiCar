import { Button } from "../../components/Buttons";

export const AuthenticationPage = () => {
    const handleLogin = () => {
        // TODO forward to eduID
    };

    return (
        <div>
            // TODO Logo

            <Button
                text="Login with eduID"
                type="submit"
                textAlign="center"
                variant="outline"
                fullWidth={true}
                onClick={handleLogin}
            />
        </div>
    );
};
