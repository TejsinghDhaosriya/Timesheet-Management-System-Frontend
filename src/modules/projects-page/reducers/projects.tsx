import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


// type Project={
//     id:number
//     projectName:string
//     companyName:string
// }

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

// export const fetchProjects=createAsyncThunk('project/fetchProjects',()=>{
//     return axios
//     .get('')
//     .then(response=>response.data)
// })

const projects=createSlice({
    name:'projects',
    initialState:[{
        id:0,
        projectName:'',
        description:'',
        start_date:'',
        end_date:'',
        status :'',
        manager_id:'',
        is_active:''
    }],
    reducers:{
            getProjectsSlice: (state, action) => {
                state = action.payload
                return state
            },
            addProjectSlice: (state, action) => {
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