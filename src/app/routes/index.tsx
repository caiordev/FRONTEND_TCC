import { Dashboard, TelaDeConsultas } from "app/pages";
import { TelaDePatentes } from "app/pages/patentes/TelaDePatentes";
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
        icon: "description",
        path: "/patentes",
      },
      {
        label: "Pesquisas",
        icon: "search",
        path: "/pesquisas",
      },
    ]);
  }, []);
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/pesquisas" element={<TelaDeConsultas />} />
      <Route path="/patentes" element={<TelaDePatentes />} />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
