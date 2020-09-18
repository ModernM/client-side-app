import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Col } from "react-bootstrap";
import "../../../css/Register.css";

function CreateTask({ match, location }) {
  const { register, handleSubmit, control } = useForm();

  useEffect(() => {
    console.log(location.state);
  }, []);

  const onSubmit = async (data) => {
    const task = {
      nome: data.nome,
      objetivo: data.objetivo,
      descricao: data.descricao,
      data_atividade: data.data_atividade,
      horario: data.horario,
      observacoes: data.observacoes,
    };
    if (location.state === "internal") {
      await fetch(
        `http://34.89.31.240:5000/atividade_interna/${match.params.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },

          body: JSON.stringify(task),
        }
      );
    } else {
      await fetch(
        `http://34.89.31.240:5000/atividade_externa/${match.params.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },

          body: JSON.stringify(task),
        }
      );
    }
  };
  return (
    <div className="form">
      <h1>Criar Nova Atividade</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="nome">
          <Form.Label>Nome Atividade:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome da Atividade"
            ref={register}
            name="nome"
          />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="objetivo">
            <Form.Label>Objetivos:</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="descricao dos objetivos"
              rows="3"
              ref={register}
              name="objetivo"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="descricao">
            <Form.Label>Descrição da tarefa:</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Breve Descrição da tarefa"
              ref={register}
              rows="3"
              name="descricao"
            />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="data_comeco">
          <Form.Label>Data Início da tarefa:</Form.Label>
          <Controller
            control={control}
            name="data_atividade"
            placeholderText="Selecione a data" //not working
            render={({ onChange, onBlur, value }) => (
              <DatePicker
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
              />
            )}
          />
        </Form.Group>
        <Form.Group controlId="horario">
          <Form.Label>Horario:</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Indicação do horário"
            ref={register}
            rows="3"
            name="horario"
          />
        </Form.Group>
        <Form.Group controlId="observacoes">
          <Form.Label>Observações</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Se tiver alguma observação a fazer"
            ref={register}
            rows="3"
            name="observacoes"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateTask;
