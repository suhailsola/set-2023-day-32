import { CookiesProvider, useCookies } from "react-cookie";
import Routes from "./Routes";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

function App() {
  const [cookies, setCookie] = useCookies(["jwt"]);
  const [jwt, setJwt] = useState(null);
  const setJwtCookie = (jwt) => setCookie("jwt", jwt);

  useEffect(() => {
    if (jwt) {
      setJwtCookie( jwt);
    }
  }, [jwt]);

  useEffect(() => {
    if (cookies?.jwt) {
      setJwt(cookies.jwt);
    }
  }, [cookies?.jwt]);

  return (
    <AuthContext.Provider
      value={{ jwt, setJwt, cookies, setCookie, setJwtCookie }}
    >
      <CookiesProvider>
        <Routes />
      </CookiesProvider>
    </AuthContext.Provider>
  );
}

AuthContext.displayName = "AuthContext";
export default App;
