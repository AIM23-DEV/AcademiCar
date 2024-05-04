import {MouseEventHandler, ReactNode} from "react"

interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'accent' | 'outline'
    fullWidth?: boolean
    text?: string
    textAlign?: 'center' | 'left' | 'right'
    textFullWidth?: boolean
    trailing?: ReactNode
    leading?: ReactNode
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
    className?: string
}

export const Button = (props: ButtonProps) => {
    return (
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            type={props.type ?? 'button'}
            className={'btn btn-' + (props.variant ? props.variant : 'primary') +
                (props.fullWidth ? ' w-full' : ' w-fit') +
                (props.className && ' ' + props.className)}>

            {props.leading && <span>{props.leading}</span>}

            {props.text &&
                <span
                    className={(props.textAlign ? 'text-' + props.textAlign : 'text-center') +
                        (props.textFullWidth ? ' flex-1' : '')}>
                    
                    {props.text}
                </span>}

            {props.trailing && <span>{props.trailing}</span>}
        </button>
    );
}

export const TextButton = (props: ButtonProps) => {
    return (
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            type={props.type ?? 'button'}
            className={'btn-text btn-text-' + (props.variant ? props.variant : 'secondary') +
                (props.fullWidth ? ' w-full' : ' w-fit') +
                (props.className && ' ' + props.className)}>

            {props.leading && <span>{props.leading}</span>}

            {props.text &&
                <span
                    className={(props.textAlign ? 'text-' + props.textAlign : 'text-center') +
                        (props.textFullWidth ? ' flex-1' : '')}>
                    
                    {props.text}
                </span>}

            {props.trailing && <span>{props.trailing}</span>}
        </button>
    );
}

interface IconButtonProps {
    variant?: 'primary' | 'secondary' | 'accent' | 'outline'
    fullWidth?: boolean
    icon?: ReactNode
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
    className?: string
}

export const IconButton = (props: IconButtonProps) => {
    return (
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            type={props.type ?? 'button'}
            className={(props.variant ? 'btn-icon btn-' + props.variant : 'btn-primary') +
                (props.fullWidth ? ' w-full' : ' w-fit') +
                (props.className && ' ' + props.className)}>

            {props.icon && <span>{props.icon}</span>}
        </button>
    );
}