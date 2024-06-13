import { Outlet } from "react-router-dom";
import { BottomNavigationBar } from "../components/BottomNavigationBar";

export const Layout = () => {
    return (
        <>
            <Outlet />

            <BottomNavigationBar />
        </>
    )
};
