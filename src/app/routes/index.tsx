import { Button } from "@mui/material";
import { Login } from "app/pages/login/Login";
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
      <Route path="/entrar" element={<Login />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
