import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE = [
    {
        id: '1',
        name: "Valentino Zucchella",
        email: "vzuc@gmail.com",
        github: "ValentinoZucchellaPaz",
    },
    {
        id: '2',
        name: "Tino",
        email: "vzuc@gmail.com",
        github: "quera",
    },
    {
        id: '3',
        name: "Mongongo",
        email: "vzuc@gmail.com",
        github: "ValentinoZucchellaPaz",
    },
    {
        id: '4',
        name: "Teo",
        email: "vzuc@gmail.com",
        github: "midudev",
    },
];

export type UserId = string

export interface User {
    name: string
    email: string
    github: string
}

export interface UserWithId extends User {
    id: UserId
}

const initialState: UserWithId[] = (()=>{
	const persistedState = localStorage.getItem("__redux__users__state__")
	if (persistedState) return JSON.parse(persistedState).users

	return DEFAULT_STATE
})()

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID()
            state.push({id, ...action.payload })
        },
        deleteUserById: ( state, action: PayloadAction<UserId> ) => {
            const id = action.payload
            return state.filter( user => user.id !== id )
        },
        rollBackUser: (state, action: PayloadAction<UserWithId>) => {
            const id = action.payload.id
            const isUserInState = state.some(user=> user.id === id)
            if (!isUserInState) {
                state.push(action.payload)
            }
        }
    },
})

export default usersSlice.reducer

export const { deleteUserById, addNewUser, rollBackUser } = usersSlice.actions