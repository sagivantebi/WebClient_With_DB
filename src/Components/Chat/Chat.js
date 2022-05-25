import React, { useState, useRef, useEffect } from "react";
import Nick from '../images/nick.png';
import p1 from '../images/p1.jpg';
import p2 from '../images/p2.png';
import p3 from '../images/p3.png';
import p4 from '../images/p4.jpg';
import defaultContact from '../images/defaultContact.jpg';
import attach from '../images/attachment-icon-png-8.jpg';
import record from '../images/record.png';
import video from '../images/video.png';
import heart from '../images/heart.png';
import ChatLeftMessageProfile from './ChatLeftMessageProfile'
import { Link, useLocation } from "react-router-dom";
import { Form, Button, Modal, Container, Col, Row, Card, Alert } from "react-bootstrap";
import Message from "./Message";
import ChatBox from "./ChatBox";
import contacts from "./contacts";
import "./Chat.css";
import axios from "axios";
import ChatListLeft from "./ChatListLeft";
// import users from "../Users";
import onlineArray from "./onlineArray";
import { HubConnectionBuilder } from "@microsoft/signalr";


export default function Chat() {
  const [render, setRender] = useState(false);
  const [update, forceUpdate] = useState(0);
  const { state } = useLocation();
  const userLogin = state.userLogin;
  //  const userLogin = document.getElementById("formUsername").value;

  //Before DB
  // let chatHook = users.get(usernameToUse).at(3).sort(timeComp);
  // for (let index = 0; index < chatHook.length; index++) {
  //   chatHook.at(index).num = index;
  // }

  //Trying DB
  let urlSpecificUser = "http://localhost:5103/api/users"
  const [toRender, setToRender] = useState(null);
  const [toRender2, setToRender2] = useState(null);

  //the data of tcontacts from the server
  const [listUsers, setListUsers] = useState([]);
  const [userLoginObject, setUserLoginObject] = useState([]);

  const getData = async () => {
    const res = await fetch(urlSpecificUser, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': '*'
      },
      mode: 'cors',
    })
    let data = await res.json();
    setListUsers(data)
    setToRender(data)
    if (toRender == null) {
      setToRender2(renderHelper);
    }
    listUsers.map((value, index) => {
      if (value.username == userLogin) {
        setUserLoginObject(value);
      }
    });
  }
  
  useEffect(async () => {
    const res = await fetch(urlSpecificUser, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': '*'
      },
      mode: 'cors',
    })
    let data = await res.json();
    setListUsers(data)
    setToRender(data)
    if (toRender == null) {
      setRender(renderHelper);
    }
    listUsers.map((value, index) => {
      if (value.username == userLogin) {
        setUserLoginObject(value);
      }
    });
  }, [render]);
  // console.log("loaded react");
  let chats = (userLoginObject.chats);
  let contacts = (userLoginObject.contacts);
  let userImage = (userLoginObject.image);
  let userNickName = (userLoginObject.nickName);
  const [currChat, setCurrChat] = useState();
  

  const [errorType1, setErrorType1] = useState(false);
  const [errorType2, setErrorType2] = useState(false);
  const [errorType3, setErrorType3] = useState(false);
  const [input, setInput] = useState();
  const [userExist, setUserExist] = useState(false);
  const userIsNotExist = () => setUserExist(true);
  const userIsExist = () => setUserExist(false);
  const [show, setShow] = useState(false);
  const [showAttach, setShowAttach] = useState(false);
  const [showFileUp, setShowFileUp] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => { setShow(false); userIsExist() }
  const handleShowAttach = () => setShowAttach(!showAttach)

  const [showAuButt, setShowAudButt] = useState(false);
  const [showRecord, setShowRecord] = useState(false);

  const [fileType, setFileType] = useState();
  const [file, setFile] = useState();

  const handleChange = (e) => {
    setFileType(e.target.files[0].type);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleAudio = () => {
    let chunks = [];
    let constraints = { audio: true, video: false };
    navigator.mediaDevices.getUserMedia(constraints).then(
      (stream) => {
        var mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.onstop = () => {
          let blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
          var today = new Date();
          var audioURL = URL.createObjectURL(blob);
          let newMessage = { type: "audio", side: "right", content: audioURL, time: getCurrentTimeString() };
          sendMessage(newMessage);
        }
        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        }
        function recordAudio() {
          mediaRecorder.start();

        }
        function stopAudio() {
          mediaRecorder.stop();
        }
        var start = document.getElementById("start-record");
        start.onclick = recordAudio;
        var stop = document.getElementById("stop-record");
        stop.onclick = () => {
          setShowAudButt(false);
          stopAudio()
        }
      }
    );

  }

  const handleEnter = (e) => {

    if (e.key === 'Enter') {
      sendMessage(getMessage());
      e.preventDefault();
    }
  }

  const handleFile = () => {
    let newMessage = { type: fileType, side: "right", content: file, time: getCurrentTimeString() };
    let conts = chats;
    let newContact = chats.at(currChat);
    let history = newContact.messageHistory;
    let newHistory = [...history, newMessage];
    newContact.messageHistory = newHistory;
    conts[currChat] = newContact;
    setRender(renderHelper);
    setShowFileUp(false);
  }


  const sendHeart = () => {
    let newMessage = { type: "text", side: "right", content: "♥", time: getCurrentTimeString() };
    sendMessage(newMessage);

  }

  const connection = new HubConnectionBuilder().withUrl('http://localhost:5103/SignalHub', {
    headers: {"Access-Control-Allow-Origin": "include"},
    mode: "cors"
  }).build();

