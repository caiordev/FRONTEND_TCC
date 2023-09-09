/* eslint-disable @typescript-eslint/no-explicit-any */
import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";

interface ITarefa {
  id: number;
  title: string;
  isCompleted: boolean;
}

const getAll = async (): Promise<ITarefa[] | ApiException> => {
  try {
    const { data } = await Api().get("/patente");
    return data;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao consultar a API");
  }
};

const getById = async (id: number): Promise<ITarefa | ApiException> => {
  try {
    const { data } = await Api().get(`/patente/${id}`);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao consultar a API");
  }
};
const create = async (
  dataToCreate: Omit<ITarefa, "id">
): Promise<ITarefa | ApiException> => {
  try {
    const { data } = await Api().post("/patente", dataToCreate);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao criar o registro");
  }
};
const updateById = async (
  id: number,
  dataToUpdate: ITarefa
): Promise<ITarefa | ApiException> => {
  try {
    const { data } = await Api().put(`/patente/${id}`, dataToUpdate);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao atualizar o registro");
  }
};
const deleteById = async (id: number): Promise<undefined | ApiException> => {
  try {
    await Api().delete(`/patente/${id}`);
    return undefined;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao apagar o registro");
  }
};

export const PatentesService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
