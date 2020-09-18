import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../../../css/Aproves.css";

function AproveProjects() {
  const [projects, addProjects] = useState([]);
  useEffect(() => {
    fetchProjects();
  }, []);
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
  const fetchProjects = async () => {
    const fetchedInternalProjects = await fetch(
      `http://34.89.31.240:5000/projeto_interno`,
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
    const internalProjects = await fetchedInternalProjects.json();
    console.log(internalProjects);
    const fetchedExternalProjects = await fetch(
      `http://34.89.31.240:5000/projeto_externo`,
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
    const externalProjects = await fetchedExternalProjects.json();
    console.log(externalProjects);
    const projects = internalProjects.concat(externalProjects);
    //console.log(projects);
    const unaprovedProjects = projects.filter((project) => {
      if (project.aprovado === false) {
        //console.log(project);
        return project;
      }
    });
    addProjects(unaprovedProjects);
    //console.log(unaprovedProjects);
  };
  const aprove = (projeto) => {
    console.log(projects);
    if (projeto.nome !== undefined) {
      console.log("INTERNO");
      const internalProject = {
        nome: projeto.nome,
        pessoa_contacto: projeto.pessoa_contacto,
        email: projeto.email,
        telemovel: projeto.telemovel,
        resumo_projeto: projeto.resumo_projeto,
        area_intervencao: projeto.area_intervencao,
        publico_alvo: projeto.publico_alvo,
        objetivos: projeto.objetivos,
        descricao_atividades: projeto.descricao_atividades,
        formacao_especifica: projeto.formacao_especifica,
        tipo_formacao: projeto.tipo_formacao,
        data_horario: projeto.data_horario,
        areas_interesse: projeto.areas_interesse,
        entidades_envolvidas: projeto.entidades_envolvidas,
        observacoes: projeto.observacoes,
        aprovado: true,
      };
      fetch(`http://34.89.31.240:5000/projeto_interno/aprovar/${projeto._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(internalProject),
      });
      //console.log(internalProject);
    } else {
      console.log("EXTERNO");
      const externalProject = {
        gestor: projeto.gestor,
        designacao: projeto.designacao,
        pessoa_contacto: projeto.pessoa_contacto,
        email: projeto.email,
        telemovel: projeto.telemovel,
        resumo: projeto.resumo,
        area_intervencao: projeto.area_intervencao,
        publico_alvo: projeto.publico_alvo,
        objetivos: projeto.objetivos,
        descricao_atividades: projeto.descricao_atividades,
        formacao_especifica: projeto.formacao_especifica,
        tipo_formacao: projeto.tipo_formacao,
        data_horario: projeto.data_horario,
        areas_interesse: projeto.areas_interesse,
        entidades_envolvidas: projeto.entidades_envolvidas,
        logotipo: projeto.logotipo,
        observacoes: projeto.observacoes,
        aprovado: true,
      };
      fetch(`http://34.89.31.240:5000/projeto_externo/aprovar/${projeto._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(externalProject),
      });
      console.log(externalProject);
    }
  };
  const decline = (projeto) => {
    if (projeto.nome !== undefined) {
      console.log("INTERNO");
      fetch(`http://34.89.31.240:5000/projeto_interno/${projeto._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
    } else {
      console.log("EXTERNO");
      fetch(`http://34.89.31.240:5000/projeto_externo/${projeto._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  };
  return (
    <div>
      <div id="page-name">
        <h1>Projetos</h1>
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th> Area Intervenção</th>
            <th> Nome</th>
            <th> Requer Formação </th>
            <th> Data Criação</th>
            <th> Detalhes</th>
            <th> Decisão </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((projeto) => (
            <tr key={projeto._id}>
              <td>{projeto.area_intervencao}</td>
              <td>
                {projeto.nome !== undefined ? projeto.nome : projeto.designacao}
              </td>
              <td>{projeto.formacao_especifica ? "Sim" : "Não"}</td>
              <td>{formatDate(projeto.data_criacao)}</td>
              {
                <td>
                  {projeto.nome !== undefined ? (
                    <Link to={`/internalProjects/${projeto._id}`}>
                      <Button variant="primary">Detalhes</Button>{" "}
                    </Link>
                  ) : (
                    <Link to={`/externalProjects/${projeto._id}`}>
                      <Button variant="primary">Detalhes</Button>{" "}
                    </Link>
                  )}
                </td>
              }
              <td>
                <Link to={`/aprove/project/notificacao`}>
                  <Button variant="primary" onClick={() => aprove(projeto)}>
                    Aprovar
                  </Button>{" "}
                </Link>
                <Link to={`/deny/project/notificacao`}>
                  <Button variant="primary" onClick={() => decline(projeto)}>
                    Declinar
                  </Button>{" "}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AproveProjects;
