import Nick from '../images/nick.png'
import p1 from '../images/p1.jpg';
import p2 from '../images/p2.png';
import p3 from '../images/p3.png';
import p4 from '../images/p4.jpg';
import p5 from '../images/p5.png';
import background1 from '../images/background.jpg'
import defaultContact from '../images/defaultContact.jpg';
import React, { useState ,useEffect } from "react";
import { Link, useNavigate, useHistory } from "react-router-dom";
import { Form, Button, Container, Col, Row, Card, Alert } from "react-bootstrap";
import users from "../Users";
import { bind } from 'browser-router/html5-history/adapter';
import { getActiveElement } from '@testing-library/user-event/dist/utils';




export default function Registration() {
    //the data of tcontacts from the server
    const[listUsers,setListUsers] = useState([]);
    //the function to get the data from server
    useEffect(async()=>{
        const res = await fetch('http://localhost:5103/api/users');
        const data = await res.json();
        setListUsers(data);
    },[]);
    



    const [file, setFile] = useState(defaultContact);
    const [fileType, setFileType] = useState();
    let navigate = useNavigate();
    const [userTable, setUserTable] = useState(users);
    //checks valid password
    const CheckPassword = (pass, v_pass) => {
        var lowerCaseLetters = /[a-z]/g;
        var upperCaseLetters = /[A-Z]/g;
        var numbers = /[0-9]/g;
        //checks password has to have at least 8 characters and at most 16 characters
        if (pass.value.length < 8) {
            return 'password has to have at least 8 characters'
        }
        if (pass.value.length > 16) {
            return 'password has to have at most 16 characters'
        }
        //checks if only lower case
        if (!(pass.value.match((lowerCaseLetters)) && (pass.value.match(upperCaseLetters)) && (pass.value.match(numbers)))) {
            return 'password has to contain lower+upper case letters and numbers'
        }
        if (pass.value !== v_pass.value) {
            return 'passwords not match'
        }
        return true

    }

    const UserInDbAlready = (userName) =>{
        var toReturn = 0;
        listUsers.map((value,index)=>{
            if (value.username == userName){
                toReturn = 1;
            }
    });
        return toReturn;
    }
        
    //checks valid UserName or FullNAme
    const CheckUserName = (user) => {
        if (user.value.length < 3) {
            return 'Username has to be at least than 3 letters'
        }
        if (user.value.length > 20) {
            return 'Username has to be at most than 20 letters'
        }
        //check if user already exist
        //With Db - WORKS!
        if (UserInDbAlready(user.value) == 1){
            return 'Username is already taken'
        }
        //no DB
        // if (users.has(user.value)) {
        //     return 'Username is already taken'
        // }
        return true
    }

    const choosePhoto = () => {
        let imageUser = document.getElementById("formFile").value;
        if (imageUser == "") {
            imageUser = defaultContact
        }
        //cut the image string
        else {
            imageUser = imageUser.slice(-6);
            imageUser = imageUser.slice(0, 2)
        }
        switch (imageUser) {
            case "p1":
                return p1;
            case "p2":
                return p2;
            case "p3":
                return p3;
            case "p4":
                return p4;
            case "p5":
                return p5;
            default:
                return 0
        }

    }
    //main register function
    const register = () => {
        var Username = document.getElementById("username_user")
        var PassWord = document.getElementById("password_user")
        var VerifyPassWord = document.getElementById("v_password_user")
        var fullName = document.getElementById("display")
        let validPass = CheckPassword(PassWord, VerifyPassWord)
        let validUsername = CheckUserName(Username)
        let validFullName = CheckUserName(fullName)
        if (validUsername !== true) {
            alert(validUsername)
            return
        }
        if (validPass !== true) {
            alert(validPass)
            return
        }
        if (validFullName !== true) {
            alert(validFullName)
            return
        }
        // NO DB
        // let oldUsers = userTable
        // oldUsers.set(Username.value.toString(), [PassWord.value.toString(), fullName.value.toString(), file, []])

        // With DB
        let newUserToAdd = {username:Username.value.toString(),password:PassWord.value.toString(),nickName: fullName.value.toString(),image:"A",server:"s1",chats:null,contacts:null};
        let oldUsers =  [...listUsers,newUserToAdd]; 
        fetch('http://localhost:5103/api/users', {
            method:'POST',
            headers:{"Content-Type" : "application/json"},
            body: JSON.stringify(newUserToAdd)
        })
        .then(function(response){return response.json()})
        .then(function(data){
        })
        setListUsers(oldUsers);
        navigate("/Login");

    }

    const handleChange = (e) => {
        setFileType(e.target.files[0].type);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div className="centerObject" >
            <Card style={{ width: '20rem', background: "#282c34", color: "white" }}>
                <h1>
                    Welcome to FreakNet!
                </h1>

                <Form.Group className="loginForm" controlId="username_user">
                    <br />
                    <Form.Control type="username" placeholder="Enter Username"></Form.Control>
                </Form.Group>

                <Form.Group className="loginForm" controlId="display" >
                    <br />
                    <Form.Control type="username" placeholder="Enter your full name"></Form.Control>
                </Form.Group>



                <Form.Group className="loginForm" controlId="password_user">
                    <br />
                    <Form.Control type="password" placeholder="Enter password"></Form.Control>
                </Form.Group>

                <Form.Group className="loginForm" controlId="v_password_user">
                    <br />
                    <Form.Control type="password" placeholder="Enter password"></Form.Control>
                </Form.Group>

                <div class="mb-3">
                    <br />
                    <input class="form-control" onChange={(e) => handleChange(e)} type="file" id="formFile" />
                </div>

                <Button variant="primary" type="submit" onClick={register} class="buttonLogin"  >
                    Submit
                </Button>


                <br />
                <Link to="/Login">Back To Login Page</Link>
                {listUsers.map((value,index)=>{
                return <div>
                    <h1>hello!</h1>
                    <div>{value.username}</div>

                    </div>
            })}
            </Card>
            
        </div>
    );
}






