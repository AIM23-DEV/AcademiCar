import {useTranslation} from "react-i18next";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {TitleBar} from "../../components/TitleBar.tsx";
import {BottomNavigationBar} from "../../components/BottomNavigationBar.tsx";
import {Card} from "../../components/Cards.tsx";

// @ts-ignore
import DOMPurify from 'dompurify';
import {Input, RadioCollection} from "../../components/FormFields.tsx";
import {BiLeaf} from "react-icons/bi";

export const BalanceRechargePage = () => {
    const [t] = useTranslation();
    const pageTitle = t("pages/profile:BalanceRechargePage.title");
    const ten_euro = t("pages/profile:BalanceRechargePage.ten_euro");
    const twenty_euro = t("pages/profile:BalanceRechargePage.twenty_euro");
    const thirty_euro = t("pages/profile:BalanceRechargePage.thirty_euro");
    const fifty_euro = t("pages/profile:BalanceRechargePage.fifty_euro");
    const eighty_euro = t("pages/profile:BalanceRechargePage.eighty_euro");
    const hundred_euro = t("pages/profile:BalanceRechargePage.hundred_euro");


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
                            placeholder="Placeholder Text"
                            required={true}
                            className="my-8"
                        />
                        <form aria-label="Suche" className="w-full grid grid-cols-3 gap-4">
                            <Input
                                id="eine-id"
                                type="text"
                                fullWidth={true}
                                placeholder="Placeholder Text"
                                required={true}
                                className="my-8"
                            />
                            <Input
                                id="eine-id"
                                type="text"
                                fullWidth={true}
                                placeholder="Placeholder Text"
                                required={true}
                                className="my-8"
                            />
                            <Input
                                id="eine-id"
                                type="text"
                                fullWidth={true}
                                placeholder="Placeholder Text"
                                required={true}
                                className="my-8"
                            />
                        </form>
                    </div>
                </Card>
                <Card
                    label={t("pages/profile:BalanceRechargePage.amount")}
                    labelPosition="outside">
                    <div className="flex flex-col items-center justify-center gap-5">
                        <RadioCollection value={radioValue} setValue={setSetRadioValue} items={[
                            {
                                value: 1,
                                label:
                                    <div className="flex flex-row space-x-3">
                                        <span>Radio 1</span>
                                        <BiLeaf className="icon"/>
                                    </div>
                            },
                            {value: 2, label: "Radio 2"},
                            {value: 3, label: "Radio 3", disabled: true},
                            {value: 4, label: "Radio 4"},
                        ]} useDivider columns={1}/>
                    </div>
                </Card>
            </div>

            <BottomNavigationBar selected="profile"/>
        </>
    )
}