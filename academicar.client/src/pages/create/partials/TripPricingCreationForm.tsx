import {useTranslation} from "react-i18next";
import {Card} from "../../../components/Cards.tsx";
import {Divider} from "../../../components/Divider.tsx";
import {Input} from "../../../components/FormFields.tsx";

export const TripPricingCreationForm = () => {
    const [t] = useTranslation(["common", "pages/create"]);
    const pricingLabelText = t("pages/create:CreateTripPage4.label_pricing");
    const noCostRadioText = t("pages/create:CreateTripPage4.radio_no_cost");
    const fixedCostRadioText = t("pages/create:CreateTripPage4.radio_fixed_cost");
    const recommendedPriceLabelText = t("pages/create:CreateTripPage4.label_recommended_price");
    const kilometreAllowanceLabelText = t("pages/create:CreateTripPage4.label_kilometre_allowance");

    return (
        <div className="w-full flex flex-col items-center">
            <Card label={pricingLabelText}>
                <p>TODO Radio Collection, option 1 {noCostRadioText}</p>
                <Divider/>
                <div>TODO Radio Collection, option 2 {fixedCostRadioText} <Input/></div>
                <p>{recommendedPriceLabelText} 13€</p>
                <p>{kilometreAllowanceLabelText} 0.06 €/km</p>
            </Card>
        </div>
    );
};