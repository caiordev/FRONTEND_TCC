import { ModalUser } from "app/shared/components/modal-de-usuario/ModalUser";
import { LayoutBaseDePagina } from "app/shared/layouts/LayoutBaseDePagina";

export const PaginaInicial = () => {
  return (
    <LayoutBaseDePagina
      titulo="Página Inicial"
      barraDeFerramentas={<ModalUser />}
    >
      Testando
    </LayoutBaseDePagina>
  );
};
