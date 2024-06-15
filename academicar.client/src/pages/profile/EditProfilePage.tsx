import { TitleBar } from "../../components/TitleBar";
import { BottomNavigationBar } from "../../components/BottomNavigationBar";
import {Button} from "../../components/Buttons";
import SetPageTitle from "../../hooks/set_page_title";
import { useTranslation } from "react-i18next";
import { Card } from "../../components/Cards";
import {SASForm} from "./partials/ImageUploadWithSAS.tsx";
import {ImageUploadForm} from "./partials/ImageUploadForm.tsx";

const EditProfilePage: React.FC = () => {
    const [t] = useTranslation(['common', 'pages/profile']);
    const pageTitle = t('pages/profile:EditProfilePage.title');
    SetPageTitle(pageTitle);


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

            <SASForm/>
            <ImageUploadForm />
            <Card label={t('pages/profile:EditProfilePage.title')} className="mt-4 w-full">
                <form className="mt-4 w-full grid grid-cols-12 gap-4">
                    <div className="col-span-full">
                        <label>{t('pages/profile:EditProfilePage.first_name')}</label>
                        <input type="text" defaultValue="Maximilian" className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="col-span-full">
                        <label>{t('pages/profile:EditProfilePage.last_name')}</label>
                        <input type="text" defaultValue="Bauer" className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="col-span-full">
                        <label>{t('pages/profile:EditProfilePage.address')}</label>
                        <input type="text" defaultValue="Musterstraße 123 / Top 456" className="w-full p-2 border border-gray-300 rounded" />
                        <input type="text" defaultValue="8010" className="w-full p-2 border border-gray-300 rounded mt-2" />
                        <input type="text" defaultValue="Musterstadt" className="w-full p-2 border border-gray-300 rounded mt-2" />
                    </div>
                    <div className="col-span-full">
                        <label>{t('pages/profile:EditProfilePage.phone_number')}</label>
                        <input type="text" defaultValue="+43 (0) 664 1234567" className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="col-span-full">
                        <label>{t('pages/profile:EditProfilePage.email')}</label>
                        <input type="email" defaultValue="musterEMailadresse@gmail.com" className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="col-span-full">
                        <label>{t('pages/profile:EditProfilePage.birthdate')}</label>
                        <input type="date" defaultValue="2000-01-01" className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="col-span-full flex justify-between">
                        <label className="flex items-center">
                            <input type="radio" name="gender" value="male" defaultChecked className="mr-2" />
                            {t('pages/profile:EditProfilePage.gender_male')}
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="gender" value="female" className="mr-2" />
                            {t('pages/profile:EditProfilePage.gender_female')}
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="gender" value="divers" className="mr-2" />
                            {t('pages/profile:EditProfilePage.gender_diverse')}
                        </label>
                    </div>
                    <div className="col-span-full">
                        <label>{t('pages/profile:EditProfilePage.nationality')}</label>
                        <select className="w-full p-2 border border-gray-300 rounded">
                            <option>{t('pages/profile:EditProfilePage.nationality')}</option>
                            {/* Add more options here */}
                        </select>
                    </div>
                    <div className="col-span-full">
                        <label>{t('pages/profile:EditProfilePage.languages')}</label>
                        <select className="w-full p-2 border border-gray-300 rounded">
                            <option>{t('pages/profile:EditProfilePage.languages')}</option>
                            {/* Add more options here */}
                        </select>
                    </div>
                    <div className="col-span-full">
                        <label>{t('pages/profile:EditProfilePage.study_program')}</label>
                        <input type="text" defaultValue="Wirtschaftsinformatik Master" className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="col-span-full">
                        <label>{t('pages/profile:EditProfilePage.drivers_license_since')}</label>
                        <input type="date" defaultValue="2019-10-27" className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="col-span-full">
                        <Button
                            variant="primary"
                            fullWidth
                            text={t('pages/profile:EditProfilePage.save_changes')}
                            textAlign="center"
                            onClick={() => alert('Changes saved')}
                            className="mt-4"
                        />
                    </div>
                </form>
            </Card>

            <BottomNavigationBar selected="profile" />
        </div>
    );
};

export default EditProfilePage;
