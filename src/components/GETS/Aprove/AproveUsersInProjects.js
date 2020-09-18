import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function AproveUsersInProjects({ match, location }) {
  useEffect(() => {
    fetchProject();
    console.log(match.params);
  }, []);
  const [users, setUsers] = useState([]);
  const [project, setProject] = useState({});

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

  const fetchProject = async () => {
    if (location.state === "internal") {
      const fetchedInternalProject = await fetch(
        `http://34.89.31.240:5000/projeto_interno/id/${match.params.projectId}`,
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
      const internalProject = await fetchedInternalProject.json();
      console.log(fetchedInternalProject);
      setProject(internalProject);
      setUsers(internalProject.candidatos);
    } else {
      const fetchedExternalProject = await fetch(
        `http://34.89.31.240:5000/projeto_externo/id/${match.params.projectId}`,
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
      const externalProject = await fetchedExternalProject.json();
      console.log(externalProject);
      console.log(externalProject.candidatos);
      setProject(externalProject);
      setUsers(externalProject.candidatos);
    }
  };

  const aprove = async (user) => {
    //project.candidatos.remove(user);
    let index = undefined;
    for (let i = 0; i < project.candidatos.length; i++) {
      if (project.candidatos[i]._id === user._id) {
        //console.log(project.candidatos[i]);
        index = i;
      }
    }
    project.candidatos.splice(index, 1);

    console.log("Index" + index);
    //Update Candidate
    if (location.state === "internal") {
      const aprovedCandidate = await fetch(
        `http://34.89.31.240:5000/projeto_interno/participantes/add/${match.params.projectId}/${user._id}`,
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
      console.log(candidatoAprovado);
      //Update Project Candidates
      console.log("INTERNO");
      const internalProject = {
        nome: project.nome,
        pessoa_contacto: project.pessoa_contacto,
        email: project.email,
        telemovel: project.telemovel,
        resumo_projeto: project.resumo_projeto,
        area_intervencao: project.area_intervencao,
        publico_alvo: project.publico_alvo,
        objetivos: project.objetivos,
        descricao_atividades: project.descricao_atividades,
        formacao_especifica: project.formacao_especifica,
        tipo_formacao: project.tipo_formacao,
        data_horario: project.data_horario,
        areas_interesse: project.areas_interesse,
        entidades_envolvidas: project.entidades_envolvidas,
        observacoes: project.observacoes,
        aprovado: project.aprovado,
        candidatos: project.candidatos,
      };
      fetch(`http://34.89.31.240:5000/projeto_interno/put/${project._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(internalProject),
      });
      //console.log(internalProject);
    } else {
      //Update User
      const aprovedCandidate = await fetch(
        `http://34.89.31.240:5000/projeto_externo/participantes/add/${match.params.projectId}/${user._id}`,
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
      console.log(candidatoAprovado);

      //Update Project Candidates
      console.log("EXTERNO");
      const externalProject = {
        gestor: project.gestor,
        designacao: project.designacao,
        pessoa_contacto: project.pessoa_contacto,
        email: project.email,
        telemovel: project.telemovel,
        resumo: project.resumo,
        area_intervencao: project.area_intervencao,
        publico_alvo: project.publico_alvo,
        objetivos: project.objetivos,
        descricao_atividades: project.descricao_atividades,
        formacao_especifica: project.formacao_especifica,
        tipo_formacao: project.tipo_formacao,
        data_horario: project.data_horario,
        areas_interesse: project.areas_interesse,
        entidades_envolvidas: project.entidades_envolvidas,
        logotipo: project.logotipo,
        observacoes: project.observacoes,
        aprovado: project.aprovado,
        candidatos: project.candidatos,
      };
      fetch(`http://34.89.31.240:5000/projeto_externo/put/${project._id}`, {
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

  const decline = (user) => {
    let index = undefined;
    for (let i = 0; i < project.candidatos.length; i++) {
      if (project.candidatos[i]._id === user._id) {
        //console.log(project.candidatos[i]);
        index = i;
      }
    }
    project.candidatos.splice(index, 1);
    if (location.state === "internal") {
      console.log("INTERNO");
      const internalProject = {
        nome: project.nome,
        pessoa_contacto: project.pessoa_contacto,
        email: project.email,
        telemovel: project.telemovel,
        resumo_projeto: project.resumo_projeto,
        area_intervencao: project.area_intervencao,
        publico_alvo: project.publico_alvo,
        objetivos: project.objetivos,
        descricao_atividades: project.descricao_atividades,
        formacao_especifica: project.formacao_especifica,
        tipo_formacao: project.tipo_formacao,
        data_horario: project.data_horario,
        areas_interesse: project.areas_interesse,
        entidades_envolvidas: project.entidades_envolvidas,
        observacoes: project.observacoes,
        aprovado: project.aprovado,
        candidatos: project.candidatos,
      };
      fetch(`http://34.89.31.240:5000/projeto_interno/put/${project._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(internalProject),
      });
      //console.log(internalProject);
    } else {
      //Update Project Candidates
      console.log("EXTERNO");
      const externalProject = {
        gestor: project.gestor,
        designacao: project.designacao,
        pessoa_contacto: project.pessoa_contacto,
        email: project.email,
        telemovel: project.telemovel,
        resumo: project.resumo,
        area_intervencao: project.area_intervencao,
        publico_alvo: project.publico_alvo,
        objetivos: project.objetivos,
        descricao_atividades: project.descricao_atividades,
        formacao_especifica: project.formacao_especifica,
        tipo_formacao: project.tipo_formacao,
        data_horario: project.data_horario,
        areas_interesse: project.areas_interesse,
        entidades_envolvidas: project.entidades_envolvidas,
        logotipo: project.logotipo,
        observacoes: project.observacoes,
        aprovado: project.aprovado,
        candidatos: project.candidatos,
      };
      fetch(`http://34.89.31.240:5000/projeto_externo/put/${project._id}`, {
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

export default AproveUsersInProjects;
