import {useParams} from 'react-router-dom';
import {TitleBar} from "../../components/TitleBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {useTranslation} from 'react-i18next';

export const ShowTripPage = () => {
    const [t] = useTranslation(["common", "pages/trips"]);
    const {id} = useParams();
    const pageTitle = t("pages/trips:ShowTripPage.title", {id: id});
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
