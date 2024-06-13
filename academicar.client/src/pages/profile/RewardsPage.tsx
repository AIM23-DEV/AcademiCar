import {useTranslation} from "react-i18next";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {TitleBar} from "../../components/TitleBar.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {Card} from "../../components/Cards.tsx";
import {Button, IconButton} from "../../components/Buttons.tsx";
import { BiLeaf, BiChevronRight } from "react-icons/bi";
import {Divider} from "../../components/Divider.tsx";
// @ts-ignore
import DOMPurify from 'dompurify';

const DATA = {
    parking: 4,
    discounts: [
        {
            from: "Reifentechnik 24",
            amount: 10
        },
        {
            from: "Autoservice 1234",
            amount: 15
        },
        {
            from: "Laptops 485",
            amount: 30
        }
    ]
}

// @ts-ignore
function SafeHtml({html}) {
    const sanitizedHtml = DOMPurify.sanitize(html);
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
}
export const RewardsPage = () => {
    const [t] = useTranslation();
    const pageTitle = t("pages/profile:RewardsPage.title");
    SetPageTitle(pageTitle);
    
    return (
        <>
            <TitleBar hasBackAction={true} text={pageTitle}/>
        
            <div className="w-full flex flex-col items-center pb-24 gap-10">
                {DATA.parking != null ? (
                    <Card
                        label={t("pages/profile:RewardsPage.parking.title")}
                        labelPosition="outside"
                    >
                        <div className="flex flex-col items-center justify-center gap-5">
                            <div className="flex text-left subtitle">
                                <SafeHtml html={t("pages/profile:RewardsPage.parking.text", {amount: DATA.parking})} />
                            </div>
                            <Button
                                variant="outline"
                                text={t("pages/profile:RewardsPage.booking")}
                                trailing={<BiChevronRight className="icon"/>}
                                onClick={() => alert("TODO")}
                            />
                        </div>
                    </Card>
                ) : null}

                {DATA.discounts != null ? (
                    <Card
                        label={t("pages/profile:RewardsPage.discounts")}
                        labelPosition="outside"
                    >
                        <div className="w-full grid grid-cols-1 gap-5">
                            {DATA.discounts.map((discount, index) =>
                                <>
                                    <div className="w-full flex justify-between items-center gap-2">
                                        <div className="subtitle">
                                            {discount.from} - {discount.amount}% {t("pages/profile:RewardsPage.discount")}
                                        </div>
                                        <IconButton
                                            variant="primary"
                                            icon={<BiLeaf className="icon-md"/>}
                                            onClick={() => alert("TODO")}
                                        />
                                    </div>

                                    {index != DATA.discounts.length - 1 ? (
                                        <Divider />
                                    ) : null}
                                </>
                            )}
                        </div>
                    </Card>
                ) : null}
            </div>

            <BottomNavigationBar selected="profile"/>
        </>
    )
}