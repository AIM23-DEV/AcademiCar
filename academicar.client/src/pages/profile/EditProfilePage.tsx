import {TitleBar} from "../../components/TitleBar";
import {Button} from "../../components/Buttons";
import SetPageTitle from "../../hooks/set_page_title";
import {useTranslation} from "react-i18next";
import {ImageUploadForm} from "./partials/ImageUploadForm.tsx";
import {useParams} from "react-router-dom";
import {Input, RadioCollection, Select} from "../../components/FormFields.tsx";
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

    const {loggedInUserId} = useParams();
    const [user, setUser] = useState<IUser>();
    const [address, setAddress] = useState<IAddress>();
    const [error, setError] = useState<string | null>();
    const [sex, setSex] = useState<string>("male");

    useEffect(() => {
        fetch(`/api/admin/users/${loggedInUserId}`)
            .then(response => response.json())
            .then((data: IUser) => setUser(data))
            .catch(e => {
                setError(`There was an error fetching the user details: ${e}`);
                console.error(error);
            });
    }, [loggedInUserId]);

    if (user && !address) {
        fetch(`/api/admin/users/address/${loggedInUserId}`)
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
        fetch(`/api/profile/user/update`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
            .catch(e => {
                setError(`There was an error saving the user details: ${e}`);
                console.error(error);
            });

        fetch(`/api/profile/address/update`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(address)
        })
            .catch(e => {
                setError(`There was an error saving the user address: ${e}`);
                console.error(error);
            });
    }

    return (
        <>
            <TitleBar text={pageTitle} hasBackAction/>

            <div className="flex justify-center">
                <img
                    src={user.pictureSrc ?? "https://academicar.blob.core.windows.net/profile-images/test.jpg"}
                    alt="Profile Avatar"
                    className="rounded-full icon-3xl"
                />
            </div>

            {/* Todo merge upload logic into the image above and save it with other data. */}
            <ImageUploadForm/>

            <form onSubmit={handleSave} className="mt-4 w-full grid grid-cols-12 gap-6 mb-24">
                <Input
                    label={labelFirstName}
                    type="text"
                    value={user.firstName}
                    onChange={handleUserInputChange}
                    fullWidth
                    className="col-span-full"
                />

                <Input
                    label={labelLastName}
                    type="text"
                    value={user.lastName}
                    onChange={handleUserInputChange}
                    fullWidth
                    className="col-span-full"
                />

                <Input
                    label={labelAddress}
                    type="text"
                    value={address.street}
                    onChange={handleAddressInputChange}
                    fullWidth
                    className="col-span-full"
                />

                <Input
                    type="text"
                    value={address.zip}
                    onChange={handleAddressInputChange}
                    fullWidth
                    className="col-span-4"
                />

                <Input
                    type="text"
                    value={address.place}
                    onChange={handleAddressInputChange}
                    fullWidth
                    className="col-span-8"
                />

                <Input
                    label={labelPhoneNumber}
                    type="text"
                    value={user.phoneNumber}
                    onChange={handleUserInputChange}
                    fullWidth
                    className="col-span-full"
                />

                <Input
                    label={labelEmail}
                    type="text"
                    value={user.email}
                    onChange={handleUserInputChange}
                    fullWidth
                    className="col-span-full"
                />

                {/*TODO expand user entity and interface to support birthdate, gender, nationality (new table), language (new table), study, driver license since*/}
                <Input
                    label={t('pages/profile:EditProfilePage.birthdate')}
                    type="date"
                    // value={DateTime.now().getTime()}
                    onChange={handleUserInputChange}
                    fullWidth
                    className="col-span-full"
                />

                <div className="col-span-full w-full space-y-3">
                    <RadioCollection value={sex} setValue={setSex} label={t('pages/profile:EditProfilePage.gender')}
                                     items={[
                                         {value: "male", label: t('pages/profile:EditProfilePage.gender_male')},
                                         {value: "female", label: t('pages/profile:EditProfilePage.gender_female')},
                                         {value: "divers", label: t('pages/profile:EditProfilePage.gender_diverse')},
                                     ]}
                                     columns={3} className="place-items-center"
                    />
                </div>

                {/* Todo: ddd options */}
                <Select label={t('pages/profile:EditProfilePage.nationality')} fullWidth className="col-span-full"/>

                {/* Todo: ddd options */}
                <Select label={t('pages/profile:EditProfilePage.languages')} fullWidth className="col-span-full"/>

                <Input
                    label={t('pages/profile:EditProfilePage.study_program')}
                    type="text"
                    value="Wirtschaftsinformatik Master"
                    onChange={handleUserInputChange}
                    fullWidth
                    className="col-span-full"
                />

                <Input
                    label={t('pages/profile:EditProfilePage.drivers_license_since')}
                    type="date"
                    value="2019-10-27"
                    onChange={handleUserInputChange}
                    fullWidth
                    className="col-span-full"
                />

                <Button
                    variant="primary"
                    text={saveButtonText}
                    textAlign="center"
                    type="submit"
                    className="fixed bottom-6 inset-x-6 !w-auto"
                />
            </form>
        </>
    );
};
