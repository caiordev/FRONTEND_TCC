import { Api } from "../axios-config";

export interface IDetalhePatente {
  ID?: string;
  PROTOCOLO: string;
  NATUREZA: string;
  DEPOSITO?: string;
  TITULO: string;
  INVENTORES: string;
  IPC?: string;
  CPC?: string;
  COTITULAR: string;
  QREIVIND: number;
  STATUS?: string;
  PROCESSO: string;
  CONCESSAO?: string;
}

export interface IListagemPatente {
  ID: string;
  PROTOCOLO: string;
  NATUREZA: string;
  DEPOSITO?: string;
  TITULO: string;
  INVENTORES: string;
  IPC?: string;
  CPC?: string;
  COTITULAR: string;
  QREIVIND: number;
  STATUS?: string;
  PROCESSO: string;
  CONCESSAO?: string;
}

const getAllPatente = async (
  protocolo = "",
  titulo = "",
  status = "",
  data1 = "",
  data2 = ""
): Promise<IListagemPatente[] | Error> => {
  try {
    const { data } = await Api.get(
      `/consultaPatente?PROTOCOLO=${protocolo}&TITULO=${titulo}&STATUS=${status}&DEPOSITO1=${data1}&DEPOSITO2=${data2}`
    );
    if (data) {
      return data;
    }

    return new Error("Error ao listar as patentes");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Error ao listar as patentes"
    );
  }
};

const getByIdPatente = async (ID: string): Promise<IDetalhePatente | Error> => {
  try {
    const { data } = await Api.get(`/patente/${ID}`);
    if (data) {
      return data;
    }
    return new Error("Error ao consultar a patente");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Error ao consultar a patente"
    );
  }
};

const getByPatentePatente = async (
  PROTOCOLO: string
): Promise<IDetalhePatente | Error> => {
  try {
    const { data } = await Api.get(`/patente/${PROTOCOLO}`);
    if (data) {
      return data;
    }
    return new Error("deu erro nessa merda aqui");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "deu erro nessa merda aqui"
    );
  }
};

const createPatente = async (
  dados: Omit<IDetalhePatente, "ID">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalhePatente>("/patente", dados);
    if (data) {
      return Number(data.ID);
    }
    return new Error("Erro ao cadastrar a patente");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Error ao cadastrar a patente"
    );
  }
};

const updateByIdPatente = async (
  ID: string,
  dados: IDetalhePatente
): Promise<void | Error> => {
  try {
    await Api.put(`/patente/${ID}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Error as alterar a patente"
    );
  }
};

const deleteByIdPatente = async (ID: string): Promise<void | Error> => {
  try {
    await Api.delete(`/patente/${ID}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro a deletar"
    );
  }
};

//const consultaPatente = async (): Promise<any> => {};

export const PatenteService = {
  getAllPatente,
  createPatente,
  getByIdPatente,
  getByPatentePatente,
  updateByIdPatente,
  deleteByIdPatente,
};
