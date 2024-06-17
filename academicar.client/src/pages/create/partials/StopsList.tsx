import {Card} from "../../../components/Cards.tsx";
import {Button} from "../../../components/Buttons.tsx";
import {Divider} from "../../../components/Divider.tsx";
import {StopForm} from "./StopForm.tsx";
import {Toggle} from "../../../components/FormFields.tsx";

interface StopsListProps {
    label: string,
    addStopActionText: string,
    stopInputLabelText: string,
    stayInputLabelText: string,
    stayInputUnitText: string,
    enableStopsToggleText: string
}

// TODO load list of StopForms
export const StopsList = (props: StopsListProps) => {
    return (
        <>
            <Card label={props.label}>
                <Button text={props.addStopActionText} />
                
                <Divider />
                
                <StopForm
                    stopInputLabelText={props.stopInputLabelText}
                    stayInputLabelText={props.stayInputLabelText}
                    stayInputUnitText={props.stayInputUnitText}
                />
            </Card>
            
            <Toggle label={props.enableStopsToggleText} />
        </>
    )
}