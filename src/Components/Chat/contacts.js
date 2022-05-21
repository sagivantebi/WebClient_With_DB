import React, { useState } from "react";
import p1 from '../images/p1.jpg';
import p2 from '../images/p2.png';
import p3 from '../images/p3.png';
import p4 from '../images/p4.jpg';
import users from "../Users";

let contacts = [{num: 0, name:"Sagiv", img: users.get("Sagiv").at(2), time: "13:53", messageHistory: [{type:"text", side: "left", content:"hi",time:"13:53"},{type:"text",side: "left", content: "I am Sagiv",time:"15:53"}, {type:"text",side: "right", content: "ok",time:"16:00"}],nickname: users.get("Sagiv").at(1)},
                {num: 1, name:"BenG", img: users.get("BenG").at(2), time: "12:13", messageHistory: [{type:"text",side: "left", content:"Hello",time:"13:53"},{type:"text", side: "left", content: "I am Sagiv",time:"13:53"}, {side: "right", content: "BEENNNN",time:"14:53"}],nickname: users.get("BenG").at(1)}];


export default contacts;