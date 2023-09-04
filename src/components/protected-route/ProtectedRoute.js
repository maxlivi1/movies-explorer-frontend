import { Navigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

const ProtectedRoute = ({ element: Component, ...props }) => {
  return props.loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to={ROUTES.main} replace />
  );
};

export default ProtectedRoute;
