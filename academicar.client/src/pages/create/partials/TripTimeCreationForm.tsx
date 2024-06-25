import {useTranslation} from "react-i18next";
import {Card} from "../../../components/Cards.tsx";
import {Input} from "../../../components/FormFields.tsx";
import {StopsTimeInputCardList} from "./StopsTimeInputCardList.tsx";
import {BiCalendar, BiTime} from "react-icons/bi";

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
        <div className="w-full flex flex-col items-center space-y-6">
            <Card label={startTimeLabelText}>
                <div className="w-full flex flex-col space-y-4">
                    <Input
                        type="date"
                        label={dateInputLabelText}
                        value={props.startDate}
                        leading={<BiCalendar className="icon-md"/>}
                        fullWidth
                        onChange={(e) => props.setStartDate(e.target.value)}
                    />

                    <Input
                        type="time"
                        label={timeInputLabelText}
                        value={props.startTime}
                        leading={<BiTime className="icon-md"/>}
                        fullWidth
                        onChange={(e) => props.setStartTime(e.target.value)}
                    />
                </div>
            </Card>

            {/* Stops disabled for now */}
            <>
                {
                    false ?
                        <StopsTimeInputCardList
                            label={"Test Stop"}
                            stopReachedInputLabelText={stopReachedInputLabelText}
                            stopContinueInputLabelText={stopContinueInputLabelText}
                        />
                        : ''
                }
            </>

            <Card label={arrivalTimeLabelText}>
                <div className="w-full flex flex-col space-y-4">
                    <Input
                        type="date"
                        label={dateInputLabelText}
                        value={props.endDate}
                        leading={<BiCalendar className="icon-md"/>}
                        fullWidth
                        onChange={(e) => props.setEndDate(e.target.value)}
                    />

                    <Input
                        type="time"
                        label={timeInputLabelText}
                        value={props.endTime}
                        leading={<BiTime className="icon-md"/>}
                        fullWidth
                        onChange={(e) => props.setEndTime(e.target.value)}
                    />
                </div>
            </Card>
        </div>
    );
};