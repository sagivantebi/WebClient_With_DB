import React, { useState } from "react";
import App, { buttonLogin } from "../App";
import { Link,useNavigate } from "react-router-dom";
import { Form, Button, Container, Col, Row, Card, Alert } from "react-bootstrap";
import users from "../Users";
import background1 from '../images/background.jpg'



export default function Chat() {
    let navigate = useNavigate();
    const [accessSuccess, setSuccess] = useState(false);
    const [accessFail, setFail] = useState(false);
    const [lUsers, setUsers] = useState(users);

    const  checkLogin = ()=> {
        let password = (document.getElementById("formPassword")).value;
        let username = (document.getElementById("formUsername")).value;
        if (lUsers.has(username) && lUsers.get(username).at(0) == password) {
            setSuccess(true);
            setTimeout(() => {navigate("/Chat");}, 500);
        }
        else {
            setFail(true);
        }
    }

    
    return(

        <div className="centerObject">

        <Card style={{ width: '20rem' ,background :"#282c34" , color :"white"}}>
            <h1>
                Welcome to FreakNet!
            </h1>

            <Form.Group className="loginForm" controlId="formUsername">
            <br/>
                <Form.Control type="username" placeholder="Enter Username"></Form.Control>
            </Form.Group>


            <Form.Group className="loginForm" controlId="formPassword">
            <br/>
                <Form.Control type="password" placeholder="Enter Password"></Form.Control>
            </Form.Group>


            <br/>
            <Button variant="primary" type="submit" onClick={()=> (checkLogin())} class="buttonLogin">
                        Submit
            </Button>
            <br />
            <Link to="/Register">Not Registered?</Link>
            <Alert show={accessSuccess} onClose={() => ( setSuccess(false))} variant="light" dismissible>
                <Alert.Heading>Access Granted!</Alert.Heading>
            </Alert>
            <Alert show={accessFail} onClose={() => setFail(false)} variant="danger" dismissible>
                <Alert.Heading>Wrong Username or Password</Alert.Heading>
            </Alert>
  
        </Card>

    </div>

    );
}