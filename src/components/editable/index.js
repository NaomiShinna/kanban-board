import React, { useState, useRef } from "react";
import "./style.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import axios from "../../api/axios";
const CREATE_TODOS = "/todos";

const Index = (props) => {
  const [isEditable, setIsEditable] = useState(false);
  const [inputText, setInputText] = useState(props.defaultValue || "");
  const [inputDesc, setInputDesc] = useState("");
  const [show, setShow] = useState(false);
  const userRef = useRef();
  const errRef = useRef();

  const handleClose = () => {setShow(false); setInputText(""); setInputDesc("");}; 
  const handleShow = () => setShow(true);
  const [errorMessage, setErrorMessage] = useState("");

  const submission = async (e) => {
    e.preventDefault();
    if (inputText && props.onSubmit) {
     
      try {
        const response = await axios.post(
          CREATE_TODOS,
          JSON.stringify({ inputText, inputDesc }),
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: false,
          }
        );
        // console.log(JSON.stringify(response?.data));
        const accessToken = response?.data?.auth_token;
        
      } catch (err) {
        if (!err.response) {
          setErrorMessage("No Server Response");
        } 
      }

      setInputText("");
      setInputDesc("");
      props.onSubmit(inputText);
    }
    setIsEditable(false);
    handleClose();
  };

  return (
    <div className="editable">
      {(props?.text === "Add New Group") ? (
      <div>
        <Button
          className="NunitoSansBold"
          variant=""
          style={{ backgroundColor: "#01959F", color: "white" }}
          onClick={handleShow}
        >
          Add New Group
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Form
            className={`editable_edit ${
              props.editClass ? props.editClass : ""
            }`}
            onSubmit={submission}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add New Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="exampleForm.title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  autoFocus
                  value={inputText}
                  onChange={(event) => setInputText(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={inputDesc}
                  onChange={(e) => setInputDesc(e.target.value)}
                  placeholder="Description"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant=""
                style={{ backgroundColor: "#01959F", color: "white" }}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      ): (
      <div>
        <Button
          className="NunitoSansBold"
          variant=""
          style={{ backgroundColor: "#01959F", color: "white" }}
          onClick={handleShow}
        >
          Add New Tasklist
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Form
            className={`editable_edit ${
              props.editClass ? props.editClass : ""
            }`}
            onSubmit={submission}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add New Tasklist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="exampleForm.title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  autoFocus
                  value={inputText}
                  onChange={(event) => setInputText(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.description">
                <Form.Label>Progress Percentage</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Title"
                  autoFocus
                  value={inputText}
                  onChange={(event) => setInputText(event.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant=""
                style={{ backgroundColor: "#01959F", color: "white" }}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      ) }
    </div>
  );
};

export default Index;
