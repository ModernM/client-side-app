import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function ProjectDetails({ match }) {
  useEffect(() => {
    fetchProject();
    console.log(match);
  }, []);

  const [project, setProject] = useState({
    title: "",
    description: "",
    username: "",
    publisher: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const fetchProject = async () => {
    const fetchedProject = await fetch(
      `http://34.89.31.240:5000/projects/${match.params.id}`
    );
    const project = await fetchedProject.json();
    setProject(project);
  };

  const deleteProject = async () => {
    const deletedProject = await fetch(
      `http://34.89.31.240:5000/projects/${project._id}`,
      {
        method: "DELETE",
      }
    ).then((response) => response.json());
    console.log(deletedProject.title);
  };

  return (
    <div>
      <h1>Hello We are on Project Details</h1>
      <h1>{project.publisher.name}</h1>
      <Link to={`/projects/edit/${project._id}`}>
        <Button variant="primary" size="lg" active>
          Editar
        </Button>{" "}
      </Link>
      <Link to={"/projects/deleted"}>
        <Button onClick={deleteProject} variant="secondary" size="lg" active>
          Eliminar
        </Button>
      </Link>
    </div>
  );
}

export default ProjectDetails;
