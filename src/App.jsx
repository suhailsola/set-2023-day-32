import { CookiesProvider, useCookies } from "react-cookie";
import Routes from "./Routes";
import { createContext } from "react";

export const AuthContext = createContext(null);

function App() {
  const [cookies, setCookie] = useCookies(["jwt"]);
  const setJwtCookie = (jwt) => setCookie("jwt", jwt);
  const jwtCookie = cookies?.jwt;

  return (
    <AuthContext.Provider value={{ jwtCookie, setJwtCookie }}>
      <CookiesProvider>
        <Routes />
      </CookiesProvider>
    </AuthContext.Provider>
  );
}

AuthContext.displayName = "AuthContext";
export default App;
