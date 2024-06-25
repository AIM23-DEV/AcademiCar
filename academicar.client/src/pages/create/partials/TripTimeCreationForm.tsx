import {useTranslation} from "react-i18next";
import {Card} from "../../../components/Cards.tsx";
import {Input} from "../../../components/FormFields.tsx";
import {StopsTimeInputCardList} from "./StopsTimeInputCardList.tsx";
import {BiCalendar, BiTime} from "react-icons/bi";
import {useState} from "react";

interface TripTimeCreationFormProps {
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;

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

    const [startDate, setStartDate] = useState<string>(props.startDate);
    const [startTime, setStartTime] = useState<string>(props.startTime);
    const [endDate, setEndDate] = useState<string>(props.endDate);
    const [endTime, setEndTime] = useState<string>(props.endTime);

    return (
        <div className="w-full flex flex-col items-center space-y-6">
            <Card label={startTimeLabelText}>
                <div className="w-full flex flex-col space-y-4">
                    <Input
                        type="date"
                        label={dateInputLabelText}
                        value={startDate}
                        leading={<BiCalendar className="icon-md"/>}
                        fullWidth
                        onChange={(e) => {
                            let value: string = e.target.value;
                            props.setStartDate(value);
                            setStartDate(value);
                        }}
                    />

                    <Input
                        type="time"
                        label={timeInputLabelText}
                        value={startTime}
                        leading={<BiTime className="icon-md"/>}
                        fullWidth
                        onChange={(e) => {
                            let value: string = e.target.value;
                            props.setStartTime(value);
                            setStartTime(value);
                        }}
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
                        value={endDate}
                        leading={<BiCalendar className="icon-md"/>}
                        fullWidth
                        onChange={(e) => {
                            let value: string = e.target.value;
                            props.setEndDate(value);
                            setEndDate(value);
                        }}
                    />

                    <Input
                        type="time"
                        label={timeInputLabelText}
                        value={endTime}
                        leading={<BiTime className="icon-md"/>}
                        fullWidth
                        onChange={(e) => {
                            let value: string = e.target.value;
                            props.setEndTime(value);
                            setEndTime(value);
                        }}
                    />
                </div>
            </Card>
        </div>
    );
};