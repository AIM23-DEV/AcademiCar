import { useTranslation } from "react-i18next";
import { RouteForm } from "./RouteForm.tsx";
import { StopsList } from "./StopsList.tsx";
import {Dispatch, SetStateAction} from "react";

interface TripRouteCreationFormProps {
    startAddress: string;
    endAddress: string;

    setStartAddress: Dispatch<SetStateAction<string>>;
    setEndAddress: Dispatch<SetStateAction<string>>;
}

export const TripRouteCreationForm = (props: TripRouteCreationFormProps) => {
    const [t] = useTranslation(["common", "pages/create"]);
    const routeLabelText = t("pages/create:CreateTripPage.label_route");
    const fromInputLabelText = t("pages/create:CreateTripPage.label_input_from");
    const fromInputPlaceholderText = t("pages/create:CreateTripPage.placeholder_input_from");
    const toInputLabelText = t("pages/create:CreateTripPage.label_input_to");
    const toInputPlaceholderText = t("pages/create:CreateTripPage.placeholder_input_to");
    const stopListLabelText = t("pages/create:CreateTripPage.label_stops_list");
    const addStopActionText = t("pages/create:CreateTripPage.action_add_stop");
    const stopInputLabelText = t("pages/create:CreateTripPage.label_input_stop", {stopNr: 1});
    const stayInputLabelText = t("pages/create:CreateTripPage.label_input_stay");
    const enableStopsToggleText = t("pages/create:CreateTripPage.toggle_enable_stops");
    const stayInputUnitText = t("common:time.minuteShort");

    return (
        <div className="w-full flex flex-col items-center">
            <RouteForm
                label={routeLabelText}
                fromLabelText={fromInputLabelText}
                fromPlaceholderText={fromInputPlaceholderText}
                toLabelText={toInputLabelText}
                toPlaceholderText={toInputPlaceholderText}

                fromValue={props.startAddress}
                toValue={props.endAddress}

                setFromValue={props.setStartAddress}
                setToValue={props.setEndAddress}
            />

            {/* Stops disabled for now */}
            <>
                {
                    false ?
                        <StopsList
                            label={stopListLabelText}
                            addStopActionText={addStopActionText}
                            stopInputLabelText={stopInputLabelText}
                            stayInputLabelText={stayInputLabelText}
                            stayInputUnitText={stayInputUnitText}
                            enableStopsToggleText={enableStopsToggleText}
                        />
                        : ''
                }
            </>
        </div>
    );
};