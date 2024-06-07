import {useTranslation} from "react-i18next";
import {Card} from "../../../components/Cards.tsx";
import {Checkmark, Input, Select} from "../../../components/FormFields.tsx";

export const TripVehicleCreationForm = () => {
    const [t] = useTranslation(["common", "pages/create"]);
    const vehicleLabelText = t("pages/create:CreateTripPage3.label_vehicle");
    const createVehicleLinkText = t("pages/create:CreateTripPage3.link_create_vehicle");
    const seatsLabelText = t("pages/create:CreateTripPage3.label_seats");
    const extrasLabelText = t("pages/create:CreateTripPage3.label_extras");
    const extrasUnitText = t("pages/create:CreateTripPage3.extra_unit");
    const luggageExtraText = t("pages/create:CreateTripPage3.extra_small_luggage");
    const suitcaseExtraText = t("pages/create:CreateTripPage3.extra_suitcase");
    const bicycleExtraText = t("pages/create:CreateTripPage3.extra_bicycle");
    const skiExtraText = t("pages/create:CreateTripPage3.extra_ski");
    const miscExtraText = t("pages/create:CreateTripPage3.extra_misc");

    return (
        <div className="w-full flex flex-col items-center">
            <Card label={vehicleLabelText} outsideLink={createVehicleLinkText}>
                <Select/>
                <p> {seatsLabelText} <Input/></p>
            </Card>

            <Card label={extrasLabelText}>
                <p><Checkmark label={luggageExtraText}/> <Input/> {extrasUnitText} </p>
                <p><Checkmark label={suitcaseExtraText}/> <Input/> {extrasUnitText} </p>
                <Checkmark label={bicycleExtraText}/>
                <Checkmark label={skiExtraText}/>
                <Checkmark label={miscExtraText}/>
                <Input/>
            </Card>
        </div>
    );
};