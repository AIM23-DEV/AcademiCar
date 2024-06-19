import {TitleBar} from "../../components/TitleBar.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {ConfirmationModal} from "../../components/Modal.tsx";
import {useEffect, useState} from "react";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {useTranslation} from "react-i18next";
import { useParams} from "react-router-dom";
import {BiSolidStar, BiTrash, BiShieldX} from "react-icons/bi";
import {TextButton} from "../../components/Buttons.tsx";
import {Divider} from "../../components/Divider.tsx";
import {Card} from "../../components/Cards.tsx";
import {Input} from "../../components/FormFields.tsx";
import {RxAvatar} from "react-icons/rx";

interface TotalRating {
    rating: number;
}
export const ShowUserPage = () => {
    // This is how to import the translation function for multiple namespaces.
    const [t] = useTranslation(['common', 'pages/admin/user']);
    const { id } = useParams();
    const [user, setUser] = useState<IUser | null>();
    const [rating, setRating] = useState<TotalRating | null>();
    const [review, setReview] = useState<number | null>();
    const [error, setError] = useState<string | null>();
    
    // This is how to import the navigator with which you can navigate between pages.
    //const navigate = useNavigate();
    // This is how to work with a component that needs a state
    const [showModal, setShowModal] = useState(false);
    
    
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

    // Loading
    useEffect(() => {
        fetch(`https://localhost:5173/api/admin/users/${id}`)
            .then(response => response.json())
            .then((data)  => setUser(data))
            .catch(error => {
                setError("There was an error fetching the Admin details!");
                console.error(error);
            });
    }, [id]); 
    
    if (error) return <div>{error}</div>;
    if (!user) return <div>Loading user...</div>;
    
    if (user && !rating) {
        fetch(`https://localhost:5173/api/admin/users/rating/${user.id}`)
            .then(response => response.json())
            .then(data => setRating(data))
            .catch(error => {
                setError("There was an error fetching the Admin rating!");
                console.error(error);
            });
    }
    if (!rating) return <div>Loading stats...</div>;
    
    
    if (user && !review) {
        fetch(`https://localhost:5173/api/admin/users/review/${user.id}`)
            .then(response => response.json())
            .then(data => setReview(data))
            .catch(error => {
                setError("There was an error fetching the Admin rating!");
                console.error(error);
            });
    }
    if (!setReview) return <div>Loading stats...</div>;
    
    console.log(review);


    //TODO DELETE & BLOCK USER CONTROLLER aufrufen 
    
    

        return (
            <>
                <TitleBar text={"Account"} hasBackAction/>
                
                <div className="w-full flex flex-col gap-6">
                    <Card>
                        <div className="flex flex-row gap-4 items-center col-span-2">
                            <div className="flex justify-center">
                                {user.pictureSrc ? (<img src={user.pictureSrc} alt="User Picture"
                                                         className="rounded-full w-14 h-14"/>) : (<RxAvatar/>)}

                            </div>
                            <div>
                                <div>{user.firstName + " " + user.lastName}</div>
                                <div className="flex items-center">
                                    <span><BiSolidStar className="icon text-yellow-400"/></span>
                                    <span><BiSolidStar className="icon text-yellow-400"/></span>
                                    <span><BiSolidStar className="icon text-yellow-400"/></span>
                                    <span><BiSolidStar className="icon text-yellow-400"/></span>
                                    <span><BiSolidStar className="icon text-gray-300"/></span>
                                    <span className="ml-2">({rating.rating})</span> //TODO
                                </div>
                                <div className="mt-2">
                                    <span>{ratings} {rating.rating}</span>
                                    
                                </div>
                            </div>
                        </div>
                    </Card>
                    
                    <div className="grid grid-cols-12 gap-6">
                        <Input
                            id="address"
                            type="text"
                            placeholder="Adresse"
                            required={true}
                            value={user.firstName +" " +user.lastName}
                            label={adress}
                            fullWidth={true}
                            className="col-span-12"
                        />

                        <Input
                            id="postal-code"
                            type="text"
                            placeholder="Postleitzahl"
                            required={true}
                            //value={USERDATA.postalCode} //TODO
                            fullWidth={true}
                            className="col-span-4"
                        />

                        <Input
                            id="city"
                            type="text"
                            placeholder="Stadt"
                            required={true}
                            //value={USERDATA.city} //TODO
                            className="col-span-8"
                            fullWidth={true}
                        />
                    </div>
                    
                    <Divider/>
                    
                    <Input
                        label={phonenumber}
                        id="phone"
                        type="text"
                        placeholder="Telefonnummer"
                        required={true}
                        value={user.phoneNumber}
                        fullWidth={true}
                    />
                    
                    <Divider/>
                    
                    <Input
                        label={email}
                        id="email"
                        type="text"
                        placeholder="E-Mail"
                        required={true}
                        value={user.email}
                        fullWidth={true}
                    />
                    
                    <Card
                        label={actions}
                        labelPosition="outside"
                    >
                        <div className="flex flex-col gap-3">
                            <TextButton
                                text={blockaccount}
                                leading={<BiShieldX/>}
                                variant="accent"
                                onClick={() => {
                                    alert("TODO")
                                }}
                            />

                            <TextButton
                                text={deleteaccount}
                                leading={<BiTrash/>}
                                variant="accent"
                                onClick={() => {
                                    alert("TODO")
                                }}
                            />
                        </div>
                    </Card>
                </div> 
                
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
