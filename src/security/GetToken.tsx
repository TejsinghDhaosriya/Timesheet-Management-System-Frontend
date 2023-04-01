import axios from "axios";
import qs from "qs";
import { Connection } from "./keycloakConnectionRequest";

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

export const getToken = async (): Promise<any> => {
    try {
      const response = await axios.post(`https://143.110.248.171:8443/realms/master/protocol/openid-connect/token`, qs.stringify(
        Connection
      ), {headers});
      return response.data.access_token;
    } catch (error) {
      console.error(error);
    }
  };

 
  