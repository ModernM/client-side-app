import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "../css/Navbar.css";

function App() {
  const [logged, login] = useState(false);

  useEffect(() => {
    isLogged();
    console.log(localStorage.getItem("token"));
  }, [logged]);

  const isLogged = () => {
    if (localStorage.getItem("token")) {
      login(true);
    } else {
      login(false);
    }
  };

  return (
    <Router>
      {localStorage.getItem("role") === "Voluntario" &&
      localStorage.getItem("token") != null ? (
        <Container fluid className="nav-bar">
          <Navbar variant="light" sticky="top">
            <Navbar.Brand href="/">
              <img
                width="70"
                length="70"
                src={
                  "https://www.cinel.pt/appv2/Portals/0/EasyDNNnews/1150/1150Logo.png"
                }
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Projetos" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/getProjects">
                    Todos os Projetos
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/registedProjects">
                    Projetos a Participar
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/projetos/AGerir">
                    Projetos a Gerir
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/createInternalProject">
                    Novo Projeto
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Conta" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/GetUser">
                    Ver Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  {logged ? (
                    <NavDropdown.Item
                      href="/login"
                      onClick={() => localStorage.removeItem("token")}
                    >
                      Sair
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item href="/login">Entrar</NavDropdown.Item>
                  )}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      ) : localStorage.getItem("role") === "Gestor" &&
        localStorage.getItem("token") != null ? (
        <Container fluid className="nav-bar">
          <Navbar variant="light" sticky="top">
            <Navbar.Brand href="/">
              <img
                width="70"
                length="70"
                src={
                  "https://www.cinel.pt/appv2/Portals/0/EasyDNNnews/1150/1150Logo.png"
                }
              />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Projetos" id="basic-nav-dropdown">
                  {/* <NavDropdown.Item href="/getProjects">
                    Todos os Projetos
                  </NavDropdown.Item> */}
                  <NavDropdown.Item href="/projetos/AGerir">
                    Projetos a Gerir
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/createExternalProject">
                    Novo Projeto
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Conta"
                  id="basic-nav-dropdown"
                  className="font-weight-bolder"
                >
                  <NavDropdown.Item href="/GetUser">
                    Ver Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  {logged ? (
                    <NavDropdown.Item
                      href="/login"
                      onClick={() => localStorage.removeItem("token")}
                    >
                      Sair
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item href="/login">Entrar</NavDropdown.Item>
                  )}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      ) : localStorage.getItem("role") === "Comissao" &&
        localStorage.getItem("token") != null ? (
        <Container fluid className="nav-bar">
          <Navbar variant="light" sticky="top">
            <Navbar.Brand href="/">
              <img
                width="70"
                length="70"
                src={
                  "https://www.cinel.pt/appv2/Portals/0/EasyDNNnews/1150/1150Logo.png"
                }
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Gerir" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/aprove/projects">
                    Aprovar Projetos
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/aprove/activities">
                    Aprovar Atividades
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/aprove/users">
                    Aprovar Utilizadores
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Conta" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/GetUser">
                    Ver Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  {logged ? (
                    <NavDropdown.Item
                      href="/login"
                      onClick={() => localStorage.removeItem("token")}
                    >
                      Sair
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item href="/login">Entrar</NavDropdown.Item>
                  )}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      ) : (
        <Container fluid className="nav-bar">
          <Navbar variant="light" sticky="top">
            <Navbar.Brand href="">
              <img
                width="70"
                length="70"
                src={
                  "https://www.cinel.pt/appv2/Portals/0/EasyDNNnews/1150/1150Logo.png"
                }
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Projetos" id="basic-nav-dropdown">
                  <NavDropdown.Item href="">Aprovar Projetos</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="">
                    Aprovar Atividades
                  </NavDropdown.Item>
                  <NavDropdown.Item href="">
                    Aprovar Utilizadores
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Conta" id="basic-nav-dropdown">
                  <NavDropdown.Item href="">Ver Perfil</NavDropdown.Item>
                  <NavDropdown.Divider />
                  {logged ? (
                    <NavDropdown.Item
                      href=""
                      onClick={() => localStorage.removeItem("token")}
                    >
                      Sair
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item href="/login">Entrar</NavDropdown.Item>
                  )}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      )}
    </Router>
  );
}

export default App;
