import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  IDetalhePatente,
  PatenteService,
} from "app/shared/services/api/patente/PatenteService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const DetalhesDaPatente: React.FC = () => {
  const [row, setRow] = useState<IDetalhePatente>();
  const { ID = "" } = useParams<"ID">();

  useEffect(() => {
    PatenteService.getByIdPatente(ID).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setRow(result);
      }
    });
  }, [ID]);
  return (
    <Box>
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Protocolo</TableCell>
              <TableCell>Natureza</TableCell>
              <TableCell>Data de depósito</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Inventores</TableCell>
              <TableCell>Ipc</TableCell>
              <TableCell>Cpc</TableCell>
              <TableCell>Cotitular</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Processo</TableCell>
              <TableCell>Data de concessão</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={row?.ID}>
              <TableCell>{row?.PROTOCOLO}</TableCell>
              <TableCell>{row?.NATUREZA}</TableCell>
              <TableCell>{row?.DEPOSITO}</TableCell>
              <TableCell>{row?.TITULO}</TableCell>
              <TableCell>{row?.INVENTORES}</TableCell>
              <TableCell>{row?.IPC}</TableCell>
              <TableCell>{row?.CPC}</TableCell>
              <TableCell>{row?.COTITULAR}</TableCell>
              <TableCell>{row?.STATUS}</TableCell>
              <TableCell>{row?.PROCESSO}</TableCell>
              <TableCell>{row?.CONCESSAO}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
