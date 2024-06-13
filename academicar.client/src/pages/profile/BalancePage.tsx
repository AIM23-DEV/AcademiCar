import {useTranslation} from "react-i18next";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {TitleBar} from "../../components/TitleBar.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {Card} from "../../components/Cards.tsx";
import {Button} from "../../components/Buttons.tsx";
import {BiPlus} from "react-icons/bi";
import {Divider} from "../../components/Divider.tsx";

// @ts-ignore
import DOMPurify from 'dompurify';
import {FaArrowRight} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const DATA = {
    balance: 177.4,
    purchases: [
        {
            start: "Graz",
            destination: "Wien",
            amount: 12
        },
        {
            start: "Wolfsberg",
            destination: "Salzburg",
            amount: -8
        },
        {
            start: "Linz",
            destination: "Wien",
            amount: 14
        }
    ]
}

export const BalancePage = () => {
    const [t] = useTranslation();
    const pageTitle = t("pages/profile:BalancePage.title");
    SetPageTitle(pageTitle);
    const navigate = useNavigate();

    return (
        <>
            <TitleBar hasBackAction={true} text={pageTitle}/>

            <div className="w-full flex flex-col items-center pb-24 gap-10">
                {DATA.balance != null ? (
                    <Card
                        label={t("pages/profile:BalancePage.balance")}
                        labelPosition="outside">
                        <div className="flex flex-col items-center justify-center gap-5">
                            <div className="flex justify-center headline-1 text-primary-600">
                                {DATA.balance} €
                            </div>
                            <Button
                                variant="outline"
                                text={t("pages/profile:BalancePage.recharge")}
                                trailing={<BiPlus className="icon"/>}
                                onClick={() => navigate("recharge/")}   
                            />
                        </div>
                    </Card>
                ) : null}

                {DATA.purchases != null ? (
                    <Card
                        label={t("pages/profile:BalancePage.activities")}
                        labelPosition="outside"
                        outsideLinkText={t('pages/profile:BalancePage.history')}
                        outsideLink={"/profile/balance/history"}>
                        <div className="w-full grid grid-cols-1 gap-5">
                            {DATA.purchases.map((purchase, index) =>
                                <>
                                    <div className="w-full flex justify-between items-center gap-2">
                                        <div className="subtitle flex items-center">
                                            <span>{purchase.start}</span>
                                            <FaArrowRight className="icon mx-2" />
                                            <span>{purchase.destination}</span>
                                        </div>
                                        <div
                                            className={`flex justify-center headline-1 ${
                                                purchase.amount < 0 ? 'text-red-600' : 'text-primary-600'
                                            }`}>
                                            {purchase.amount > 0 ? '+' + purchase.amount : purchase.amount} €
                                        </div>
                                    </div>

                                    {index != DATA.purchases.length - 1 ? (
                                        <Divider/>
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