import { createContext, useEffect, useReducer, useRef } from "react";
import { INITIAL_STATE, reducer } from "./state.reducer";

export const StateContext = createContext();

const StateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const domMountRef = useRef(0);

  useEffect(() => {
    if (Object.keys(state.ipfsData).length) {
      window.localStorage.setItem("ipfs_data", JSON.stringify(state.ipfsData));
    }
  }, [state.ipfsData]);

  useEffect(() => {
    const initialState = JSON.stringify(INITIAL_STATE.mintData);
    const currentState = JSON.stringify(state.mintData);
    if (initialState !== currentState || domMountRef.current >= 2) {
      window.localStorage.setItem("mint_data", JSON.stringify(state.mintData));
    }
  }, [state.mintData]);

  useEffect(() => {
    domMountRef.current += 1;
    console.log({ domMountRef });
  }, []);

  return <StateContext.Provider value={{ ...state, dispatch }}>{children}</StateContext.Provider>;
};

export default StateContextProvider;
