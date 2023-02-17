export interface Diagnose {
    code: string,
    name: string,
    latin?: string
};

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
};

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
  }

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}
  
interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string
    }
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string,
    sickLeave?: {
        startDate: string;
        endDate: string
    }
}

export enum Type {
  HealthCheck = "HealthCheck",
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare"
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewPatient = Omit<Patient, 'id'>;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type NewEntry = UnionOmit<Entry, 'id'>;

//export type NewEntry = Omit< Entry, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other',
  }