import {Input} from "../../../components/FormFields.tsx";
import {Card} from "../../../components/Cards.tsx";

interface RouteFormProps {
    label: string,
    fromLabelText: string,
    fromPlaceholderText: string,
    toLabelText: string,
    toPlaceholderText: string
}

export const RouteForm = (props: RouteFormProps) => {
    return (
        <>
            <Card label={props.label}>
                <Input label={props.fromLabelText} placeholder={props.fromPlaceholderText}/>
                <Input label={props.toLabelText} placeholder={props.toPlaceholderText}/>
            </Card>
        </>
    )
}