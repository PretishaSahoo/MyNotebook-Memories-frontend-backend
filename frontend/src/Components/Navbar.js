import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import mylogo from "../Images/logo.png";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("./login", { replace: true });
  };

  const navbarStyles = {
    backgroundColor: 'white',
    color: 'black',
    padding: '10px',
    position: 'fixed',
    width: '100%',
    height: '12vh',
    top: '0',
    zIndex: '1000',
    fontFamily: 'Arial, sans-serif',
  };

  const buttonStyle = {
    background: '#FF6F61' ,
    color: 'white', 
    padding: '10px 20px', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    transition: 'background-color 0.3s ease', 
    border: 'none',
    outline: 'none', 
  };

  return (
    <>
      {!localStorage.getItem("token") ? (
        <>
        <nav className="navbar navbar-light navbar-expand-lg" style={navbarStyles}>
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <div className="d-flex">
              <Link className="navbar-brand fw-lighter" to="/">
                <img src={mylogo} alt="Logo" height="70vh" className="d-inline-block align-text-top pb-2" />
              </Link>
            </div>
            <form className="d-flex">
              <Link className="btn btn-light mx-2" to="/login" style={buttonStyle}  role="button">
                Login
              </Link>
              <Link className="btn btn-light mx-2"  to = "/signup" style={buttonStyle}  role="button">
              Signup
              </Link>
            </form>
          </div>
        </nav>
        </>
      ) : (
        <nav className="navbar navbar-expand-lg  bg-body-tertiary" >
          <div className="container-fluid ">
              <Link className="navbar-brand fw-lighter" to="/">
                <img src={mylogo} alt="Logo" height="50vh" className="d-inline-block align-text-top" />
              </Link>

              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <button className="ms-auto" style={buttonStyle} onClick={handleLogout}>
                Logout
              </button>
            </div> 
            </div>
        </nav>
      )}
    </>
  );
}
