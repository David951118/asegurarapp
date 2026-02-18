import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [someState, setSomeState] = useState("initial value");
  const [placas, setPlacas] = useState([]);

  return (
    <GlobalContext.Provider
      value={{ someState, setSomeState, placas, setPlacas }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
