import {useTranslation} from "react-i18next";
import {Card} from "../../../components/Cards.tsx";
import {Input} from "../../../components/FormFields.tsx";
import {StopsTimeInputCardList} from "./StopsTimeInputCardList.tsx";

interface TripTimeCreationFormProps {
    startDate?: string;
    startTime?: string;
    endDate?: string;
    endTime?: string;

    setStartDate: (dateStr: string) => void;
    setStartTime: (timeStr: string) => void;
    setEndDate: (dateStr: string) => void;
    setEndTime: (timeStr: string) => void;
}

export const TripTimeCreationForm = (props: TripTimeCreationFormProps) => {
    const [t] = useTranslation(["common", "pages/create"]);
    const startTimeLabelText = t("pages/create:CreateTripPage.label_start_time");
    const dateInputLabelText = t("pages/create:CreateTripPage.label_input_date");
    const timeInputLabelText = t("pages/create:CreateTripPage.label_input_time");
    const stopReachedInputLabelText = t("pages/create:CreateTripPage.label_stop_reached_time");
    const stopContinueInputLabelText = t("pages/create:CreateTripPage.label_stop_continued_time");
    const arrivalTimeLabelText = t("pages/create:CreateTripPage.label_arrival_time");

    return (
        <div className="w-full flex flex-col items-center">
            <Card label={startTimeLabelText}>
                <Input
                    label={dateInputLabelText}
                    value={props.startDate}
                    onChange={(e) => props.setStartDate(e.target.value)}
                />
                
                <Input
                    label={timeInputLabelText}
                    value={props.startTime}
                    onChange={(e) => props.setStartTime(e.target.value)}
                />
            </Card>

            <StopsTimeInputCardList
                label={"Test Stop"}
                stopReachedInputLabelText={stopReachedInputLabelText}
                stopContinueInputLabelText={stopContinueInputLabelText}
            />

            <Card label={arrivalTimeLabelText}>
                <Input
                    label={dateInputLabelText}
                    value={props.endDate}
                    onChange={(e) => props.setEndDate(e.target.value)}
                />

                <Input
                    label={timeInputLabelText}
                    value={props.endTime}
                    onChange={(e) => props.setEndTime(e.target.value)}
                />
            </Card>
        </div>
    );
};