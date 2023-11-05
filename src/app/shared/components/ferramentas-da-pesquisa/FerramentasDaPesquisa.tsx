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
} from "@mui/material";

import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const lista = [
  "Anulado",
  "Em Sigilo",
  "Arquivado",
  "Indeferido",
  "Deferido",
  "Concedido",
  "Extinta",
];

export const FerramentaDaPesquisa: React.FC = () => {
  const theme = useTheme();
  const [searhParams, setSearchParams] = useSearchParams();
  const [dataSelecionada, setDataSelecionada] = useState("");
  const busca = useMemo(() => {
    return searhParams.get("busca") || "";
  }, [searhParams]);
  return (
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
          <Autocomplete
            size="small"
            options={lista}
            renderInput={(params) => <TextField {...params} label="status" />}
          />
        </Stack>
        <Stack spacing={3}>
          <TextField
            size="small"
            type="date"
            value={dataSelecionada}
            onChange={(e) => setDataSelecionada(e.target.value)}
          />
        </Stack>

        <Stack
          spacing={4}
          sx={{ width: "200px" }}
          display="flex"
          justifyContent="center"
        >
          <Autocomplete
            size="small"
            options={lista}
            renderInput={(params) => <TextField {...params} label="status" />}
          />
        </Stack>
      </Box>
      <Button color="primary" variant="contained" startIcon={<Icon>save</Icon>}>
        <Typography
          variant="button"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          overflow="hidden"
        >
          Salvar
        </Typography>
      </Button>
    </Box>
  );
};
