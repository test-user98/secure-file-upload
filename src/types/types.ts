import { userSlice } from "@/store/slice/user.slice"
import { combineReducers } from "@reduxjs/toolkit"

export type NextAuthCredsAuthorizeParamsType = {
    email: string
    password: string
}


export type File = {
    id:number
    name: string
    type: string
    slug: string
    content: string
    iv: string
    createdAt: string
    ownerEmail:string
}

export const rootReducer=combineReducers({
    user:userSlice
});


export type userSession={
    _id:number,
    name:string,
    email:string,
    role:number,
    
}