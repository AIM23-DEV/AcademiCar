import {useTranslation} from "react-i18next";
import SetPageTitle from "../../hooks/set_page_title.tsx";
import {TitleBar} from "../../components/TitleBar.tsx";
import {Card} from "../../components/Cards.tsx";
import {/*Button,*/ IconButton} from "../../components/Buttons.tsx";
import {BiLeaf, /*BiChevronRight*/} from "react-icons/bi";
import {Divider} from "../../components/Divider.tsx";
import React, {useState} from "react";
import {Modal} from "../../components/Modal.tsx";

const DATA = {
    parking: 4,
    discounts: [
        {
            modal: "wheel",
            amount: 10
        },
        {
            modal: "car",
            amount: 15
        },
        {
            modal: "tech",
            amount: 30
        }
    ]
}

/*
function SafeHtml({html}) {
    const sanitizedHtml = DOMPurify.sanitize(html);
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
}
*/

export const RewardsPage = () => {
    const [t] = useTranslation();
    const pageTitle = t("pages/profile:RewardsPage.title");
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);

    SetPageTitle(pageTitle);

    const amount = 4;

    // TODO SafeHtml: concatenate some strings instead, extract html out of translation
    // <SafeHtml html={t("pages/profile:RewardsPage.parking.text", {amount: DATA.parking})} />
    return (
        <>
            <TitleBar hasBackAction={true} text={pageTitle}/>

            <div className="w-full flex flex-col items-center mt-6 mb-24 space-y-6">
                {DATA.parking != null ? (
                    <Card
                        label={t("pages/profile:RewardsPage.parking.title")}
                        labelPosition="outside"
                    >
                        <div className="flex flex-col items-center justify-center space-y-6">
                            <div className="flex text-left subtitle">
                                {t("pages/profile:RewardsPage.parking.text", {amount: amount})}
                            </div>
                            {/*<Button
                                variant="outline"
                                text={t("pages/profile:RewardsPage.booking")}
                                trailing={<BiChevronRight className="icon"/>}
                                onClick={() => alert("TODO")}
                            />*/}
                        </div>
                    </Card>
                ) : null}

                {DATA.discounts != null ? (
                    <Card
                        label={t("pages/profile:RewardsPage.discounts")}
                        labelPosition="outside"
                    >
                        <div className="w-full grid grid-cols-1 space-y-4">
                            {DATA.discounts.map((discount, index) =>
                                <React.Fragment key={index}>
                                    <div className="w-full flex justify-between items-center gap-2">
                                        <div className="subtitle">
                                            {t("pages/profile:RewardsPage." + discount.modal)} - {discount.amount}% {t("pages/profile:RewardsPage.discount")}
                                        </div>
                                        <IconButton
                                            variant="primary"
                                            icon={<BiLeaf className="icon-md"/>}
                                            onClick={() => {
                                                if (discount.modal == "wheel") {
                                                    setShowModal1(true)
                                                }
                                                else if (discount.modal == "car") {
                                                    setShowModal2(true)
                                                }
                                                else if (discount.modal == "tech") {
                                                    setShowModal3(true)
                                                }
                                            }}
                                        />
                                    </div>

                                    {index != DATA.discounts.length - 1 ? (
                                        <Divider/>
                                    ) : null}
                                </React.Fragment>
                            )}
                        </div>
                    </Card>
                ) : null}
            </div>

            <Modal open={showModal1} setOpen={setShowModal1}>
                <div className="text-center">
                    <div className="headline-2 pb-5">{t("pages/profile:RewardsPage.wheel")}</div>
                    <div>
                        {t("pages/profile:RewardsPage.discountText")}
                    </div>
                    <div className="text-2xl font-bold text-primary-600 pt-10">
                        {DATA.discounts[0].amount} % {t("pages/profile:RewardsPage.discount")}
                    </div>
                </div>
            </Modal>

            <Modal open={showModal2} setOpen={setShowModal2}>
                <div className="text-center">
                    <div className="headline-2 pb-5">{t("pages/profile:RewardsPage.car")}</div>
                    <div>
                        {t("pages/profile:RewardsPage.discountText")}
                    </div>
                    <div className="text-2xl font-bold text-primary-600 pt-10">
                        {DATA.discounts[1].amount} % {t("pages/profile:RewardsPage.discount")}
                    </div>
                </div>
            </Modal>

            <Modal open={showModal3} setOpen={setShowModal3}>
                <div className="text-center">
                    <div className="headline-2 pb-5">{t("pages/profile:RewardsPage.tech")}</div>
                    <div>
                        {t("pages/profile:RewardsPage.discountText")}
                    </div>
                    <div className="text-2xl font-bold text-primary-600 pt-10">
                        {DATA.discounts[2].amount} % {t("pages/profile:RewardsPage.discount")}
                    </div>
                </div>
            </Modal>
        </>
    )
}