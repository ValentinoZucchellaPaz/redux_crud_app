import { Middleware, configureStore } from "@reduxjs/toolkit"
import usersReducer, { rollBackUser } from "./users/slice"
import { toast } from 'sonner'
import { UserWithId } from "../types"

const persistanceLSMiddleware: Middleware = (store) => (next) => (action) => {
    next(action)
    localStorage.setItem("__redux__users__state__", JSON.stringify(store.getState()))
}

const syncWithDatabaseMiddleware: Middleware = (store) => (next) => (action) => {
    const { type, payload } = action
    const previousState = store.getState()
    next(action)
    if (type === 'users/deleteUserById') {
        const userToRemove = previousState.users.find((user: UserWithId) => user.id === payload)
        const userIdToRemove = payload

        fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) {
                    return toast.success(`Usuario con id ${userIdToRemove} eliminado correctamente`)
                }
                throw new Error('Error al eliminar el usuario')
            }).catch(err => {
                if (userToRemove) store.dispatch(rollBackUser(userToRemove))
                toast.error(`Error al eliminar el usuario con id ${userIdToRemove}`)
                console.log(err);
            })
    }
}

export const store = configureStore({
    reducer: {
        users: usersReducer
    },
    middleware: [persistanceLSMiddleware, syncWithDatabaseMiddleware]
})