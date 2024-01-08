import React from "react";

export default function Alert(props) {
  const alertStyle = {
    minHeight: props.alert ? "40px" : "0", // Adjust the minHeight as needed
    transition: "min-height 0.3s ease", // Optional: Add a smooth transition effect
  };

  return (
    <>
      {props.alert !== null && (
        <div style={alertStyle} className={`alert alert-${props.alert.type} alert-dismissable fade show`} role="alert">
          <strong>{props.alert.type}</strong> {props.alert.msg}
        </div>
      )}
      {!props.alert && (
        <div style={{ minHeight: "60px" }}></div>
      )}
    </>
  );
}
