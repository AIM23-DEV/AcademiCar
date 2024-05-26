import {TitleBar} from "../components/TitleBar.tsx";
import {BottomNavigationBar} from "../components/BottomNavigationBar.tsx";
import {Button} from "../components/Buttons.tsx";
import {ConfirmationModal} from "../components/Modal.tsx";
import {useState} from "react";
import SetPageTitle from "../hooks/set_page_title.tsx";

// Todo delete this page once it is obsolete!
// This is just an example page. The search page should be loaded as a default once implemented.
export const HomePage = () => {
    // This is how to define the page title and TitleBar text. Do it on every page!
    const pageTitle = "Home page";
    SetPageTitle(pageTitle);

    // This is how to work with a component that needs a state
    const [showModal, setShowModal] = useState(false);

    return (
        // If you do not need a parent tag you can use this empty tag.
        // This will put all children directly in the parent tag.
        <>
            {/* Always put the TitleBar first! */}
            {/* Manually include the TitleBar and set its props based on your needs. */}
            <TitleBar text={pageTitle}/>

            {/* Your custom content can be put in here. */}
            <div className="w-full flex flex-col items-center">

                {/* This is an example button that toggles the state of a modal. */}
                <Button text="Das ist ein Primary Button" className="my-8" onClick={() => setShowModal(true)}/>

                <span className="headline-3 text-center">Dies ist nur eine Beispielseite. Die Suchseite sollte nach der Implementierung als Standard geladen werden.</span>
            </div>

            {/* Manually include the BottomNavigation bar and set its props based on your needs. */}
            <BottomNavigationBar/>

            {/* Put absolutely positioned elements like modals here. */}
            <ConfirmationModal open={showModal} setOpen={setShowModal}
                               subtitle="Das ist ein Bestätigungs-Modal. Hier kann man einige Einstellungen mitgeben!"
                               onConfirm={() => alert("Confirmed")}/>
        </>
    );
};
