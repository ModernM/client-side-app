import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Projects() {
  //É chamada ao ser chamado o componente
  useEffect(() => {
    fetchProjects();
  }, []);

  //Projects guarda todos os projectos importados da BD
  const [projects, loadProjects] = useState([]);

  const fetchProjects = async () => {
    const data = await fetch("http://34.89.31.240:5000/projects", {
      method: "GET",
      headers: {
        "Content-Type": "pplication/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      mode: "cors",
      cache: "default",
    });
    const projects = await data.json();
    loadProjects(projects);
  };

  return (
    <Table responsive>
      <thead>
        <tr>
          <th> _id</th>
          <th> Responsável</th>
          <th> Projeto</th>
          <th> description </th>
          <th> Objetivos </th>
          <th> Inspecionar </th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project._id}>
            <td>{project._id}</td>
            <td>{project.publisher.name}</td>
            <td>{project.title}</td>
            <td>{project.description}</td>
            <td>{project.objectives}</td>
            <td>
              <Link to={`/projects/${project._id}`}>
                <Button variant="primary">Detalhes</Button>{" "}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Projects;
