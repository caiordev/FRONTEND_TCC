/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  debounce,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { FerramentasDeDetalhe } from "app/shared/components";
import { VTextField, VForm, useVForm, IVFormErrors } from "app/shared/forms";
import { LayoutBaseDePagina } from "app/shared/layouts/LayoutBaseDePagina";
import {
  IDetalhePatente,
  IListagemPatente,
  PatenteService,
} from "app/shared/services/api/patente/PatenteService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { AutoComplete } from "./components/AutoComplete";

export interface IPatenteData {
  PROTOCOLO: string;
  NATUREZA: string;
  DEPOSITO?: string;
  TITULO: string;
  INVENTORES: string;
  IPC?: string;
  CPC?: string;
  COTITULAR: string;
  QREIVIND: number;
  STATUS?: string;
  PROCESSO: string;
  CONCESSAO?: string;
}

const formValidationSchema: yup.Schema<IPatenteData> = yup.object().shape({
  PROTOCOLO: yup.string().required(),
  NATUREZA: yup.string().required(),
  DEPOSITO: yup.string().optional(),
  TITULO: yup.string().required(),
  INVENTORES: yup.string().required(),
  IPC: yup.string().optional(),
  CPC: yup.string().optional(),
  COTITULAR: yup.string().required(),
  QREIVIND: yup.number().required(),
  STATUS: yup.string().required(),
  PROCESSO: yup.string().required(),
  CONCESSAO: yup.string().optional(),
});

