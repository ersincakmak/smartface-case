import { FieldHookConfig, useField } from "formik";
import styled from "styled-components";

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.2em;
  width: 100%;
`;

const Input = styled.input`
  padding: 0.7em;
  border: none;
  outline: none;
  width: 100%;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.colors.text.gray};
  transition: all 0.2s ease;
  color: ${(props) => props.theme.colors.text.primary};

  ::placeholder {
    color: ${(props) => props.theme.colors.text.gray};
  }

  :focus {
    border-color: ${(props) => props.theme.colors.text.primary};
  }
`;

const Error = styled.span`
  color: ${(props) => props.theme.colors.text.error.base};
  font-size: 0.875rem; // 14px
`;

interface Props {
  props: FieldHookConfig<string>;
  label: string;
}

const FormikField: React.FC<Props> = ({ label, props }) => {
  const [field, meta] = useField(props);

  return (
    <Label>
      {label}
      <Input {...field} {...props} />
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
    </Label>
  );
};

export default FormikField;
