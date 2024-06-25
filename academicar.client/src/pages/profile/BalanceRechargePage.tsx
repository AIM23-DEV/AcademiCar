import {useTranslation} from "react-i18next";
import {TitleBar} from "../../components/TitleBar.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {Card} from "../../components/Cards.tsx";
import {Input, RadioCollection} from "../../components/FormFields.tsx";
import {useState} from "react";
import {Button} from "../../components/Buttons.tsx";
import {ITransaction, TransactionSource, TransactionType} from "../../enums.tsx";
import {useParams} from "react-router-dom";

export const BalanceRechargePage = () => {
    const [t] = useTranslation();
    const pageTitle = t("pages/profile:BalanceRechargePage.title");
    const recharge_btn = t("pages/profile:BalanceRechargePage.recharge_btn");
    const { loggedInUserId } = useParams();
    const [radioValue, setRadioValue] = useState<number>(1);
    const amounts = [10, 20, 30, 50, 80, 100];
    const values = amounts.map((amount, index) => ({
        value: index + 1,
        label: amount + t("pages/profile:BalanceRechargePage.euro_suffix")
    }));

    const handleSubmit = async () => {
        const amount = amounts[radioValue - 1]; // Convert radioValue to the corresponding amount
        const transaction: ITransaction = {
            id: 0,
            fK_User: loggedInUserId,
            transactionType: TransactionType.Charge,
            amount: amount,
            transactionDate: new Date(),
            transactionSource: TransactionSource.Payment
        };

        const response = await fetch('/api/admin/balance/charge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        });

        if (response.ok) {
            alert('Balance charged successfully');
        } else {
            alert('Failed to charge balance');
        }
    };

    return (
        <>
            <TitleBar hasBackAction={true} text={pageTitle}/>

            <div className="w-full flex flex-col items-center pb-24 gap-10">

                <Card
                    label={t("pages/profile:BalanceRechargePage.amount_subtitle")}
                    labelPosition="outside">
                    <div className="flex flex-col items-center justify-center gap-5">
                        <RadioCollection
                            value={radioValue}
                            setValue={setRadioValue}
                            items={values}
                            useDivider
                            columns={2}
                        />
                    </div>
                </Card>


                <Button
                    variant="primary"
                    fullWidth
                    text={recharge_btn}
                    textAlign="center"
                    onClick={handleSubmit}
                    className="col-span-full mt-8"
                />

                <Card
                    label={t("pages/profile:BalanceRechargePage.creditcard")}
                    labelPosition="outside"
                >
                    <div className="flex flex-col items-center justify-center gap-5">
                        <Input
                            id="eine-id"
                            type="text"
                            fullWidth={true}
                            placeholder={t("pages/profile:BalanceRechargePage.card_holder")}
                            required={true}
                            className="my-8"
                        />
                        <form aria-label="Suche" className="w-full grid grid-cols-3 gap-4">
                            <Input
                                id="eine-id"
                                type="number"
                                fullWidth={true}
                                placeholder={t("pages/profile:BalanceRechargePage.csv")}
                                required={true}
                                className="my-8"
                            />
                            <Input
                                id="eine-id"
                                type="number"
                                fullWidth={true}
                                placeholder={t("pages/profile:BalanceRechargePage.month")}
                                required={true}
                                className="my-8"
                            />
                            <Input
                                id="eine-id"
                                type="number"
                                fullWidth={true}
                                placeholder={t("pages/profile:BalanceRechargePage.year")}
                                required={true}
                                className="my-8"
                            />
                        </form>
                    </div>
                </Card>

            </div>

            <BottomNavigationBar selected="profile"/>
        </>
    )
}