async function start() {
  try {
    await connection.start();
    // console.log("sigR connected");
  } catch(err) {
    console.log(err);
    setTimeout(start, 5000);
  }
}

start();

const mounted = useRef();
const mounted2 = useRef();
useEffect(() => {
  if(!mounted.current) {
    connection.on("MessageSent", async (user, contact, message) => {
      if(user == userLogin){
      }
      console.log("got update!!!");

    });
    mounted.current = true;

  }
}, []);


  const sendMessage = async (mess) => {
    let finalUrl = 'http://localhost:5103/api/contacts/' + currChat + '/messages';
    axios.post(finalUrl, mess, {
      params:
        { username: userLogin }
    }).then(response => response.status).catch(err => console.warn(err));

    //   await fetch('http://localhost:5103/api/contacts/' + currChat + '/messages', {
    //   method:'POST',
    //   headers:{"Content-Type" : "application/json"},
    //   body: JSON.stringify(messageNew)
    // })
    // .then(function(response){return response})
    // .then(function(data){
    // })
    
    setToRender(null)
    setRender(renderHelper);
    forceUpdate(value => value + 1);
    await connection.invoke("UpdateChat", userLogin, currChat, mess.content).then(console.log("sent messag!!"));
  }
  const checkContactExists = (name) => {
    var toReturn = 0;
    contacts.map((value, index) => {
      if (value.id == name) {
        toReturn = 1;
      }
    });
    return toReturn;
  }

  const checkUserExists = (name) => {
    var toReturn = 0;
    listUsers.map((value, index) => {
      if (value.username == name) {
        toReturn = 1;
      }
    });
    return toReturn;
  }

  const findUserAddContact = (name) => {
    var cont = null;
    listUsers.map((value, index) => {
      if (value.username == name) {
        cont = value;
      }
    });
    return cont;
  }
  const addContactChat = () => {
    let username = (document.getElementById("usernameAdd"));
    //cheks if we already have a chat with this contact
    if (username.value == userLogin) {
      setErrorType3(true)
      setErrorType2(false)
      setErrorType1(false)
      userIsNotExist()
      return null;

    }

    if (checkContactExists(username.value)) {
      setErrorType2(false)
      setErrorType1(true)
      userIsNotExist()
      return null;
    }

    if (checkUserExists(username.value)) {
      setShow(false)
      var contactDb = findUserAddContact(username.value);
      let cont = { id: username.value, name: contactDb.nickName, server:contactDb.server }
      let finalUrl = 'http://localhost:5103/api/contacts';
      axios.post(finalUrl, cont, {
        params:
          { username: userLogin }
      }).then(response => response.status).catch(err => console.warn(err));
      // await fetch('http://localhost:5103/api/contacts', {
      //   method: 'POST',
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(conts)
      // })
      //   .then(function (response) { return response })
      //   .then(function (data) {
      //   })
      userIsExist()
      setErrorType1(false)
      setErrorType2(false)
      setErrorType3(false)
      setRender(renderHelper);
      //those two making the rendor!
      setToRender(null);
      setRender(renderHelper);
      forceUpdate(value => value + 1);
      return cont;

    }
    else {
      setErrorType1(false)
      setErrorType2(true)
      setErrorType3(false)
      userIsNotExist()
      return null;
    }
  }

  const returnStatus = () => {
    return "";
  }

  const returnNickname = () => {
    if (contacts == undefined) {
      return ""
    }
    return contacts.map((value, index) => {
      if (value.id == currChat) {
        return value.name;
      }
    });
    return ""
  }


  const returnImg = () => {
    const logo = (userImage);
    return logo;
  }
  const returnMsg = () => {
    if (contacts == undefined) {
      return "";
    }
    return ChatBox(chats, currChat);
  }
  const returnImgUser = () => {
    const logo = (userImage);
    return logo;
  }


  const getMessage = () => {
    let message = document.getElementById("chatIn").value;
    document.getElementById("chatIn").value = '';
    let newMessage = { content: message };
    return newMessage;
  }

  return (
    <div className="centerChat">
      <div className="container" style={{ background: "black", height: "100%", width: "100%" }}>
        <div className="row no-gutters" style={{ padding: "0px", background: "black", height: "100%" }}>
          <div className="col-md-4 border-right" style={{ background: "#282c34", height: "80%", borderRadius: "10px" }}>
            <div className="settings-tray" style={{ background: "black", color: "white" }}>
              <img className="profile-image" src={p3} alt="Profile img" />
              <span className="settings-tray--right">
                <span className="material-icons">{userNickName}</span>
                {/*ADD CONTACT: */}
                <Button variant="light" type="submit" onClick={handleShow}>+</Button>
              </span>
            </div>
            <div style={{ overflowY: "scroll", background: "black", color: "black", height: "450px", width: "100%", position: "relative" }}>
              <div>
                {ChatListLeft(contacts, setCurrChat)}
              </div>
            </div>
          </div>
          <div class="col-md-8 chat-box" style={{ padding: "0px", marginTop: "10px" }}>
            <ChatBar status={returnStatus()} nickname={returnNickname()} img={p1} />
            <div style={{ overflowY: "scroll", overflowX: "hidden", marginBottom: "5px", height: "300px", position: "relative" }}>
              <div>{returnMsg()}</div>
            </div>
            <div class="row">
              <div class="col-12">
                <Modal style={{ marginLeft: "35%", marginTop: "25%", width: "30%" }} show={showFileUp}>
                  <input id="up-image" type="file" onChange={(e) => handleChange(e)} />
                  <span >
                    <Button type="submit" variant="danger" style={{ alignContent: "left", width: "100%" }} onClick={() => handleFile()}>send</Button>
                    <Button variant="danger" style={{ width: "100%" }} onClick={() => setShowFileUp(false)}>cancel</Button>
                  </span>
                </Modal>

                <Modal id="audio-modal" style={{ marginLeft: "40%", marginTop: "250px", width: "375px" }} show={showAuButt}>
                  <Container>
                    <Row>
                      <Col md="auto">
                        <Button variant="danger" style={{ width: "100%" }} id="start-record">Record</Button>
                      </Col>
                      <Col md="auto">
                        <Button variant="danger" style={{ width: "100%" }} id="stop-record">Stop Recording</Button>
                      </Col>
                      <Col md="auto">
                        <Button variant="danger" style={{ width: "100%" }} onClick={() => setShowAudButt(false)}>cancel</Button>
                      </Col>
                    </Row>
                  </Container>
                </Modal>

                {/* <span style={{ marginBottom: "2px" }}>
    {showAttach ? <span className="media-container">
    <span>
    {
      showAttach ? <span className="media-button"><Button variant="outline-danger" onClick={() => (setShowAudButt(true), handleAudio())}><img src={record} alt='record' width="16" height="16" fill="currentColor" /></Button></span> : null
    }
    </span>
    <span>
    {
      showAttach ? <span className="media-button"><Button variant="outline-danger" onClick={() => setShowFileUp(true)}><img src={video} alt='video' width="16" height="16" fill="currentColor" /></Button></span> : null
    }
    </span>
    <span>
    {
      showAttach ? <span className="media-button"><Button size='xs' variant="outline-danger" onClick={() => sendHeart()}><img src={heart} alt='heart' width="16" height="16" fill="currentColor" /></Button></span>
      : null
    }
    </span> </span> : null}
    
  </span> */}
                <div class="chat-box-tray">

                  {/* <Button variant="outline-danger" className="media-container-btn" onClick={handleShowAttach}><img src={attach} alt='attachment' width="16" height="16" fill="currentColor" /></Button> */}


                  {/* CHAT INPUT: this form is used to send the messages in the chat */}
                  <form style={{ width: "100%" }}>
                    <input onKeyDown={(e) => { handleEnter(e) }} className="input-box" id="chatIn" defaultValue="" type="text" width="70" placeholder="Type your message here..." from={userLogin} to={currChat} />
                    <Button className="send-button" type="button" variant="danger" onClick={() => { sendMessage(getMessage()) }}>send</Button>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Modal show={show}>
        <div className="container" style={{ background: "#282c34", color: "white" }}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Add New Contact</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <Form.Control id="usernameAdd" type="usernameAdd" placeholder="Enter Username"></Form.Control>
              <div id="emailHelp" className="form-text">Make sure you entered his Username and not his freaky-name</div>
            </div>
            <Alert variant="danger" show={userExist && errorType1}  >
              <Alert.Heading>You already have chat with this user</Alert.Heading>
            </Alert>
            <Alert variant="danger" show={userExist && errorType2}  >
              <Alert.Heading>There is no user with that name</Alert.Heading>
            </Alert>
            <Alert variant="danger" show={userExist && errorType3}  >
              <Alert.Heading>You can't add yourself LOL</Alert.Heading>
            </Alert>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" onClick={() => {
              let newContact = addContactChat();
            }}>Start Chat</button>
          </div>
        </div>
      </Modal>
      <script src="/lib/microsoft/signalr/dist/browser/signalr.js"></script>
      <script src="/js/ws.js"></script>
    </div>
  );
}

const getCurrentTimeString = () => {
  var today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  if (hour < 10)
    hour = "0" + today.getHours();
  if (min < 10)
    min = "0" + today.getMinutes();
  if (sec < 10)
    sec = "0" + today.getSeconds();
  return hour + ':' + min + ":" + sec;
}



const renderHelper = (prev) => {
  return !prev;
}

function ChatBar(props) {
  return (
    <div className="settings-tray" style={{ padding: "px", background: "white" }}>
      <div className="chat-bar no-gutters" style={{ background: "#282c34", color: "white" }}>
        <img className="profile-image" src={props.img} alt="" />
        <div className="text">
          <h6>{props.nickname}</h6>
          <p className="text-muted">{props.status}</p>
        </div>
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
  else if (secA > secB)
    return -1;
  return 1;
}
