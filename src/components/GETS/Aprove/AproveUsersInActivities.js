import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function AproveUsersInActivities({ match, location }) {
  useEffect(() => {
    fetchTask();
    //console.log(location.state);
    //fetchProject();
  }, []);
  const [users, setUsers] = useState([]);
  const [task, setTask] = useState({});
  //const [project, setProject] = useState({});

  Number.prototype.padLeft = function (base, chr) {
    var len = String(base || 10).length - String(this).length + 1;
    return len > 0 ? new Array(len).join(chr || "0") + this : this;
  };

  function formatDate(dateToFormat) {
    const date = new Date(dateToFormat);
    const day = date.getDate().padLeft();
    const month = (date.getMonth() + 1).padLeft();
    const year = date.getFullYear();
    const left = [day, month, year];
    const hours = date.getHours().padLeft();
    const minutes = date.getMinutes().padLeft();
    const seconds = date.getSeconds().padLeft();
    const right = [hours, minutes, seconds];

    return left.join("/") /* + " " + right.join(":") */;
  }

  const fetchTask = async () => {
    if (location.state === "internal") {
      const fetchedInternalTask = await fetch(
        `http://34.89.31.240:5000/atividade_interna/id/${match.params.taskId}`,
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
      const internalTask = await fetchedInternalTask.json();
      //console.log(internalTask);
      setTask(internalTask);
      setUsers(internalTask.candidatos);
      //console.log(internalTask.candidatos);
    } else {
      //console.log("FETCH EXTERNAL");
      const fetchedExternalTask = await fetch(
        `http://34.89.31.240:5000/atividade_externa/id/${match.params.taskId}`,
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
      const externalTask = await fetchedExternalTask.json();
      //console.log(externalTask);
      //console.log(externalTask.candidatos);
      setTask(externalTask);
      setUsers(externalTask.candidatos);
      //console.log(users);
    }
  };

  const aprove = async (user) => {
    let index = undefined;
    for (let i = 0; i < task.candidatos.length; i++) {
      if (task.candidatos[i]._id === user._id) {
        console.log(task.candidatos[i]);
        index = i;
      }
    }
    task.candidatos.splice(index, 1);

    //console.log("Index" + index);
    //Update Candidate
    if (location.state === "internal") {
      //console.log("task ID: " + match.params.taskId);
      //console.log("User ID: " + user._id);
      const aprovedCandidate = await fetch(
        `http://34.89.31.240:5000/atividade_interna/participantes/add/${match.params.taskId}/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const candidatoAprovado = await aprovedCandidate.json();
      //console.log(candidatoAprovado);
      //Update Project Candidates
      //console.log("INTERNO");
      const internalTask = {
        projeto_interno: task.projeto_interno,
        nome: task.nome,
        objetivo: task.objetivo,
        descricao: task.descricao,
        data_atividade: task.data_atividade,
        horario: task.horario,
        observacoes: task.observacoes,
        concluido: task.concluido,
        aprovado: task.aprovado,
        data_criacao: task.data_criacao,
        candidatos: task.candidatos,
      };
      const atividadeInternaAtual = await fetch(
        `http://34.89.31.240:5000/atividade_interna/put/${task._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(internalTask),
        }
      );
      //console.log(internalProject);
    } else {
      //console.log("External");
      //Update User
      //console.log("task ID: " + match.params.taskId);
      //console.log("User ID: " + user._id);
      const aprovedCandidate = await fetch(
        `http://34.89.31.240:5000/atividade_externa/participantes/add/${match.params.taskId}/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
          mode: "cors",
          cache: "default",
        }
      );
      const candidatoAprovado = await aprovedCandidate.json();
      //console.log(candidatoAprovado);

      //Update Project Candidates
      //console.log("EXTERNO");
      const externalTask = {
        projeto_externo: task.projeto_externo,
        nome: task.nome,
        objetivo: task.objetivo,
        descricao: task.descricao,
        data_atividade: task.data_atividade,
        horario: task.horario,
        observacoes: task.observacoes,
        concluido: task.concluido,
        aprovado: task.aprovado,
        data_criacao: task.data_criacao,
        candidatos: task.candidatos,
      };
      const atividadeExternaAtual = await fetch(
        `http://34.89.31.240:5000/atividade_externa/put/${task._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(externalTask),
        }
      );
      //console.log(externalTask);
    }
  };

  const decline = (user) => {};

  return (
    <div>
      <h1>Utilizadores à espera de aprovação</h1>
      <Table responsive>
        <thead>
          <tr>
            <th> Nome</th>
            <th> Concelho</th>
            <th> Data Nascimento </th>
            <th> Formação</th>
            <th>Decisão</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.nome_completo}</td>
              <td>{user.concelho}</td>
              <td>{formatDate(user.data_nascimento)}</td>
              <td>{user.curso_formacao}</td>
              {
                <td>
                  <Link to={`/aprove/users/notificacao`}>
                    <Button variant="primary" onClick={() => aprove(user)}>
                      Aprovar
                    </Button>{" "}
                  </Link>
                  <Link to={`/negar/users/notificacao`}>
                    <Button variant="primary" onClick={() => decline(user)}>
                      Declinar
                    </Button>{" "}
                  </Link>
                </td>
              }
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AproveUsersInActivities;
