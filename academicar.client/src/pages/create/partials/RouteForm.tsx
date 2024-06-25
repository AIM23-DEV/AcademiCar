import {Input} from "../../../components/FormFields.tsx";
import {Card} from "../../../components/Cards.tsx";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {BiFlag, BiMap} from "react-icons/bi";

interface RouteFormProps {
    label: string;
    fromLabelText: string;
    fromPlaceholderText: string;
    toLabelText: string;
    toPlaceholderText: string;

    fromValue: string;
    toValue: string;

    setFromValue: Dispatch<SetStateAction<string>>;
    setToValue: Dispatch<SetStateAction<string>>;
}

export const RouteForm = (props: RouteFormProps) => {
    const [fromValue, setFromValue] = useState<string>(props.fromValue);
    const [toValue, setToValue] = useState<string>(props.toValue);

    useEffect(() => {
        if (fromValue === "" || props.fromValue !== "") setFromValue(props.fromValue);
        if (toValue === "" || props.toValue !== "") setToValue(props.toValue);
    }, [props]);
    
    return (
        <>
            <Card label={props.label}>
                <div className="w-full flex flex-col space-y-4">
                    <Input label={props.fromLabelText}
                           placeholder={props.fromPlaceholderText}
                           value={fromValue}
                           onChange={(e) => {
                               let value: string = e.target.value;
                               props.setFromValue(value);
                               setFromValue(value);
                           }}
                           leading={<BiMap className="icon-md"/>}
                           required
                           fullWidth
                    />

                    <Input label={props.toLabelText}
                           placeholder={props.toPlaceholderText}
                           value={toValue}
                           onChange={(e) => {
                               let value: string = e.target.value;
                               props.setToValue(value);
                               setToValue(value);
                           }}
                           leading={<BiFlag className="icon-md"/>}
                           required
                           fullWidth
                    />
                </div>
            </Card>
        </>
    )
}