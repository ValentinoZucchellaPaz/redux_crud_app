import { store } from "./store"

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export interface EditUser extends UserWithId {
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export type UserId = string

export interface User {
    name: string
    email: string
    github: string
}

export interface UserWithId extends User {
    id: UserId
}