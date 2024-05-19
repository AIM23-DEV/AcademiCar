import {ReactNode} from "react";
import {BiQuestionMark} from "react-icons/bi";

interface EmptyStateProps {
    icon?: ReactNode
    title?: string | ReactNode
    subtitle?: string | ReactNode
    children?: ReactNode
    asCard?: boolean
    className?: string
}

export const EmptyState = (props: EmptyStateProps) => {
    return (
        <div
            className={'items-center justify-center text-center' + (props.asCard ? ' card' : '') + ((props.className ? (' ' + props.className) : ''))}>

            <div
                className={'flex items-center justify-center rounded-full text-gray-400'}>
                {props.icon ? props.icon : <BiQuestionMark className={props.asCard ? 'h-14 w-14' : 'h-16 w-16'}/>}
            </div>

            <h4 className={'mt-4 ' + (props.asCard ? 'headline-4' : 'headline-2')}>
                {props.title ? props.title : 'Keine Ergebnisse'}
            </h4>

            <p className={'mb-4 ' + (props.asCard ? 'body-1' : 'headline-3')}>
                {props.subtitle ? props.subtitle : ''}
            </p>

            {props.children}

        </div>
    );
}