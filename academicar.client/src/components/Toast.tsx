import {BiCheckCircle, BiError, BiErrorAlt, BiInfoCircle} from "react-icons/bi";

interface ToastProps {
    variant?: 'success' | 'error' | 'warning' | 'info' | 'hint'
    message?: string
    className?: string
}

export const Toast = (props: ToastProps) => {

    let icon = null;
    switch (props.variant) {
        default:
        case 'success':
            icon = <BiCheckCircle className="icon-md"/>;
            break;
        case 'error':
            icon = <BiErrorAlt className="icon-md"/>;
            break;
        case 'warning':
            icon = <BiError className="icon-md"/>;
            break;
        case 'info':
        case 'hint':
            icon = <BiInfoCircle className="icon-md"/>;
            break;
    }

    return (
        <div
            className={'toast toast-' + (props.variant ? props.variant : 'success') +
                (props.className ? (' ' + props.className) : '')}>

            {icon && icon}

            {props.message && <span className="flex-1">{props.message}</span>}

        </div>
    );
}