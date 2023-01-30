import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/'

export const getProjectsAPI = async () => axios.get('/projects')

export const getProjectByIdAPI = async (id: any) => axios.get(`/projects/${id}`)

export const createProjectAPI = async (project: any) => axios.post(`/projects`, project)

export const updateProjectAPI = async (project: { id: any }) => axios.put(`/projects/${project.id}`, project)

export const deleteProjectByIdAPI = async (id: any) => axios.delete(`/projects/${id}`)