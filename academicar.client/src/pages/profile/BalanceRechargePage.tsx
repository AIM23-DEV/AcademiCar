import {useTranslation} from "react-i18next";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {TitleBar} from "../../components/TitleBar.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {Card} from "../../components/Cards.tsx";

// @ts-ignore
import DOMPurify from 'dompurify';
import {Input, RadioCollection} from "../../components/FormFields.tsx";
import {useState} from "react";
import {Button} from "../../components/Buttons.tsx";

export const BalanceRechargePage = () => {
    const [t] = useTranslation();
    const pageTitle = t("pages/profile:BalanceRechargePage.title");
    const ten_euro = t("pages/profile:BalanceRechargePage.ten_euro");
    const twenty_euro = t("pages/profile:BalanceRechargePage.twenty_euro");
    const thirty_euro = t("pages/profile:BalanceRechargePage.thirty_euro");
    const fifty_euro = t("pages/profile:BalanceRechargePage.fifty_euro");
    const eighty_euro = t("pages/profile:BalanceRechargePage.eighty_euro");
    const hundred_euro = t("pages/profile:BalanceRechargePage.hundred_euro");
    const euro_suffix = t("pages/profile:BalanceRechargePage.euro_suffix");
    const recharge_btn = t("pages/profile:BalanceRechargePage.recharge_btn");
    const [radioValue, setRadioValue] = useState('');


    SetPageTitle(pageTitle);

    return (
        <>
            <TitleBar hasBackAction={true} text={pageTitle}/>

            <div className="w-full flex flex-col items-center pb-24 gap-10">

                <Card
                    label={t("pages/profile:BalanceRechargePage.creditcard")}
                    labelPosition="outside">
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
                                type="text"
                                fullWidth={true}
                                placeholder={t("pages/profile:BalanceRechargePage.csv")}
                                required={true}
                                className="my-8"
                            />
                            <Input
                                id="eine-id"
                                type="text"
                                fullWidth={true}
                                placeholder={t("pages/profile:BalanceRechargePage.month")}
                                required={true}
                                className="my-8"
                            />
                            <Input
                                id="eine-id"
                                type="text"
                                fullWidth={true}
                                placeholder={t("pages/profile:BalanceRechargePage.year")}
                                required={true}
                                className="my-8"
                            />
                        </form>
                    </div>
                </Card>
                <Card
                    label={t("pages/profile:BalanceRechargePage.amount_subtitle")}
                    labelPosition="outside">
                    <div className="flex flex-col items-center justify-center gap-5">
                        <RadioCollection value={radioValue} setValue={setRadioValue} items={[
                            {value: 1, label: ten_euro + euro_suffix},
                            {value: 2, label: twenty_euro + euro_suffix},
                            {value: 3, label: thirty_euro + euro_suffix},
                            {value: 4, label: fifty_euro + euro_suffix},
                            {value: 5, label: eighty_euro + euro_suffix},
                            {value: 6, label: hundred_euro + euro_suffix},
                        ]} useDivider columns={2}/>
                    </div>
                </Card>

                <Button
                    variant="primary"
                    fullWidth
                    text={recharge_btn}
                    textAlign="center"
                    onClick={() => alert("TODO")}
                    className="col-span-full mt-8"
                />
            </div>

            <BottomNavigationBar selected="profile"/>
        </>
    )
}