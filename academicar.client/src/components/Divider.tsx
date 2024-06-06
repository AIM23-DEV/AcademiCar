import {ReactNode} from "react";

interface DividerProps {
    content?: string | ReactNode
    className?: string
}

export const Divider = (props: DividerProps) => {
    return (
        <div
            className={'inline-flex flex-row items-center justify-center w-full' + (props.className ? (' ' + props.className) : '')}>
            <span className={"divider" + (props.content ? (' ' + 'mr-2') : '')}></span>
            {typeof props.content == typeof 'string' ? <span className="caption">{props.content}</span> : props.content}
            {props.content && <span className="divider ml-2"></span>}
        </div>
    );
}