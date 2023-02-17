import React from "react";
import axios from "axios";
import { Box, Table, Button, TableHead, Typography } from "@material-ui/core";
import { BrowserRouter as Route, Link, Routes, useParams } from "react-router-dom";
import { Divider, Container } from "@material-ui/core";
import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";
import { Patient, Entry, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue } from "../state";
import { TableCell } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { TableBody } from "@material-ui/core";
import { showPatient } from "../state"

import Frame from 'react-frame-component';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';


import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { pink, yellow, green, lightBlue, red, orange } from "@material-ui/core/colors";


const PatientListPage = () => {

  const [{ patients, diagnoses, statepatient, entries }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const [entryModalOpen, setEntryModalOpen] = React.useState<boolean>(false);
  const openEntryModal = (): void => setEntryModalOpen(true);
  const closeEntryModal = (): void => {
    setEntryModalOpen(false);
    setError(undefined);
  };


  const [patientOpen, setPatientOpen] = React.useState<boolean>(false);

  const openPatient = (id: string): void => {
    setPatientOpen(true);
      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(showPatient(patientFromApi))
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatient();

      const fetchEntries = async () => {
        try {
          const { data: entriesFromApi } = await axios.get<Entry[]>(
            `${apiBaseUrl}/patients/${id}/entries`
          );
          dispatch({ type: "LIST_ENTRIES", payload: entriesFromApi });
        } catch (e) {
          console.error(e);
        }
      };
      void fetchEntries();
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        values
      );
      dispatch({ type: "ADD_PATIENT", payload: newPatient });
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    let id = ""
    let patid = Object.values(statepatient)[0]
    if(patid!=undefined) {id = patid.id}
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch({ type: "ADD_ENTRY", payload: newEntry });
      closeEntryModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntry {...entry}></HospitalEntry>
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntry {...entry}></OccupationalHealthcareEntry>
      case "HealthCheck":
        return <HealthCheckEntry {...entry}></HealthCheckEntry>
      default:
        return assertNever(entry)
    }
  }

  const HospitalEntry = (entry: Entry) => {
    const diagnoseName = (code: string) => { 
      const diagnoosit = Object.values(diagnoses)
      for(let i=0; i<diagnoosit.length; i++){
        if(diagnoosit[i].code===code){
          return diagnoosit[i].name
        }
      }
      return ""
    }
    if(entry.type==="Hospital"){
    return (
      <div key={entry.id}> 
        <p>{entry.date} <LocalHospitalIcon /></p>
        <i>{entry.description}</i>
        <p>diagnose by {entry.specialist}</p>
        <p>{entry.discharge.date} {entry.discharge.criteria}</p>
           {entry.diagnosisCodes?.map((code: Diagnosis['code']) => (
        <ul key={code}>
          <li>{code} {diagnoseName(code)}</li>
        </ul>
       ))}
       </div>
        )} 
        else return(<div></div>)
  }

  const OccupationalHealthcareEntry = (entry: Entry) => {
    const diagnoseName = (code: string) => { 
      const diagnoosit = Object.values(diagnoses)
      for(let i=0; i<diagnoosit.length; i++){
        if(diagnoosit[i].code===code){
          return diagnoosit[i].name
        }
      }
      return ""
    }
    if(entry.type==="OccupationalHealthcare"){ 
    return (
      <div key={entry.id}> 
        <p>{entry.date} <WorkOutlinedIcon/> {entry.employerName}</p>
        <i>{entry.description}</i>
        <p>diagnose by {entry.specialist}</p>
        <p>{entry.sickLeave?.startDate} {entry.sickLeave?.endDate}</p>
           {entry.diagnosisCodes?.map((code: Diagnosis['code']) => (
        <ul key={code}>
          <li>{code} {diagnoseName(code)}</li>
        </ul>
       ))}
       </div>
    )} 
    else return(<div></div>)
  }


  const HealthCheckEntry = (entry: Entry) => {
    const diagnoseName = (code: string) => { 
      const diagnoosit = Object.values(diagnoses)
      for(let i=0; i<diagnoosit.length; i++){
        if(diagnoosit[i].code===code){
          return diagnoosit[i].name
        }
      }
      return ""
    }
    const healthRate = (rate: number) => {
      if(rate === 0){
        return <FavoriteOutlinedIcon sx={{color: green[500] }} />
      }
      if(rate === 1){
        return <FavoriteOutlinedIcon sx={{color: yellow[500] }} />
      }
      if(rate === 2){
        return <FavoriteOutlinedIcon sx={{color: orange[500] }} />
      }
      if(rate === 3){
        return <FavoriteOutlinedIcon sx={{color: pink[500] }} />
      }
      if(rate === 4){
        return <FavoriteOutlinedIcon sx={{color: red[500] }} />
      }
    }
    if(entry.type==="HealthCheck"){
    return (
      <div key={entry.id}> 
        <p>{entry.date} <MedicalInformationIcon /></p>
        <p>{healthRate(entry.healthCheckRating)}</p>
        <i>{entry.description}</i>
        <p>diagnose by {entry.specialist}</p>
           {entry.diagnosisCodes?.map((code: Diagnosis['code']) => (
        <ul key={code}>
          <li>{code} {diagnoseName(code)}</li>
        </ul>
       ))}
       </div>
    )} 
    else return(<div></div>)
  }

  const OnePatient = () => { 
    let icon = <FemaleIcon />;
    const patient = Object.values(statepatient)[0]
    if(patient===undefined){return(<></>)}
    
    if (patient.gender === "male"){
      icon = <MaleIcon />;
    }
    return (
      <div >
      <h2 >{patient.name} {icon}</h2>
      <div >ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3 >entries</h3>
      <div>{Object.values(entries).map((entry: Entry) => (
      <Paper key = {entry.id}
        sx={{
        p: 1,
        marginBottom: 2,
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      >
      <EntryDetails entry={entry}></EntryDetails>
      </Paper>
      ))  
      }
      </div>
      </div>
    )
    }


  if(patientOpen===false) { 
  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients).map((patient: Patient) => (
            <TableRow key={patient.id}>
              
              <TableCell>
              <Container>
          <Button component={Link} to={"/patients/" + patient.id} onClick={() => openPatient(patient.id)}>
            {patient.name}
          </Button>
          <Divider hidden />

        </Container></TableCell>

              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={1} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody> 
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
}


return (
  <Container>
    <OnePatient></OnePatient>
    <AddEntryModal
        entryModalOpen={entryModalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeEntryModal}
      />
    <Button variant="contained" color="primary" onClick={() => openEntryModal()}>ADD NEW ENTRY</Button>
</Container>
);
};

export default PatientListPage;

function assertNever(entry: never): React.ReactElement<any, any> | null {
  throw new Error("Function not implemented.");
}
