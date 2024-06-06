interface MessageListProps {
    messages: {id: string, senderId: string, text: string}[]
}

export const ChatMessagesList = (props: MessageListProps) => {
    return (
        <ul className="message-list">
            {props.messages.map((message) => {
                return (
                    <li key={message.id} className="message">
                        <div>{message.senderId}</div>
                        <div>{message.text}</div>
                    </li>
                )
            })}
        </ul>
    )
}
