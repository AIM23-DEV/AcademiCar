import {useTranslation} from "react-i18next";
import {Select} from "./FormFields.tsx";
import {useState} from "react";
import {ApplyLocale, CurrentLocale} from "../hooks/react_i18next.tsx";

export const LanguageSelector = () => {
    const [selectLocale, setSelectLocale] = useState(CurrentLocale());
    const [t] = useTranslation('components/language-selector');

    const OnLocaleChanged = async (e: any) => {
        let newLocale = e.target.value;
        setSelectLocale(newLocale);
        await ApplyLocale(newLocale);
    }

    return <Select id="language-selector" label={t('label')} fullWidth required
                   value={selectLocale} options={{de: t("languages.de"), en: t("languages.en")}}
                   onChange={OnLocaleChanged}/>;
}