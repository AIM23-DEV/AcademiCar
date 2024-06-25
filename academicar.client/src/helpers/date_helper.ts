import {CurrentLocale} from "../hooks/react_i18next.tsx";

export const formatDate = (input: any): string => {
    const date = new Date(input);
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }

    const locale = CurrentLocale();
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgoStart = new Date(todayStart);
    weekAgoStart.setDate(todayStart.getDate() - 7);

    if (date >= todayStart) {
        return date.toLocaleTimeString(locale, {hour: '2-digit', minute: '2-digit'});
    } else if (date >= weekAgoStart) {
        return date.toLocaleDateString(locale, {weekday: 'long'});
    } else {
        return date.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        });
    }
}