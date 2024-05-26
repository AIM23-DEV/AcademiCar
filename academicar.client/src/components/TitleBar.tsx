import {ReactNode} from "react";
import {BiLeftArrowAlt} from "react-icons/bi";

interface TitleBarProps {
    text?: string
    hasBackAction?: boolean
    trailing?: ReactNode
    className?: string
}

export const TitleBar = (props: TitleBarProps) => {
    return (
        <div
            className={'w-full flex flex-row items-end h-20 px-6 text-gray-950' + (props.className ? (' ' + props.className) : '')}>

            <div className="w-full flex flex-row items-center space-x-4 pb-1.5">

                {props.hasBackAction && BackButton}

                {props.text && <h1 className="headline-2 flex-1">{props.text}</h1>}

            </div>

            {props.trailing && <span>{props.trailing}</span>}

        </div>
    );
}

// Todo proper back navigation
const BackButton = <button onClick={() => history.back()}><BiLeftArrowAlt className="icon-lg"/></button>;