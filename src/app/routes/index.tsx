import { TelaDeConsultas, PaginaInicial } from "app/pages";
import { TelaDeDetalheDePatente } from "app/pages/patentes/TelaDeDetalheDePatente";
import { DetalhesDaPatente } from "app/shared/components/detalhes-da-patente/DetalhesDaPatente";
import { useDrawerContext } from "app/shared/contexts";
import { useAuthContext } from "app/shared/contexts/AuthContext";
import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();
  const { user } = useAuthContext(); // Adicione o uso do contexto de autenticação

  useEffect(() => {
    // Verificar se o tipo de usuário é "Usuário Comum"
    if (user?.TIPO !== "Usuário Comum") {
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
    } else {
      // Caso seja "Usuário Comum", definir opções de drawer sem o menu "Patentes"
      setDrawerOptions([
        {
          label: "Página Inicial",
          icon: "home",
          path: "/pagina-inicial",
        },
        {
          label: "Pesquisas",
          icon: "search",
          path: "/pesquisas",
        },
      ]);
    }
  }, [user]);

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
      <Route path="/patentes/detalhes/:ID" element={<DetalhesDaPatente />} />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
