
import "../App.css"
import Login from "./Registration+Login/Login";
import Home from './Registration+Login/Home';
import Registration from './Registration+Login/Registration';
import Chat from './Chat/Chat';
import Button from 'react-bootstrap/Button';
import background1 from './images/background.jpg'
import React, { useState } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';



export default function App() {
  const styles = {
    container: {
        backgroundImage: `url(${background1})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
    }
};
  <script
    src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
    crossorigin>

  </script>
  return (
    <Router>
      <div style={{backgroundImage : `url(${background1})`}}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Register' element={<Registration />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Chat' element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}
































// class App extends React.Component {
//   constructor() {
//       super();
//       this.state = {loginActive: true};
//       const userPass = new Map();
//       userPass.set("BenG", "1234");
//       userPass.set("Sagiv", "1111");
//       this.state = {users : userPass};
//       this.togglePage = this.togglePage.bind(this);
//   }

//   togglePage() {
//     this.setState(prevState => ({loginActive: !prevState.loginActive}));
//     console.log("switched!");
//   }

//   render() {
//     const isLogin = this.state.loginActive;
//     let current;
//     let button;
//     if (isLogin) {
//       current = <Login userPass = {this.state.users}/>;
//       button = <button onClick={this.togglePage}> Not Registered? </button>;
//     } else {
//       current = <Registration/>;
//       button = <button onClick={this.togglePage}> Back To Login </button>;
//     }
//     return (
//       <div>
//         {current} 
//         <br/>
//         {button}
//       </div>
//     );
//     }

//   }

