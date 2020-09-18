import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import CreateProject from "./components/Projects/CreateProject";
import Projects from "./components/Projects/Projects";
import ProjectDetails from "./components/Projects/ProjectDetails";
import DeletedProjectNotification from "./components/Projects/DeletedProjectNotification";
import EditProject from "./components/Projects/EditProject";
import Login from "./components/Auth/Login";
import CreateManager from "./components/POSTS/CreateManager";
import CreateVolunteer from "./components/POSTS/CreateVolunteer";
import CreateExternalProject from "./components/POSTS/CreateExternalProject";
import CreateInternalProject from "./components/POSTS/CreateInternalProject";
import GetProjects from "./components/GETS/GetProjects";
import GetInternalProject from "./components/GETS/GetInternalProject";
import PatchInternalProject from "./components/PATCHES/PatchInternalProjet";
import GetUser from "./components/GETS/GetUser";
import GetExternalProject from "./components/GETS/GetExternalProject";
import PatchExternalProject from "./components/PATCHES/PatchExternalProject";
import CreateTask from "./components/POSTS/Tasks/CreateTask";
import GetRegistedProjects from "./components/GETS/GetRegistedProjects";
import CandidaturaNotificacao from "./components/Projects/CandidaturaNotificacao";
import AtividadeNotificacao from "./components/Projects/AtividadeNotificacao";
import GetTask from "./components/GETS/Tasks/GetTask";
//import GetETask from "./components/GETS/Tasks/GetETask";
import PatchInternalTask from "./components/PATCHES/Tasks/PatchInternalTask";
import AtividadeEliminada from "./components/Projects/AtividadeEliminada";
import AtividadeCandidaturaNotificaocao from "./components/Projects/AtividadeCancidaturaNotificacao";
import AproveUsers from "./components/GETS/Aprove/AproveUsers";
import AprovarUsersNotificacao from "./components/Projects/AprovarUsersNotificacao";
import NegarUsersNotificacao from "./components/Projects/NegarUsersNotificacao";
import AproveProjects from "./components/GETS/Aprove/AproveProjects";
import AtividadeAprovadaNotificacao from "./components/Projects/AtividadeAprovadaNotificacao";
import AtividadeRecusadaNotificacao from "./components/Projects/AtividadeRecusadaNotificacao";
import AproveActivities from "./components/GETS/Aprove/AproveActivities";
import AproveProjectNotificacao from "./components/Projects/AproveProjectNotificacao";
import DenyProjectNotificacao from "./components/Projects/DenyProjectsNotificacao";
import ProjetoExternoEditNotificacao from "./components/Projects/ProjetoExternoEditNotificacao";
import GetProjetosAGerir from "./components/GETS/GetProjetosAGerir";
import AproveUsersInActivities from "./components/GETS/Aprove/AproveUsersInActivities";
import AproveUsersInProjects from "./components/GETS/Aprove/AproveUsersInProjects";
import "./css/General.css";
import Home from "./components/Home";
import PatchTask from "./components/PATCHES/Tasks/PatchTask";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/createProject" exact component={CreateProject} />
          <Route path="/projects" exact component={Projects} />
          <Route
            path="/projects/deleted"
            exact
            component={DeletedProjectNotification}
          />
          <Route path="/projects/:id" exact component={ProjectDetails} />
          <Route path="/projects/edit/:id" exact component={EditProject} />
          <Route path="/login" exact component={Login} />
          <Route
            path="/registerManager"
            exact
            component={CreateManager}
          ></Route>
          <Route
            path="/registerVolunteer"
            exact
            component={CreateVolunteer}
          ></Route>
          <Route
            path="/createExternalProject"
            exact
            component={CreateExternalProject}
          ></Route>
          <Route
            path="/createInternalProject"
            exact
            component={CreateInternalProject}
          ></Route>
          <Route path="/getProjects" exact component={GetProjects}></Route>
          <Route
            path="/internalProjects/:id"
            exact
            component={GetInternalProject}
          ></Route>
          <Route
            path="/internalProject/edit/:id"
            exact
            component={PatchInternalProject}
          ></Route>
          <Route path="/GetUser" exact component={GetUser}></Route>
          <Route
            path="/externalProjects/:id"
            exact
            component={GetExternalProject}
          ></Route>
          <Route
            path="/externalProject/edit/:id"
            exact
            component={PatchExternalProject}
          ></Route>
          <Route
            path="/registedProjects"
            exact
            component={GetRegistedProjects}
          ></Route>
          <Route
            path="/project/:id/tasks/add"
            exact
            component={CreateTask}
          ></Route>
          <Route
            path="/candidatura/notificacao"
            exact
            component={CandidaturaNotificacao}
          ></Route>
          <Route
            path="/atividade/notificacao"
            exact
            component={AtividadeNotificacao}
          ></Route>
          <Route path="/tasks/:id" exact component={GetTask}></Route>
          <Route
            path="/atividadesI/edit/:id"
            exact
            component={PatchTask}
          ></Route>
          <Route
            path="/atividadeEliminada"
            exact
            component={AtividadeEliminada}
          ></Route>
          <Route
            path="/atividadeSubmetidaNotificacao"
            exact
            component={AtividadeCandidaturaNotificaocao}
          ></Route>
          <Route path="/aprove/Users" exact component={AproveUsers}></Route>
          <Route
            path="/aprove/Users/notificacao"
            exact
            component={AprovarUsersNotificacao}
          ></Route>
          <Route
            path="/negar/users/notificacao"
            exact
            component={NegarUsersNotificacao}
          ></Route>
          <Route
            path="/aprove/projects"
            exact
            component={AproveProjects}
          ></Route>
          <Route
            path="/negar/activities/notificacao"
            exact
            component={AtividadeRecusadaNotificacao}
          ></Route>
          <Route
            path="/aprove/activities/notificacao"
            exact
            component={AtividadeAprovadaNotificacao}
          ></Route>
          <Route
            path="/aprove/activities"
            exact
            component={AproveActivities}
          ></Route>
          <Route
            path="/aprove/project/notificacao"
            exact
            component={AproveProjectNotificacao}
          ></Route>
          <Route
            path="/deny/project/notificacao"
            exact
            component={DenyProjectNotificacao}
          ></Route>
          <Route
            path="/edit/external_project/notificacao"
            exact
            component={ProjetoExternoEditNotificacao}
          ></Route>
          <Route
            path="/projetos/AGerir"
            exact
            component={GetProjetosAGerir}
          ></Route>
          <Route
            path="/project/:projectId/task/:taskId/aprove"
            exact
            component={AproveUsersInActivities}
          ></Route>
          <Route
            path="/project/:projectId/projects/aprove"
            exact
            component={AproveUsersInProjects}
          ></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
