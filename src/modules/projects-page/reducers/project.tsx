import { createSlice } from "@reduxjs/toolkit";

const project = createSlice({
    name: 'project',
    initialState:{
        id:0,
        projectName:'',
        description:'',
        start_date:'',
        end_date:'',
        status :'',
        manager_id:'',
        is_active:''

    },
    reducers: {
        setProjectSlice: (state, action) => {
            state= action.payload
            return state
           
        }
    }
})
export const { setProjectSlice } = project.actions
export default project.reducer