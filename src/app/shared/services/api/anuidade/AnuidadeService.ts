import { Api } from "../axios-config";

export interface IDetalheAnuidade {
  ID?: string;
  ID_PATENTE: string;
  DATAORD1: string;
  DATAORD2: string;
  CODIGOORD: number;
  VALORORD: number;
  DATAPAGAMENTOORD: string;
  PROCESSOSEI: number;
  STATUS: string;
}

export interface IListagemAnuidade {
  ID: string;
  ID_PATENTE: string;
  DATAORD1: string;
  DATAORD2: string;
  CODIGOORD: number;
  VALORORD: number;
  DATAPAGAMENTOORD: string;
  PROCESSOSEI: number;
  STATUS: string;
}

// const getAllPatente = async (
//   protocolo = "",
//   titulo = "",
//   status = "",
//   data1 = "",
//   data2 = ""
// ): Promise<IListagemPatente[] | Error> => {
//   try {
//     const { data } = await Api.get(
//       `/consultaPatente?PROTOCOLO=${protocolo}&TITULO=${titulo}&STATUS=${status}&DEPOSITO1=${data1}&DEPOSITO2=${data2}`
//     );
//     if (data) {
//       return data;
//     }

//     return new Error("Error ao listar as patentes");
//   } catch (error) {
//     console.error(error);
//     return new Error(
//       (error as { message: string }).message || "Error ao listar as patentes"
//     );
//   }
// };

// const getByIdPatente = async (ID: string): Promise<IDetalhePatente | Error> => {
//   try {
//     const { data } = await Api.get(`/patente/${ID}`);
//     if (data) {
//       return data;
//     }
//     return new Error("Error ao consultar a patente");
//   } catch (error) {
//     console.error(error);
//     return new Error(
//       (error as { message: string }).message || "Error ao consultar a patente"
//     );
//   }
// };

// const getByPatentePatente = async (
//   PROTOCOLO: string
// ): Promise<IDetalhePatente | Error> => {
//   try {
//     const { data } = await Api.get(`/patente/${PROTOCOLO}`);
//     if (data) {
//       return data;
//     }
//     return new Error("Error ao consultar a patente");
//   } catch (error) {
//     console.error(error);
//     return new Error(
//       (error as { message: string }).message || "Error ao consultar a patente"
//     );
//   }
// };

const createAnuidade = async (
  dados: Omit<IDetalheAnuidade, "ID">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheAnuidade>("/anuidade", dados);
    if (data) {
      return Number(data.ID);
    }
    return new Error("Erro ao cadastrar a anuidade");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Error ao cadastrar a anuidade"
    );
  }
};

// const updateByIdPatente = async (
//   ID: string,
//   dados: IDetalhePatente
// ): Promise<void | Error> => {
//   try {
//     await Api.put(`/patente/${ID}`, dados);
//   } catch (error) {
//     console.error(error);
//     return new Error(
//       (error as { message: string }).message || "Error as alterar a patente"
//     );
//   }
// };

// const deleteByIdPatente = async (ID: string): Promise<void | Error> => {
//   try {
//     await Api.delete(`/patente/${ID}`);
//   } catch (error) {
//     console.error(error);
//     return new Error(
//       (error as { message: string }).message || "Erro a deletar"
//     );
//   }
// };

//const consultaPatente = async (): Promise<any> => {};

export const AnuidadeService = {
  createAnuidade,
};
