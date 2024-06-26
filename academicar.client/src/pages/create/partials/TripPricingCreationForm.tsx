import {useTranslation} from "react-i18next";
import {Card} from "../../../components/Cards.tsx";
import {Divider} from "../../../components/Divider.tsx";
import {Input} from "../../../components/FormFields.tsx";
import {BiEuro} from "react-icons/bi";

interface TripPricingCreationFormProps {
    price: number;

    setPrice: (value: number) => void;
}

export const TripPricingCreationForm = (props: TripPricingCreationFormProps) => {
    const [t] = useTranslation(["common", "pages/create"]);
    const pricingLabelText = t("pages/create:CreateTripPage.label_pricing");
    const noCostRadioText = t("pages/create:CreateTripPage.radio_no_cost");
    const fixedCostRadioText = t("pages/create:CreateTripPage.radio_fixed_cost");
    const recommendedPriceLabelText = t("pages/create:CreateTripPage.label_recommended_price");
    const kilometreAllowanceLabelText = t("pages/create:CreateTripPage.label_kilometre_allowance");

    return (
        <div className="w-full flex flex-col items-center">
            <Card label={pricingLabelText}>
                <div className="w-full flex flex-col space-y-4">
                    {/* Todos disabled for now */}
                    <>
                        {
                            false ?
                                <>
                                    <p>TODO Radio Collection, option 1 {noCostRadioText}</p>
                                    <Divider/>
                                    <div>TODO Radio Collection, option 2 {fixedCostRadioText} <Input/></div>
                                </>
                                : ''
                        }
                    </>

                    <Input
                        value={props.price}
                        onChange={(e) => props.setPrice(Number(e.target.value))}
                        trailing={<BiEuro className="icon-md"/>}
                        type="number"
                        fullWidth
                    />

                    <div className="w-full text-right">
                        <p>{recommendedPriceLabelText} 13 €</p>
                        <p>{kilometreAllowanceLabelText} 0.06 €/km</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};