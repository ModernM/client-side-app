import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText("Projetos");
  expect(linkElement).toBeInTheDocument();
  //screen.debug();
  //screen.getByRole(" ");
});
