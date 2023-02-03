import formGroupClasses from "@mui/material/FormGroup/formGroupClasses";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Project{
    id:number
    projectName:string
    description:string,
    start_date:Date,
    end_date:Date,
    status :number,
    manager_id:number,
}

// type IntialState={
//     loading:boolean
//     projects:Project[]
//     error:string
// }

// const initialState:IntialState={
//     loading:false,
//     projects:[],
//     error:''
// }
const intialState:Project={
        id:0,
        projectName:'',
        description:'',
        start_date:new Date(),
        end_date:new Date(),
        status :0,
        manager_id:0,
}

// export const fetchProjects=createAsyncThunk('project/fetchProjects',()=>{
//     return axios
//     .get('')
//     .then(response=>response.data)
// })

const projects=createSlice({
    name:'projects',
    // initialState:[{
    //     intialState
    // }],
    initialState:[{
        id:0,
        name:'',
        description:'',
        startDate:'',
        endDate:'',
        status :0,
        managerId:0,
    }],
    reducers:{
            getProjectsSlice: (state, action) => {
                state = action.payload
                return state
            },
            addProjectSlice: (state, action) => {
                console.log(action.payload)
                state.push(action.payload)
                return state
            },
            editProjectSlice: (state:any, action) => {
                state = state.map((i: { id: any; }) => i.id == action.payload.id ? action.payload : i)
                return state
            },
            deleteProjectSlice: (state:any, action) => {
                state = state.filter((i: { id: any; }) => i.id !== action.payload)
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