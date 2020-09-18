import React from "react";
import { render, screen } from "@testing-library/react";
import GetProjects from "../GetProjects";

test("renders Area Intervenção", () => {
  const { getByText } = render(
    <GetProjects
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
    <GetProjects
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
    <GetProjects
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
    <GetProjects
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
    <GetProjects
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
