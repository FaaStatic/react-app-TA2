import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Headers from "./header";

export default function About() {

  

  return (
    <div
      className="container-fluid"
      style={{
        padding: 0,
        margin: 0,
        display: "flex",
      }}
    >
      <div className="col">
        <div className="row">
          <Headers />
        </div>
        <div className="row">
          <center>
            <img
              src={require("../../assets/profile.jpg")}
              className="img-fluid shadow-4 rounded"
              style={{
                height: 150,
                width: 100,
                margin: 16,
                alignSelf: "center",
                borderRadius: 8,
              }}
              alt="image"
            />
          </center>
          <center>
            <div
              style={{
                marginTop: 16,
                marginBottom: 16,
              }}
            >
              <h5>Suhaili Faruq</h5>
              <h5>A11.2018.11570</h5>
              <h5>Teknik Informatik</h5>
            </div>
          </center>
          <div>
            <center>
              <h2>Tentang Aplikasi</h2>
            </center>
            <center>
              <p
                style={{
                  marginTop: 16,
                  marginBottom: 16,
                  textJustify: "auto",
                  width: "30%",
                }}
              >
                Batik Method Classification adalah sebuah aplikasi berbentuk
                website untuk mendeteksi metode pembuatan batik berdasarkan
                citra batik yang diupload{" "}
              </p>
            </center>
          </div>
        </div>
       
      </div>
      <div style={{
        position:'absolute',
        width:'100%',
        bottom:0,
        marginBottom:16,
      }}>
        
    <center><h6>Suhaili Faruq&copy;2022</h6></center>
        </div>
    </div>
  );
}
