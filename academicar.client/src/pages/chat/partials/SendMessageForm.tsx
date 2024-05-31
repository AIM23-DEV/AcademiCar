import {Input} from "../../../components/FormFields.tsx";
import {Button} from "../../../components/Buttons.tsx";

interface SendMessageFormProps {
    isMember: boolean,
    placeholderText: string,
    infoNotMember?: string
}

export const SendMessageForm = (props: SendMessageFormProps) => {
    return props.isMember ? (
        <>
            <Input placeholder={props.placeholderText}/>
            <Button/>
        </>
    ) : (
        <>
            <h3 className="headline-2 flex-1">{props.infoNotMember}</h3>
        </>
    )
}