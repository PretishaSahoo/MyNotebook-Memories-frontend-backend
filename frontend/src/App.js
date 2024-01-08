import './App.css';
import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import NoteState from './Context/notes/NoteState';
import Alert from './Components/Alert';
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {

  const [alert, setalert] = useState(null);

  const showAlert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setalert(null);
    }, 1500);
  }

  const backgroundStyle ={background: 'linear-gradient(to right, #ffe4e1, #ffffff)',minHeight: '100%',minWidth:'100%'}

  return (
    <div style={backgroundStyle}>
      <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div >
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />} />
          <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
        </Routes>
        </div>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;
