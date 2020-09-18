import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Unstable_TrapFocus } from "@material-ui/core";
import "../../css/User.css";

function GetUser() {
  const [user, setUser] = useState({});
  const [concelhos, setConcelhos] = useState([]);
  useEffect(() => {
    fetchUser();
    fetchConcelhos();
  }, []);

  const fetchConcelhos = async () => {
    const concelhos = await fetch(`http://34.89.31.240:5000/concelho/`, {
      method: "GET",
      headers: {
        "Content-Type": "pplication/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      mode: "cors",
      cache: "default",
    });
    const ArrayConcelhos = await concelhos.json();
    console.log(ArrayConcelhos);
    setConcelhos(ArrayConcelhos);
  };

  function verificarConcelho(concelho) {
    for (let i = 0; i < concelhos.length; i++) {
      //console.log(i);
      if (concelhos[i]._id === concelho) {
        return concelhos[i].nome;
      }
    }
  }

  const fetchUser = async () => {
    const user = await fetch(`http://34.89.31.240:5000/auth/logged`, {
      method: "GET",
      headers: {
        "Content-Type": "pplication/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      mode: "cors",
      cache: "default",
    });
    const newUser = await user.json();
    console.log(newUser);
    setUser(newUser);
  };
  return (
    <div>
      <h1 id="page-name">Perfil</h1>
      <Container fluid="sm" className="icon-container">
        <i class="fas fa-user fa-8x icon"></i>
      </Container>
      {user.type === "Voluntario" ? (
        <Container fluid="sm" className="name-container">
          <h2>
            <strong>Voluntário</strong>
          </h2>
          <div>Nome: {user.user.nome_completo}</div>
          <div>Email: {user.user.email}</div>
          <div>Telemóvel: {user.user.telemovel}</div>
          <div>Concelho: {user.user.concelho}</div>
        </Container>
      ) : user.type === "Gestor" ? (
        <div>
          <Container fluid="sm" className="name-container">
            <h2>
              <strong>Gestor</strong>
            </h2>
            <div>Nome: {user.user.nome_organizacao}</div>
            <div>Email: {user.user.email}</div>
          </Container>
        </div>
      ) : user.type === "Comissao" ? (
        <div>
          <Container fluid="sm" className="name-container">
            <h2>
              <strong>Comissão</strong>
            </h2>
            <div>Nome: {user.user.nome_completo}</div>
            <div>Email: {user.user.email}</div>
          </Container>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default GetUser;
