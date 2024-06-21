import {Card} from "../../../components/Cards.tsx";
import {Input} from "../../../components/FormFields.tsx";

interface StopsTimeInputCardListProps {
    label: string,
    stopReachedInputLabelText: string,
    stopContinueInputLabelText: string,
}

export const StopsTimeInputCardList = (props: StopsTimeInputCardListProps) => {
    return (
        <>
            <Card label={props.label}>
                <Input label={props.stopReachedInputLabelText} />
                <Input label={props.stopContinueInputLabelText} />
            </Card>
        </>
    )
}