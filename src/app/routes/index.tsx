import { Dashboard, TelaConsulta2 } from "app/pages";
import { useDrawerContext } from "app/shared/contexts";
import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();
  useEffect(() => {
    setDrawerOptions([
      {
        label: "Página Inicial",
        icon: "home",
        path: "/pagina-inicial",
      },
      {
        label: "Patentes",
        icon: "star",
        path: "/patentes",
      },
    ]);
  }, []);
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/pesquisa" element={<TelaConsulta2 />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