export const TelaDeDetalheDePatente: React.FC = () => {
  const { ID = "nova" } = useParams<"ID">();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const [titulo, setTitulo] = useState<string>("");
  const [protocolo, setProtocolo] = useState<number | undefined>(undefined);
  const [natureza, setNatureza] = useState<string>("");
  const [inventores, setInventores] = useState<string>("");
  const [ipc, setIpc] = useState<string>("");
  const [cpc, setCpc] = useState<string>("");
  const [cotitular, setCotitular] = useState<string>("");
  const [qreivind, setQreivind] = useState<number | undefined>(undefined);
  const [status, setStatus] = useState<string>("");
  const [processo, setProcesso] = useState<string>("");
  const [update, setUpdate] = useState(false);
  const [inputDate1Value, setInputDate1Value] = useState<string>("");
  const [inputDate2Value, setInputDate2Value] = useState<string>("");

  useEffect(() => {
    if (ID !== "nova") {
      setIsLoading(true);
      PatenteService.getByIdPatente(ID).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("/patentes");
        } else {
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        TITULO: "",
        PROTOCOLO: "",
        NATUREZA: "",
        DEPOSITO: "",
        INVENTORES: "",
        IPC: "",
        CPC: "",
        COTITULAR: "",
        QREIVIND: "",
        STATUS: "",
        PROCESSO: "",
        CONCESSAO: "",
      });
    }
  }, [ID, update]);

  const handleSave = (dados: IPatenteData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);
        if (ID === "nova") {
          console.log("Creating new patent");
          PatenteService.createPatente({
            ...dadosValidados,
            CONCESSAO: inputDate2Value,
          }).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              console.log(result);
              if (isSaveAndClose()) {
                navigate("/patentes");
              }
            }
          });
        } else {
          PatenteService.updateByIdPatente(ID, dadosValidados).then(
            (result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate("/pagina-inicial");
                }
              }
            }
          );
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleDelete = (id: string) => {
    if (confirm("Realmente deseja apagar?")) {
      PatenteService.deleteByIdPatente(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate("/patentes");
          alert("Registro apagado com sucesso");
        }
      });
    }
  };

  useEffect(() => {
    if (inputDate1Value) {
      const dateObject = new Date(inputDate1Value);
      dateObject.setMonth(dateObject.getMonth() + 6);
      const formattedDate = dateObject.toISOString().split("T")[0];
      setInputDate2Value(formattedDate);
    }
  }, [inputDate1Value, inputDate2Value]);

  const limparCampos = () => {
    setTitulo("");
    setProtocolo(undefined);
    setNatureza("");
    setInventores("");
    setIpc("");
    setCpc("");
    setCotitular("");
    setQreivind(undefined);
    setStatus("");
    setProcesso("");
    setInputDate2Value("");
    setInputDate1Value("");
    setUpdate(!update);
  };

  return (
    <LayoutBaseDePagina
      titulo={ID === "nova" ? "Cadastro de patente" : "Detalhe  de patente"}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={ID !== "nova"}
          mostrarBotaoApagar={ID !== "nova"}
          aoClicarEmSalvar={() => {
            formRef.current?.submitForm();
            limparCampos();
          }}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmApagar={() => handleDelete(ID)}
          aoClicarEmNovo={() => {
            navigate("/patentes/detalhe/nova");
          }}
          aoClicarEmVoltar={() => {
            navigate("/patentes");
          }}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          component={Paper}
          display="flex"
          flexDirection="column"
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            <Grid item>
              {isLoading && <LinearProgress variant="indeterminate" />}
            </Grid>
            <Grid item>
              <Typography variant="h6">Patente</Typography>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={4} xl={4} lg={4} md={4} sm={6}>
                <VTextField
                  fullWidth
                  name="PROTOCOLO"
                  label="Protocolo"
                  disabled={isLoading}
                  value={protocolo !== undefined ? protocolo.toString() : ""}
                  onChange={(event) => {
                    const value2 = event.target.value;
                    setProtocolo(value2 !== "" ? Number(value2) : undefined);
                  }}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={4} xl={4} lg={4} md={4} sm={6}>
                <VTextField
                  fullWidth
                  name="NATUREZA"
                  label="Natureza"
                  disabled={isLoading}
                  value={natureza}
                  onChange={(event) => setNatureza(event.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={4} xl={4} lg={4} md={4} sm={6}>
                <VTextField
                  fullWidth
                  name="DEPOSITO"
                  type="date"
                  label="Data depósito"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={isLoading}
                  value={inputDate1Value}
                  onChange={(e) => setInputDate1Value(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={4} xl={4} lg={4} md={4} sm={6}>
                <VTextField
                  fullWidth
                  name="TITULO"
                  label="Título"
                  disabled={isLoading}
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={4} xl={4} lg={4} md={4} sm={6}>
                <VTextField
                  fullWidth
                  name="INVENTORES"
                  label="Inventores"
                  disabled={isLoading}
                  value={inventores}
                  onChange={(event) => setInventores(event.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={4} xl={4} lg={4} md={4} sm={6}>
                <VTextField
                  fullWidth
                  name="IPC"
                  label="Ipc"
                  disabled={isLoading}
                  value={ipc}
                  onChange={(event) => setIpc(event.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={4} xl={4} lg={4} md={4} sm={6}>
                <VTextField
                  fullWidth
                  name="CPC"
                  label="Cpc"
                  disabled={isLoading}
                  value={cpc}
                  onChange={(event) => setCpc(event.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={4} xl={4} lg={4} md={4} sm={6}>
                <VTextField
                  fullWidth
                  name="COTITULAR"
                  label="Cotitular"
                  disabled={isLoading}
                  value={cotitular}
                  onChange={(event) => setCotitular(event.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={4} xl={4} lg={4} md={4} sm={6}>
                <VTextField
                  fullWidth
                  name="QREIVIND"
                  type="number"
                  label="Quantidade de reivindicações"
                  disabled={isLoading}
                  value={qreivind !== undefined ? qreivind.toString() : ""}
                  onChange={(event) => {
                    const value = event.target.value;
                    setQreivind(value !== "" ? Number(value) : undefined);
                  }}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={4} xl={4} lg={4} md={4} sm={6}>
                <AutoComplete />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={4} xl={4} lg={4} md={4} sm={6}>
                <VTextField
                  fullWidth
                  name="PROCESSO"
                  label="Processo"
                  disabled={isLoading}
                  value={processo}
                  onChange={(e) => setProcesso(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={4} xl={4} lg={4} md={4} sm={6}>
                <VTextField
                  fullWidth
                  name="CONCESSAO"
                  type="date"
                  label="Data concessão"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={isLoading}
                  value={inputDate2Value}
                  onChange={(e) => setInputDate2Value(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};

// <p>{ID}</p>;
