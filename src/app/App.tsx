import { BrowserRouter } from "react-router-dom";
import "./shared/forms/TraducoesYup";
import { AppRoutes } from "./routes";
import { Login, MenuLateral } from "./shared/components";
import { DrawerProvider } from "./shared/contexts";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import { AuthProvider } from "./shared/contexts/AuthContext";

export function App() {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter>
              <MenuLateral>
                <AppRoutes />
              </MenuLateral>
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
}
