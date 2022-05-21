import p1 from '../Components/images/p1.jpg';
import p2 from '../Components/images/p2.png';
import p3 from '../Components/images/p3.png';
import p4 from '../Components/images/p4.jpg';
import p5 from '../Components/images/p5.png';
import markPic from '../Components/images/mark.png';
import angryPic from '../Components/images/angry.png';
import stupid from '../Components/images/you-stoopid.mp3';
import world from '../Components/images/world.mp4';
import elonPic from '../Components/images/elon.jpg';
import bilPic from '../Components/images/bil.jpg';
import kanyePic from '../Components/images/kanye.jpg';
import allmightPic from '../Components/images/allmight.jpg';
import youngMidoriaPic from '../Components/images/youngMidoria.jpg';
import peterPic from '../Components/images/peter.png';
import defaultContact from '../Components/images/defaultContact.jpg';

let contactsBen =[{num: 0, name:"Mark", img: markPic, time: "07:00:53", messageHistory: [{type:"image/png", side: "left", content:angryPic, time:"07:00:29"},{type:"audio", side: "left", content:stupid ,time:"07:00:33"}, {type:"video/mp4", side: "left", content: world,time:"07:00:44"},{type:"text", side: "left", content:"how dare you steal my chat idea!! I will have my revenge!!!",time:"07:00:54"},{type:"text", side: "right", content:"Im sorry who are you again?",time:"09:05:01"}],nickname: "Mark Zuckerberg"},
                {num: 1, name:"AllMight", img: allmightPic, time: "06:05:53", messageHistory: [{type:"text", side: "right", content:"Can I be A hero too?",time:"06:05:51"},{type:"image/jpeg", side: "right", content:youngMidoriaPic,time:"06:05:53"},{type:"text", side: "left", content:"HA HA HA",time:"06:05:53"},{type:"text", side: "left", content:"Young Midoria",time:"06:05:53"},],nickname:"All Might"},
                {num: 2, name:"Kanye", img: kanyePic, time: "05:00:07", messageHistory: [{type:"text", side: "left", content:"people always ask me what I would do if I didn't win",time:"05:00:07"},{type:"text", side: "left", content:"...",time:"05:00:03"}, {type:"text", side: "left", content:"I guess will never know",time:"05:00:03"}],nickname: "kanye west"},
                {num: 3, name:"Bil", img: bilPic, time: "04:00:07", messageHistory: [{type:"text", side: "left", content:"I just heard about your whatsup clone, lol!",time:"04:00:07"},{type:"text", side: "left", content:"mark is gonna lose it",time:"04:00:05"}],nickname: "Bil Gates"},
                { num: 4, name:"Elon", img: elonPic, time: "03:00:07", messageHistory: [{type:"text", side: "left", content:"Just letting you know that we launch our spaceship again",time:"03:00:22"},{type:"text", side: "left", content:"Its gonna be legit!",time:"03:00:24"}, {type:"text", side: "left", content:"Never mind..it crashed again",time:"07:05:03"}],nickname: "Elon Musk"}
            ,{num: 5, name:"Peter", img:peterPic, time: "03:00:07", messageHistory: [{type:"text", side: "left", content:"Have you heard?",time:"03:22:07"},{type:"text", side: "right", content:"heard about what?",time:"03:22:07"}, {type:"text", side: "left", content:"about the bird bird bird",time:"03:22:03"},{type:"text", side: "left", content:"bird bird is the word",time:"03:22:03"},{type:"text", side: "left", content:"about the bird bird bird",time:"03:22:03"},{type:"text", side: "left", content:"bird bird is the word",time:"03:22:03"}],nickname: "Peter Griffin"}    
            ];

let contactsSagiv = [{num: 0, name:"Mark", img: markPic, time: "07:00:53", messageHistory: [{type:"image/png", side: "left", content:angryPic, time:"07:00:29"},{type:"audio", side: "left", content:stupid ,time:"07:00:33"}, {type:"video/mp4", side: "left", content: world,time:"07:00:44"},{type:"text", side: "left", content:"how dare you steal my chat idea!! I will have my revenge!!!",time:"07:00:54"},{type:"text", side: "right", content:"Im sorry who are you again?",time:"09:05:01"}],nickname: "Mark Zuckerberg"},
                {num: 1, name:"Peter", img:peterPic, time: "04:00:07", messageHistory: [{type:"text", side: "left", content:"Have you heard?",time:"03:05:53"},{type:"text", side: "right", content:"heard about what?",time:"05:00:53"}, {type:"text", side: "left", content:"about the bird bird bird",time:"05:00:53"},{type:"text", side: "left", content:"bird bird is the word",time:"05:00:53"},{type:"text", side: "left", content:"about the bird bird bird",time:"05:00:53"},{type:"text", side: "left", content:"bird bird is the word",time:"05:00:54"}],nickname: "Peter Griffin"},
                {num: 2, name:"Kanye", img: kanyePic, time: "04:00:07", messageHistory: [{type:"text", side: "left", content:"people always ask me what I would do if I didn't win",time:"05:00:07"},{type:"text", side: "left", content:"...",time:"05:00:03"}, {type:"text", side: "left", content:"I guess will never know",time:"05:00:03"}],nickname: "kanye west"},
                {num: 3, name:"Bil", img: bilPic, time: "04:00:07", messageHistory: [{type:"text", side: "left", content:"I just heard about your whatsup clone, lol!",time:"04:00:07"},{type:"text", side: "left", content:"mark is gonna lose it",time:"04:00:05"}],nickname: "Bil Gates"},
                {num: 4, name:"Elon", img: elonPic, time: "03:00:07", messageHistory: [{type:"text", side: "left", content:"Just letting you know that we launch our spaceship again",time:"03:00:22"},{type:"text", side: "left", content:"Its gonna be legit!",time:"03:00:24"}, {type:"text", side: "left", content:"Never mind..it crashed again",time:"07:05:03"}],nickname: "Elon Musk"}
                ];



const users = new Map([["Ben", ["Ben123456","Ben The DFAQ",p1,contactsBen]],["Sagiv",["Sagiv123456","Sagiv rrr",p3,contactsSagiv]],["Sahar",["1234","sahar rofe",p2,[]]],["Omri",["1234","omri ben hamo",p3,[]]],["Uri",["1234","uri graitzer",p5,[]]],["Liran",["1234","Liran Antebi",p3,[]]],["Niv",["1234","Parazit",defaultContact,[]]],
                        ["Mark", ["1234","Mark Zuckerberg",markPic,[]]],["Kanye", ["1234","kanye west",kanyePic,[]]],["AllMight", ["1234","All Might",allmightPic,[]]],["Bil", ["1234","Bil Gates",bilPic,[]]],["Elon", ["1234","Elon Musk",elonPic,[]]],["Peter", ["1234","Peter Griffin",peterPic,[]]] ]);



const timeToNum = (time) => {
    let hours = time.substr(0,2);
    let minutes = time.substr(3,5);
    let timeStr = hours + minutes;
    let timeNum = parseInt(timeStr);
    return timeNum;
}

export default users;