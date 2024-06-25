import {TitleBar} from "../../components/TitleBar";
import {BottomNavigationBar} from "../../components/BottomNavigationBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {useTranslation} from "react-i18next";
import {Card} from "../../components/Cards.tsx";

export const AGBPage: React.FC = () => {
    const [t] = useTranslation(['common', 'pages/profile']);

    const pageTitle = t('pages/profile:AGBPage.title');
    SetPageTitle(pageTitle);

    const heading1 = t('pages/profile:AGBPage.heading1');
    const paragraph1 = t('pages/profile:AGBPage.paragraph1');
    const heading2 = t('pages/profile:AGBPage.heading2');
    const paragraph2 = t('pages/profile:AGBPage.paragraph2');
    const heading3 = t('pages/profile:AGBPage.heading3');
    const paragraph3 = t('pages/profile:AGBPage.paragraph3');
    const heading4 = t('pages/profile:AGBPage.heading4');
    const paragraph4 = t('pages/profile:AGBPage.paragraph4');

    return (
        <>
            <TitleBar text={pageTitle} hasBackAction={true}/>
            <div className="flex flex-col space-y-6 mt-6 mb-24">
                <Card label={heading1}>
                    {paragraph1}
                </Card>
                <Card label={heading2}>
                    {paragraph2}
                </Card>
                <Card label={heading3}>
                    {paragraph3}
                </Card>
                <Card label={heading4}>
                    {paragraph4}
                </Card>
            </div>
            <BottomNavigationBar/>
        </>
    );
};
