import { Button } from "@mui/material";
import { TelaConsulta2 } from "app/pages";
import { useAppThemeContext } from "app/shared/contexts/ThemeContext";
import { Route, Routes, Navigate } from "react-router-dom";

export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext();
  return (
    <Routes>
      <Route
        path="/pagina-inicial"
        element={
          <Button variant="contained" color="primary" onClick={toggleTheme}>
            Teste
          </Button>
        }
      />
      <Route path="/pesquisa" element={<TelaConsulta2 />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
