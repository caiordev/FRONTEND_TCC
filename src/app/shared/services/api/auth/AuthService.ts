import { Api } from "../axios-config";

interface IAuth {
  accessToken: string;
  user: IUser;
}

interface IUser {
  EMAIL: string;
  ID: string;
  NOME: string;
  TIPO: string;
}

const auth = async (
  email: string,
  password: string
): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.post("/login", {
      EMAIL: email,
      SENHA: password,
    });

    if (data) {
      return data;
    }

    return new Error("Erro no login");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Error no login."
    );
  }
};

export const AuthService = {
  auth,
};
