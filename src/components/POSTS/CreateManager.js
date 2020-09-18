import React from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../css/Register.css";
import { Col } from "react-bootstrap";

function CreateManager() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    fetch("http://34.89.31.240:5000/gestor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
    console.log(data);
  };

  return (
    <div className="RegisterForm form">
      <h1 className="text-center">Registo Manager</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formGroupOrganization">
          <Form.Label>Nome da Organização</Form.Label>
          <Form.Control
            type="text"
            placeholder="Organização"
            name="nome_organizacao"
            ref={register}
          />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              ref={register}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGroupPassword">
            <Form.Label>Palavra Chave</Form.Label>
            <Form.Control
              type="password"
              placeholder="Palavra Chave"
              name="password"
              ref={register}
            />
          </Form.Group>
        </Form.Row>
        <Button variant="primary" type="submit" className="button-bottom">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateManager;
