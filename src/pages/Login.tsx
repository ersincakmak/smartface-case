/* eslint-disable react-hooks/exhaustive-deps */
import { Form, FormikProvider, useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import FormikField from "../components/FormikField";
import { clearError, login } from "../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { LoginCreds } from "../types/user";
import { loginFormValidation } from "../utils/validations";

const LoginPage = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 1em;
`;

const FormikForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto auto;
  gap: 1em;
  width: min(25rem, 100%); // 400px
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.button.primary.base};
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  outline: none;
  width: 100%;
  font-size: 1.2rem;

  :hover,
  :focus {
    background-color: ${(props) => props.theme.colors.button.primary.hovered};
  }
`;

const Login = () => {
  const { user, error, isLoggedIn } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik<LoginCreds>({
    initialValues: {
      password: "",
      username: "",
    },
    validationSchema: loginFormValidation,
    onSubmit: (values, helpers) => {
      dispatch(login(values));
      helpers.resetForm();
    },
  });

  useEffect(() => {
    if (isLoggedIn === true) {
      switch (user?.userType) {
        case "principal":
          return navigate("/teachers");
        case "teacher":
          return navigate(`/teachers/${user.username}`);
        default:
          return navigate(`/homeworks/student/${user?.username}`);
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (error.length > 0) {
      toast.error(error, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      dispatch(clearError());
    }
  }, [error]);

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <LoginPage>
        <FormikProvider value={formik}>
          <FormikForm noValidate>
            <h1>LOGIN</h1>
            <FormikField
              label="Username"
              props={{
                name: "username",
                placeholder: "Type your username",
                type: "text",
                autoComplete: "off",
              }}
            />
            <FormikField
              label="Password"
              props={{
                name: "password",
                placeholder: "Type your password",
                type: "password",
                autoComplete: "off",
              }}
            />
            <Button type="submit">LOGIN</Button>
          </FormikForm>
        </FormikProvider>
      </LoginPage>
    </>
  );
};

export default Login;
