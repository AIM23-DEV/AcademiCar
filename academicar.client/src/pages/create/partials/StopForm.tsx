import {Input} from "../../../components/FormFields.tsx";

interface StopFormProps {
    stopInputLabelText: string,
    stayInputLabelText: string,
    stayInputUnitText: string
}

export const StopForm = (props: StopFormProps) => {
    return (
        <>
            <Input label={props.stopInputLabelText} />
            <div>
                {props.stayInputLabelText}
                <Input />
                {props.stayInputUnitText}
            </div>
        </>
    )
}