import { CookiesProvider, useCookies } from "react-cookie";
import Routes from "./Routes";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

function App() {
  const [cookies, setCookie] = useCookies(["jwt"]);
  const setJwtCookie = (jwt) => setCookie("jwt", jwt);
  const jwtCookie = cookies?.jwt;
  const [username, setUsername] = useState("");

  return (
    <AuthContext.Provider
      value={{ jwtCookie, setJwtCookie, setUsername, username }}
    >
      <CookiesProvider>
        <Routes />
      </CookiesProvider>
    </AuthContext.Provider>
  );
}

AuthContext.displayName = "AuthContext";
export default App;
