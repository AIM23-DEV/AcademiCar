import {useTranslation} from "react-i18next";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {TitleBar} from "../../components/TitleBar.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {Card} from "../../components/Cards.tsx";
import {Divider} from "../../components/Divider.tsx";
import {FaArrowRight} from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import {TextButton} from "../../components/Buttons.tsx";
// @ts-ignore
import DOMPurify from 'dompurify';

const DATA = {
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
            amount: 18
        },
        {
            start: "Bregenz",
            destination: "Wien",
            amount: -12
        },
        {
            start: "Klagenfurt",
            destination: "Wolfsberg",
            amount: -7
        },
        {
            start: "Wien",
            destination: "Graz",
            amount: 13
        },
        {
            start: "Graz",
            destination: "Klagenfurt",
            amount: 8
        },
        {
            start: "Wolfsberg",
            destination: "Wien",
            amount: -18
        },
        {
            start: "Linz",
            destination: "Klagenfurt",
            amount: 20
        }
    ]
}

export const BalanceHistoryPage = () => {
    const [t] = useTranslation();
    const pageTitle = t("pages/profile:BalanceHistoryPage.title");
    SetPageTitle(pageTitle);

    return (
        <>
            <TitleBar hasBackAction={true} text={pageTitle}/>
            <div className="w-full flex flex-col items-center pb-6 gap-10">
                {DATA.purchases != null ? (
                    <Card>
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

            <TextButton
                text={t("pages/profile:BalanceHistoryPage.delete")}
                type="button"
                fullWidth
                textAlign="center"
                variant="accent"
                onClick={() => alert("TODO")}
                leading={<RiDeleteBinLine className="icon-md"/>}
                className="mb-16"
            />

            <BottomNavigationBar selected="profile"/>
        </>
    )
}