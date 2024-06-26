import SetPageTitle from "../../hooks/set_page_title.tsx";
import {TitleBar} from "../../components/TitleBar.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {ImageUploadForm} from "./partials/ImageUploadForm.tsx";
export const ImageUploadPage = () => {
    SetPageTitle("Image Upload");
    
    return (
        <>
            <TitleBar text="Zurück" hasBackAction/>
            <div className="w-full flex flex-col items-center justify-center pt-32">
                <ImageUploadForm/>
            </div>
            <BottomNavigationBar />
        </>
    );
};
