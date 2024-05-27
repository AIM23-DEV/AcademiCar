import i18next from "i18next";
import common_de from "../translations/de/common.json";
import common_en from "../translations/en/common.json";
import profile_de from "../translations/de/profile.json";
import profile_en from "../translations/en/profile.json";

export default () => {
    let browserLocale:string;
    if (!localStorage.getItem('locale')) {
        localStorage.setItem('locale', navigator.language)
        browserLocale = navigator.language
    }
    else {
        browserLocale = localStorage.getItem('locale') ?? 'en'
    }

    i18next.init({
        interpolation: { escapeValue: false },
        lng: browserLocale,
        resources: {
            en: {
                common: common_en,
                profile: profile_en
                
            },
            de: {
                common: common_de,
                profile: profile_de
            },
        },
    });
}