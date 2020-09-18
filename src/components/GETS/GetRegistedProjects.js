import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function GetRegistedProjects() {
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
  //É chamada ao ser chamado o componente
  useEffect(() => {
    fetchProjects();
  }, []);

  //Projects guarda todos os projectos importados da BD
  const [registedProjects, loadRegistedProjects] = useState([]);

  const fillAprovedProjects = (projects) => {
    const registedProjects = [];
    projects.forEach((project) => {
      if (project.aprovado === true) {
        registedProjects.push(project);
      }
    });
    console.log(registedProjects);
    loadRegistedProjects(registedProjects);
  };

  const fetchProjects = async () => {
    const internalProjects = await fetch(
      "http://34.89.31.240:5000/projeto_interno/user/participantes",
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
    //guarda todos os projetos
    const projectsI = await internalProjects.json();

    const externalProjects = await fetch(
      "http://34.89.31.240:5000/projeto_externo/user/participantes",
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
    const projectsE = await externalProjects.json();
    const mergedProjects = projectsI.concat(projectsE);
    //apenas guarda os projetos aprovados
    fillAprovedProjects(mergedProjects);
  };

  return (
    <Table responsive>
      <thead>
        <tr>
          <th> Area Intervenção</th>
          <th> Nome</th>
          <th> Requer Formação </th>
          <th> Data Criação</th>
          <th> Detalhes</th>
        </tr>
      </thead>
      <tbody>
        {registedProjects.map((project) => (
          <tr key={project._id}>
            <td>{project.area_intervencao}</td>
            <td>
              {project.nome !== undefined ? project.nome : project.designacao}
            </td>
            <td>{project.formacao_especifica ? "Sim" : "Não"}</td>
            <td>{formatDate(project.data_criacao)}</td>
            {
              <td>
                {project.nome !== undefined ? (
                  <Link
                    to={{
                      pathname: `/internalProjects/${project._id}`,
                      state: "participante",
                    }}
                  >
                    <Button variant="primary">Detalhes</Button>{" "}
                  </Link>
                ) : (
                  <Link
                    to={{
                      pathname: `/externalProjects/${project._id}`,
                      state: "participante",
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
  );
}

export default GetRegistedProjects;
