import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Checkbox } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";

function PatchExternalProject({ match }) {
  useEffect(() => {
    fetchProject();
  }, []);
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      areas_interesse1: false,
      areas_interesse2: false,
      areas_interesse3: false,
      areas_interesse4: false,
      areas_interesse5: false,
      areas_interesse6: false,
      areas_interesse7: false,
      areas_interesse8: false,
      areas_interesse9: false,
    },
  });
  const [project, setProject] = useState({
    areas_interesse: [],
    candidatos: [],
    participantes: [],
    concluido: false,
    em_destaque: false,
    aprovado: false,
    _id: "",
    designacao: "",
    pessoa_contacto: "",
    email: "",
    telemovel: "",
    resumo: "",
    area_intervencao: "",
    publico_alvo: "",
    objetivos: "",
    descricao_atividades: "",
    formacao_especifica: "",
    tipo_formacao: "",
    data_horario: "",
    entidades_envolvidas: "",
    observacoes: "",
    logotipo: "",
    data_criacao: null,
  });
  const areas_servico_format = (interesses, verbo) => {
    const indices = [];
    for (let i = 0; i < interesses.length; i++) {
      if (interesses[i].area) {
        indices.push(i);
      }
    }
    return indices;
  };
  const conversaoArray = (indices, campo) => {
    const novasVariaveis = [];
    if (indices.length !== 0) {
      for (let i = 0; i < indices.length; i++) {
        novasVariaveis.push(campo[indices[i]].id);
      }
    }
    return novasVariaveis;
  };
  const fetchProject = async () => {
    const fetchedProject = await fetch(
      `http://34.89.31.240:5000/projeto_externo/id/${match.params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        mode: "cors",
        cache: "default",
      }
    );
    const project = await fetchedProject.json();
    setProject(project);
  };

  const onSubmit = async (data) => {
    console.log("I was called");
    const interesses = [
      { area: data.areas_interesse1 },
      { area: data.areas_interesse2 },
      { area: data.areas_interesse3 },
      { area: data.areas_interesse4 },
      { area: data.areas_interesse5 },
      { area: data.areas_interesse6 },
      { area: data.areas_interesse7 },
      { area: data.areas_interesse8 },
      { area: data.areas_interesse9 },
    ];
    const indices_areas = areas_servico_format(interesses);
    const areas_para_objecto = conversaoArray(indices_areas, areas_interesse);
    function necessariaFormacao(formacao_especifica) {
      if (data.formacao_especifica === "True") {
        return true;
      } else {
        return false;
      }
    }
    console.log(data.designacao);
    const externalProject = {
      designacao: data.designacao,
      pessoa_contacto: data.pessoa_contacto,
      email: data.email,
      telemovel: data.telemovel,
      resumo: data.resumo,
      area_intervencao: data.area_intervencao,
      publico_alvo: data.publico_alvo,
      objetivos: data.objetivos,
      descricao_atividades: data.descricao_atividades,
      formacao_especifica: necessariaFormacao(data.formacao_especifica),
      tipo_formacao: data.tipo_formacao,
      data_horario: data.data_horario,
      areas_interesse: areas_para_objecto,
      entidades_envolvidas: data.entidades_envolvidas,
      logotipo: data.logotipo,
      observacoes: data.observacoes,
    };

    try {
      console.log(externalProject);
      await fetch(
        `http://34.89.31.240:5000/projeto_externo/put/${match.params.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(externalProject),
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const areas_interesse = [
    {
      id: "5f280d948ad64133d09e4cfb",
      area: "Atividades Académicas (por ex. apoio às matrículas…)",
    },
    {
      id: "5f280d948ad64133d09e4cfc",
      area: "Ambiental (por ex. ações de sensibilização, de limpeza…)",
    },
    { id: "5f280d948ad64133d09e4cfd", area: "Apoio a Eventos" },
    {
      id: "5f280d948ad64133d09e4cfe",
      area:
        "Informática (por ex. criação de sites, de bases de dados, formação…)",
    },
    {
      id: "5f280d948ad64133d09e4cff",
      area:
        "Comunicação (por ex. divulgação nas Escolas Secundárias/Profissionais, Futurália…)",
    },
    {
      id: "5f280d948ad64133d09e4d00",
      area: "Cultural (por ex. teatro; música...)",
    },
    {
      id: "5f280d948ad64133d09e4d01",
      area: "Desporto (por ex. apoio a eventos desportivos, caminhadas…)",
    },
    {
      id: "5f280d948ad64133d09e4d02",
      area: "Educação (por ex. estudo acompanhado, alfabetização…)",
    },
    {
      id: "5f280d948ad64133d09e4d04",
      area: "Social (por ex. apoio a idosos, a crianças, Banco Alimentar…)",
    },
  ];

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="nome_projeto">
        <Form.Label>Nome Projeto</Form.Label>
        <Form.Control
          type="text"
          defaultValue={project.designacao}
          placeholder="Nome Projeto"
          ref={register}
          name="designacao"
        />
      </Form.Group>
      <Form.Group controlId="contacto">
        <Form.Label>Pessoa Resposável</Form.Label>
        <Form.Control
          type="text"
          defaultValue={project.pessoa_contacto}
          placeholder="Nome Responsável"
          ref={register}
          name="pessoa_contacto"
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          defaultValue={project.email}
          placeholder="Email"
          ref={register}
          name="email"
        />
      </Form.Group>
      <Form.Group controlId="telemovel">
        <Form.Label>Contacto Telefónico</Form.Label>
        <Form.Control
          type="number"
          defaultValue={project.telemovel}
          placeholder="Número de Telemóvel"
          ref={register}
          name="telemovel"
        />
      </Form.Group>
      <Form.Group controlId="resumo">
        <Form.Label> Descrição Projeto</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          defaultValue={project.resumo}
          placeholder="Breve Descrição do Projeto"
          ref={register}
          name="resumo"
        />
      </Form.Group>
      <Form.Group controlId="area_intervencao">
        <Form.Label> Area de Intervenção</Form.Label>
        <Form.Control
          type="text"
          defaultValue={project.area_intervencao}
          placeholder="Area de Intervenção"
          ref={register}
          name="area_intervencao"
        />
      </Form.Group>
      <Form.Group controlId="publico_alvo">
        <Form.Label> Publico Alvo</Form.Label>
        <Form.Control
          type="text"
          defaultValue={project.publico_alvo}
          placeholder="Publico Alvo"
          ref={register}
          name="publico_alvo"
        />
      </Form.Group>
      <Form.Group controlId="objetivos">
        <Form.Label> Objetivos</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          defaultValue={project.objetivos}
          placeholder="Indique os objetivos"
          ref={register}
          name="objetivos"
        />
      </Form.Group>
      <Form.Group controlId="descricao_atividades">
        <Form.Label> Descricao das Atividades</Form.Label>
        <Form.Control
          as="textarea"
          defaultValue={project.descricao_atividades}
          placeholder="Descrição das atividades"
          ref={register}
          name="descricao_atividades"
        />
      </Form.Group>
      <Form.Group controlId="necessaria_formacao">
        <Form.Label> Formação Expecífica: </Form.Label>
        <div>
          <Form.Label> Sim </Form.Label>
          <input
            name="formacao_especifica"
            type="radio"
            value="True"
            ref={register({ required: true })}
          />
        </div>
        <div>
          <Form.Label> Não </Form.Label>
          <input
            name="formacao_especifica"
            type="radio"
            value="False"
            ref={register({ required: true })}
          />
        </div>
      </Form.Group>
      <Form.Group controlId="tipo_formacao">
        <Form.Label> Se sim, que tipo: </Form.Label>
        <Form.Control
          as="textarea"
          defaultValue={project.tipo_formacao}
          placeholder="Tipo de formação necessária"
          ref={register}
          name="tipo_formacao"
        />
      </Form.Group>
      <Form.Group controlId="data">
        <Form.Label> Horário </Form.Label>
        <Form.Control
          as="textarea"
          defaultValue={project.data_horario}
          placeholder="Especifique o horário"
          ref={register}
          name="data_horario"
        />
      </Form.Group>
      <Form.Group controlId="formGroupAreas_interesse">
        <Form.Label>Area Interesse:</Form.Label>
        <fieldset id="areas_interesse">
          <div>
            <Controller
              as={Checkbox}
              name="areas_interesse1"
              control={control}
            />
            <label>Atividades Académicas (por ex. apoio às matrículas…)</label>
          </div>
          <div>
            <Controller
              as={Checkbox}
              name="areas_interesse2"
              control={control}
            />
            <label>
              Ambiental (por ex. ações de sensibilização, de limpeza…)
            </label>
          </div>
          <div>
            <Controller
              as={Checkbox}
              name="areas_interesse3"
              control={control}
            />
            <label>Apoio a Eventos</label>
          </div>
          <div>
            <Controller
              as={Checkbox}
              name="areas_interesse4"
              control={control}
            />
            <label>
              Informática (por ex. criação de sites, de bases de dados,
              formação…)
            </label>
          </div>
          <div>
            <Controller
              as={Checkbox}
              name="areas_interesse5"
              control={control}
            />
            <label>
              Comunicação (por ex. divulgação nas Escolas
              Secundárias/Profissionais, Futurália…)
            </label>
          </div>
          <div>
            <Controller
              as={Checkbox}
              name="areas_interesse6"
              control={control}
            />
            <label>Cultural (por ex. teatro; música...)</label>
          </div>
          <div>
            <Controller
              as={Checkbox}
              name="areas_interesse7"
              control={control}
            />
            <label>
              Desporto (por ex. apoio a eventos desportivos, caminhadas…)
            </label>
          </div>
          <div>
            <Controller
              as={Checkbox}
              name="areas_interesse8"
              control={control}
            />
            <label>Educação (por ex. estudo acompanhado, alfabetização…)</label>
          </div>
          <div>
            <Controller
              as={Checkbox}
              name="areas_interesse9"
              control={control}
            />
            <label>
              Social (por ex. apoio a idosos, a crianças, Banco Alimentar…)
            </label>
          </div>
        </fieldset>
      </Form.Group>
      <Form.Group controlId="entidades_envolvidas">
        <Form.Label> Entidades Envolvidas </Form.Label>
        <Form.Control
          type="text"
          defaultValue={project.entidades_envolvidas}
          placeholder="Entidades Envolvidas"
          ref={register}
          name="entidades_envolvidas"
        />
      </Form.Group>
      <Form.Group controlId="observacoes">
        <Form.Label> Observações </Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          defaultValue={project.observacoes}
          placeholder="Observações"
          ref={register}
          name="observacoes"
        />
      </Form.Group>
      <Form.Group controlId="logotipo">
        <Form.Label> Logotipo URL </Form.Label>
        <Form.Control
          type="text"
          defaultValue={project.logotipo}
          placeholder="URL do logotipo"
          ref={register}
          name="logotipo"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default PatchExternalProject;
