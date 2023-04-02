import axios from "axios";
import Project from "../ProjectInterface";

// axios.defaults.baseURL = `https://143.110.248.171:5001/api/v1/`;

export const getProjectsAPI = async () => axios.get(`/project`);

export const getProjectByIdAPI = async (id: number) =>
  axios.get(`/project/${id}`);

export const createProjectAPI = async (project: Project, orgId: number) => {
  const config: any = { headers: { organization_id: orgId } };
  return axios.post(`/project`, project, config);
};

export const updateProjectAPI = async (project: { id: number }) =>
  axios.patch(`/project/${project.id}`, project);

export const deleteProjectByIdAPI = async (id: number) =>
  axios.delete(`/project/${id}`);
