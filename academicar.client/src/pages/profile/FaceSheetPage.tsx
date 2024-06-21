import {useEffect, useState} from 'react';
import { useTranslation } from "react-i18next";
import { TitleBar } from "../../components/TitleBar";
import { BottomNavigationBar } from "../../components/BottomNavigationBar";
import { Button } from "../../components/Buttons";
import { Select } from "../../components/FormFields";
import { Card } from "../../components/Cards";
import {useParams} from "react-router-dom";

interface PrefsData {
    musicPrefs?: string;
    interests?: string;
    travelPrefs?: string;
}

export const FaceSheetPage = () => {
    const [t] = useTranslation(['common', 'pages/profile']);
    const pageTitle = t("pages/profile:PersonalDataFaceSheet.title");
    const musicTasteLabelText = t('pages/profile:PersonalDataFaceSheet.music_taste');
    const interestsLabelText = t('pages/profile:PersonalDataFaceSheet.interests');
    const travelLabelText = t('pages/profile:PersonalDataFaceSheet.communication');
    const saveChangesButtonText = t('pages/profile:PersonalDataFaceSheet.save_changes');

    const { loggedInUserId } = useParams();
    const [prefs, setPrefs] = useState<PrefsData>();
    const [mPrefs, setMPrefs] = useState<string>();
    const [iPrefs, setIPrefs] = useState<string>();
    const [tPrefs, setTPrefs] = useState<string>();
    const [error, setError] = useState<string | null>();

    useEffect(() => {
        fetch(`https://localhost:5173/api/admin/prefs/${loggedInUserId}`)
            .then(response => response.json())
            .then((fetchedPrefs: PrefsData) => {
                setPrefs(fetchedPrefs);
                setMPrefs(prefs?.musicPrefs);
                setIPrefs(prefs?.interests);
                setTPrefs(prefs?.travelPrefs);
            })
            .catch(error => {
                setError(`There was an error fetching preferences: ${error}`);
                console.error(error);
            });
    }, [loggedInUserId]);

    if (error) return <div>{`There was an error: ${error}`}</div>
    
    const saveChanges = () => {
        const newPrefs: PrefsData = {
            musicPrefs: mPrefs,
            interests: iPrefs,
            travelPrefs: tPrefs
        }
        
        fetch(`https://localhost:5173/api/admin/prefs/update/${loggedInUserId}`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPrefs)
        })
            .catch(error => {
                setError(`There was an error updating the trip!`);
                console.error("Error:", error);
            });
        
        alert('Settings saved');
    }

    return (
        <div className="pb-24 w-full">
            <TitleBar text={pageTitle} hasBackAction />
            <Card className="mt-4 w-full">
                <form className="mt-4 w-full grid grid-cols-12 gap-4">
                    <div className="col-span-full">
                        <Select
                            label={musicTasteLabelText}
                            value={mPrefs}
                            required={true}
                            onChange={(e) => setMPrefs(e.target.value)}
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
                        <Select
                            label={interestsLabelText}
                            value={iPrefs}
                            required={true}
                            onChange={(e) => setIPrefs(e.target.value)}
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
                        <Select
                            label={travelLabelText}
                            value={tPrefs}
                            required={true}
                            onChange={(e) => setTPrefs(e.target.value)}
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
                            text={saveChangesButtonText}
                            textAlign="center"
                            onClick={saveChanges}
                            className="mt-4 bg-green-500 text-white p-2 rounded"
                        />
                    </div>
                </form>
            </Card>
            
            <BottomNavigationBar selected="profile" />
        </div>
    );
};
