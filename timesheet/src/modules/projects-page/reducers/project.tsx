import { createSlice } from "@reduxjs/toolkit";






const project = createSlice({
    name: 'project',
    initialState:{
        id:0,
        projectName:'',
        companyName:'',
        description:'',
        start_date:'',
        end_date:'',
        total_time_spent:'',
        status :'',
        manager_id:'',
        organization_id:0,
        is_active:true

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