import {useTranslation} from "react-i18next";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {TitleBar} from "../../components/TitleBar.tsx";
import {Card} from "../../components/Cards.tsx";
import {Button} from "../../components/Buttons.tsx";
import {BiPlus} from "react-icons/bi";
import {Divider} from "../../components/Divider.tsx";

// @ts-ignore
import DOMPurify from 'dompurify';
import {FaArrowRight} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import React from "react";

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

            <div className="w-full flex flex-col items-center mb-24 mt-6 gap-6">
                {DATA.balance != null ? (
                    <Card
                        label={t("pages/profile:BalancePage.balance")}
                        labelPosition="outside" className="text-center headline-1 text-primary-600">
                        {DATA.balance} €
                    </Card>
                ) : null}

                {DATA.purchases != null ? (
                    <Card
                        label={t("pages/profile:BalancePage.activities")}
                        labelPosition="outside"
                        outsideLinkText={t('pages/profile:BalancePage.history')}
                        outsideLink={"balance/history/"}>
                        <div className="w-full grid grid-cols-1 gap-5">
                            {DATA.purchases.map((purchase, index) =>
                                <React.Fragment key={index}>
                                    <div className="w-full flex justify-between items-center gap-2">
                                        <div className="subtitle flex items-center">
                                            <span>{purchase.start}</span>
                                            <FaArrowRight className="icon mx-2"/>
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
                                </React.Fragment>
                            )}
                        </div>
                    </Card>
                ) : null}
            </div>

            <Button
                variant="primary"
                text={t("pages/profile:BalancePage.recharge")}
                textAlign="center"
                onClick={() => navigate("recharge/")}
                trailing={<BiPlus className="icon-md"/>}
                className="fixed bottom-6 inset-x-6 !w-auto"
            />
        </>
    )
}