import { Api } from "../axios-config";

export interface IDetalheUsuario {
  ID?: string;
  NOME: string;
  EMAIL: string;
  SENHA: string;
  TIPO: string;
}

const getByIdUsuario = async (ID: string): Promise<IDetalheUsuario | Error> => {
  try {
    const { data } = await Api.get(`/user/${ID}`);
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

const createUsuario = async (
  dados: Omit<IDetalheUsuario, "ID">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheUsuario>("/user", dados);
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

const updateByIdUsuario = async (
  ID: string,
  dados: IDetalheUsuario
): Promise<void | Error> => {
  try {
    await Api.put(`/user/${ID}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Error as alterar a patente"
    );
  }
};

const deleteByIdUsuario = async (ID: string): Promise<void | Error> => {
  try {
    await Api.delete(`/user/${ID}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro a deletar"
    );
  }
};

//const consultaPatente = async (): Promise<any> => {};

export const UsuarioService = {
  createUsuario,
  getByIdUsuario,
  updateByIdUsuario,
  deleteByIdUsuario,
};
