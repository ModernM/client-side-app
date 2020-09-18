import React from "react";
import { render, screen } from "@testing-library/react";
import GetRegistedProjects from "../GetRegistedProjects";

test("renders Area Intervenção", () => {
  const { getByText } = render(
    <GetRegistedProjects
      match={{ params: "internal" }}
      location={"internal"}
      projectId={"123"}
    />
  );
  const linkElement = getByText("Area Intervenção");
  expect(linkElement).toBeInTheDocument();
  //screen.debug();
  //screen.getByRole(" ");
});

test("renders Nome", () => {
  const { getByText } = render(
    <GetRegistedProjects
      match={{ params: "internal" }}
      location={"internal"}
      projectId={"123"}
    />
  );
  const linkElement = getByText("Nome");
  expect(linkElement).toBeInTheDocument();
  //screen.debug();
  //screen.getByRole(" ");
});

test("renders Requer Formação", () => {
  const { getByText } = render(
    <GetRegistedProjects
      match={{ params: "internal" }}
      location={"internal"}
      projectId={"123"}
    />
  );
  const linkElement = getByText("Requer Formação");
  expect(linkElement).toBeInTheDocument();
  //screen.debug();
  //screen.getByRole(" ");
});

test("renders Data Criação", () => {
  const { getByText } = render(
    <GetRegistedProjects
      match={{ params: "internal" }}
      location={"internal"}
      projectId={"123"}
    />
  );
  const linkElement = getByText("Data Criação");
  expect(linkElement).toBeInTheDocument();
  //screen.debug();
  //screen.getByRole(" ");
});

test("renders Detalhes", () => {
  const { getByText } = render(
    <GetRegistedProjects
      match={{ params: "internal" }}
      location={"internal"}
      projectId={"123"}
    />
  );
  const linkElement = getByText("Detalhes");
  expect(linkElement).toBeInTheDocument();
  //screen.debug();
  //screen.getByRole(" ");
});
