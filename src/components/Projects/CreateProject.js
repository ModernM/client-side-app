import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

function CreateProject() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const project = {
      username: data.username,
      publisher: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
      description: data.description,
      title: data.title,
      objectives: data.objectives,
    };
    fetch("http://34.89.31.240:5000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },

      body: JSON.stringify(project),
    });
    console.log(project);
  };

  return (
    <div>
      <h1>Criar Projeto</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Endereço Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Escreva o Email"
            name="email"
            ref={register}
          />
        </Form.Group>
        <Form.Group controlId="formBasicObjectives">
          <Form.Label>Objetivos</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Objetivos"
            name="objectives"
            ref={register}
          />
        </Form.Group>
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Escreva o Titulo"
            name="title"
            ref={register}
          />
        </Form.Group>
        <Form.Group controlId="forBasicPhone">
          <Form.Label>Número de Telefone</Form.Label>
          <Form.Control
            type="number"
            placeholder="Escreve o Número de telefone"
            name="phone"
            ref={register}
          />
        </Form.Group>
        <Form.Group controlId="formBasicName">
          <Form.Label>Responsável</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome do responsável"
            name="name"
            ref={register}
          />
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Utilizador</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome de utilizador"
            name="username"
            ref={register}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            name="description"
            ref={register}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submeter
        </Button>
      </Form>
    </div>
  );
}

export default CreateProject;
