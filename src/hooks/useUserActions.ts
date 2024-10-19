import { UserId, deleteUserById, addNewUser, User } from "../store/users/slice";
import { useAppDispatch } from "./store";

export default function useUserActions() {
    const dispatch = useAppDispatch();

	function addUser ({name, email, github}: User) {
		dispatch(addNewUser({name , email, github}))
	}

	function removeUser(id: UserId) {
		dispatch(deleteUserById(id));
	}

    return { removeUser, addUser }
}
