import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, TypeOption, DiagnosisSelection } from "./FormField";
import { Type, Entry } from "../types";
import { useStateValue } from "../state";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
*/
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryFormValues = UnionOmit<Entry, "id" | "entries">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
//{ value: Type.HealthCheck, label: "HealthCheck" },
  { value: Type.Hospital, label: "Hospital" },
//{ value: Type.OccupationalHealthcare, label: "Occupational Healthcare" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue()
    return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: "Hospital",
        discharge: {
            date: "",
            criteria: ""
        }
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
            /> 
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <SelectField label="Type" name="type" options={typeOptions} />
            <Field
              label="Discharge date"
              placeholder="Discharge date"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
