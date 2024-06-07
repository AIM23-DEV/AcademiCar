// EN
import common_en from "../translations/en/common.json";
import inputs_en from "../translations/en/inputs.json";
import validation_en from "../translations/en/validation.json";
import pages_admin_en from "../translations/en/pages/admin.json";
import pages_auth_en from "../translations/en/pages/auth.json";
import pages_chat_en from "../translations/en/pages/chat.json";
import pages_profile_en from "../translations/en/pages/profile.json";
import pages_search_en from "../translations/en/pages/search.json";
import pages_trips_en from "../translations/en/pages/trips.json";
import components_language_selector_en from "../translations/en/components/language-selector.json";
// DE
import common_de from "../translations/de/common.json";
import inputs_de from "../translations/de/inputs.json";
import validation_de from "../translations/de/validation.json";
import pages_admin_de from "../translations/de/pages/admin.json";
import pages_auth_de from "../translations/de/pages/auth.json";
import pages_chat_de from "../translations/de/pages/chat.json";
import pages_profile_de from "../translations/de/pages/profile.json";
import pages_search_de from "../translations/de/pages/search.json";
import pages_trips_de from "../translations/de/pages/trips.json";
import components_language_selector_de from "../translations/de/components/language-selector.json";
// Imports
import i18next from "i18next";
import i18n from 'i18next';

export const InitLocalization = async () => {
    const locale = CurrentLocale();

    await i18next.init({
        interpolation: {escapeValue: false},
        lng: locale,
        debug: false,
        resources: {
            en: {
                "common": common_en,
                "inputs": inputs_en,
                "validation": validation_en,
                "pages/admin": pages_admin_en,
                "pages/auth": pages_auth_en,
                "pages/chat": pages_chat_en,
                "pages/profile": pages_profile_en,
                "pages/search": pages_search_en,
                "pages/trips": pages_trips_en,
                "components/language-selector": components_language_selector_en,
            },
            de: {
                "common": common_de,
                "inputs": inputs_de,
                "validation": validation_de,
                "pages/admin": pages_admin_de,
                "pages/auth": pages_auth_de,
                "pages/chat": pages_chat_de,
                "pages/profile": pages_profile_de,
                "pages/search": pages_search_de,
                "pages/trips": pages_trips_de,
                "components/language-selector": components_language_selector_de,
            },
        },
    });

    await ApplyLocale(locale, false);
};

// Apply a new locale globally.
export const ApplyLocale = async (locale: string, withI18n: boolean = true) => {
    localStorage.setItem('locale', locale);
    document.documentElement.lang = locale;

    if (withI18n) {
        await i18n.changeLanguage(locale);
    }
};

/// Get the currently used locale.
export const CurrentLocale = () => {
    return localStorage.getItem("locale") ?? navigator.language;
};