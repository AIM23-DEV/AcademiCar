interface AvatarProps {
    avatars: string[] // Todo maybe array of users
    alt: string
    className?: string
}

export const ChatAvatar = (props: AvatarProps) => {
    switch (props?.avatars?.length ?? 0) {
        case 0:
            return;
        case 1:
            return <img src={props.avatars[0]}
                        alt={props.alt}
                        className={"icon-2xl aspect-1 rounded-full object-cover" + (props.className ? " " + props.className : "")}/>;
        case 2:
            return (
                <div
                    className={"relative icon-2xl aspect-1 rounded-full w-fit" + (props.className ? " " + props.className : "")}>
                    <img src={props.avatars[0]}
                         alt={props.alt}
                         className="absolute top-0 right-0 w-[2.625rem] h-[2.625rem] aspect-1 rounded-full object-cover"/>
                    <img src={props.avatars[1]}
                         alt={props.alt}
                         className="absolute bottom-0 left-0 w-[2.625rem] h-[2.625rem] aspect-1 rounded-full object-cover"/>
                </div>
            );
        case 3:
            return (
                <div
                    className={"relative icon-2xl aspect-1 rounded-full w-fit" + (props.className ? " " + props.className : "")}>
                    <img src={props.avatars[0]}
                         alt={props.alt}
                         className="absolute bottom-0 right-0 w-9 h-9 aspect-1 rounded-full object-cover"/>
                    <img src={props.avatars[1]}
                         alt={props.alt}
                         className="absolute top-0 left-3.5 w-9 h-9 aspect-1 rounded-full object-cover"/>
                    <img src={props.avatars[2]}
                         alt={props.alt}
                         className="absolute bottom-0 left-0 w-9 h-9 aspect-1 rounded-full object-cover"/>
                </div>
            );
        default:
            return (
                <div
                    className={"relative icon-2xl aspect-1 rounded-full w-fit" + (props.className ? " " + props.className : "")}>
                    <div
                        className="absolute bottom-0 right-0 w-9 h-9 bg-secondary-600 aspect-1 rounded-full object-cover flex flex-row items-center justify-center">
                        <span className="body-2 font-semibold text-white">+{props.avatars.length - 2}</span>
                    </div>
                    <img src={props.avatars[1]}
                         alt={props.alt}
                         className="absolute top-0 left-3.5 w-9 h-9 aspect-1 rounded-full object-cover"/>
                    <img src={props.avatars[2]}
                         alt={props.alt}
                         className="absolute bottom-0 left-0 w-9 h-9 aspect-1 rounded-full object-cover"/>
                </div>
            );
    }
}