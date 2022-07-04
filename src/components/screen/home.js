import React, { useState, useEffect, Component } from "react";
import {
  Button,
  Form,
  Navbar,
  NavbarBrand,
  Card,
  Modal,
  ModalFooter,
  ModalTitle,
  Row,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaInfoCircle } from "react-icons/fa";
import { Api } from "../api/Api";
import Chart from "react-apexcharts";
import { ThreeDots } from "react-loader-spinner";

export default function Home() {
  const [upload, setUpload] = useState();
  const [preview, setPreview] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [series, setSeries] = useState([0,0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!upload) {
      setPreview(undefined);
      return;
    }
    const imageObj = URL.createObjectURL(upload);
    setPreview(imageObj);
  }, [upload]);

  const handleInputFile = (value) => {
    if (!value.target.files || value.target.files.length === 0) {
      setUpload(undefined);
      return;
    }
    console.log(value.target.files[0]);
    setUpload(value.target.files[0]);
  };

  const uploadImage = async () => {
    setModalShow(true);
    setLoading(true);
    await Api.post("predict", {
      image: upload,
    })
      .then((res) => {
        let body = res;
        let status = res.status;
        let data = res.data[0];
        if (status === 200) {
            console.log(data)
            console.log(data.Cetak);
            console.log(data.Tulis);
            let Cetak = Math.round(data.Cetak*100)
            let Tulis = Math.round(data.Tulis*100)
          let setResonse = [
            Cetak,
            Tulis

          ]
          setSeries(setResonse);
          console.log(series);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hideModal = ()=>{
    setModalShow(false);
  }

  return (
    <div
      className="container-fluid"
      style={{
        padding: 0,
        margin: 0,
        display: "flex",
      }}
    >
      <Modal
        show={modalShow}
        style={{
          backgroundColor: "transparent",
        }}
        centered
      >
        <Modal.Header>
          <ModalTitle>Result Classification</ModalTitle>
        </Modal.Header>
        <Modal.Body style={{
            display:'flex',
        }}>
      <div style={{
       position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"
      }}>
      {loading ? (
            <ThreeDots color="#3F4E4F" height="20" width="100%" />
          ) : (
            <Chart
              type="pie"
              options={{
                labels: ["Batik Cetak", "Batik Tulis"]
              }}
              series={series}
            />
          )}
      </div>
      
        </Modal.Body>
        <ModalFooter>
          <Row>
            <Button onClick={hideModal}>Back</Button>
          </Row>
        </ModalFooter>
      </Modal>

      <Navbar
        style={{
          width: "100%",
          height: 75,
          margin: 0,
          backgroundColor: "#2C3639",
        }}
      >
        <NavbarBrand
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 28,
            marginLeft: 16,
          }}
        >
          Batik Method Classification
        </NavbarBrand>
        <FaInfoCircle
          style={{
            color: "white",
            height: 28,
            width: 28,
            marginRight: 32,
            position: "absolute",
            right: 0,
          }}
        />
      </Navbar>
      <Card
        style={{
          width: "50%",
          backgroundColor: "#DCD7C9",
          position: "absolute",
          top: "20%",
          left: "25%",
        }}
      >
        <img
          src={
            preview
              ? preview
              : "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2021/10/28064854/12.-Tips-Merawat-Anak-Kucing-Munchkin.jpg"
          }
          className="img-fluid shadow-4 rounded"
          style={{
            height: "50%",
            width: "50%",
            margin: 16,
            alignSelf: "center",
          }}
          alt="image"
        />

        <Form
          style={{
            marginBottom: 16,
          }}
        >
          <Form.Group>
            <Form.Label
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#2C3639",
                marginBottom: 16,
                marginLeft: "40%",
              }}
            >
              Upload Batik Images
            </Form.Label>
            <Form.Control
              placeholder="Upload"
              type="file"
              id="image"
              onChange={handleInputFile}
              style={{
                width: "50%",
                marginLeft: "25%",
              }}
            />

            <Button
              variant="secondary"
              onClick={uploadImage}
              style={{
                marginTop: 16,
                color: "#f9f9f9",
                marginLeft: "40%",
              }}
            >
              Upload & Predict
            </Button>
          </Form.Group>
        </Form>
      </Card>
    </div>
  );
}
