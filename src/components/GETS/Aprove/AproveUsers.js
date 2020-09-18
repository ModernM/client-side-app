import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../../../css/Aproves.css";

function AproveUsers() {
  const [users, addUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
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
  const fetchUsers = async () => {
    const fetchedVolunteers = await fetch(`http://34.89.31.240:5000/voluntario`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      mode: "cors",
      cache: "default",
    });
    const volunteers = await fetchedVolunteers.json();
    console.log(volunteers);

    const fetchedManagers = await fetch(`http://34.89.31.240:5000/gestor`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      mode: "cors",
      cache: "default",
    });
    const managers = await fetchedManagers.json();
    console.log(managers);

    const users = volunteers.concat(managers);
    const unaprovedUsers = users.filter((user) => {
      if (user.aprovado === false) {
        //console.log(user);
        return user;
      }
    });
    addUsers(unaprovedUsers);
    //console.log(unaprovedUsers);
  };
  const aprove = (user) => {
    if (user.nome_organizacao) {
      const newUser = {
        _id: user._id,
        nome_organizacao: user.nome_organizacao,
        email: user.email,
        password: user.password,
        aprovado: true,
        data_criacao: user.data_criacao,
      };
      fetch(`http://34.89.31.240:5000/gestor/aprovar/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newUser),
      });
      //console.log(newUser);
    } else {
      const newUser = {
        _id: user._id,
        nome_completo: user.nome_completo,
        email: user.email,
        password: user.password,
        telemovel: user.telemovel,
        concelho: user.concelho,
        data_nascimento: user.data_nascimento,
        tipo_membro: user.tipo_membro,
        escola_servico: user.escola_servico,
        curso_formacao: user.curso_formacao,
        areas_interesse: user.areas_interesse,
        razoes_voluntario: user.razoes_voluntario,
        observacoes: user.observacoes,
        aprovado: true,
        data_criacao: user.data_criacao,
      };
      fetch(`http://34.89.31.240:5000/voluntario/aprovar/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newUser),
      });
      //console.log(newUser);
    }
  };
  const decline = (user) => {
    if (user.nome_organizacao) {
      fetch(`http://34.89.31.240:5000/gestor/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
    } else {
      fetch(`http://34.89.31.240:5000/voluntario/${user._id}`, {
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
        <h1>Utilizadores</h1>
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Data Criação</th>
            <th>Decisão</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {user.nome_completo
                  ? user.nome_completo
                  : user.nome_organizacao}
              </td>
              <td>{user.email}</td>
              <td>{formatDate(user.data_criacao)}</td>
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

export default AproveUsers;
