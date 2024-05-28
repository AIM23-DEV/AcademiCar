import {TitleBar} from "../../components/TitleBar.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {Button, TextButton} from "../../components/Buttons.tsx";
import {ConfirmationModal} from "../../components/Modal.tsx";
import {useState} from "react";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {BiLogOut} from "react-icons/bi";


// Todo delete this page once it is obsolete!
// This is just an example page. The search page should be loaded as a default once implemented.
export const ShowUserPage = () => {
    // This is how to import the translation function for multiple namespaces.
    const [t] = useTranslation(['common', 'pages/profile']);

    // This is how to define the page title and TitleBar text with translations. Do it on every page!
    const pageTitle = t('common:app_title');
    SetPageTitle(pageTitle);

    // This is how to import the navigator with which you can navigate between pages.
    const navigate = useNavigate();
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
                {/* This is also an example for using a variable inside of a translation. */}
                <Button text={t("common:example", {variable: "Modal"})} className="my-8"
                        onClick={() => setShowModal(true)}/>

                {/* When working with multiple translation imports always specify the namespace. */}
                <TextButton
                    text={t("common:actions.logout")}
                    type="button"
                    fullWidth
                    textAlign="center"
                    variant="secondary"
                    onClick={() => navigate("/auth/login")}
                    leading={<BiLogOut className="icon-md"/>}
                />
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
