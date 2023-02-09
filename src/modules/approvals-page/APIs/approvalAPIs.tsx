import axios from "axios"



// export const getApprovalAPI = async () => axios.get('http://localhost:8000/approval')

// export const updateApprovalAPI = async (approval: { id: any }) => axios.put(`http://localhost:8000/approval/${approval.id}`, approval)

// export const deleteApprovalByIdAPI = async (id: any) => axios.delete(`http://localhost:8000/approval/${id}`)



export const getApprovalAPI=async ()=>axios.get(`https://143.110.248.171:5001/api/v1/timesheet?withApproval=true`)
export const updateApprovalAPI=async (approval:{id:any})=>axios.patch(`https://143.110.248.171:5001/api/v1/timesheet/approval/${approval.id}`,approval)
export const deleteApprovalByIdAPI=async (id:any)=>axios.delete(`https://143.110.248.171:5001/api/v1/timesheet/approval/${id}`)