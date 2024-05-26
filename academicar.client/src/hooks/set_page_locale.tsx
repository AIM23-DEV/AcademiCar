import i18next from "i18next";
import common_de from "../translations/de/common.json";
import common_en from "../translations/en/common.json";
import { useEffect, useState } from 'react';

export default () => {
    const [language, setLanguage] = useState('');


    useEffect(() => {
        const fetchLanguage = async () => {
            // Simulate an asynchronous operation
            const userLanguage = navigator.language || navigator.language;
            // Simulate a delay (e.g., network request)
            await new Promise(resolve => setTimeout(resolve, 0));
            setLanguage(userLanguage);
        };

        fetchLanguage();
    }, []);

    if (!localStorage.getItem("locale")) {
        localStorage.setItem("locale", language)
    }

    let abc = localStorage.getItem('locale') ?? 'en'

    i18next.init({
        interpolation: { escapeValue: false },  // React already does escaping
        lng: abc,                              // language to use
        resources: {
            en: {
                common: common_en               // 'common' is our custom namespace
            },
            de: {
                common: common_de
            },
        },
    });
}

