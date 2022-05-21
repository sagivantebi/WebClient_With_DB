import Message from "./Message";


export default function ChatBox(chats, curr) {
    return (
        <div className="chat-container">
            {chats.at(curr).messageHistory.map((message) => (<span><Message type={message.type} side={message.side} content={message.content} time={message.time}/></span>))}
        </div>
    );
}

const findUserIndex = (chats, name, count) => {
    
    return chats.find((el)=> {
      if(el.name === name) {
          return count;
      };
      count++;
    }); 
  }