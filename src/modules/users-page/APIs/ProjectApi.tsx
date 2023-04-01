import axios from "axios";

export const getProject = async () => {
    try {
      const response = await axios.get(
        `https://143.110.248.171:5001/api/v1/project`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };