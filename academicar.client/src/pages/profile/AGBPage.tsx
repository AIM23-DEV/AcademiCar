import {TitleBar} from "../../components/TitleBar";
import {BottomNavigationBar} from "../../components/BottomNavigationBar";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {useTranslation} from "react-i18next";
import styled from 'styled-components';

const Container = styled.div`
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
    padding-bottom: 50px;
`;

const Section = styled.section`
  margin-bottom: 24px;
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;
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
    //const heading5 = t('pages/profile:AGBPage.heading5');
    //const paragraph5 = t('pages/profile:AGBPage.paragraph5');
    
    return (
        <>
            <TitleBar text={pageTitle} hasBackAction={true}/>
            <Container>
                <Section>
                    <Heading>{heading1}</Heading>
                    <Paragraph>{paragraph1}</Paragraph>
                </Section>
                <Section>
                    <Heading>{heading2}</Heading>
                    <Paragraph>{paragraph2}</Paragraph>
                </Section>
                <Section>
                    <Heading>{heading3}</Heading>
                    <Paragraph>{paragraph3}</Paragraph>
                </Section>
                <Section>
                    <Heading>{heading4}</Heading>
                    <Paragraph>{paragraph4}</Paragraph>
                </Section>
            </Container>
            <BottomNavigationBar />
        </>
    );
};
