import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import ProtectedRoute from "./components/ProtectedRoute";
import Homeworks from "./pages/Homeworks";
import Login from "./pages/Login";
import Student from "./pages/Student";
import Students from "./pages/Students";
import Teacher from "./pages/Teacher";
import Teachers from "./pages/Teachers";

const AppContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.background};
`;

const App = () => {
  return (
    <AppContainer>
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
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/teachers"
            element={
              <ProtectedRoute userType="principal">
                <Teachers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/:id"
            element={
              <ProtectedRoute userType="teacher">
                <Teacher />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students"
            element={
              <ProtectedRoute userType="principal">
                <Students />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/:id"
            element={
              <ProtectedRoute userType="student">
                <Student />
              </ProtectedRoute>
            }
          />
          <Route
            path="/homeworks"
            element={
              <ProtectedRoute userType="teacher">
                <Homeworks />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
};

export default App;
