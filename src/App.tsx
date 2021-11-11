import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
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
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
};

export default App;
