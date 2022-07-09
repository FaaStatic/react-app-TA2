import React from 'react';
import {   Navbar, NavbarBrand, } from 'react-bootstrap';
import { FaInfoCircle } from "react-icons/fa";
import {
  useNavigate  
} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Headers(){
    let navigate = useNavigate();

    return(
        <Navbar
        style={{
          width: "100%",
          height: 75,
          margin: 0,
          backgroundColor: "#2C3639",
        }}
      >
        <NavbarBrand
        onClick={()=>{
            navigate('/');
        }}
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 28,
            marginLeft: 16,
            cursor:"pointer"
            
          }}
        >
          Batik Method Classification
        </NavbarBrand>
        <FaInfoCircle
        onClick={()=>{
            navigate('/about');
        }}
          style={{
            color: "white",
            height: 28,
            width: 28,
            marginRight: 32,
            cursor:"pointer",
            position: "absolute",
            right: 0,
          }}
        />
      </Navbar>
    );
}

