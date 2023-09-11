import { Navigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { ROUTES } from "../../configs/appconfig";

const ProtectedRoute = ({ element: Component, ...props }) => {
  const { loggedIn } = useAppContext();
  return loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to={ROUTES.main} replace />
  );
};

export default ProtectedRoute;
