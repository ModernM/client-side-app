import React from "react";
import { render, screen } from "@testing-library/react";
import AproveUsersInProjects from "../AproveUsersInProjects";

test("renders Nome", () => {
  const { getByText } = render(
    <AproveUsersInProjects
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

test("renders Concelho", () => {
  const { getByText } = render(
    <AproveUsersInProjects
      match={{ params: "internal" }}
      location={"internal"}
      projectId={"123"}
    />
  );
  const linkElement = getByText("Concelho");
  expect(linkElement).toBeInTheDocument();
  //screen.debug();
  //screen.getByRole(" ");
});
test("renders Data Nascimento", () => {
  const { getByText } = render(
    <AproveUsersInProjects
      match={{ params: "internal" }}
      location={"internal"}
      projectId={"123"}
    />
  );
  const linkElement = getByText("Data Nascimento");
  expect(linkElement).toBeInTheDocument();
  //screen.debug();
  //screen.getByRole(" ");
});

test("renders Formação", () => {
  const { getByText } = render(
    <AproveUsersInProjects
      match={{ params: "internal" }}
      location={"internal"}
      projectId={"123"}
    />
  );
  const linkElement = getByText("Formação");
  expect(linkElement).toBeInTheDocument();
  //screen.debug();
  //screen.getByRole(" ");
});

test("renders Decisão", () => {
  const { getByText } = render(
    <AproveUsersInProjects
      match={{ params: "internal" }}
      location={"internal"}
      projectId={"123"}
    />
  );
  const linkElement = getByText("Decisão");
  expect(linkElement).toBeInTheDocument();
  //screen.debug();
  //screen.getByRole(" ");
});
