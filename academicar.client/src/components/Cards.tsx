import {ReactNode} from "react";
import {TextLink} from "./Buttons.tsx";
import {BiChevronRight} from "react-icons/bi";

interface CardProps {
    id?: string
    label?: string | ReactNode
    labelPosition?: 'outside' | 'inside'
    outsideLink?: string
    outsideLinkText?: string
    padding?: 'base' | 'sm' | 'none' // Use sm only if the card does not use the full screen width. Only use sm with inside label
    children?: ReactNode
    className?: string
}

export const Card = (props: CardProps) => {
    let renderOutside = (Boolean)(props.labelPosition != 'inside' || props.outsideLink || props.outsideLinkText);

    let outsideLabel = props.labelPosition != 'inside' ?
        <label htmlFor={props.id && props.id} className="form-label">
            {props.label}
        </label> : <div className="flex-1"></div>;

    let outsideLink = props.outsideLink || props.outsideLinkText ?
        <TextLink text={props.outsideLinkText} link={props.outsideLink} variant="secondary"
                  className="self-end pr-1 mb-1" trailing={<BiChevronRight className="icon-md"/>}/> : '';

    return (
        <div className={'w-full' + (props.className ? (' ' + props.className) : '')}>

            {renderOutside ?
                <div className="flex flex-row justify-between items-end">
                    {outsideLabel ? outsideLabel : ''}
                    {outsideLink ? outsideLink : ''}
                </div> : <></>}

            <div
                className={(props.padding == 'sm' ? 'card-sm' : (props.padding == 'none' ? 'card-none' : 'card'))}>

                {props.labelPosition == 'inside' ?
                    <label htmlFor={props.id ? props.id : ''} className="form-label px-0">
                        {props.label}
                    </label>
                    : ''}

                {props.children}
            </div>
        </div>
    );
}

interface LinkCardProps {
    id?: string
    label?: string | ReactNode
    labelPosition?: 'outside' | 'inside'
    outsideLink?: string
    outsideLinkText?: string
    padding?: 'base' | 'sm' // Use sm only if the card does not use the full screen width. Only use sm with inside label
    link?: string
    children?: ReactNode
    className?: string
}

export const LinkCard = (props: LinkCardProps) => {
    let renderOutside = (Boolean)(props.labelPosition != 'inside' || props.outsideLink || props.outsideLinkText);

    let outsideLabel = props.labelPosition != 'inside' ?
        <label htmlFor={props.id && props.id} className="form-label">
            {props.label}
        </label> : <div className="flex-1"></div>;

    let outsideLink = props.outsideLink || props.outsideLinkText ?
        <TextLink text={props.outsideLinkText} link={props.outsideLink} variant="secondary"
                  className="self-end pr-1 mb-1" trailing={<BiChevronRight className="icon-md"/>}/> : '';

    return (
        <div className={'w-full' + (props.className ? (' ' + props.className) : '')}>

            {renderOutside ?
                <div className="flex flex-row justify-between items-end">
                    {outsideLabel ? outsideLabel : ''}
                    {outsideLink ? outsideLink : ''}
                </div> : <></>}

            <a href={props.link ?? '#'}
               className={(props.padding == 'sm' ? 'card-sm' : 'card')}>

                {props.labelPosition == 'inside' ?
                    <label htmlFor={props.id ? props.id : ''} className="form-label px-0 cursor-pointer">
                        {props.label}
                    </label>
                    : ''}

                {props.children}
            </a>
        </div>
    );
}