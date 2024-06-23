import { Input } from "../../../components/FormFields.tsx";
import { Card } from "../../../components/Cards.tsx";
import {Dispatch, SetStateAction} from "react";

interface RouteFormProps {
    label: string;
    fromLabelText: string;
    fromPlaceholderText: string;
    toLabelText: string;
    toPlaceholderText: string;
    
    fromValue?: string;
    toValue?: string;

    setFromValue: Dispatch<SetStateAction<string | undefined>>;
    setToValue: Dispatch<SetStateAction<string | undefined>>;
}

export const RouteForm = (props: RouteFormProps) => {
    return (
        <>
            <Card label={props.label}>
                <Input label={props.fromLabelText}
                       placeholder={props.fromPlaceholderText}
                       value={props.fromValue}
                       onChange={(e) => props.setFromValue(e.target.value)}
                       required={true}
                />
                
                <Input label={props.toLabelText}
                       placeholder={props.toPlaceholderText}
                       value={props.toValue}
                       onChange={(e) => props.setToValue(e.target.value)}
                       required={true}
                />
            </Card>
        </>
    )
}