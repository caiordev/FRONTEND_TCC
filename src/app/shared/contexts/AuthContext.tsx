import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthService } from "../services/api/auth/AuthService";

interface IUser {
  EMAIL: string;
  ID: string;
  NOME: string;
  TIPO: string;
}

interface IAuthContextData {
  isAuthenticated: boolean;
  user: IUser | null;
  login: (email: string, password: string) => Promise<string | void>;
  logout: () => void;
}

const AuthContext = createContext({} as IAuthContextData);
const LOCAL_STORAGE_KEY_ACCESS_TOKEN = "APP_ACCESS_TOKEN";

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<{
    token?: string;
    user?: IUser;
  }>({});

  useEffect(() => {
    const storedAccessToken = localStorage.getItem(
      LOCAL_STORAGE_KEY_ACCESS_TOKEN
    );
    if (storedAccessToken) {
      setAccessToken(JSON.parse(storedAccessToken));
    } else {
      setAccessToken({});
    }
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);
    console.log("result: ", result);
    if (result instanceof Error) {
      return result.message;
    } else {
      localStorage.setItem(
        LOCAL_STORAGE_KEY_ACCESS_TOKEN,
        JSON.stringify(result)
      );
      setAccessToken(result);
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
    setAccessToken({});
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken.token, [accessToken.token]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user: accessToken.user || null,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
