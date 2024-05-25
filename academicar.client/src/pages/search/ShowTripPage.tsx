import {useParams} from 'react-router-dom';
import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/SetPageTitle.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";

export const ShowTripPage = () => {
    const {id} = useParams();
    const pageTitle = `Fahrt Details zu ${id}`;
    SetPageTitle(pageTitle);

    return (
        <>
            <TitleBar text={pageTitle} hasBackAction/>

            <div className="w-full flex flex-col items-center">
                {/* Todo */}
            </div>

            <BottomNavigationBar selected="trips"/>
        </>
    );
};
