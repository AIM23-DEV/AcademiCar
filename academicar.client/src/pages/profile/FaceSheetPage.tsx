import {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {TitleBar} from "../../components/TitleBar";
import {Button} from "../../components/Buttons";
import {Input} from "../../components/FormFields";
import {useAuth} from "../../AuthContext.tsx";
import {Toast} from "../../components/Toast.tsx";
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
    const auth = useAuth();
    const [mPrefs, setMPrefs] = useState<string>("");
    const [iPrefs, setIPrefs] = useState<string>("");
    const [tPrefs, setTPrefs] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [showToast, setShowToast] = useState<boolean>(false);

    useEffect(() => {
        if (auth.user?.id ?? null) {
            fetch(`/api/admin/prefs/${loggedInUserId}`)
                .then(response => response.json())
                .then((fetchedPrefs: PrefsData) => {
                    setMPrefs(fetchedPrefs?.musicPrefs ?? "");
                    setIPrefs(fetchedPrefs?.interests ?? "");
                    setTPrefs(fetchedPrefs?.travelPrefs ?? "");
                })
                .catch(error => {
                    setError(`There was an error fetching preferences: ${error}`);
                    console.error(error);
                });
        }
    }, [auth.user?.id]);

    if (error) return <div>{`There was an error: ${error}`}</div>

    const saveChanges = (event: any) => {
        event.preventDefault();
        const newPrefs: PrefsData = {
            musicPrefs: mPrefs,
            interests: iPrefs,
            travelPrefs: tPrefs
        }

        fetch(`/api/admin/prefs/update/${loggedInUserId}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newPrefs)
        })
            .then((response) => {
                console.log(response);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            })
            .catch(error => {
                setError(`There was an error updating the trip!`);
                console.error("Error:", error);
            });
    }

    return (
        <>
            <TitleBar text={pageTitle} hasBackAction/>

            <form className="w-full flex flex-col space-y-6 mt-6 mb-24" onSubmit={saveChanges}>
                <Input
                    label={musicTasteLabelText}
                    value={mPrefs}
                    required={true}
                    onChange={(e) => setMPrefs(e.target.value)}
                    fullWidth
                    className="col-span-full"
                />
                <Input
                    label={interestsLabelText}
                    value={iPrefs}
                    required={true}
                    onChange={(e) => setIPrefs(e.target.value)}
                    fullWidth
                    className="col-span-full"
                />
                <Input
                    label={travelLabelText}
                    value={tPrefs}
                    required={true}
                    onChange={(e) => setTPrefs(e.target.value)}
                    fullWidth
                    className="col-span-full"
                />

                {showToast ?
                    <Toast variant="info" message="Dein Steckbrief wurde gespeichert."
                           className="fixed bottom-6 inset-x-6 !w-auto"/>
                    : <Button
                        variant="primary"
                        text={saveChangesButtonText}
                        textAlign="center"
                        type="submit"
                        className="fixed bottom-6 inset-x-6 !w-auto"
                    />}
            </form>

        </>
    );
};
