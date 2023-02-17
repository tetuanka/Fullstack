import { NewPatient, Gender, Entry, NewEntry } from './types';

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: Entry[] };

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries } : Fields ): NewPatient => {
  const newPatient: NewPatient = {
      name: parseName(name),
      dateOfBirth: parseDate(dateOfBirth),
      ssn: parseSsn(ssn),
      gender: parseGender(gender),
      occupation: parseOccupation(occupation),
      entries: entries
  };
return newPatient;
};

type Fields2 = { date: unknown, type: unknown, specialist: unknown, description: unknown, diagnosisCodes: string[], employerName: unknown, healthCheckRating: number, discharge: { date: string; criteria: string; }, sickLeave: { startDate: string; endDate: string; }}

export const toNewEntry = ({ date, type, specialist, description, diagnosisCodes, employerName, healthCheckRating, discharge, sickLeave } : Fields2 ): NewEntry => {
    let newEntry: NewEntry = { date: '', type: 'HealthCheck', specialist: '', description: '', diagnosisCodes: [], healthCheckRating: 0 };
    //not supported at this time
    if(type==="OccupationalHealthcare"){ 
      newEntry = {
        date: parseDate(date),
        type: type,
        specialist: parseSpecialist(specialist),
        description: parseDescription(description),
        diagnosisCodes: diagnosisCodes,
        employerName: parseName(employerName),
        sickLeave: sickLeave
      };
    }  
    if(type==="Hospital"){ 
        newEntry = {
          date: parseDate(date),
          type: type,
          specialist: parseSpecialist(specialist),
          description: parseDescription(description),
          diagnosisCodes: diagnosisCodes,
          discharge: {
            date: parseDate(discharge.date),
            criteria: parseCriteria(discharge.criteria)
          }
        };
      }   
    //not supported at this time
    if(type==="HealthCheck"){ 
        newEntry = {
          date: parseDate(date),
          type: type,
          specialist: parseSpecialist(specialist),
          description: parseDescription(description),
          diagnosisCodes: diagnosisCodes,
          healthCheckRating: healthCheckRating
        };
      } 
return newEntry;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string';
  } 

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
  };

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
    return name;
};
  
const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn) ) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation) ) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist) ) {
        throw new Error('Incorrect or missing specialist: ' + specialist);
    }
    return specialist;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria) ) {
      throw new Error('Incorrect or missing criteria: ' + criteria);
  }
  return criteria;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description) ) {
        throw new Error('Incorrect or missing description: ' + description);
    }
    return description;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

