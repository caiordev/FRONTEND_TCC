import { FerramentasDeDetalhe } from "app/shared/components";
import { LayoutBaseDePagina } from "app/shared/layouts/LayoutBaseDePagina";

export const TelaDePatentes = () => {
  return (
    <LayoutBaseDePagina
      titulo="Cadastro De Patentes"
      barraDeFerramentas={<FerramentasDeDetalhe />}
    >
      Testando
    </LayoutBaseDePagina>
  );
};
