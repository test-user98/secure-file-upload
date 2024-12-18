import { createSlice } from '@reduxjs/toolkit'

const intial={
    name:"",
    email:"",
    id:"",
    role:0
}


export const UserSlice=createSlice({
    name:"user",
    initialState:intial,
    reducers:{
        login:(state,actions)=>{
                state.name=actions.payload.name;
                state.email=actions.payload.email;
                state.id=actions.payload.id
                state.role=actions.payload.role
        },
        logout:(state)=>{
            state.name="";
            state.email="";
            state.id="";
        }
    }
});


export const {login,logout}=UserSlice.actions;
export const userSlice=UserSlice?.reducer