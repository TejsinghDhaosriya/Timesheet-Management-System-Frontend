import { createSlice } from "@reduxjs/toolkit";
import { actionChannel } from "redux-saga/effects";
import { Timesheet } from "../TimesheetInterface";

// interface Approval{
//     id:number,
//     userName:string,
//     totalHours:number,
//     date:string,
//     description:string,
//     status:'pending'|'accepted'|'rejected';
//     reason:string
// }

// const intialState:Approval={
//     id:0,
//     userName:'',
//     totalHours:0,
//     date:"",
//     description:"",
//     status:"pending",
//     reason:""
// }


const intialState:Timesheet={
        id:0,
        description:'',
        date:'',
        totalHours:0,
        createdBy:0,
        organizationId:0,
        approvals:[{
        id:0,
        timesheetId:0,
        status:0,
        reasonForRejection:'',
        approvalDate:'',
        managerId: 0,
        organizationId:0,
        createdAt:'',
        modifiedAt:''
        }]
}

const approvals =createSlice({
    name:'approvals',
    initialState:[intialState],
    reducers:{
       getApprovals:(state,action)=>{
        state=action.payload;
        console.log(state);
        return state

       },
       deleteApproval:(state,action)=>{
        state=state.filter((approval)=>approval.id!==action.payload);
        return state;
       },
       updateApproval:(state,action)=>{
        state=state.map((i)=>i.id==action.payload.id?action.payload:i)
        return state; 
       }
    }
});

export const {getApprovals,deleteApproval,updateApproval}=approvals.actions;
export default approvals.reducer