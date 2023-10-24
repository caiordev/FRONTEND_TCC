import { FerramentasDaListagem } from "app/shared/components";
import { LayoutBaseDePagina } from "app/shared/layouts";

export const TelaDeConsultas: React.FC = () => {
  return (
    <LayoutBaseDePagina
      titulo="Consultas"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoBotaoNovo="Pesquisar"
          mostrarInputData
          mostrarInputLista
          posicaoBotao="end"
        />
      }
    >
      Teste
    </LayoutBaseDePagina>
  );
};
