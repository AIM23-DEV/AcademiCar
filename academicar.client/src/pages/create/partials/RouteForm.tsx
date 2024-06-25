import {Input} from "../../../components/FormFields.tsx";
import {Card} from "../../../components/Cards.tsx";
import {Dispatch, SetStateAction} from "react";
import {BiFlag, BiMap} from "react-icons/bi";

interface RouteFormProps {
    label: string;
    fromLabelText: string;
    fromPlaceholderText: string;
    toLabelText: string;
    toPlaceholderText: string;

    fromValue?: string;
    toValue?: string;

    setFromValue: Dispatch<SetStateAction<string>>;
    setToValue: Dispatch<SetStateAction<string>>;
}

export const RouteForm = (props: RouteFormProps) => {
    return (
        <>
            <Card label={props.label}>
                <div className="w-full flex flex-col space-y-4">
                    <Input label={props.fromLabelText}
                           placeholder={props.fromPlaceholderText}
                           value={props.fromValue}
                           onChange={(e) => props.setFromValue(e.target.value)}
                           leading={<BiMap className="icon-md"/>}
                           required
                           fullWidth
                    />

                    <Input label={props.toLabelText}
                           placeholder={props.toPlaceholderText}
                           value={props.toValue}
                           onChange={(e) => props.setToValue(e.target.value)}
                           leading={<BiFlag className="icon-md"/>}
                           required
                           fullWidth
                    />
                </div>
            </Card>
        </>
    )
}