import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import "../../../css/Tasks.css";

function GetTask({ match, location }) {
  useEffect(() => {
    //fetchTask();
    fetchUserAndProject();
    console.log(location.state.split(",")[0]);
    //console.log(location.state);
    //console.log(match.params);
    //console.log("Hello WORLD");
  }, []);
  const [userId, setUser] = useState({});
  const [project, setProject] = useState({});
  const [inscrito, setStatus] = useState(false);
  const [participante, setParticipante] = useState(false);
  const [task, setTask] = useState({
    nome: "",
    objetivo: "",
    descricao: "",
    data_atividade: null,
    horario: "",
    observacoes: "",
  });
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

  const verificarParticipacaoProjeto = (project, userId) => {
    console.log(project.participantes.length);
    for (let i = 0; i < project.participantes.length; i++) {
      if (project.participantes[i]._id === userId) {
        console.log(project.participantes[i]._id);
        //console.log("É participante no projeto");
        return setParticipante(true);
      }
    }
  };

  const fetchUserAndProject = async () => {
    const fetchedUser = await fetch(
      `http://34.89.31.240:5000/auth/${localStorage.getItem("token")}`,
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
    const loggedUserId = await fetchedUser.json();
    console.log(loggedUserId);
    setUser(loggedUserId);

    //Fetch Project
    if (location.state.split(",")[0] === "external") {
      const fetchedProject = await fetch(
        `http://34.89.31.240:5000/projeto_externo/id/${
          location.state.split(",")[2]
        }`,
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
      const project = await fetchedProject.json();
      console.log(project);
      setProject(project);
      verificarParticipacaoProjeto(project, loggedUserId);

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
      //console.log(task);
      //console.log(task.participantes.length);
      setTask(task);

      if (task.candidatos.length !== 0) {
        for (let i = 0; i < task.candidatos.length; i++) {
          //console.log(loggedUserId);
          //console.log(task.candidatos[i]._id);
          if (task.candidatos[i]._id === loggedUserId) {
            //console.log("Candidato");
            return setStatus(true);
          }
        }
      }
      if (task.participantes.length !== 0) {
        for (let i = 0; i < task.participantes.length; i++) {
          //console.log(loggedUserId);
          //console.log(task.participantes[i]._id);
          if (task.participantes[i]._id === loggedUserId) {
            //console.log("Participante");
            return setStatus(true);
          }
        }
      }
    } else if (
      location.state.split(",")[0] === "internal" ||
      location.state === "internal"
    ) {
      console.log("INTERNAL");
      const fetchedProject = await fetch(
        `http://34.89.31.240:5000/projeto_interno/id/${
          location.state.split(",")[2]
        }`,
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
      const project = await fetchedProject.json();
      console.log(project);
      setProject(project);
      verificarParticipacaoProjeto(project, loggedUserId);

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
      if (task.candidatos.length !== 0) {
        for (let i = 0; i < task.candidatos.length; i++) {
          //console.log(i);
          if (task.candidatos[i]._id === loggedUserId) {
            //console.log("Candidato");
            return setStatus(true);
          }
        }
      }
      if (task.participantes.length !== 0) {
        for (let i = 0; i < task.participantes.length; i++) {
          //console.log(i);
          if (task.participantes[i]._id === loggedUserId) {
            //console.log("Participante");
            return setStatus(true);
          }
        }
      }
    }
  };

  const deleteAtividade = async () => {
    if (
      location.state.split(",")[0] === "internal" ||
      location.state === "internal"
    ) {
      const deletedAtividade = await fetch(
        `http://34.89.31.240:5000/atividade_interna/${match.params.id}`,
        {
          method: "DELETE",
        }
      ).then((response) => response.json());
      //console.log(deletedProject.title);
    } else {
      const deletedAtividade = await fetch(
        `http://34.89.31.240:5000/atividade_externa/${match.params.id}`,
        {
          method: "DELETE",
        }
      ).then((response) => response.json());
    }
  };
  const candidatarAtividade = async () => {
    if (
      location.state.split(",")[0] === "internal" ||
      location.state === "internal"
    ) {
      await fetch("http://34.89.31.240:5000/atividade_interna/candidatos/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(task),
      });
    } else {
      await fetch("http://34.89.31.240:5000/atividade_externa/candidatos/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(task),
      });
    }
  };
  return (
    <div>
      <div id="page-name">
        <h1>Atividade</h1>
      </div>
      <Container fluid="sm" className="activ-info">
        <p>
          <strong>Nome:</strong>
        </p>
        <p> {task.nome}</p>
        <p>
          <strong>Objetivo:</strong>
        </p>
        <p> {task.objetivo}</p>
        <p>
          <strong>Descricao:</strong>
        </p>
        <p> {task.descricao}</p>
        <p>
          <strong>Data Início:</strong>
        </p>
        <p> {formatDate(task.data_atividade)}</p>
        <p>
          <strong>Horário:</strong>
        </p>
        <p> {task.horario}</p>
        {task.observacoes !== null ? (
          <div>
            <p>
              <strong>Observacoes:</strong>
            </p>
            <p> {task.observacoes}</p>
          </div>
        ) : (
          ""
        )}
      </Container>
      <Container fluid="sm" className="button-container">
        <Row md={4}>
          <Col md="auto">
            {location.state.split(",")[1] === "gestor" &&
            location.state.split(",")[0] === "internal" ? (
              <Link
                to={{
                  //project ID is location.state.split(",")[2]
                  pathname: `/atividadesI/edit/${task._id}`,
                  state: "internal",
                }}
              >
                <Button variant="secondary" size="lg" active>
                  Editar
                </Button>
              </Link>
            ) : (
              ""
            )}
          </Col>
          {location.state.split(",")[1] === "gestor" &&
          location.state === "internal" ? (
            <Col md="auto">
              <Link
                to={{
                  //project ID is location.state.split(",")[2]
                  pathname: `/atividadesI/edit/${task._id}`,
                  state: "internal",
                }}
              >
                <Button variant="secondary" size="lg" active>
                  Editar
                </Button>
              </Link>
            </Col>
          ) : (
            ""
          )}
          {location.state.split(",")[1] === "gestor" &&
          location.state.split(",")[0] === "external" ? (
            <Col md="auto">
              <Link
                to={{
                  //project ID is location.state.split(",")[2]
                  pathname: `/project/${location.state.split(",")[2]}/task/${
                    match.params.id
                  }/aprove`,
                  state: "external",
                }}
              >
                <Button variant="secondary" size="lg" active>
                  Pedidos
                </Button>
              </Link>
            </Col>
          ) : (
            ""
          )}
          <Col md="auto">
            {location.state.split(",")[1] === "gestor" &&
            location.state.split(",")[0] === "internal" ? (
              <Link
                to={{
                  //project ID is location.state.split(",")[2]
                  pathname: `/project/${location.state.split(",")[2]}/task/${
                    match.params.id
                  }/aprove`,
                  state: "internal",
                }}
              >
                <Button variant="secondary" size="lg" active>
                  Pedidos
                </Button>
              </Link>
            ) : (
              ""
            )}
          </Col>
          <Col md="auto">
            {location.state.split(",")[1] === "gestor" ? (
              <Link to={"/atividadeEliminada"}>
                <Button
                  onClick={deleteAtividade}
                  variant="secondary"
                  size="lg"
                  active
                >
                  Eliminar
                </Button>
              </Link>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Container>
      <Container>
        {console.log("Participante: " + participante)}
        <Row>
          <Col md="auto" className="button-container-cand">
            {participante && !inscrito ? (
              <Link to={"/atividadeSubmetidaNotificacao"}>
                <Button
                  onClick={candidatarAtividade}
                  variant="secondary"
                  size="lg"
                  active
                >
                  Candidatar
                </Button>
              </Link>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default GetTask;
