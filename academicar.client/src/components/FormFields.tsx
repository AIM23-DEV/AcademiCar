import {ReactNode} from "react";

interface InputProps {
    label?: string
    id?: string
    type?: string
    fullWidth?: boolean
    placeholder?: string
    required?: boolean
    leading?: ReactNode
    trailing?: ReactNode
    className?: string
}

export const Input = (props: InputProps) => {
    return (
        <div className={props.fullWidth ? ' w-full' : ' w-fit'}>
            <div className={"flex flex-col" + (props.className &&  ' ' + props.className)}>
                {props.label ? (
                    <label htmlFor={props.id && props.id} className="form-label">
                        {props.label}
                    </label>
                ) : null }
                <div className={'relative' }>
                    {props.leading ? (
                        <div className="form-icon start-0 ps-3">
                            <span>{props.leading}</span>
                        </div>
                    ) : null}
    
                    <input
                        type={props.type ? props.type : 'text'}
                        id={props.id && props.id}
                        className={"form-field" + (props.fullWidth ? ' w-full ' : ' w-fit ') + (props.leading ? ' pl-10' : '') + (props.trailing ? ' pr-10' : '')}
                        placeholder={props.placeholder && props.placeholder}
                        required={props.required && props.required}
                    />
                    {props.trailing ? (
                        <div className="form-icon end-0 pe-3">
                            <span>{props.trailing}</span>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

interface SelectProps{
    label?: string
    id?: string
    fullWidth?: boolean
    required?: boolean
    options?: object
    className?: string
}

export const Select = (props: SelectProps) => {
    return (
        <div className={props.fullWidth ? ' w-full' : ' w-fit'}>
            <div className={"flex flex-col" + (props.className &&  ' ' + props.className)}>
                {props.label ? (
                    <label htmlFor={props.id && props.id} className="form-label">
                        {props.label}
                    </label>
                ) : null}
                
                <select id={props.id && props.id}
                        className="form-field pr-10">
                    {props.options && Object.entries(props.options).map(([key, value], i) =>
                        (i == 0) ? (
                            <option value={key}>{value}</option>
                        ) : (
                            <option value={key}>{value}</option>
                        )
                    )}
                </select>
            </div>
        </div>
    )
}