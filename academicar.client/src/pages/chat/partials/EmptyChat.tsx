import {EmptyState} from "../../../components/EmptyState.tsx";
import { BiMessageMinus, BiMessageX } from "react-icons/bi";
import {useTranslation} from "react-i18next";

interface StateProps {
    type: 'searchResult' | 'chatResult'
}
export const EmptyChat = (props: StateProps) => {
    const [t] = useTranslation();
    let icon;
    if (props.type == "searchResult") {
        icon = <BiMessageMinus className="icon-xl"/>
    } else {
        icon = <BiMessageX className="icon-xl"/>
    }
    
    return (
        <EmptyState
            icon={icon}
            title={t('pages/chat:EmptyChat.' + props.type + '.title')}
            subtitle={t('pages/chat:EmptyChat.' + props.type + '.subtitle')}
            asCard={true}
        />
    )
}