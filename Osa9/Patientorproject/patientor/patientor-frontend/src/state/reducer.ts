import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: Entry;
    }
  | {
      type: "SHOW_PATIENT";
      payload: Patient;
    }  
  | {
      type: "LIST_DIAGNOSES";
      payload: Diagnosis[];
    }
  | {
      type: "LIST_ENTRIES";
      payload: Entry[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };

    case 'SHOW_PATIENT':
      return {
        ...state,
        statepatient: {
           [action.payload.id]: action.payload
          }
      };


    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };

      case 'ADD_ENTRY':
        return {
          ...state,
          entries: {
            ...state.entries, 
            [action.payload.id]: action.payload
          }
        };


      case 'LIST_DIAGNOSES':
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
              {}
            ),
            ...state.diagnoses
          }
        };

        case 'LIST_ENTRIES':
          return {
            ...state,
            entries: {
              ...action.payload.reduce(
                (memo, entries) => ({ ...memo, [entries.id]: entries }),
                {}
              ),
              ...state.entries
            }
          };
        
    default:
      return state;
  }
};


export const setPatientList = (patientList: Patient[]): Action => {
  return { 
    type: "SET_PATIENT_LIST",
    payload: patientList
  }
};

export const showPatient = (patient: Patient): Action => {
  return { 
    type: "SHOW_PATIENT",
    payload: patient
  }
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return { 
    type: "LIST_DIAGNOSES",
    payload: diagnoses
  }
};