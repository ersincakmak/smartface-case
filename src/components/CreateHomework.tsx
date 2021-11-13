import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import styled from "styled-components";
import { CreateHomeWorkObject } from "../types/homework";
import { createHomeworkValitaion } from "../utils/validations";
import FormikField from "./FormikField";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
  border-radius: 10px;
  margin: auto auto;
  background-color: ${(props) => props.theme.colors.background};
  width: min(37.5rem, 100%); // 600px

  h2 {
    text-align: center;
  }
`;

const FormikForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
`;

const Button = styled.button`
  padding: 0.5em 0.7em;
  background-color: ${(props) => props.theme.colors.button.primary.base};
  transition: all 0.2s ease;
  border-radius: 5px;
  cursor: pointer;

  :hover {
    background-color: ${(props) => props.theme.colors.button.primary.hovered};
  }
`;

const CancelButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.text.error.base};
  color: white;
  :hover {
    background-color: ${(props) => props.theme.colors.text.error.hovered};
  }
`;

interface Props {
  onCancel: () => void;
  onSubmit: (vals: CreateHomeWorkObject) => void;
}

const CreateHomework: React.FC<Props> = ({ onCancel, onSubmit }) => {
  const formik = useFormik<CreateHomeWorkObject>({
    initialValues: {
      description: "",
      title: "",
    },
    validationSchema: createHomeworkValitaion,
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <Container>
      <h2>Craete New Homework</h2>
      <FormikProvider value={formik}>
        <FormikForm noValidate>
          <FormikField
            label="Title"
            props={{
              name: "title",
              placeholder: "Type title",
              autoComplete: "off",
            }}
          />
          <FormikField
            label="Description"
            props={{
              name: "description",
              placeholder: "Type description",
              autoComplete: "off",
            }}
          />
          <Buttons>
            <Button type="submit">Create</Button>
            <CancelButton type="button" onClick={onCancel}>Cancel</CancelButton>
          </Buttons>
        </FormikForm>
      </FormikProvider>
    </Container>
  );
};

export default CreateHomework;
