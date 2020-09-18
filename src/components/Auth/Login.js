import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "../../Login.css";

function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    console.log(user);
    try {
      await fetch("http://34.89.31.240:5000/auth/frontoffice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then(async (data) => {
          //espera pelo token
          return await data.json();
        })
        .then(async (json) => {
          console.log(json);
          //saves the token in the browser
          localStorage.setItem("token", json.token);
          localStorage.setItem("role", json.type);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            ref={register}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            ref={register}
          />
        </Form.Group>
        <container id="buttons">
          <Button variant="primary" type="submit" class="btn">
            Entrar
          </Button>{" "}
          <Button variant="secondary" href="registerManager" class="btn">
            {" "}
            Registar Gestor
          </Button>
          <Button variant="secondary" href="/registerVolunteer" class="btn">
            {" "}
            Registar Voluntário
          </Button>
        </container>
      </Form>
    </div>
  );
}

export default Login;
