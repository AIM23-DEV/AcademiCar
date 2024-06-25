import {useTranslation} from "react-i18next";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {TitleBar} from "../../components/TitleBar.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {Card} from "../../components/Cards.tsx";
import {Button} from "../../components/Buttons.tsx";
import {BiPlus} from "react-icons/bi";
import {Divider} from "../../components/Divider.tsx";
import {useEffect, useState} from 'react';
import {FaArrowRight} from "react-icons/fa";
import {useNavigate, useParams} from "react-router-dom";
import {IBalance, ITransaction, TransactionSource, TransactionType} from "../../enums.tsx";


export const BalancePage = () => {
    const [t] = useTranslation();
    const pageTitle = t("pages/profile:BalancePage.title");
    SetPageTitle(pageTitle);

    const { loggedInUserId } = useParams();
    const [balance, setBalance] = useState<IBalance>();
    const [transactions, setTransactions] = useState<ITransaction[]>();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/admin/balance/transactions/${loggedInUserId}`)
            .then(response => response.json())
            .then((data) => setTransactions(data))
            .catch((error) => console.error('Error fetching transaction data:', error));

        fetch(`/api/admin/balance/${loggedInUserId}`)
            .then(response => response.json())
            .then((data) => setBalance(data))
            .catch((error) => console.error('Error fetching balance:', error));
    }, [loggedInUserId]);

    return (
        <>
            <TitleBar hasBackAction={true} text={pageTitle}/>

            <div className="w-full flex flex-col items-center pb-24 gap-10">
                {balance != null ? (
                    <Card
                        label={t("pages/profile:BalancePage.balance")}
                        labelPosition="outside"
                    >
                        <div className="flex flex-col items-center justify-center gap-5">
                            <div className="flex justify-center headline-1 text-primary-600">
                                {balance.amount} €
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

                {transactions && transactions.length > 0 ? (
                    <Card
                        label={t("pages/profile:BalancePage.activities")}
                        labelPosition="outside"
                        outsideLinkText={t('pages/profile:BalancePage.history')}
                        outsideLink={`${location.pathname}/history`}
                    >
                        <div className="w-full grid grid-cols-1 gap-5">
                            {transactions.slice(0, 3).map((transaction, index) =>
                                <div key={index}>
                                    <div className="w-full flex justify-between items-center gap-2">
                                        <div className="subtitle flex items-center">
                                            <span>{transaction.transactionSource == TransactionSource.Trip ? t("pages/profile:BalancePage.trip") : t("pages/profile:BalancePage.payment")}</span>
                                            <FaArrowRight className="icon mx-2"/>
                                            <span>{new Date(transaction.transactionDate).toDateString()}</span>
                                        </div>
                                        <div
                                            className={`flex justify-center headline-1 ${
                                                transaction.transactionType == TransactionType.Book ? 'text-red-600' : 'text-primary-600'
                                            }`}>
                                            {transaction.transactionType == TransactionType.Book ? '-' + transaction.amount : '+' + transaction.amount} €
                                        </div>
                                    </div>

                                    {index !== transactions.length - 1 ? (
                                        <Divider/>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    </Card>
                ) : null}
            </div>

            <BottomNavigationBar selected="profile"/>
        </>
    )
}