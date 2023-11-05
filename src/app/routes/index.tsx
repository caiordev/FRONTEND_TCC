import { TelaDeConsultas, PaginaInicial } from "app/pages";
import { TelaDeDetalheDePatente } from "app/pages/patentes/TelaDeDetalheDePatente";
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
        path: "/patentes/detalhe/nova",
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
      <Route path="/pagina-inicial" element={<PaginaInicial />} />

      <Route path="/pesquisas" element={<TelaDeConsultas />} />

      <Route
        path="/patentes/detalhe/:ID"
        element={<TelaDeDetalheDePatente />}
      />
      <Route
        path="/patentes/detalhe/nova"
        element={<TelaDeDetalheDePatente />}
      />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
