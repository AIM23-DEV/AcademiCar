import {useTranslation} from "react-i18next";
import {Card} from "../../../components/Cards.tsx";
import {Checkmark, Input, Select} from "../../../components/FormFields.tsx";
import {useEffect, useState} from "react";

interface TripVehicleCreationFormProps {
    driverId: string;
    vehicleId?: number;
    availableSeats?: number;

    setVehicleId: (vehicleId: number) => void;
    setAvailableSeats: (value: number) => void;
}

type VehicleOptions = {
    [key: number]: string;
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

    const [vehicleOptions, setVehicleOptions] = useState<VehicleOptions>({});

    useEffect(() => {
        fetch(`https://localhost:5173/api/create/vehicles/${props.driverId}`)
            .then(response => response.json())
            .then((fetchedVehicles: IVehicle[]) => {
                const options = fetchedVehicles.reduce((options: VehicleOptions, vehicle) => {
                    const key = vehicle.id ?? -999
                    options[key] = vehicle.type;
                    return options;
                }, {});
                setVehicleOptions(options);
            });
    }, [props.driverId]);

    return (
        <div className="w-full flex flex-col items-center">
            <Card
                label={vehicleLabelText}
                outsideLinkText={createVehicleLinkText}
                outsideLink={`../profile/${props.driverId}/cars/${props.vehicleId}`}
            >
                <Select
                    options={vehicleOptions}
                    onChange={(e) => props.setVehicleId(Number(e.target.value))}
                />
                <span>
                    {seatsLabelText}
                    <Input
                        value={`${props.availableSeats}`}
                        onChange={(e) => props.setAvailableSeats(Number(e.target.value))}
                    />
                </span>
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