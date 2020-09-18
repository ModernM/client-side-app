import React from "react";
import { render, screen } from "@testing-library/react";
import GetUser from "../GetUser";

test("renders Perfil", () => {
  const { getByText } = render(
    <GetUser
      match={{ params: "internal" }}
      location={"internal"}
      projectId={"123"}
    />
  );
  const linkElement = getByText("Perfil");
  expect(linkElement).toBeInTheDocument();
  //screen.debug();
  //screen.getByRole(" ");
});
