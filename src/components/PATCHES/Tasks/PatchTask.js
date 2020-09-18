import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";

function PatchTask({ match, location }) {
  useEffect(() => {
    fetchTask();
    console.log(location.state);
  }, []);
  const [task, setTask] = useState({});
  const { register, handleSubmit, control } = useForm({});
  const onSubmit = (data) => {
    //console.log(data);
    const finalTask = {
      nome: data.nome,
      objetivo: data.objetivo,
      descricao: data.descricao,
      data_atividade: Date.now(),
      horario: data.horario,
      observacoes: data.observacoes,
    };
    //console.log(finalTask);
    if (location.state === "internal") {
      try {
        fetch(
          `http://34.89.31.240:5000/atividade_interna/put/${match.params.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(finalTask),
          }
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        fetch(
          `http://34.89.31.240:5000/atividade_externa/put/${match.params.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(finalTask),
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
  const fetchTask = async () => {
    if (location.state === "internal") {
      const fetchedTask = await fetch(
        `http://34.89.31.240:5000/atividade_interna/id/${match.params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
          mode: "cors",
          cache: "default",
        }
      );
      const task = await fetchedTask.json();
      setTask(task);
      //console.log(task);
    } else {
      const fetchedTask = await fetch(
        `http://34.89.31.240:5000/atividade_externa/id/${match.params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
          mode: "cors",
          cache: "default",
        }
      );
      const task = await fetchedTask.json();
      setTask(task);
      //console.log(task);
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="nome">
        <Form.Label>Nome Tarefa</Form.Label>
        <Form.Control
          type="text"
          defaultValue={task.nome}
          placeholder="Nome Tarefa"
          ref={register}
          name="nome"
        />
      </Form.Group>
      <Form.Group controlId="objetivo">
        <Form.Label>Objetivo Tarefa</Form.Label>
        <Form.Control
          type="text"
          defaultValue={task.objetivo}
          placeholder="Objetivo Tarefa"
          ref={register}
          name="objetivo"
        />
      </Form.Group>
      <Form.Group controlId="descricao">
        <Form.Label>Descricao Tarefa</Form.Label>
        <Form.Control
          type="text"
          defaultValue={task.descricao}
          placeholder="Descrição Tarefa"
          ref={register}
          name="descricao"
        />
      </Form.Group>
      <Form.Group controlId="data_atividade">
        <Form.Label>Data Começo: </Form.Label>
        <Controller
          control={control}
          name="data_atividade"
          placeholderText="Selecione a data" //not working
          render={({ onChange, onBlur, value }) => (
            <DatePicker onChange={onChange} onBlur={onBlur} selected={value} />
          )}
        />
      </Form.Group>
      <Form.Group controlId="horario">
        <Form.Label>Horário Atividade</Form.Label>
        <Form.Control
          type="text"
          defaultValue={task.horario}
          placeholder="Horário da tarefa"
          ref={register}
          name="horario"
        />
      </Form.Group>
      <Form.Group controlId="observacoes">
        <Form.Label>Horário Atividade</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          defaultValue={task.observacoes}
          placeholder="Observações"
          ref={register}
          name="observacoes"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default PatchTask;
