import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import "../../css/General.css";
import "../../css/InternProjects.css";
import { LoremIpsum, Avatar } from "react-lorem-ipsum";
import { Container } from "@material-ui/core";
import { Row, Col } from "react-bootstrap";

function GetInternalProject({ match, location }) {
  useEffect(() => {
    fetchProject();
    fetchAtividades();
    console.log(location);
  }, []);

  const [atividades, setAtividade] = useState([]);
  const [inscrito, setStatus] = useState(false);
  const [project, setProject] = useState({
    areas_interesse: [],
    candidatos: [],
    participantes: [],
    concluido: false,
    em_destaque: false,
    aprovado: false,
    _id: "",
    nome: "",
    pessoa_contacto: "",
    email: "",
    telemovel: "",
    resumo_projeto: "",
    area_intervencao: "",
    publico_alvo: "",
    objetivos: "",
    descricao_atividades: "",
    formacao_especifica: "",
    tipo_formacao: "",
    data_horario: "",
    entidades_envolvidas: "",
    observacoes: "",
    data_criacao: null,
  });

  const fetchAtividades = async () => {
    //console.log("Interno");
    const fetchAtividadeInterna = await fetch(
      `http://34.89.31.240:5000/atividade_interna/projeto/${match.params.id}`,
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
    const atividadeInterna = await fetchAtividadeInterna.json();
    const atividadesInternasAprovadas = atividadeInterna.filter((atividade) => {
      if (atividade.aprovado === true) {
        return atividade;
      }
    });
    setAtividade(atividadesInternasAprovadas);
    console.log(atividadesInternasAprovadas);
  };

  const fetchProject = async () => {
    const fetchedProject = await fetch(
      `http://34.89.31.240:5000/projeto_interno/id/${match.params.id}`,
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
    setProject(project);

    const idUtilizadorLogado = await fetch(
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
    const idLogado = await idUtilizadorLogado.json();

    if (project.candidatos.length !== 0) {
      for (let i = 0; i < project.candidatos.length; i++) {
        //console.log(i);
        if (project.candidatos[i]._id === idLogado) {
          console.log("Candidato");
          return setStatus(true);
        }
      }
    }
    if (project.participantes.length !== 0) {
      for (let i = 0; i < project.participantes.length; i++) {
        console.log(i);
        if (project.participantes[i]._id === idLogado) {
          console.log("Participante");
          return setStatus(true);
        }
      }
    }
    //console.log(project);
  };

  const deleteProject = async () => {
    const deletedProject = await fetch(
      `http://34.89.31.240:5000/projeto_interno/${project._id}`,
      {
        method: "DELETE",
      }
    ).then((response) => response.json());
    //console.log(deletedProject.title);
  };

  const candidatarProjeto = async () => {
    await fetch("http://34.89.31.240:5000/projeto_interno/candidatos/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(project),
    });
  };

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
  return (
    <div id="project_details">
      <div className="bg1" id="img-div1">
        <h1>{project.nome}</h1>
        <p> {project.resumo_projeto}</p>
      </div>
      <div className="info float-right d-flex align-items-center bd-highlight mb-3 example-parent">
        <div className="p-2 bd-highlight co-example">
          <p id="heading">
            <strong>Area Intervenção:</strong>
          </p>
          <p>{project.area_intervencao}</p>
          <p id="heading">
            <strong>Público Alvo:</strong>
          </p>
          <p> {project.publico_alvo}</p>
          <p id="heading">
            <strong>Objetivos:</strong>
          </p>
          <p>{project.objetivos}</p>
          <p id="heading">
            <strong>Atividades:</strong>
          </p>
          <p> {project.descricao_atividades}</p>
          <p id="heading">
            <strong>Entidades envolvidas:</strong>
          </p>
          <p> {project.entidades_envolvidas}</p>
          {project.observacoes !== "" ? (
            <div>
              <p id="heading">
                <strong>Observações:</strong>
              </p>{" "}
              <p>{project.observacoes}</p>
            </div>
          ) : (
            <br></br>
          )}
        </div>
      </div>
      <div className="info2 d-flex align-items-center bd-highlight mb-3 example-parent">
        <div className="p-2 bd-highlight co-example">
          <p>
            <strong>
              <em>
                {project.formacao_especifica
                  ? `Requer formação específica em ${project.tipo_formacao}`
                  : "Não requer formação específica"}
              </em>
            </strong>
          </p>
          <p id="heading">
            <strong>Horário:</strong>
          </p>
          <p>{project.data_horario}</p>
          <p id="heading">
            <strong>Data Criação:</strong>
          </p>
          <p>{formatDate(project.data_criacao)}</p>
          <div id="dados_responsavel">
            <p id="heading">
              <strong>Responsável:</strong>
            </p>
            <p>{project.pessoa_contacto} </p>
            <p id="heading">
              <strong>Email:</strong>
            </p>
            <p>{project.email} </p>
            <p id="heading">
              <strong>Contacto:</strong>
            </p>
            <p>{project.telemovel}</p>
          </div>
        </div>
      </div>
      <Container fluid className="button-container d-flex align-items-center">
        <Row md={4}>
          <Col md="auto">
            {location.state === "gestor" ? (
              <Link to={`/internalProject/edit/${project._id}`}>
                <Button variant="secondary" size="lg" active>
                  Editar
                </Button>{" "}
              </Link>
            ) : (
              ""
            )}
          </Col>
          <Col md="auto">
            {location.state === "gestor" ? (
              <Link to={"/projects/deleted"}>
                <Button
                  onClick={deleteProject}
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
          <Col md="auto">
            {location.state === "gestor" ? (
              <Link
                to={{
                  pathname: `/project/${project._id}/projects/aprove`,
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
        </Row>
      </Container>
      <div>
        <div id="Atividades">
          <h1 className="text-center">Atividades</h1>
          <Table width="75%" responsive>
            <thead>
              <tr>
                <th> Nome</th>
                <th> Data</th>
                <th> Objetivo </th>
                <th> Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {atividades.map((atividade) => (
                <tr key={atividade._id}>
                  <td>{atividade.nome}</td>
                  <td>{formatDate(atividade.data_atividade)}</td>
                  <td>{atividade.objetivo}</td>
                  {
                    <td>
                      {location.state === "gestor" ? (
                        <Link
                          to={{
                            pathname: `/tasks/${atividade._id}`,
                            state: `internal,gestor,${project._id}`,
                          }}
                        >
                          <Button variant="primary">Detalhes</Button>{" "}
                        </Link>
                      ) : (
                        <Link
                          to={{
                            pathname: `/tasks/${atividade._id}`,
                            state: `internal,voluntario,${project._id}`,
                          }}
                        >
                          <Button variant="primary">Detalhes</Button>{" "}
                        </Link>
                      )}
                    </td>
                  }
                </tr>
              ))}
            </tbody>
          </Table>
          {location.state === "gestor" ? (
            <Link
              to={{
                pathname: `/project/${project._id}/tasks/add`,
                state: "internal",
              }}
            >
              <Button variant="secondary" size="lg" active className="button">
                Adicionar +
              </Button>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
      {location.state === "gestor" ||
      location.state === "participante" ||
      inscrito ? (
        ""
      ) : (
        <Link to={"/candidatura/notificacao"}>
          <Button
            onClick={candidatarProjeto}
            variant="secondary"
            size="lg"
            active
            className="button"
          >
            Candidatar
          </Button>
        </Link>
      )}
    </div>
  );
}

export default GetInternalProject;
