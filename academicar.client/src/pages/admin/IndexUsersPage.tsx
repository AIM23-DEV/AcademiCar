import {TitleBar} from "../../components/TitleBar.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {Button} from "../../components/Buttons.tsx";
import {ConfirmationModal} from "../../components/Modal.tsx";
import {useState} from "react";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {useTranslation} from "react-i18next";
import {BiChevronRight, BiSortAlt2} from "react-icons/bi";
import {Card} from "../../components/Cards.tsx";
import {IoSearch} from "react-icons/io5";
import {RxAvatar} from "react-icons/rx";
import {Divider} from "../../components/Divider.tsx";
import {useNavigate} from "react-router-dom";

export const IndexUsersPage = () => {
    // This is how to import the translation function for multiple namespaces.
    const [t] = useTranslation(['common', 'pages/admin']);
    
    //Translations
    const pageTitle = t('pages/admin:IndexUsersPage.title');
    const search = t('pages/admin:IndexUsersPage.search');
    const sort = t('pages/admin:IndexUsersPage.sort');
    const persons = t('pages/admin:IndexUsersPage.persons');
    SetPageTitle(pageTitle);
    
    //Accounts
    const USER = [
        { id: 1, name: 'Sofie Buchhalter', imgSrc: 'path/to/image1.jpg', path: "/admin/users/1" },
        { id: 2, name: 'Samantha Kinsley', imgSrc: 'path/to/image2.jpg', path: "/admin/users/1"},
        { id: 3, name: 'Max Kruse', imgSrc: 'path/to/image3.jpg', path: "/admin/users/1"},
        { id: 4, name: 'Jane Doe', imgSrc: 'path/to/image4.jpg', path: "/admin/users/1"},
        { id: 5, name: 'Bernd Kern', imgSrc: 'path/to/image5.jpg', path: "/admin/users/1"},
    ];

    const navigate = useNavigate();
    
    // This is how to work with a component that needs a state
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <TitleBar text={"Account"} hasBackAction/>

            <div aria-label="SuchenSortieren" className="w-full grid grid-cols-12 gap-x-32">
                <Button
                    variant="outline"
                    fullWidth={false}
                    text={search}
                    textAlign="center"
                    textFullWidth
                    leading={<IoSearch className="icon"/>}
                    type="button"
                    className="mt-1"
                    onClick={() => {
                        alert("Test");
                    }}
                />

                <Button
                    variant="outline"
                    fullWidth={false}
                    text={sort}
                    textAlign="center"
                    textFullWidth
                    leading={<BiSortAlt2 className="icon"/>}
                    type="button"
                    className="mt-1"
                    onClick={() => {
                        alert("Test");
                    }}
                />
            </div>

            <div className="w-full flex flex-col items-center">
                <Card
                    id="1"
                    label={persons}
                    labelPosition="outside"
                    padding="base"
                    className="mt-1"
                >
                    {USER.map((USER) => (
                        <div key={USER.id}>
                            <Button
                                variant="outline"
                                fullWidth
                                text={USER.name}
                                textAlign="left"
                                textFullWidth
                                leading={<RxAvatar className="icon-md" />}
                                trailing={<BiChevronRight className="icon" />}
                                type="button"
                                disabled={false}
                                className="mt-1"
                                onClick={() => navigate(USER.path)}
                            />
                            
                            {<Divider className="my-2" />}
                            
                        </div>
                    ))}
                </Card>
            </div>
            
            <BottomNavigationBar
                selected={"profile"}
            />
            
            <ConfirmationModal open={showModal} setOpen={setShowModal}
                               subtitle="Das ist ein Bestätigungs-Modal. Hier kann man einige Einstellungen mitgeben!"
                               onConfirm={() => alert("Confirmed")}/>
        </>
    );
};
