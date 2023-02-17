import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';
import { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (_req, res) => {
  res.send(patientService.getPatient(_req.params.id));
});

router.get('/:id/entries', (_req, res) => {
  res.send(patientService.getPatientEntries(_req.params.id));
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
})


router.post('/', (req, res) => {
    try {
      const newPatient = toNewPatient(req.body);
      const addedPatient = patientService.addPatient(newPatient);
      res.json(addedPatient);
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res.status(400).send(errorMessage);
    }
  })

export default router;
