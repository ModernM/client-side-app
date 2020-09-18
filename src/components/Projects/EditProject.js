import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

function EditProject({ match }) {
  useEffect(() => {
    //funciona
    fetchProject();
    console.log(match.params);
  }, []);

  const [project, setProject] = useState({
    title: "",
    description: "",
    username: "",
    publisher: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const fetchProject = async () => {
    const fetchedProject = await fetch(
      `http://34.89.31.240:5000/projects/${match.params.id}`
    );
    const project = await fetchedProject.json();
    setProject(project);
    console.log(project);
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("onSubmit executada");
    const project = {
      _id: match.params.id,
      username: data.username,
      publisher: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
      description: data.description,
      title: data.title,
    };
    console.log(project);
    try {
      fetch(`http://34.89.31.240:5000/projects/patch/${match.params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      //console.log(match.params._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Editar Projeto</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Endereço Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Escreva o Email"
            name="email"
            ref={register}
            defaultValue={project.publisher.email}
          />
        </Form.Group>
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Escreva o Titulo"
            name="title"
            ref={register}
            defaultValue={project.title}
          />
        </Form.Group>
        <Form.Group controlId="forBasicPhone">
          <Form.Label>Número de Telefone</Form.Label>
          <Form.Control
            type="number"
            placeholder="Escreve o Número de telefone"
            name="phone"
            ref={register}
            defaultValue={project.publisher.phone}
          />
        </Form.Group>
        <Form.Group controlId="formBasicName">
          <Form.Label>Responsável</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome do responsável"
            name="name"
            ref={register}
            defaultValue={project.publisher.name}
          />
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Utilizador</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome de utilizador"
            name="username"
            ref={register}
            defaultValue={project.username}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            name="description"
            ref={register}
            defaultValue={project.description}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submeter
        </Button>
      </Form>
    </div>
  );
}

export default EditProject;
