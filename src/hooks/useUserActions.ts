import { deleteUserById, addNewUser, editUserAction } from "../store/users/slice";
import { User, UserId, UserWithId } from "../types";
import { useAppDispatch } from "./store";

export default function useUserActions() {
	const dispatch = useAppDispatch();

	function addUser({ name, email, github }: User) {
		dispatch(addNewUser({ name, email, github }))
	}

	function removeUser(id: UserId) {
		dispatch(deleteUserById(id));
	}

	function editUser({ id, name, email, github }: UserWithId) {
		dispatch(editUserAction({ id, name, email, github }))
	}

	return { removeUser, addUser, editUser }
}
