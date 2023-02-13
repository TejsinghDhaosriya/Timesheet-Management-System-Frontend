import axios from "axios"



// export const getApprovalAPI = async () => axios.get('http://localhost:8000/approval')

// export const updateApprovalAPI = async (approval: { id: any }) => axios.put(`http://localhost:8000/approval/${approval.id}`, approval)

// export const deleteApprovalByIdAPI = async (id: any) => axios.delete(`http://localhost:8000/approval/${id}`)


// export const getApprovalByWeek=async ()=>axios.get(`https://143.110.248.171:5001/api/v1/timesheet?userId=12&organizationId=1&startDate=2023-01-27 22:00:00&endDate=2023-01-31 22:00:00`)
export const getApprovalByWeek=async (approval:{userId:any,organizationId:any,startDate:string,endDate:string})=>axios.get(`https://143.110.248.171:5001/api/v1/timesheet??withApproval=true&userId=${approval.userId}&organizationId=${approval.organizationId}&startDate=${approval.startDate}&endDate=${approval.endDate}`)
export const getApprovalAPI=async ()=>axios.get(`https://143.110.248.171:5001/api/v1/timesheet?withApproval=true`)
export const updateApprovalAPI=async (approval:{id:any})=>axios.patch(`https://143.110.248.171:5001/api/v1/timesheet/approval/${approval.id}`,approval)
export const deleteApprovalByIdAPI=async (id:any)=>axios.delete(`https://143.110.248.171:5001/api/v1/timesheet/approval/${id}`)