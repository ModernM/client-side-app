import React, { useState, useEffect } from "react";

function GetVolunteer() {
  const [volunteer, setVolunteer] = useState({});
  useEffect(() => {
    fetchVolunteer();
  }, []);

  const fetchVolunteer = async () => {
    const volunteer = await fetch(`http://34.89.31.240:5000/auth/logged`, {
      method: "GET",
      headers: {
        "Content-Type": "pplication/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      mode: "cors",
      cache: "default",
    });
    const newVolunteer = await volunteer.json();
    setVolunteer(newVolunteer.user.result);
    console.log(newVolunteer.user.result);
  };
  return (
    <div>
      <h1>Perfil</h1>
      <p>Nome:{volunteer.nome_organizacao}</p>
      <p>Email:{volunteer.email}</p>
    </div>
  );
}

export default GetVolunteer;
