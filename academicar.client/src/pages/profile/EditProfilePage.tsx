import { TitleBar } from "../../components/TitleBar";
import { BottomNavigationBar } from "../../components/BottomNavigationBar";
import {Button} from "../../components/Buttons";
import SetPageTitle from "../../hooks/set_page_title";
import { useTranslation } from "react-i18next";
import { Card } from "../../components/Cards";
import {ImageUploadForm} from "./partials/ImageUploadForm.tsx";
import {useParams} from "react-router-dom";
import {Input} from "../../components/FormFields.tsx";
import {ChangeEvent, useEffect, useState} from "react";

export const EditProfilePage: React.FC = () => {
    const [t] = useTranslation(['common', 'pages/profile']);
    const pageTitle = t('pages/profile:EditProfilePage.title');
    const labelFirstName = t('pages/profile:EditProfilePage.first_name');
    const labelLastName = t('pages/profile:EditProfilePage.last_name');
    const labelAddress = t('pages/profile:EditProfilePage.address');
    const labelPhoneNumber = t('pages/profile:EditProfilePage.phone_number');
    const labelEmail = t('pages/profile:EditProfilePage.email');
    const saveButtonText = t('pages/profile:EditProfilePage.save_changes');
    SetPageTitle(pageTitle);
    
    const { loggedInUserId } = useParams();
    const [user, setUser] = useState<IUser>();
    const [address, setAddress] = useState<IAddress>();
    const [error, setError] = useState<string | null>();

    useEffect(() => {
        fetch(`https://localhost:5173/api/admin/users/${loggedInUserId}`)
            .then(response => response.json())
            .then((data: IUser) => setUser(data))
            .catch(e => {
                setError(`There was an error fetching the user details: ${e}`);
                console.error(error);
            });
    }, [loggedInUserId]);

    if (user && !address) {
        fetch(`https://localhost:5173/api/admin/users/address/${loggedInUserId}`)
            .then(response => response.json())
            .then((data: IAddress) => setAddress(data))
            .catch(e => {
                setError(`There was an error fetching the user details: ${e}`);
                console.error(error);
            });
    }

    if (error) return <div>{error}</div>;
    if (!user) return <div>Loading user...</div>;
    if (!address) return <div>Loading address...</div>;

    const handleUserInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setUser(prevUser => prevUser ? ({
            ...prevUser,
            [id]: value,
        }) : undefined);
    };

    const handleAddressInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setAddress(prevAddress => prevAddress ? ({
            ...prevAddress,
            [id]: value,
        }) : undefined);
    };
    
    const handleSave = () => {
        fetch(`https://localhost:5173/api/profile/user/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
            .catch(e => {
                setError(`There was an error saving the user details: ${e}`);
                console.error(error);
            });

        fetch(`https://localhost:5173/api/profile/address/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(address)
        })
            .catch(e => {
                setError(`There was an error saving the user address: ${e}`);
                console.error(error);
            });
    }
    
    return (
        <div className="pb-24 w-full">
            <TitleBar text={pageTitle} hasBackAction />
            <div className="flex justify-center">
                <img
                    src="https://academicar.blob.core.windows.net/profile-images/test.jpg"
                    alt="Profile Avatar"
                    className="rounded-full w-32 h-32"
                />
            </div>

            <ImageUploadForm />
            
            <Card label={t('pages/profile:EditProfilePage.title')} className="mt-4 w-full">
                <form className="mt-4 w-full grid grid-cols-12 gap-4">
                    <Input
                        label={labelFirstName}
                        type="text"
                        value={user.firstName}
                        onChange={handleUserInputChange}
                    />
                    <div className="col-span-full">
                        <Input
                            label={labelLastName}
                            type="text"
                            value={user.lastName}
                            onChange={handleUserInputChange}
                        />
                    </div>
                    <div className="col-span-full">
                        <Input
                            label={labelAddress}
                            type="text"
                            value={address.street}
                            onChange={handleAddressInputChange}
                        />
                        <Input
                            type="text"
                            value={address.zip}
                            onChange={handleAddressInputChange}
                        />
                        <Input
                            type="text"
                            value={address.place}
                            onChange={handleAddressInputChange}
                        />
                    </div>
                    <div className="col-span-full">
                        <Input
                            label={labelPhoneNumber}
                            type="text"
                            value={user.phoneNumber}
                            onChange={handleUserInputChange}
                        />
                    </div>
                    <div className="col-span-full">
                        <Input
                            label={labelEmail}
                            type="text"
                            value={user.email}
                            onChange={handleUserInputChange}
                        />
                    </div>

                    {/*TODO expand user entity and interface to support birthdate, gender, nationality (new table), language (new table), study, driver license since*/}
                    {/*<div className="col-span-full">*/}
                    {/*    <label>{t('pages/profile:EditProfilePage.birthdate')}</label>*/}
                    {/*    <input type="date" defaultValue="2000-01-01" className="w-full p-2 border border-gray-300 rounded" />*/}
                    {/*</div>*/}
                    {/*<div className="col-span-full flex justify-between">*/}
                    {/*    <label className="flex items-center">*/}
                    {/*        <input type="radio" name="gender" value="male" defaultChecked className="mr-2" />*/}
                    {/*        {t('pages/profile:EditProfilePage.gender_male')}*/}
                    {/*    </label>*/}
                    {/*    <label className="flex items-center">*/}
                    {/*        <input type="radio" name="gender" value="female" className="mr-2" />*/}
                    {/*        {t('pages/profile:EditProfilePage.gender_female')}*/}
                    {/*    </label>*/}
                    {/*    <label className="flex items-center">*/}
                    {/*        <input type="radio" name="gender" value="divers" className="mr-2" />*/}
                    {/*        {t('pages/profile:EditProfilePage.gender_diverse')}*/}
                    {/*    </label>*/}
                    {/*</div>*/}
                    {/*<div className="col-span-full">*/}
                    {/*    <label>{t('pages/profile:EditProfilePage.nationality')}</label>*/}
                    {/*    <select className="w-full p-2 border border-gray-300 rounded">*/}
                    {/*        <option>{t('pages/profile:EditProfilePage.nationality')}</option>*/}
                    {/*        /!* Add more options here *!/*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                    {/*<div className="col-span-full">*/}
                    {/*    <label>{t('pages/profile:EditProfilePage.languages')}</label>*/}
                    {/*    <select className="w-full p-2 border border-gray-300 rounded">*/}
                    {/*        <option>{t('pages/profile:EditProfilePage.languages')}</option>*/}
                    {/*        /!* Add more options here *!/*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                    {/*<div className="col-span-full">*/}
                    {/*    <label>{t('pages/profile:EditProfilePage.study_program')}</label>*/}
                    {/*    <input type="text" defaultValue="Wirtschaftsinformatik Master" className="w-full p-2 border border-gray-300 rounded" />*/}
                    {/*</div>*/}
                    {/*<div className="col-span-full">*/}
                    {/*    <label>{t('pages/profile:EditProfilePage.drivers_license_since')}</label>*/}
                    {/*    <input type="date" defaultValue="2019-10-27" className="w-full p-2 border border-gray-300 rounded" />*/}
                    {/*</div>*/}
                    
                    <div className="col-span-full">
                        <Button
                            variant="primary"
                            fullWidth
                            text={saveButtonText}
                            textAlign="center"
                            onClick={handleSave}
                            className="mt-4"
                        />
                    </div>
                </form>
            </Card>

            <BottomNavigationBar selected="profile" />
        </div>
    );
};
