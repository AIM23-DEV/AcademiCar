import {TitleBar} from "../../components/TitleBar.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {Button} from "../../components/Buttons.tsx";
import {ConfirmationModal} from "../../components/Modal.tsx";
import {useState} from "react";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {useTranslation} from "react-i18next";
import {BiChevronRight, BiJoystick} from "react-icons/bi";
import {Card} from "../../components/Cards.tsx";
import {Divider} from "../../components/Divider.tsx";



// Todo delete this page once it is obsolete!
// This is just an example page. The search page should be loaded as a default once implemented.
export const IndexUsersPage = () => {
    // This is how to import the translation function for multiple namespaces.
    const [t] = useTranslation(['common', 'pages/admin']);

    // This is how to define the page title and TitleBar text with translations. Do it on every page!
    const pageTitle = t('pages/admin:IndexUsersPage.title');
    SetPageTitle(pageTitle);
    
    // This is how to work with a component that needs a state
    const [showModal, setShowModal] = useState(false);

    return (
        // If you do not need a parent tag you can use this empty tag.
        // This will put all children directly in the parent tag.
        <>
            {/* Always put the TitleBar first! */}
            {/* Manually include the TitleBar and set its props based on your needs. */}
            <TitleBar text={"Account"} hasBackAction/>
            
            <div className="w-full flex flex-col items-center">
                <Button
                    variant="outline"
                    fullWidth
                    text="Suchen"
                    textAlign="left"
                    textFullWidth
                    leading={<BiJoystick className="icon"/>}
                    type="button"
                    disabled
                    className="mt-1"
                    onClick={() => {
                        alert("Test");
                    }}
                />

                <Button
                    variant="outline"
                    fullWidth
                    text="Sortieren"
                    textAlign="left"
                    textFullWidth
                    leading={<BiJoystick className="icon"/>}
                    type="button"
                    disabled
                    className="mt-1"
                    onClick={() => {
                        alert("Test");
                    }}
                />

                <Card
                    id="1"
                    label="Personen"
                    labelPosition="outside"
                    padding="base"
                    className="mt-1"
                >
                    <p>

                        <Button
                            variant="outline"
                            fullWidth
                            text="Sofie Buchhalter"
                            textAlign="left"
                            textFullWidth
                            leading={<BiJoystick className="icon"/>}
                            trailing={<BiChevronRight className="icon"/>}
                            type="button"
                            disabled
                            className="mt-1"
                            onClick={() => {
                                alert("Test");
                            }}
                        />

                        <Divider
                            className="my-1"
                        />
                        <Button
                            variant="outline"
                            fullWidth
                            text="Samanta Kinsley"
                            textAlign="left"
                            textFullWidth
                            leading={<BiJoystick className="icon"/>}
                            trailing={<BiChevronRight className="icon"/>}
                            type="button"
                            disabled
                            className="mt-1"
                            onClick={() => {
                                alert("Test");
                            }}
                        />

                        <Divider
                            className="my-1"
                        />

                        <Button
                            variant="outline"
                            fullWidth
                            text="Max Kruse"
                            textAlign="left"
                            textFullWidth
                            leading={<BiJoystick className="icon"/>}
                            trailing={<BiChevronRight className="icon"/>}
                            type="button"
                            disabled
                            className="mt-1"
                            onClick={() => {
                                alert("Test");
                            }}
                        />

                        <Divider
                            className="my-1"
                        />

                        <Button
                            variant="outline"
                            fullWidth
                            text="Jane Doe"
                            textAlign="left"
                            textFullWidth
                            leading={<BiJoystick className="icon"/>}
                            trailing={<BiChevronRight className="icon"/>}
                            type="button"
                            disabled
                            className="mt-1"
                            onClick={() => {
                                alert("Test");
                            }}
                        />
                        
                    </p>
                </Card>
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
