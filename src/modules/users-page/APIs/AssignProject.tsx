import axios from "axios";

export const assignProject = async (externalId: string, projectId: number) => {
  try {
    const response = await axios.patch(
      `https://localhost:61556/api/v1/user/${externalId}`,
      {
        currentProjectId: projectId,
      }
    );
    return response.data.statusCode;
  } catch (error) {
    console.error(error);
  }
};

export const unAssignProject = async (externalId: string, projectId: number, previousProjectIds: number[]) => {
  previousProjectIds?.push(projectId)
  console.log("previous pro data", previousProjectIds);
  try {
    const response = await axios.patch(
      `https://localhost:61556/api/v1/user/${externalId}`,
      {
        currentProjectId: 0,
        previousProjectIds: previousProjectIds
      }
    );
    return response.data.statusCode;
  } catch (error) {
    console.error(error);
  }
};

export const getProjectAssigned = async (externalId: string,) => {
    try {
      const response = await axios.get(
        `https://localhost:61556/api/v1/user/externalId/${externalId}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
