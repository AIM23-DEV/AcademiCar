import {useTranslation} from "react-i18next";
import {Card} from "../../../components/Cards.tsx";
import {Input} from "../../../components/FormFields.tsx";
import {StopsTimeInputCardList} from "./StopsTimeInputCardList.tsx";

export const TripTimeCreationForm = () => {
    const [t] = useTranslation(["common", "pages/create"]);
    const startTimeLabelText = t("pages/create:CreateTripPage2.label_start_time");
    const dateInputLabelText = t("pages/create:CreateTripPage2.label_input_date");
    const timeInputLabelText = t("pages/create:CreateTripPage2.label_input_time");
    const stopReachedInputLabelText = t("pages/create:CreateTripPage2.label_stop_reached_time");
    const stopContinueInputLabelText = t("pages/create:CreateTripPage2.label_stop_continued_time");
    const arrivalTimeLabelText = t("pages/create:CreateTripPage2.label_arrival_time");

    return (
        <div className="w-full flex flex-col items-center">
            <Card label={startTimeLabelText}>
                <Input label={dateInputLabelText}/>
                <Input label={timeInputLabelText}/>
            </Card>

            <StopsTimeInputCardList
                label={"Test Stop"}
                stopReachedInputLabelText={stopReachedInputLabelText}
                stopContinueInputLabelText={stopContinueInputLabelText}
            />

            <Card label={arrivalTimeLabelText}>
                <Input label={dateInputLabelText}/>
                <Input label={timeInputLabelText}/>
            </Card>
        </div>
    );
};