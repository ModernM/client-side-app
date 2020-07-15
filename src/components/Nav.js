import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">LOGO</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <NavDropdown title="Projetos" id="basic-nav-dropdown">
                <NavDropdown.Item href="/projects">
                  Lista Projetos
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/createProject">
                  Novo Projeto
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Conta" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/4.1">
                  Ver Perfil
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/4.2">
                  Notificações
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/4.3">Sair</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </Router>
  );
}

export default App;
