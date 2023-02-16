import axios from 'axios'

export const getTimesheetApi=async()=>axios.get(`https://143.110.248.171:5001/api/v1/timesheet`)
export const getTimesheetByIdApi=async(id:any)=>axios.get(`/timesheet/${id}`)
export const createTimesheetAPI=async(timesheet:any)=>axios.post(`https://143.110.248.171:5001/api/v1/timesheet`,timesheet)
export const updateTimesheetAPI=async(timesheet:{id:any,timesheetData:any})=>axios.patch(`timesheet/${timesheet.id}`,timesheet.timesheetData)
export const deleteTimesheetByIdAPI=async(id:any)=>axios.delete(`/timesheet/${id}`)