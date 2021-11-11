import { Navigate, RouteProps } from "react-router-dom";
import { useAppSelector } from "../redux/store";

interface Props extends RouteProps {
  userType: "principal" | "teacher" | "student";
}

const ProtectedRoute: React.FC<Props> = ({ userType, children }) => {
  const { user, isLoggedIn } = useAppSelector((state) => state.user);

  if (isLoggedIn === true) {
    switch (userType) {
      case "student":
        return <>{children}</>;

      case "teacher":
        if (user?.userType !== "student") {
          return <>{children}</>;
        } else {
          return <Navigate to={`/homeworks/students/${user.id}`} />;
        }

      default:
        if (user?.userType === "teacher") {
          return <Navigate to={`/teachers/${user.id}`} />;
        } else if (user?.userType === "student") {
          return <Navigate to={`/homeworks/students/${user.id}`} />;
        } else {
          return <>{children}</>;
        }
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
