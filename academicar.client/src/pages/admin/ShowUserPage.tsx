import {TitleBar} from "../../components/TitleBar.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {ConfirmationModal} from "../../components/Modal.tsx";
import {useState} from "react";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {BiCar, BiLogOut, BiSolidStar} from "react-icons/bi";
import {TextButton} from "../../components/Buttons.tsx";
import {Input} from "@headlessui/react";
import {Divider} from "../../components/Divider.tsx";
import {Card} from "../../components/Cards.tsx";
import {FaRegTrashAlt, FaShieldAlt} from "react-icons/fa";



export const ShowUserPage = () => {
    // This is how to import the translation function for multiple namespaces.
    const [t] = useTranslation(['common', 'pages/admin/user']);

    // Tranlations
    const pageTitle = t('pages/admin/ShowUserPage.title');
    const ratings = t('pages/admin/ShowUserPage.ratings');
    const adress = t('pages/admin/ShowUserPage.adress');
    const phonenumber = t('pages/admin/ShowUserPage.phonenumber');
    const email = t('pages/admin/ShowUserPage.email');
    const actions = t('pages/admin/ShowUserPage.actions');
    const blockaccount = t('pages/admin/ShowUserPage.blockaccount');
    const deleteaccount = t('pages/admin/ShowUserPage.deleteaccount');
    SetPageTitle(pageTitle);

    // Example-User data
    const USERDATA = {
        id: 2,
        name: 'Samantha Kinsley',
        rating: 4,
        reviews: 187,
        address: 'Musterstraße 123 / Top 456',
        postalCode: '8010',
        city: 'Musterstadt',
        phone: '+43 (0) 664 1234567',
        email: 'musterEMailadresse@gmail.com',
    };


    

        


        // This is how to import the navigator with which you can navigate between pages.
    const navigate = useNavigate();
    // This is how to work with a component that needs a state
    const [showModal, setShowModal] = useState(false);
    
        SetPageTitle(pageTitle);

        return (
            <>
                <TitleBar text={"Account"} hasBackAction/>

                {/* Your custom content can be put in here. */}
                <div className="w-full flex flex-col items-center">


                    <div className="flex justify-between items-center">
                        <div className="flex flex-row gap-4 items-center">
                            <div className="flex justify-center">
                                <img
                                    src="/../src/assets/react.svg"
                                    alt="avatar"
                                    className="border-gray-600 rounded-full"
                                />
                            </div>
                            <div>
                                <div>{USERDATA.name}</div>
                                <div className="flex items-center">
                                    <span><BiSolidStar className="icon text-yellow-400"/></span>
                                    <span><BiSolidStar className="icon text-yellow-400"/></span>
                                    <span><BiSolidStar className="icon text-yellow-400"/></span>
                                    <span><BiSolidStar className="icon text-yellow-400"/></span>
                                    <span><BiSolidStar className="icon text-gray-300"/></span>
                                    <span className="ml-2">({USERDATA.rating})</span>
                                </div>
                                <div className="mt-2">
                                    <span>Bewertungen: {USERDATA.reviews}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="user-details-section">
                        <h3>Adresse</h3>
                        <Input
                            label="Adresse"
                            id="address"
                            type="text"
                            fullWidth={true}
                            placeholder="Adresse"
                            required={true}
                            value={USERDATA.address}
                            readOnly
                        />
                        <div className="address-info">
                            <Input
                                label="Postleitzahl"
                                id="postal-code"
                                type="text"
                                fullWidth={false}
                                placeholder="Postleitzahl"
                                required={true}
                                value={USERDATA.postalCode}
                                readOnly
                            />
                            <Input
                                label="Stadt"
                                id="city"
                                type="text"
                                fullWidth={false}
                                placeholder="Stadt"
                                required={true}
                                value={USERDATA.city}
                                readOnly
                            />
                        </div>
                    </div>
                    <Divider className="my-2" />
                    <div className="user-details-section">
                        <h3>Telefonnummer</h3>
                        <Input
                            label="Telefonnummer"
                            id="phone"
                            type="text"
                            fullWidth={true}
                            placeholder="Telefonnummer"
                            required={true}
                            value={USERDATA.phone}
                            readOnly
                        />
                    </div>
                    <Divider className="my-2" />
                    <div className="user-details-section">
                        <h3>E-Mail</h3>
                        <Input
                            label="E-Mail"
                            id="email"
                            type="text"
                            fullWidth={true}
                            placeholder="E-Mail"
                            required={true}
                            value={USERDATA.email}
                            readOnly
                        />
                    </div>

                    

                </div>


                <Card
                    id="lbl_1"
                    label="Aktionen" //TODO actions
                    labelPosition="outside"
                    padding="base"
                    className="mt-8"
                >
                    <p>

                        <TextButton
                            text={t("common:actions.blockaccount")} //TODO Translation
                            type="button"
                            fullWidth
                            textAlign="center"
                            variant="outline"
                            onClick={() => navigate("/auth/login")}
                            leading={<FaShieldAlt className="icon-md"/>}
                        />

                        <TextButton
                            text={t("common:actions.deleteaccount")} //TODO Translation
                            type="button"
                            fullWidth
                            textAlign="center"
                            variant="outline"
                            onClick={() => navigate("/auth/login")}
                            leading={<FaRegTrashAlt className="icon-md"/>}
                        />
                        
                        
                    </p>
                </Card>
                

                {/* Manually include the BottomNavigation bar and set its props based on your needs. */
    }
    <BottomNavigationBar

        selected={"profile"}
    />


    {/* Put absolutely positioned elements like modals here. */}
                <ConfirmationModal open={showModal} setOpen={setShowModal}
                                   subtitle="Das ist ein Bestätigungs-Modal. Hier kann man einige Einstellungen mitgeben!"
                                   onConfirm={() => alert("Confirmed")}/>
            </>
        );

};
