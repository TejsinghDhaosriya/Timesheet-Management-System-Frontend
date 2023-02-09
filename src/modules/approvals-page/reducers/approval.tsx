import { createSlice } from "@reduxjs/toolkit";

interface Approval{
    id:number,
    userName:string,
    totalHours:number,
    date:string,
    description:string,
    status:'pending'|'accepted'|'rejected';
    reason:string
}
const intialState:Approval={
    id:0,
    userName:'',
    totalHours:0,
    date:"",
    description:"",
    status:"pending",
    reason:""
}

const approval=createSlice({
    name:'approval',
    initialState:intialState,
    reducers:{
        setApproval:(state,action)=>{
            state=action.payload
            return state
        }
    }
})

export const{ setApproval }=approval.actions
export default approval.reducer