import { createSlice } from "@reduxjs/toolkit";

const project = createSlice({
    name: 'project',
    initialState:{
        id:0,
        name:'',
        description:'',
        startDate:'',
        endDate:'',
        status :0,
        managerId:0

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