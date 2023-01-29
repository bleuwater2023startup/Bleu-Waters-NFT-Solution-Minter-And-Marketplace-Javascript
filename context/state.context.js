import { createContext, useEffect, useReducer } from "react";
import { INITIAL_STATE, reducer } from "./state.reducer";

export const StateContext = createContext();

const StateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    if (Object.keys(state.ipfsData).length) {
      window.localStorage.setItem("ipfs_data", JSON.stringify(state.ipfsData));
    }
  }, [state.ipfsData]);

  return (
    <StateContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
