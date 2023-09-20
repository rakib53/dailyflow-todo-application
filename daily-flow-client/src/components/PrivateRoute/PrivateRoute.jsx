import { Navigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";

function PrivateRoute({ children }) {
  const isLoggedIn = useAuth();

  return isLoggedIn ? children : <Navigate to={"/signin"} />;
}

export default PrivateRoute;
