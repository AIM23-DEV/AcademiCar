import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { TitleBar } from "../../components/TitleBar";
import { BottomNavigationBar } from "../../components/BottomNavigationBar";
import { Button } from "../../components/Buttons";
import { Select } from "../../components/FormFields";
import { Card } from "../../components/Cards";

const PersonalDataFactSheet: React.FC = () => {
    const [t] = useTranslation(['common', 'pages/profile']);
    const [musicTaste, setMusicTaste] = useState('');
    const [interests, setInterests] = useState('');
    const [communication, setCommunication] = useState('');

    return (
        <div className="pb-24 w-full">
            <TitleBar text={t("pages/profile:PersonalDataFaceSheet.title")} hasBackAction />
            <Card label={t('pages/profile:PersonalDataFaceSheet.title')} className="mt-4 w-full">
                <form className="mt-4 w-full grid grid-cols-12 gap-4">
                    <div className="col-span-full">
                        <label>{t('pages/profile:PersonalDataFaceSheet.music_taste')}</label>
                        <Select
                            value={musicTaste}
                            onChange={(e) => setMusicTaste(e.target.value)}
                            options={{
                                jazz: 'Jazz',
                                pop: 'Pop',
                                schlager: 'Schlager',
                                techno: 'Techno / Teckno'
                            }}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="col-span-full">
                        <label>{t('pages/profile:PersonalDataFaceSheet.interests')}</label>
                        <Select
                            value={interests}
                            onChange={(e) => setInterests(e.target.value)}
                            options={{
                                nature: 'Natur',
                                cooking: 'Kochen',
                                travel: 'Reisen',
                                reading: 'Lesen',
                                sports: 'Sport'
                            }}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="col-span-full">
                        <label>{t('pages/profile:PersonalDataFaceSheet.communication')}</label>
                        <Select
                            value={communication}
                            onChange={(e) => setCommunication(e.target.value)}
                            options={{
                                talkative: 'Gesprächig',
                                reserved: 'Zurückhaltend'
                            }}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="col-span-full">
                        <Button
                            variant="primary"
                            fullWidth
                            text={t('pages/profile:PersonalDataFaceSheet.save_changes')}
                            textAlign="center"
                            onClick={() => alert('Settings saved')}
                            className="mt-4 bg-green-500 text-white p-2 rounded"
                        />
                    </div>
                </form>
            </Card>
            <BottomNavigationBar selected="profile" />
        </div>
    );
};

export default PersonalDataFactSheet;
