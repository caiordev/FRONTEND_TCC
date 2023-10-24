import { Button, Divider, Icon, Paper, useTheme } from "@mui/material";
import { Box } from "@mui/system";

export const FerramentasDeDetalhe: React.FC = () => {
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
      <Button color="primary" variant="contained" startIcon={<Icon>save</Icon>}>
        Salvar
      </Button>

      <Button color="primary" variant="outlined" startIcon={<Icon>save</Icon>}>
        Salvar e Voltar
      </Button>
      <Button
        color="primary"
        variant="outlined"
        startIcon={<Icon>delete</Icon>}
      >
        Apagar
      </Button>
      <Button color="primary" variant="outlined" startIcon={<Icon>add</Icon>}>
        Novo
      </Button>
      <Divider variant="middle" orientation="vertical" />
      <Button
        color="primary"
        variant="outlined"
        startIcon={<Icon>arrow_back</Icon>}
      >
        Voltar
      </Button>
    </Box>
  );
};
