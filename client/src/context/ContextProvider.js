import { createContext, useReducer, useEffect } from "react";
import reducer from "./reducer";

const initialState = {
  currentUser: null,
  // openLogin: false,
  profile: { open: false, file: null, photoUrl: "" },
  alert: { open: false, severity: "info", message: "" },
  loading: false,
  users: [],
  contacts: [],
  contactsCategory: [],
  updateForm: false,
};

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      dispatch({ type: "UPDATE_USER", payload: currentUser });
    }
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default Context;
