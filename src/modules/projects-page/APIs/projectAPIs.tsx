import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:8000/'

// export const getProjectsAPI = async () => axios.get('/projects')

// export const getProjectByIdAPI = async (id: any) => axios.get(`/projects/${id}`)

// export const createProjectAPI = async (project: any) => axios.post(`/projects`, project)

// export const updateProjectAPI = async (project: { id: any }) => axios.put(`/projects/${project.id}`, project)

// export const deleteProjectByIdAPI = async (id: any) => axios.delete(`/projects/${id}`)



axios.defaults.baseURL = 'http://143.110.248.171:8001/api/v1/'

export const getProjectsAPI = async () => axios.get('/project')

export const getProjectByIdAPI = async (id: any) => axios.get(`/project/${id}`)

export const createProjectAPI = async (project: any) => axios.post(`http://143.110.248.171:8001/api/v1/project`, project)

export const updateProjectAPI = async (project: { id: any }) => axios.patch(`http://143.110.248.171:8001/api/v1/project/${project.id}`, project)

export const deleteProjectByIdAPI = async (id: any) => axios.delete(`/project/${id}`)