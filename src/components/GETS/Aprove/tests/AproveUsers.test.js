import React from "react";
import { render, screen } from "@testing-library/react";
import AproveUsers from "../AproveUsers";

test("renders email", () => {
  const { getByText } = render(<AproveUsers />);
  const linkElement = getByText("Email");
  expect(linkElement).toBeInTheDocument();
  //screen.debug();
  //screen.getByRole(" ");
});

test("renders Nome", () => {
  const { getByText } = render(<AproveUsers />);
  const linkElement = getByText("Nome");
  expect(linkElement).toBeInTheDocument();
  //screen.debug();
  //screen.getByRole(" ");
});
test("renders Data Criação", () => {
  const { getByText } = render(<AproveUsers />);
  const linkElement = getByText("Data Criação");
  expect(linkElement).toBeInTheDocument();
  //screen.debug();
  //screen.getByRole(" ");
});

test("renders Decisão", () => {
  const { getByText } = render(<AproveUsers />);
  const linkElement = getByText("Decisão");
  expect(linkElement).toBeInTheDocument();
  //screen.debug();
  //screen.getByRole(" ");
});
