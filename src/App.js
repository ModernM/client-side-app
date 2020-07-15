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
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => {
  return (
    <div>
      <h1>Welcome you are at HOME PAGE</h1>
    </div>
  );
};

export default App;
