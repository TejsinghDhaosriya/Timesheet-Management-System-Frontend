import { createSlice } from "@reduxjs/toolkit";
import Project from "../ProjectInterface";
import { intialState } from "../ProjectState";

// interface Project{
//     id:number
//     name:string
//     description:string,
//     startDate:string,
//     endDate:string,
//     status :number,
//     managerId:number,
//   }
// type IntialState={
//     loading:boolean
//     projects:Project[]
//     error:string
// }
// const intialState:IntialState={
//     loading:false,
//     projects:[],
//     error:''
// }
// const intialState:Project={
//     id: 0,
//     name: "",
//     description: "",
//     startDate: "",
//     endDate: "",
//     status: 0,
//     managerId: 0,
// }

const projects=createSlice({
    name:'projects',
    initialState:[
        intialState
    ],
    reducers:{
            getProjectsSlice: (state, action) => {
                state = action.payload
                return state
            },
            addProjectSlice: (state, action) => {
                state.push(action.payload)
                return state
            },
            editProjectSlice: (state:Project[], action) => {
                state = state.map((i: { id:Project["id"]; }) => i.id == action.payload.id ? action.payload : i)
                return state
            },
            deleteProjectSlice: (state:Project[], action) => {
                state = state.filter((i: { id:Project["id"]; }) => i.id !== action.payload)
                return state
            }
        
    },
    // extraReducers:builder=>{
    //     builder.addCase(fetchProjects.pending,state=>{
    //         state.loading=true
    //     })
    //     builder.addCase(fetchProjects.fulfilled,(state,action:PayloadAction<Project[]>)=>{
    //         state.loading=false
    //         state.projects=action.payload
    //         state.error=''
    //     })
    //     builder.addCase(fetchProjects.rejected,(state,action)=>{
    //         state.loading=false
    //         state.projects=[]
    //         state.error=action.error.message||"something went wrong"
    //     })
    // }

})
export const {getProjectsSlice, addProjectSlice, editProjectSlice, deleteProjectSlice } = projects.actions
export default projects.reducer