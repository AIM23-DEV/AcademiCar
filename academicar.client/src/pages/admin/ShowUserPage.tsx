import {TitleBar} from "../../components/TitleBar.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {useEffect, useState} from "react";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {BiSolidStar, BiTrash, BiShieldX} from "react-icons/bi";
import {TextButton} from "../../components/Buttons.tsx";
import {Divider} from "../../components/Divider.tsx";
import {Card} from "../../components/Cards.tsx";
import {Input} from "../../components/FormFields.tsx";
import {RxAvatar} from "react-icons/rx";
import {ConfirmationModal} from "../../components/Modal.tsx";

interface RatingData {
    totalScore: number;
    ratingCount: number;
}

export const ShowUserPage = () => {
    
    //Const for loading data 
    const {id} = useParams();
    const [user, setUser] = useState<IUser | null>();
    const [adressUser, setAdressUser] = useState<IAddress | null>();
    const [ratingData, setRatingData] = useState<RatingData | null>();
    const [review, setReview] = useState<number | null>();
    const [error, setError] = useState<string | null>();

    //General consts 
    const navigate = useNavigate();
    const [showModalBlock, setShowModalBlock] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    //Const translations
    const [t] = useTranslation(['common', 'pages/admin/user']);
    
    // Translations
    const pageTitle = t('pages/admin:ShowUserPage.title');
    const ratings = t('pages/admin:ShowUserPage.ratings');
    const adress = t('pages/admin:ShowUserPage.adress');
    const phonenumber = t('pages/admin:ShowUserPage.phonenumber');
    const email = t('pages/admin:ShowUserPage.email');
    const actions = t('pages/admin:ShowUserPage.actions');
    const blockaccount = t('pages/admin:ShowUserPage.blockaccount');
    const deleteaccount = t('pages/admin:ShowUserPage.deleteaccount');
    const messageBlock = t('pages/admin:ShowUserPage.messageBlock');
    const messageDelete = t('pages/admin:ShowUserPage.messageDelete');


    SetPageTitle(pageTitle);

    //Loading user from IndexUserPage
    useEffect(() => {
        fetch(`https://localhost:5173/api/admin/users/${id}`)
            .then(response => response.json())
            .then((data) => setUser(data))
            .catch(error => {
                setError("There was an error fetching the Admin details!");
                console.error(error);
            });
    }, [id]);

    if (error) return <div>{error}</div>;
    if (!user) return <div>Loading user...</div>;

    //Loading user rating (stars)
    if (user && !ratingData) {
        fetch(`https://localhost:5173/api/admin/users/rating/${user.id}`)
            .then(response => response.json())
            .then(data => setRatingData(data))
            .catch(error => {
                setError("There was an error fetching the Admin rating!");
                console.error(error);
            });
    }
    if (!ratingData) return <div>Loading rating...</div>;

    //Loading user review
    if (user && !review) {
        fetch(`https://localhost:5173/api/admin/users/review/${user.id}`)
            .then(response => response.json())
            .then(data => setReview(data))
            .catch(error => {
                setError("There was an error fetching the Admin review!");
                console.error(error);
            });
    }
    if (!setReview) return <div>Loading stats...</div>;
    
    //Loading user adress
    if (user && !adressUser) {
        fetch(`https://localhost:5173/api/admin/users/address/${user.id}`)
            .then(response => response.json())
            .then(data => setAdressUser(data))
            .catch(error => {
                setError("There was an error fetching the Admin review!");
                console.error(error);
            });
    }
    if (!setAdressUser) return <div>Loading stats...</div>;
    
    //Block user account
    const handleBlock = () => {
        console.log("Button pressed")
        fetch(`https://localhost:5173/api/admin/users/blockUser/${user.id}`, {method: 'PUT'})
            .catch(error => {
                setError("There was an error fetching the Admin Block user account!");
                console.error(error);
            });
        setShowModalBlock(false);
    };

    //Delete user account
    const handleDelete = () => {
        console.log("Button pressed")
        fetch(`https://localhost:5173/api/admin/users/deleteUser/${user.id}`, {method: 'DELETE'})
            .then(() => navigate(`/admin/users`))
            .catch(error => {
                setError("There was an error fetching the Admin Delete user account!");
                console.error(error);
            });
    };

    return (
        <>
            <TitleBar text={"Account"} hasBackAction/>

            <div className="w-full flex flex-col gap-6 pb-24">
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
                                <span><BiSolidStar className="icon text-gray-300"/></span>
                                <span><BiSolidStar className="icon text-gray-300"/></span>
                                <span><BiSolidStar className="icon text-gray-300"/></span>
                                <span className="ml-2">({ratingData.totalScore})</span>
                            </div>
                            <div className="mt-2">
                                <span>{review} {ratings} </span>
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
                        value={adressUser?.street + " " + adressUser?.number}
                        label={adress}
                        fullWidth={true}
                        className="col-span-12"
                    />

                    <Input
                        id="postal-code"
                        type="text"
                        placeholder="Postleitzahl"
                        required={true}
                        value={adressUser?.zip}
                        fullWidth={true}
                        className="col-span-4"
                    />

                    <Input
                        id="city"
                        type="text"
                        placeholder="Stadt"
                        required={true}
                        value={adressUser?.place}
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
                                setShowModalBlock(true);
                            }}
                        />
                        
                        <TextButton
                            text={deleteaccount}
                            leading={<BiTrash/>}
                            variant="accent"
                            onClick={() => {
                                setShowModalDelete(true);
                            }}
                        />
                    </div>
                </Card>
            </div>


            <BottomNavigationBar
                selected={"profile"}
            />
            <ConfirmationModal open={showModalBlock} setOpen={setShowModalBlock}
                               subtitle={messageBlock}
                               onConfirm={() => handleBlock()}
            />
            <ConfirmationModal open={showModalDelete} setOpen={setShowModalDelete}
                               subtitle={messageDelete}
                               onConfirm={() => handleDelete()}
            />
            
        </>
    );

};
