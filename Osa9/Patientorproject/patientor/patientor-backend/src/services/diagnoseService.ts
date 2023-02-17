import diagnoseData from '../../data/diagnoses.json';

import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnoseData as  Array<Diagnose>;

const getDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose
};