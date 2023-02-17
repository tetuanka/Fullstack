
import patients2 from '../../data/patients';
import {  Gender, NewPatient, NonSensitivePatient, Patient, PublicPatient, Entry, NewEntry } from '../types';
import { v1 as uuid } from 'uuid'


const patients: Array<Patient> = patients2 as Array<Patient>;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatients = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
      }));
    };

const getPatient = (id: string): NonSensitivePatient => {
  for(let i=0; i<patients.length; i++){
    if(patients[i].id===id)
    return patients[i]
  }
  return {id:'', name:'', dateOfBirth:'', gender: Gender.Other, occupation:'', entries: []}
    };

const getPatientEntries = (id: string): Entry[] => {
      const emptyEntry: Entry[] = [{id:'',description:'', date:'', specialist:'', type:'Hospital', discharge: {date: '', criteria:''}}]
      for(let i=0; i<patients.length; i++){
        if(patients[i].id===id)
        return patients[i].entries
      }
      return emptyEntry
        };

const addPatient = ( patient: NewPatient ): Patient => {
    const newPatient = {
      id: uuid(),
      ...patient
    };  
    patients.push(newPatient);
    return newPatient;
};

const addEntry = ( pid: string,  entry: NewEntry ): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  for(let i=0; i<patients.length; i++){
    if(patients[i].id===pid){
      patients[i].entries.push(newEntry)
    }
  }
  return newEntry;
};
  

export default {
  getPatients,
  getPatient,
  addPatient,
  addEntry,
  getNonSensitivePatients,
  getPatientEntries
};