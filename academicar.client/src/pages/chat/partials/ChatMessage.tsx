import {formatDate} from "../../../helpers/date_helper.ts";

interface ChatMessageProps {
    type: "sent" | "received" | "request";
    showSender?: boolean;
    sender: IUser;
    text: string;
    sentAt: Date;
}

export const ChatMessage = (props: ChatMessageProps) => {
    switch (props.type) {
        case "sent":
            return (
                <li className="flex flex-col self-end max-w-[75%]">
                    <div className="body-2 text-gray-500 text-right">{formatDate(new Date(props.sentAt))}</div>
                    <div className="bg-primary-200 rounded-b-xl rounded-tl-xl p-3 mt-1 w-fit">{props.text}</div>
                </li>
            );
        case "received":
            return (
                <li className="flex flex-col self-start max-w-[75%]">
                    <div className="flex flex-row w-full justify-between items-center space-x-3">
                        {props.showSender ?
                            <div className="flex flex-row space-x-2 body-2 font-semibold items-center">
                                <img src={props.sender.pictureSrc}
                                     alt={`${props.sender?.firstName! ?? ""} ${props.sender?.lastName! ?? ""}`}
                                     className="icon-md rounded-full object-cover"/>
                                <span>{`${props.sender?.firstName! ?? ""} ${props.sender?.lastName! ?? ""}`}</span>
                            </div> : <></>}
                        <div className="body-2 text-gray-500 text-left">{formatDate(new Date(props.sentAt))}</div>
                    </div>
                    <div className="bg-white rounded-b-xl rounded-tr-xl p-3 mt-1 w-fit">{props.text}</div>
                </li>
            );

        case "request":
        default:
            return <></>;
    }

    // return (
    //     <li>
    //         <div>{msg.senderId}</div>
    //         <div>{msg.text}</div>
    //     </li>
    // )
}
