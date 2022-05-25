import Message from "./Message";


export default function ChatBox(chats, curr) {
    if (chats == undefined)
        return null;
    return (
        <div>
            <div className="chat-container">
                {mapMessage(findChat(chats, curr))}
            </div>
        </div>

    );
}


const mapMessage = (messages) => {
    if (messages == 0) {
        return ""
    }
    if (messages == null) {
        return ""
    }

    return messages.map((value, index) => {
        return (<span><Message type={value.type} sent={value.sent} content={value.content} time={value.created} /></span>)
    });

}


const findChat = (chats, curr) => {
    var toReturn = 0;
    chats.map((value, index) => {
        if (value.contactId == curr) {
            toReturn = value.messages
        }
    });
    return toReturn;
}


const findUserIndex = (chats, name, count) => {
    return chats.find((el) => {
        if (el.name === name) {
            return count;
        };
        count++;
    });
}