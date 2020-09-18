import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../../../css/Aproves.css";

function AproveActivities() {
  const [activities, addActivities] = useState([]);
  useEffect(() => {
    fetchActivities();
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
  const fetchActivities = async () => {
    const fetchedInternalActivities = await fetch(
      `http://34.89.31.240:5000/atividade_interna`,
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
    const internalActivities = await fetchedInternalActivities.json();

    const fetchedExternalActivities = await fetch(
      `http://34.89.31.240:5000/atividade_externa`,
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
    const externalActivities = await fetchedExternalActivities.json();

    const activities = internalActivities.concat(externalActivities);
    const unaprovedActivities = activities.filter((activity) => {
      if (activity.aprovado === false) {
        console.log(activity);
        return activity;
      }
    });
    addActivities(unaprovedActivities);
    console.log(unaprovedActivities);
  };
  const aprove = (activity) => {
    if (activity.projeto_interno !== undefined) {
      const internalActivity = {
        projeto_interno: activity.projeto_interno,
        nome: activity.nome,
        objetivo: activity.objetivo,
        descricao: activity.descricao,
        data_atividade: activity.data_atividade,
        horario: activity.horario,
        observacoes: activity.observacoes,
        candidatos: activity.candidatos,
        participantes: activity.participantes,
        aprovado: true,
      };
      fetch(`http://34.89.31.240:5000/atividade_interna/aprovar/${activity._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(internalActivity),
      });
      console.log(internalActivity);
    } else {
      const externalActivity = {
        projeto_externo: activity.projeto_externo,
        nome: activity.nome,
        objetivo: activity.objetivo,
        descricao: activity.descricao,
        data_atividade: activity.data_atividade,
        horario: activity.horario,
        observacoes: activity.observacoes,
        candidatos: activity.candidatos,
        participantes: activity.participantes,
        aprovado: true,
      };
      fetch(`http://34.89.31.240:5000/atividade_externa/aprovar/${activity._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(externalActivity),
      });
      console.log(externalActivity);
    }
  };
  const decline = (activity) => {
    if (activity.projeto_interno !== undefined) {
      fetch(`http://34.89.31.240:5000/atividade_interna/${activity._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
    } else {
      fetch(`http://34.89.31.240:5000/atividade_externa/${activity._id}`, {
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
        <h1>Atividades</h1>
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th> Nome</th>
            <th> Data</th>
            <th> Objetivo </th>
            <th>Decisão</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id}>
              <td>{activity.nome}</td>
              <td>{formatDate(activity.data_atividade)}</td>
              <td>{activity.objetivo}</td>

              <td>
                <Link to={`/aprove/activities/notificacao`}>
                  <Button variant="primary" onClick={() => aprove(activity)}>
                    Aprovar
                  </Button>{" "}
                </Link>
                <Link to={`/negar/activities/notificacao`}>
                  <Button variant="primary" onClick={() => decline(activity)}>
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

export default AproveActivities;
