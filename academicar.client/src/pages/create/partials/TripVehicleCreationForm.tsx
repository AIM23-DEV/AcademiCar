import {useTranslation} from "react-i18next";
import {Card} from "../../../components/Cards.tsx";
import {Checkmark, Input, Select} from "../../../components/FormFields.tsx";
import {VehicleOptions} from "../CreateTripPage.tsx";
import {useState} from "react";

interface TripVehicleCreationFormProps {
    driverId: string;
    vehicleId?: number;
    vehicleOptions?: VehicleOptions;
    availableSeats?: number;

    setVehicleId: (vehicleId: number | undefined) => void;
    setAvailableSeats: (value: number) => void;
}

export const TripVehicleCreationForm = (props: TripVehicleCreationFormProps) => {
    const [t] = useTranslation(["common", "pages/create"]);
    const vehicleLabelText = t("pages/create:CreateTripPage.label_vehicle");
    const createVehicleLinkText = t("pages/create:CreateTripPage.link_create_vehicle");
    const seatsLabelText = t("pages/create:CreateTripPage.label_seats");
    const extrasLabelText = t("pages/create:CreateTripPage.label_extras");
    const extrasUnitText = t("pages/create:CreateTripPage.extra_unit");
    const luggageExtraText = t("pages/create:CreateTripPage.extra_small_luggage");
    const suitcaseExtraText = t("pages/create:CreateTripPage.extra_suitcase");
    const bicycleExtraText = t("pages/create:CreateTripPage.extra_bicycle");
    const skiExtraText = t("pages/create:CreateTripPage.extra_ski");
    const miscExtraText = t("pages/create:CreateTripPage.extra_misc");
    const [thisVehicleId, setThisVehicleId] = useState<number | undefined>(props.vehicleId);

    return (
        <div className="w-full flex flex-col items-center">
            <Card
                label={vehicleLabelText}
                outsideLinkText={createVehicleLinkText}
                outsideLink={`/profile/${props.driverId}/cars/${props.vehicleId}`}
            >
                <div className="w-full flex flex-col space-y-4">
                    <Select
                        value={thisVehicleId}
                        options={props.vehicleOptions}
                        fullWidth
                        onChange={(e) => {
                            let value: number | undefined = Number.parseInt(e.target.value);
                            if (Number.isNaN(value)) value = undefined;
                            props.setVehicleId(value);
                            setThisVehicleId(value);
                        }}
                    />
                    <Input
                        value={`${props.availableSeats}`}
                        fullWidth
                        type="number"
                        label={seatsLabelText}
                        onChange={(e) => props.setAvailableSeats(Number(e.target.value))}
                    />
                </div>
            </Card>

            {/* Extras disabled for now */}
            <>
                {
                    false ?
                        <Card label={extrasLabelText}>
                            <div><Checkmark label={luggageExtraText}/> <Input/> {extrasUnitText} </div>
                            <div><Checkmark label={suitcaseExtraText}/> <Input/> {extrasUnitText} </div>
                            <Checkmark label={bicycleExtraText}/>
                            <Checkmark label={skiExtraText}/>
                            <Checkmark label={miscExtraText}/>
                            <Input/>
                        </Card>
                        : ''
                }
            </>
        </div>
    );
};