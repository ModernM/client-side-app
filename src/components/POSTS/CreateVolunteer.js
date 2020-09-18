import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { Col, FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@material-ui/core";
import "../../css/Register.css";

function CreateVulunteer() {
  useEffect(() => {
    fetchConcelhos();
  });
  const [concelhos, loadConcelhos] = useState([]);

  const memberTypes = [
    { value: "5f280d948ad64133d09e4e42", label: "Estudante" },
    { value: "5f280d948ad64133d09e4e44", label: "Docente" },
    { value: "5f280d948ad64133d09e4e43", label: "Diplomado" },
    { value: "5f280d948ad64133d09e4e45", label: "Não Docente" },
    { value: "5f280d948ad64133d09e4e46", label: "Bolseiro" },
    { value: "5f280d948ad64133d09e4e47", label: "Aposentado" },
  ];

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
  const razoes_voluntariado = [
    {
      id: "5f280d948ad64133d09e4e39",
      area: "Pelo convívio social",
    },
    {
      id: "5f280d948ad64133d09e4e3a",
      area: "Porque pode ser vantajoso para o futuro profissional",
    },
    {
      id: "5f280d948ad64133d09e4e3b",
      area: "Pela possibilidade de integração social",
    },
    {
      id: "5f280d948ad64133d09e4e3c",
      area: "Para ter novas experiências",
    },
    {
      id: "5f280d948ad64133d09e4e3d",
      area: "Porque gosto de ajudar os outros",
    },
    {
      id: "5f280d948ad64133d09e4e3e",
      area: "Porque fui incentivado(a) por outras pessoas",
    },
    {
      id: "5f280d948ad64133d09e4e3f",
      area:
        "Porque conheço pessoas que já realizaram atividades de voluntariado no IPS)",
    },
    {
      id: "5f280d948ad64133d09e4e40",
      area: "Para me sentir útil",
    },
    {
      id: "5f280d948ad64133d09e4e41",
      area: "Para ocupar tempo livre",
    },
  ];

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
      razoes_1: false,
      razoes_2: false,
      razoes_3: false,
      razoes_4: false,
      razoes_5: false,
      razoes_6: false,
      razoes_7: false,
      razoes_8: false,
      razoes_9: false,
    },
  });

  const fetchConcelhos = async () => {
    const data = await fetch(" http://34.89.31.240:5000/concelho");
    const jsonData = await data.json();
    loadConcelhos(jsonData);
  };

  const formatConcelhos = (concelhos) => {
    const concelhos_formatados = [];
    concelhos.forEach(async (concelho) => {
      concelhos_formatados.push({
        value: concelho._id,
        label: concelho.nome,
      });
    });
    //console.log(concelhos_formatados);
    return concelhos_formatados;
  };
  const concelhos_formatados = formatConcelhos(concelhos);

  const areas_servico_format = (interesses, verbo) => {
    const indices = [];
    for (let i = 0; i < interesses.length; i++) {
      if (interesses[i].area) {
        indices.push(i);
      }
    }
    return indices;
  };

  const razoes_servico_format = (interesses, verbo) => {
    const indices = [];
    for (let i = 0; i < interesses.length; i++) {
      if (interesses[i].razao) {
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

  const onSubmit = async (data) => {
    console.log(data);
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

    const razoes = [
      {
        razao: data.razoes_1,
      },
      {
        razao: data.razoes_2,
      },
      {
        razao: data.razoes_3,
      },
      {
        razao: data.razoes_4,
      },
      {
        razao: data.razoes_5,
      },
      {
        razao: data.razoes_6,
      },
      {
        razao: data.razoes_7,
      },
      {
        razao: data.razoes_8,
      },
      {
        razao: data.razoes_9,
      },
    ];
    const indices_areas = areas_servico_format(interesses);
    const areas_para_objecto = conversaoArray(indices_areas, areas_interesse);

    const indices_razoes = razoes_servico_format(razoes);
    const razoes_para_objecto = conversaoArray(
      indices_razoes,
      razoes_voluntariado
    );

    const volunteer = {
      nome_completo: data.nome_completo,
      email: data.email,
      password: data.password,
      telemovel: data.telemovel,
      concelho: data.concelho.value,
      data_nascimento: new Date("2016-05-18T16:00:00Z"),
      tipo_membro: data.tipo_membro.value,
      escola_servico: data.escola_servico,
      curso_formacao: data.curso_formacao,
      areas_interesse: areas_para_objecto,
      razoes_voluntario: razoes_para_objecto,
      observacoes: data.observacoes,
    };
    console.log(volunteer);
    console.log(typeof data.data_nascimento);

    await fetch("http://34.89.31.240:5000/voluntario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(volunteer),
    });
  };

  return (
    <div className="RegisterForm form">
      <h1 className="text-center">Registo Voluntário</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formGroupName">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome Completo"
            name="nome_completo"
            ref={register}
          />
        </Form.Group>

        <Form.Group controlId="formGroupBirthDate">
          <Form.Label>Data Nascimento</Form.Label>
          <br></br>
          <Controller
            control={control}
            name="data_nascimento"
            placeholder="Selecione a data" //not working
            render={({ onChange, onBlur, value }) => (
              <DatePicker
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
              />
            )}
          />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="formGroupPhone">
            <Form.Label>Número Telefone</Form.Label>
            <Form.Control
              type="number"
              placeholder="Número de Telefone"
              name="telemovel"
              ref={register}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              ref={register}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGroupPassword">
            <Form.Label>Palavra Chave</Form.Label>
            <Form.Control
              type="password"
              placeholder="Palavra Chave"
              name="password"
              ref={register}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGroupConcelho">
            <Form.Label>Concelho</Form.Label>
            <Controller
              as={Select}
              options={concelhos_formatados}
              name="concelho"
              isClearable
              control={control}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGroupMemberType">
            <Form.Label>Tipo Membro</Form.Label>
            <Controller
              as={Select}
              options={memberTypes}
              name="tipo_membro"
              isClearable
              control={control}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGroupEscola_Servico">
            <Form.Label>Escola/Serviço?</Form.Label>
            <Form.Control
              type="text"
              placeholder="ex: escola"
              name="escola_servico"
              ref={register}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGroupCurso_formacao">
            <Form.Label>Curso/Formação?</Form.Label>
            <Form.Control
              type="text"
              placeholder="ex: curso"
              name="curso_formacao"
              ref={register}
            />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="formGroupAreas_interesse">
          <Form.Label>Area Interesse:</Form.Label>
          <fieldset id="areas_interesse">
            <div>
              <Controller
                as={Checkbox}
                name="areas_interesse1"
                control={control}
              />
              <label>
                Atividades Académicas (por ex. apoio às matrículas…)
              </label>
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
              <label>
                Educação (por ex. estudo acompanhado, alfabetização…)
              </label>
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
        <Form.Group controlId="formGroupRazoes_voluntariado">
          <Form.Label>Porque se está a voluntariar:</Form.Label>
          <fieldset id="razoes_voluntario">
            <div>
              <Controller as={Checkbox} name="razoes_1" control={control} />
              <label>Pelo convívio social</label>
            </div>
            <div>
              <Controller as={Checkbox} name="razoes_2" control={control} />
              <label>
                Porque pode ser vantajoso para o futuro profissional
              </label>
            </div>
            <div>
              <Controller as={Checkbox} name="razoes_3" control={control} />
              <label>Pela possibilidade de integração social</label>
            </div>
            <div>
              <Controller as={Checkbox} name="razoes_4" control={control} />
              <label>Para ter novas experiências</label>
            </div>
            <div>
              <Controller as={Checkbox} name="razoes_5" control={control} />
              <label>Porque gosto de ajudar os outros</label>
            </div>
            <div>
              <Controller as={Checkbox} name="razoes_6" control={control} />
              <label>Porque fui incentivado(a) por outras pessoas</label>
            </div>
            <div>
              <Controller as={Checkbox} name="razoes_7" control={control} />
              <label>
                Porque conheço pessoas que já realizaram atividades de
                voluntariado no IPS
              </label>
            </div>
            <div>
              <Controller as={Checkbox} name="razoes_8" control={control} />
              <label>Para me sentir útil</label>
            </div>
            <div>
              <Controller as={Checkbox} name="razoes_9" control={control} />
              <label>Para ocupar tempo livre</label>
            </div>
          </fieldset>
        </Form.Group>
        <Form.Group controlId="formGroupObservacoes">
          <div>
            <Form.Label>Observações:</Form.Label>
          </div>
          <FormControl
            as="textarea"
            ref={register}
            name="observacoes"
            label="Material textarea"
          ></FormControl>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateVulunteer;
