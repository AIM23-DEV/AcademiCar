import {useTranslation} from "react-i18next";
import {RouteForm} from "./RouteForm.tsx";
import {StopsList} from "./StopsList.tsx";

export const TripRouteCreationForm = () => {
    const [t] = useTranslation(["common", "pages/create"]);
    const routeLabelText = t("pages/create:CreateTripPage1.label_route");
    const fromInputLabelText = t("pages/create:CreateTripPage1.label_input_from");
    const fromInputPlaceholderText = t("pages/create:CreateTripPage1.placeholder_input_from");
    const toInputLabelText = t("pages/create:CreateTripPage1.label_input_to");
    const toInputPlaceholderText = t("pages/create:CreateTripPage1.placeholder_input_to");
    const stopListLabelText = t("pages/create:CreateTripPage1.label_stops_list");
    const addStopActionText = t("pages/create:CreateTripPage1.action_add_stop");
    const stopInputLabelText = t("pages/create:CreateTripPage1.label_input_stop");
    const stayInputLabelText = t("pages/create:CreateTripPage1.label_input_stay");
    const enableStopsToggleText = t("pages/create:CreateTripPage1.toggle_enable_stops");
    const stayInputUnitText = t("common:time.minuteShort");

    return (
        <div className="w-full flex flex-col items-center">
            <RouteForm
                label={routeLabelText}
                fromLabelText={fromInputLabelText}
                fromPlaceholderText={fromInputPlaceholderText}
                toLabelText={toInputLabelText}
                toPlaceholderText={toInputPlaceholderText}
            />

            <StopsList
                label={stopListLabelText}
                addStopActionText={addStopActionText}
                stopInputLabelText={stopInputLabelText}
                stayInputLabelText={stayInputLabelText}
                stayInputUnitText={stayInputUnitText}
                enableStopsToggleText={enableStopsToggleText}
            />
        </div>
    );
};