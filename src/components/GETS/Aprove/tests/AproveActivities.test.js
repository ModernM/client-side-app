import React from "react";
import { render, screen } from "@testing-library/react";
import AproveActivities from "../AproveActivities";

test("renders Nome", () => {
  const { getByText } = render(<AproveActivities />);
  const linkElement = getByText("Nome");
  expect(linkElement).toBeInTheDocument();
  //screen.debug();
  //screen.getByRole(" ");
});

test("renders Data", () => {
  const { getByText } = render(<AproveActivities />);
  const linkElement = getByText("Data");
  expect(linkElement).toBeInTheDocument();
  //screen.debug();
  //screen.getByRole(" ");
});

test("renders Objetivo", () => {
  const { getByText } = render(<AproveActivities />);
  const linkElement = getByText("Objetivo");
  expect(linkElement).toBeInTheDocument();
  //screen.debug();
  //screen.getByRole(" ");
});

test("renders Detalhes", () => {
  const { getByText } = render(<AproveActivities />);
  const linkElement = getByText("Detalhes");
  expect(linkElement).toBeInTheDocument();
  //screen.debug();
  //screen.getByRole(" ");
});

test("renders Decisão", () => {
  const { getByText } = render(<AproveActivities />);
  const linkElement = getByText("Decisão");
  expect(linkElement).toBeInTheDocument();
  //screen.debug();
  //screen.getByRole(" ");
});
