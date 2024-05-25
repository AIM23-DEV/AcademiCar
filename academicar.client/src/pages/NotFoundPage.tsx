import SetPageTitle from "../hooks/set_page_title.tsx";
import {TitleBar} from "../components/TitleBar.tsx";
import {BottomNavigationBar} from "../components/BottomNavigationBar.tsx";

export const NotFoundPage = () => {
    SetPageTitle("Fehler 404");
    
    return (
        <>
            <TitleBar text="Zurück" hasBackAction/>
            
            <div className="w-full flex flex-col items-center justify-center pt-32">
                <h1 className="headline-1 text-center">Fehler 404 - Seite nicht gefunden</h1>
            </div>
            
            <BottomNavigationBar />
        </>
    );
};
