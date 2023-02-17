import React, { createContext, useContext, useReducer } from "react";
import { Patient, Diagnosis, Gender, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import axios from "axios";

import { Action } from "./reducer";
import { ActionTypes } from "@mui/base";

export type State = {
  entries: {[id: string]: Entry};
  statepatient: {[id: string]: Patient | undefined};
  patients: { [id: string]: Patient };
  diagnoses: { [code: string]: Diagnosis };
};

const initialState: State = {
  entries: {},
  statepatient: {},
  patients: {},
  diagnoses: {}
};


export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
