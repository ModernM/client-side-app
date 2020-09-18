import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function GetProjetosAGerir() {
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
  const [aprovedProjects, loadAprovedProjects] = useState([]);

  const fillAprovedProjects = (projects) => {
    const aprovedProjects = [];
    projects.forEach((project) => {
      if (project.aprovado === true) {
        aprovedProjects.push(project);
      }
    });
    console.log(aprovedProjects);
    loadAprovedProjects(aprovedProjects);
  };

  const fetchProjects = async () => {
    if (localStorage.getItem("role") === "Gestor") {
      const externalProjects = await fetch(
        "http://34.89.31.240:5000/projeto_externo/user",
        {
          method: "GET",
          headers: {
            "Content-Type": "pplication/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
          mode: "cors",
          cache: "default",
        }
      );
      const projectsE = await externalProjects.json();
      fillAprovedProjects(projectsE);
    } else if (localStorage.getItem("role") === "Voluntario") {
      const internalProjects = await fetch(
        "http://34.89.31.240:5000/projeto_interno/user",
        {
          method: "GET",
          headers: {
            "Content-Type": "pplication/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
          mode: "cors",
          cache: "default",
        }
      );
      //guarda todos os projetos
      const projectsI = await internalProjects.json();
      fillAprovedProjects(projectsI);
    }
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
        {aprovedProjects.map((project) => (
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
                      state: "gestor",
                    }}
                  >
                    <Button variant="primary">Detalhes</Button>{" "}
                  </Link>
                ) : (
                  <Link
                    to={{
                      pathname: `/externalProjects/${project._id}`,
                      state: "gestor",
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

export default GetProjetosAGerir;
