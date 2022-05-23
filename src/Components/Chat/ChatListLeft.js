import ChatLeftMessageProfile from "./ChatLeftMessageProfile";
import p1 from '../images/p1.jpg';

const sendLatsMessage = (chat) => {
    if (chat.messageHistory.length === 0)
        return " "
    return chat.messageHistory.at(chat.messageHistory.length - 1).content;
}
const sendLatsMessageTime = (chat) => {
    if (chat.messageHistory.length === 0)
        return chat.time;
    return chat.messageHistory.at(chat.messageHistory.length - 1).time;
}

//IF YOU WANT TI CHANGE IT BACK JUST GET RID OF THE sortChat(chats,setChat) AND POUT chats INSTEAD
export default function ChatListLeft(contacts, setChat) {
    if(contacts == undefined){
        return null;
    }
    return (
        <div>
            <div>
                {contacts.map((value,index) => (<ChatLeftMessageProfile
                    num={value.id} setChat={setChat} nickname={value.name} last={value.last} img={p1} time={value.lastDate}/>))}
            </div>
        </div>
    );
}


const timeComp = (a, b) => {
    let timeA;
    let timeB;
    if (a.messageHistory.length == 0) {
        timeA = a.time;
    }
    else {
        timeA = a.messageHistory.at(a.messageHistory.length - 1).time;
    }
    if (b.messageHistory.length == 0) {
        timeB = b.time;
    }
    else {
        timeB = b.messageHistory.at(b.messageHistory.length - 1).time;
    }
    let hoursA = parseInt(timeA.substr(0, 2));
    let hoursB = parseInt(timeB.substr(0, 2));
    let minA = parseInt(timeA.substr(3, 5));
    let minB = parseInt(timeB.substr(3, 5));
    let secA = parseInt(timeA.substr(6, 8));
    let secB = parseInt(timeB.substr(6, 8));
    if (hoursA > hoursB)
      return -1;
    else if (hoursB > hoursA)
      return 1;
    else if (minA > minB)
      return -1;
    else if (minA < minB)
      return 1;
    else if(secA > secB)
      return -1;
    return 1;
}
