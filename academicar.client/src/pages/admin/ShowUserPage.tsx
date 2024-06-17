import {TitleBar} from "../../components/TitleBar.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {ConfirmationModal} from "../../components/Modal.tsx";
import {useState} from "react";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {BiSolidStar} from "react-icons/bi";
import {TextButton} from "../../components/Buttons.tsx";
import {Divider} from "../../components/Divider.tsx";
import {Card} from "../../components/Cards.tsx";
import {FaRegTrashAlt, FaShieldAlt} from "react-icons/fa";
import {Input} from "../../components/FormFields.tsx";



export const ShowUserPage = () => {
    // This is how to import the translation function for multiple namespaces.
    const [t] = useTranslation(['common', 'pages/admin/user']);

    // Tranlations
    const pageTitle = t('pages/admin:ShowUserPage.title');
    const ratings = t('pages/admin:ShowUserPage.ratings');
    const adress = t('pages/admin:ShowUserPage.adress');
    const phonenumber = t('pages/admin:ShowUserPage.phonenumber');
    const email = t('pages/admin:ShowUserPage.email');
    const actions = t('pages/admin:ShowUserPage.actions');
    const blockaccount = t('pages/admin:ShowUserPage.blockaccount');
    const deleteaccount = t('pages/admin:ShowUserPage.deleteaccount');
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
                <div className="w-full grid grid-cols-2 gap-4">


                        <div className="flex flex-row gap-4 items-center col-span-2">
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
                                    <span>{ratings}: {USERDATA.reviews}</span>
                                </div>
                            </div>
                        </div>


                    <div className="grid-cols-1  gap-6 my-8">
                        <Input
                            id="address"
                            type="text"
                            placeholder="Adresse"
                            required={true}
                            value={USERDATA.address}
                            label={adress}
                            className="col-span-2"
                        />

                   
                        <div className="address-info">
                            <Input
                                id="postal-code"
                                type="text"
                                placeholder="Postleitzahl"
                                required={true}
                                value={USERDATA.postalCode}
                                
                            />
                            <Input
                                id="city"
                                type="text"
                                placeholder="Stadt"
                                required={true}
                                value={USERDATA.city}
                                
                            />
                        </div>
                    </div>
                    
                    <Divider className="my-2" />
                    
                    
                    <div className="user-details-section">
                        <h3>{phonenumber}</h3>
                        <Input
                            id="phone"
                            type="text"
                            placeholder="Telefonnummer"
                            required={true}
                            value={USERDATA.phone}
                            
                        />
                    </div>
                    <Divider className="my-2" />
                    <div className="user-details-section">
                        <h3>{email}</h3>
                        <Input
                            id="email"
                            type="text"
                            placeholder="E-Mail"
                            required={true}
                            value={USERDATA.email}
                            
                        />
                    </div>

                    



                <Card
                    id="lbl_1"
                    label={actions} //TODO actions
                    labelPosition="outside"
                    padding="base"
                    className="mt-8"
                >
                    <p>

                        <TextButton
                            text={blockaccount} 
                            type="button"
                            fullWidth
                            textAlign="center"
                            variant="outline"
                            onClick={() => navigate("/auth/login")}
                            leading={<FaShieldAlt className="icon-md"/>}
                        />

                        <TextButton
                            text={deleteaccount} 
                            type="button"
                            fullWidth
                            textAlign="center"
                            variant="outline"
                            onClick={() => navigate("/auth/login")}
                            leading={<FaRegTrashAlt className="icon-md"/>}
                        />
                        
                        
                    </p>
                </Card>
                </div>
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
