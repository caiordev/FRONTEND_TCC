import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { ModalUser } from "app/shared/components/modal-de-usuario/ModalUser";
import { useAuthContext } from "app/shared/contexts/AuthContext";
import { LayoutBaseDePagina } from "app/shared/layouts/LayoutBaseDePagina";
import {
  IListagemPatente,
  PatenteService,
} from "app/shared/services/api/patente/PatenteService";
import { useEffect, useState } from "react";

export const PaginaInicial = () => {
  const [isLoadingPatentes, setIsLoadingPatentes] = useState(false);
  const [patente, setPatente] = useState<IListagemPatente[]>([]);
  const { user } = useAuthContext();
  useEffect(() => {
    setIsLoadingPatentes(true);
    PatenteService.getAllPatente().then((result) => {
      setIsLoadingPatentes(false);
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setPatente(result);
      }
    });
  }, []);

  return (
    <LayoutBaseDePagina
      titulo="Página Inicial"
      barraDeFerramentas={
        user?.TIPO !== "Usuário Comum" &&
        user?.TIPO !== "Servidor" && <ModalUser />
      }
    >
      <Box width="100%" display="flex">
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de Patentes
                  </Typography>
                  <Box
                    padding={6}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {!isLoadingPatentes && (
                      <Typography variant="h1">{patente?.length}</Typography>
                    )}
                    {isLoadingPatentes && (
                      <Typography variant="h1">Carregando...</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  {" "}
                  <Typography variant="h5" align="center">
                    Notícias
                  </Typography>
                  <Box
                    padding={6}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="h1">card...</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};
