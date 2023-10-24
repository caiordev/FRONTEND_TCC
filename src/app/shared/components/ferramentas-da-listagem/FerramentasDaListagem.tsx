import { AccountCircle } from "@mui/icons-material";
import {
  TextField,
  Button,
  Paper,
  useTheme,
  InputAdornment,
  Icon,
} from "@mui/material";
import { Box } from "@mui/system";
import { ModalUser } from "../modal/ModalUser";

interface IFerramentasDaListagemProps {
  textoDaBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  textoDaData?: string;
  mostrarInputData?: boolean;
  aoMudarTextoDaData?: (novoTexto: string) => void;
  textoDaLista?: string;
  mostrarInputLista?: boolean;
  aoMudarTextoDaLista?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;
  posicaoBotao?: string;
  mostrarBotaoModal?: boolean;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
  textoDaBusca = "",
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  textoDaData = "",
  mostrarInputData = false,
  aoMudarTextoDaData,
  textoDaLista = "",
  mostrarInputLista = false,
  aoMudarTextoDaLista,
  textoBotaoNovo = "Novo",
  mostrarBotaoNovo = true,
  aoClicarEmNovo,
  posicaoBotao = "end",
  mostrarBotaoModal = false,
}) => {
  const theme = useTheme();
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
      <Box display="flex" justifyContent="start" gap={1}>
        {mostrarInputBusca && (
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="small"
            placeholder="Pesquisar..."
            value={textoDaBusca}
            onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
          />
        )}
        {mostrarInputData && (
          <TextField
            variant="outlined"
            size="small"
            placeholder="Pesquisar..."
            type="date"
            value={textoDaData}
            onChange={(e) => aoMudarTextoDaData?.(e.target.value)}
          />
        )}

        {mostrarInputLista && (
          <TextField
            variant="outlined"
            size="small"
            placeholder="Pesquisar..."
            type="tel"
            value={textoDaLista}
            onChange={(e) => aoMudarTextoDaLista?.(e.target.value)}
          />
        )}
      </Box>
      <Box display="flex" justifyContent={posicaoBotao} flex={1}>
        {mostrarBotaoNovo && (
          <Button
            color="primary"
            variant="contained"
            endIcon={<Icon>add</Icon>}
            onClick={aoClicarEmNovo}
          >
            {textoBotaoNovo}
          </Button>
        )}
      </Box>
      {mostrarBotaoModal && (
        <Box display="flex" justifyContent="start">
          <ModalUser />
        </Box>
      )}
    </Box>
  );
};
