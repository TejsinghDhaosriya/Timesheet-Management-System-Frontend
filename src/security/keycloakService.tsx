import axios from "axios";
import Keycloak from "keycloak-js";

const keycloakInstance = new Keycloak();

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */

const Login = (onAuthenticatedCallback: Function) => {
  keycloakInstance
    .init({ onLoad: "login-required" })
    .then(function (authenticated) {
      authenticated ? onAuthenticatedCallback() : alert("non authenticated");
      const token = keycloakInstance.token;
      axios.defaults.baseURL = "https://143.110.248.171:5001/api/v1/";
      axios.defaults.headers.common["Authorization"] = token;
    })
    .catch((e) => {
      console.dir(e);
      console.log(`keycloak init exception: ${e}`);
    });
};

const UserName = () => keycloakInstance.tokenParsed?.preferred_username;

const UserRoles = () => {
  if (keycloakInstance.resourceAccess === undefined) return undefined;
  else return keycloakInstance.resourceAccess["TMS-Client"].roles;
};

const UserId = () => keycloakInstance.idTokenParsed?.sub;
const organizationId = () => keycloakInstance.tokenParsed?.organization_id;
const userProject = () => keycloakInstance.tokenParsed?.project_id;
const Logout = keycloakInstance.logout;

const KeyCloakService = {
  CallLogin: Login,
  GetUserName: UserName,
  GetUserRoles: UserRoles,
  CallLogout: Logout,
  CallUserId: UserId,
  CallOrganizationId: organizationId,
  CallUserProject: userProject,
};

export default KeyCloakService;
