/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Paper,
  useTheme,
  Autocomplete,
  TextField,
  Stack,
  Icon,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  Theme,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  LinearProgress,
} from "@mui/material";
import {
  IListagemPatente,
  PatenteService,
} from "app/shared/services/api/patente/PatenteService";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Form, useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "app/shared/hooks";
import { useDrawerContext } from "app/shared/contexts";
import { Environment } from "app/shared/environment";

const lista = [
  "Anulado",
  "Em Sigilo",
  "Arquivado",
  "Indeferido",
  "Deferido",
  "Concedido",
  "Extinta",
];

export const FerramentaDaPatente: React.FC = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const { toggleDrawerOpen } = useDrawerContext();
  const [searhParams, setSearchParams] = useSearchParams();
  const [label, setLabel] = useState("");
  const [resposta, setResposta] = useState("");
  const listaComOpcaoVazia = ["", ...lista];
  const [botaoClicado, setBotaoClicado] = useState(false);
  const [searchKey, setSearchKey] = useState(0);
  const [valueData1teste, setValueData1] = useState("");
  const [valueData2teste, setValueData2] = useState("");

  const [rows, setRows] = useState<IListagemPatente[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const { debounce } = useDebounce();
  const navigate = useNavigate();

  function formatarData(data: string | undefined): string | undefined {
    if (data !== undefined) {
      let partes = data.split("-");
      let ano = partes[0];
      let mes = partes[1];
      let dia = partes[2];
      return dia + "-" + mes + "-" + ano;
    }
  }

  const valueTitulo = useMemo(() => {
    return searhParams.get("TITULO") || "";
  }, [searhParams]);

  const valueProtocolo = useMemo(() => {
    return searhParams.get("PROTOCOLO") || "";
  }, [searhParams]);

  const valueData1 = useMemo(() => {
    return searhParams.get("DATA1") || "";
  }, [searhParams]);
  console.log(valueData1);

  const valueData2 = useMemo(() => {
    return searhParams.get("DATA2") || "";
  }, [searhParams]);
  console.log(valueData2);

  const handleInputTitulo = (texto: string) => {
    setSearchParams({ TITULO: texto });
  };
  const handleInputProtocolo = (texto: string) => {
    setSearchParams({ PROTOCOLO: texto });
  };

  const handleInputData1 = (texto: string) => {
    setValueData1(texto);
  };
  const handleInputData2 = (texto: string) => {
    setValueData2(texto);
  };

  const handleLabel = (texto: string) => {
    setLabel(texto);
  };

  const handleClickBuscar = () => {
    setBotaoClicado(true);
    setSearchKey((prevKey) => prevKey + 1);
  };

  const handleInputStatus = (texto: string | null) => {
    if (texto === null) {
      setResposta("");
    } else {
      setResposta(texto);
    }
  };
  useEffect(() => {
    setSearchParams({
      TITULO: valueTitulo,
      PROTOCOLO: valueProtocolo,
      STATUS: resposta,
      DATA1: valueData1teste,
      DATA2: valueData2teste,
    });
  }, [resposta, valueTitulo, valueProtocolo, valueData1teste, valueData2teste]);

  const tituloSelecionado = () => {
    if (label == "TITULO") {
      return true;
    } else {
      return false;
    }
  };
  const protocoloSelecionado = () => {
    if (label == "PROTOCOLO") {
      return true;
    } else {
      return false;
    }
  };

  const dataSelecionada = () => {
    if (label == "DATA") {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (botaoClicado) {
      debounce(() => {
        setIsLoading(true);
        PatenteService.getAllPatente(
          valueProtocolo,
          valueTitulo,
          resposta,
          valueData1teste,
          valueData2teste
        ).then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            console.log(result);
            setTotalCount(result.length);
            setRows(result);
          }
        });
      });
    }
  }, [botaoClicado, searchKey]);

  const handleDelete = (id: string) => {
    if (confirm("Realmente deseja apagar?")) {
      PatenteService.deleteByIdPatente(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows((oldRows) => {
            return [
              ...oldRows.filter((oldRow) => {
                oldRow.ID !== id;
              }),
            ];
          });
          alert("Registro apagado com sucesso");
        }
      });
    }
  };

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        display="flex"
        alignItems="center"
        padding={1}
        gap={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography
          variant={smDown ? "h5" : mdDown ? "h4" : "h3"}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          Consulta de Patentes
        </Typography>
      </Box>
      <Box
        height={theme.spacing(5)}
        marginX={1}
        padding={1}
        paddingX={2}
        display="flex"
        gap={1}
        alignItems="center"
        component={Paper}
      >
        <Box display="flex" justifyContent="start" gap={1} flex={1}>
          <Stack
            spacing={4}
            sx={{ width: "200px" }}
            display="flex"
            justifyContent="center"
          >
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">Filtro</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={label}
                label="Age"
                onChange={(e) => handleLabel(e.target.value)}
              >
                <MenuItem value="TITULO">Título</MenuItem>
                <MenuItem value="PROTOCOLO">Protocolo</MenuItem>
                <MenuItem value="DATA">Data de depósito</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {tituloSelecionado() && (
            <TextField
              size="small"
              value={valueTitulo}
              onChange={(e) => handleInputTitulo(e.target.value)}
            />
          )}

          {protocoloSelecionado() && (
            <TextField
              size="small"
              type="number"
              value={valueProtocolo}
              onChange={(e) => handleInputProtocolo(e.target.value)}
            />
          )}

          {dataSelecionada() && (
            <TextField
              size="small"
              type="date"
              value={valueData1teste}
              onChange={(e) => handleInputData1(e.target.value)}
            />
          )}
          {dataSelecionada() && (
            <TextField
              size="small"
              type="date"
              value={valueData2teste}
              onChange={(e) => handleInputData2(e.target.value)}
            />
          )}

          <Stack
            spacing={4}
            sx={{ width: "200px" }}
            display="flex"
            justifyContent="center"
          >
            <Autocomplete
              size="small"
              options={listaComOpcaoVazia}
              value={resposta}
              onChange={(event: any, newValue: string | null) =>
                handleInputStatus(newValue)
              }
              renderInput={(params) => <TextField {...params} label="status" />}
            />
          </Stack>
        </Box>
        <Button
          color="primary"
          variant="contained"
          startIcon={<Icon>save</Icon>}
          onClick={handleClickBuscar}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Buscar
          </Typography>
        </Button>
      </Box>
      <Box flex={1} sx={{ overflowX: "hidden", overflowY: "auto", m: 1 }}>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Protocolo</TableCell>
                <TableCell>Depósito</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.ID}>
                  <TableCell>{row.PROTOCOLO}</TableCell>
                  <TableCell>{formatarData(row.DEPOSITO)}</TableCell>
                  <TableCell>{row.STATUS}</TableCell>
                  <TableCell>{row.TITULO}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(row.ID)}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/patentes/detalhe/${row.ID}`)}
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {totalCount === 0 && !isLoading && (
              <caption> {Environment.LISTAGEM_VAZIA}</caption>
            )}
            <TableFooter>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <LinearProgress variant="indeterminate" />
                  </TableCell>
                </TableRow>
              )}
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
function usecallback(arg0: (texto: string) => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
