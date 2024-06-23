import {useTranslation} from "react-i18next";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {TitleBar} from "../../components/TitleBar.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {Card} from "../../components/Cards.tsx";
import {Divider} from "../../components/Divider.tsx";
import {FaArrowRight} from "react-icons/fa";
import {RiDeleteBinLine} from "react-icons/ri";
import {TextButton} from "../../components/Buttons.tsx";
import {useEffect, useState} from 'react';
import {ITransaction, TransactionSource, TransactionType} from "../../enums.tsx";

export const BalanceHistoryPage = () => {
    const [t] = useTranslation();
    const pageTitle = t("pages/profile:BalanceHistoryPage.title");
    const [transactions, setTransactions] = useState<ITransaction[]>();
    SetPageTitle(pageTitle);

    const fetchTransactions = async () => {
        try {
            const response = await fetch(`/api/Balance/transactions/${userid}`);
            if (response.status === 404) {
                setTransactions([]);
            } else {
                const data = await response.json();
                setTransactions(data);
            }
        } catch (error) {
            console.error('Error fetching transaction data:', error);
        }
    };

    const userid = 1 //TODO must be replaced with real user id
    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/Balance/transactions/${userid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                fetchTransactions();
                alert("All your transactions has been deleted")
            } else {
                console.error('Failed to delete transactions');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <>
            <TitleBar hasBackAction={true} text={pageTitle}/>
            <div className="w-full flex flex-col items-center pb-6 gap-10">
                {transactions && transactions.length > 0 ? (
                    <Card>
                        <div className="w-full grid grid-cols-1 gap-5">
                            {transactions.map((transaction, index) =>
                                <>
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
                onClick={handleDelete}
                leading={<RiDeleteBinLine className="icon-md"/>}
                className="mb-16"
            />

            <BottomNavigationBar selected="profile"/>
        </>
    )
}