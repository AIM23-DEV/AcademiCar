import {ReactNode} from "react";
import {Switch, Checkbox, RadioGroup, Field, Radio, Label} from '@headlessui/react'
import {Divider} from "./Divider.tsx";

interface InputProps {
    label?: string
    id?: string
    type?: 'text' | 'email' | 'number' | 'search' | 'date' | 'datetime-local' |
        'password' | 'color' | 'hidden' | 'tel' | 'time'
    fullWidth?: boolean
    placeholder?: string
    required?: boolean
    leading?: ReactNode
    trailing?: ReactNode
    className?: string
    value?: string | number | readonly string[] | undefined
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
}

export const Input = (props: InputProps) => {
    return (
        <div className={props.fullWidth ? ' w-full' : ' w-fit'}>
            <div className={"flex flex-col" + (props.className ? (' ' + props.className) : '')}>
                {props.label ? (
                    <label htmlFor={props.id && props.id} className="form-label">
                        {props.label}
                    </label>
                ) : null}
                <div className={'relative'}>
                    {props.leading ? (
                        <div className="form-icon start-0 ps-3">
                            <span>{props.leading}</span>
                        </div>
                    ) : null}

                    <input
                        type={props.type ? props.type : 'text'}
                        id={props.id && props.id}
                        className={"form-field" + (props.fullWidth ? ' w-full ' : ' w-fit') + (props.leading ? ' pl-10' : '') + (props.trailing ? ' pr-10' : '')}
                        placeholder={props.placeholder && props.placeholder}
                        required={props.required && props.required}
                        value={props.value}
                        onChange={props.onChange}
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

interface SelectProps {
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
            <div className={"flex flex-col" + (props.className && ' ' + props.className)}>
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

interface ToggleProps {
    label?: string
    disabled?: boolean
    className?: string
}

export const Toggle = (props: ToggleProps) => {
    return (
        <div
            className={(props.label && 'flex flex-row justify-between rounded-lg m-0 w-full') + " focus:ring-1 focus:ring-primary-600 " + (props.className && ' ' + props.className)}>
            {props.label ? (
                <span>{props.label}</span>
            ) : null}
            <Switch
                disabled={props.disabled}
                className="focusable group flex h-6 w-11 items-center rounded-full bg-gray-300 transition data-[checked]:bg-primary-600 
                disabled:opacity-60 disabled:shadow-none shadow-base"
            >
                <span
                    className="size-5 translate-x-1 rounded-full bg-white shadow-sm transition group-data-[checked]:translate-x-5"/>
            </Switch>
        </div>
    )
}

interface CheckmarkProps {
    label?: string
    id?: string
    disabled?: boolean
    className?: string
}

export const Checkmark = (props: CheckmarkProps) => {
    return (
        <Field className={"flex items-center gap-3 body-2" + props.className ? ' ' + props.className : ''}>
            <Checkbox id={props.id} name={props.id}
                disabled={props.disabled && props.disabled}
                className="focusable focus:ring-offset-0 group block size-4 rounded border bg-white data-[checked]:bg-primary-600"
            >
                <svg className="stroke-gray-100 stroke-1 opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14"
                     fill="none">
                    <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </Checkbox>

            {props.label ? (
                <Label>{props.label}</Label>
            ) : null}

        </Field>
    )
}

interface RadioItemProps {
    value: any
    label: string | ReactNode
    disabled?: boolean
}

interface RadioCollectionProps {
    id?: string
    value: any
    setValue: (value: any) => void
    items: Array<RadioItemProps>
    columns?: 1 | 2
    useDivider?: boolean
    className?: string
}

export const RadioCollection = (props: RadioCollectionProps) => {
    return (
        <RadioGroup id={props.id} name={props.id} value={props.value} onChange={props.setValue}
                    className={'w-full grid gap-3 body-2 grid-cols-' + (props.columns ?? 1) + (props.className ? ' ' + props.className : '')}>
            {props.items.map((item, index) =>
                <>
                    <Field key={item.value} disabled={item.disabled} className="flex items-center gap-2">
                        <Radio
                            value={item.value}
                            className="focusable focus:ring-offset-1 group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-primary-500 data-[disabled]:bg-white data-[disabled]:opacity-60 data-[disabled]:cursor-not-allowed"
                        >
                            <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible"/>
                        </Radio>
                        <Label
                            className="data-[disabled]:opacity-60 data-[disabled]:cursor-not-allowed">{item.label}</Label>
                    </Field>

                    {props.useDivider && index != props.items.length - 1 && (props.columns ?? 1) == 1 ? <Divider/> : ''}
                </>
            )}
        </RadioGroup>
    );
};