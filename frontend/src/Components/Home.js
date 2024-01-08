import React from "react";
import Notes from "./Notes";
import Login from "./Login";

export default function Home(props) {
  if (localStorage.getItem("token") != null) {
    return (
      <Notes showAlert={props.showAlert} />
    );
  }
  else{
    return(
      <Login/>
    );
  }
}
