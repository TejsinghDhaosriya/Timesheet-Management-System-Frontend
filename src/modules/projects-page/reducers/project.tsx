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
//   const intialState:Project={
//     id: 0,
//     name: "",
//     description: "",
//     startDate: "",
//     endDate: "",
//     status: 0,
//     managerId: 0,
// }

const project = createSlice({
    name: 'project',
    initialState:intialState,
    reducers: {
        setProjectSlice: (state, action) => {
            state= action.payload
            return state
           
        }
    }
})
export const { setProjectSlice } = project.actions
export default project.reducer