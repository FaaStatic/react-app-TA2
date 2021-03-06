import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Card,
  Modal,
  ModalFooter,
  ModalTitle,
  Row,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Api } from "../api/Api";
import Chart from "react-apexcharts";
import { ThreeDots } from "react-loader-spinner";
import Headers from "./header";

export default function Home() {
  const [upload, setUpload] = useState();
  const [preview, setPreview] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [series, setSeries] = useState([0, 0]);
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
    if (upload === undefined && preview === undefined) {
      alert("Kamu Belum Menambah Gambar Batik! :(");
      return;
    }
    setModalShow(true);
    setLoading(true);

    await Api.post("predict", {
      image: upload,
    })
      .then((res) => {
        let status = res.status;
        let data = res.data[0];
        if (status === 200) {
          console.log(data);
          console.log(data.Cetak);
          console.log(data.Tulis);
          let Cetak = Math.round(data.Cetak * 100);
          let Tulis = Math.round(data.Tulis * 100);
          let setResonse = [Cetak, Tulis];
          setSeries(setResonse);
          console.log(series);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hideModal = () => {
    setModalShow(false);
  };

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
        <Modal.Body
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              flex: 1,
            }}
          >
           

            {loading ? (
              <ThreeDots color="#3F4E4F" height="20" width="100%" />
            ) : (
              <Chart
                type="pie"
                style={{
                  position: "relative",
                }}
                options={{
                  labels: ["Batik Cetak", "Batik Tulis"],
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
      <Headers />
      <Card
        style={{
          width: "50%",
          height:'50%',
          justifyContent: "center",
          backgroundColor: "#DCD7C9",
          position: "absolute",
          top: "20%",
          left: "25%",
        }}
      >
        <img
          src={preview ? preview : require("../../assets/nice_upload.png")}
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
            justifyContent: "center",
          }}
        >
          <Form.Group>
            <center>
              <Form.Label
                style={{
                  alignSelf: "center",
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#2C3639",
                  marginBottom: 16,
                }}
              >
                Upload Batik Images
              </Form.Label>
            </center>
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

            <center>
              <Button
                variant="secondary"
                onClick={uploadImage}
                style={{
                  marginTop: 16,
                  color: "#f9f9f9",
                  alignSelf: "center",
                }}
              >
                Upload & Predict
              </Button>
            </center>
          </Form.Group>
        </Form>
      </Card>
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
