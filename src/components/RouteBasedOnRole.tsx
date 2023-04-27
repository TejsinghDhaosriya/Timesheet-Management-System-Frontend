import { Navigate } from "react-router-dom";
import KeyCloakService from "../security/keycloakService";

export function RouteBasedOnRole({ children, roles }: any) {
  const userRoles: string[] | undefined = KeyCloakService.GetUserRoles();

  const canAccess = userRoles?.some(userRole => roles.includes(userRole));

  if (canAccess) return <>{children}</>;

  return <Navigate to="/" />;
}
