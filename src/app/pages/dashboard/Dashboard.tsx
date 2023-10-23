import { FerramentasDaListagem } from "app/shared/components";
import { LayoutBaseDePagina } from "app/shared/layouts/LayoutBaseDePagina";

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      titulo="Página Inicial"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca={true}
          textoBotaoNovo="Nova"
          textoDaBusca=""
        />
      }
    >
      Testando
    </LayoutBaseDePagina>
  );
};
