import axios from "axios";
import { UserInterface } from "../interface/UserInterface";

export const getUser = async (token: string) => {
    try {
      const response = await axios.get<UserInterface[]>(
        `https://143.110.248.171:8443/admin/realms/Augmento/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  