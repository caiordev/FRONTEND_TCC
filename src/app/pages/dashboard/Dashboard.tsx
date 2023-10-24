import { FerramentasDaListagem } from "app/shared/components";
import { LayoutBaseDePagina } from "app/shared/layouts/LayoutBaseDePagina";

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      titulo="Página Inicial"
      barraDeFerramentas={
        <FerramentasDaListagem mostrarBotaoNovo={false} mostrarBotaoModal />
      }
    >
      Testando
    </LayoutBaseDePagina>
  );
};
