import {useTranslation} from "react-i18next";

export const LanguageSelector = () =>
{
    const [t, i18n] = useTranslation('common');
    return <div>
        <span>{t('language-selector.label')} </span>
        <button onClick={() => {
            i18n.changeLanguage('de')
            localStorage.setItem('locale', 'de')
        }}>
            {t('language-selector.languages.de')}</button>
        &nbsp;
        <button onClick={() => {
            i18n.changeLanguage('en')
            localStorage.setItem('locale', 'en')
        }}>
            {t('language-selector.languages.en')}</button>
    </div>
}