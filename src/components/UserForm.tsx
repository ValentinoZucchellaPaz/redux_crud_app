import { Button, Card, TextInput, Title, Text, Badge } from '@tremor/react';
import { FormEvent, useState } from 'react';
import useUserActions from '../hooks/useUserActions';
import { EditUser } from '../types';
import { toast } from 'sonner';

interface CreateNewUserProps {
	edit: EditUser | null
}

// dual behaviour - create edit
export default function UserForm({ edit }: CreateNewUserProps) {
	const { addUser, editUser } = useUserActions();
	const [error, setError] = useState<boolean | string>(false);
	const [lastAdded, setLastAdded] = useState<string>('');
	const [status, setStatus] = useState<'ok' | null>(null);

	function validateFields(
		name: string,
		email: string,
		github: string,
		condition: boolean,
	) {
		let error = '';

		if (condition) {
			switch (true) {
				case !name && !email && !github:
					error = 'Debe completar los campos';
					break;
				case !name:
					error = 'El campo name está vacio';
					break;
				case !email:
					error = 'El campo email está vacio';
					break;

				case !email.includes('@'):
					error = 'El campo de email debe contener un email';
					break;

				case !github:
					error = 'El campo github está vacio';
					break;

				default:
					error = 'Complete los campos';
					break;
			}
		}

		return error;
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(false);
		setStatus(null);

		// form data extraction
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const github = formData.get('github') as string;

		// error validation
		const errorCondition = !name || !email || !github || !email.includes('@');
		const errorValidation = validateFields(name, email, github, errorCondition);
		if (errorCondition) {
			return setError(errorValidation);
		}

		// dual behaviour (create-edit)
		if (edit !== null) {
			const id = edit.id
			editUser({ id, name, email, github })
			edit.setEdit(prev => !prev)
		} else {
			addUser({ name, email, github })
		}
		toast.success(`Usuario ${name} ${edit !== null ? 'editado' : 'creado'} correctamente`)

		setStatus('ok');
		setLastAdded(name);
		form.reset();
	}

	return (
		<Card className='mt-5 p-10'>
			<Title>{edit ? 'Editar usuario' : 'Crear nuevo usuario'}</Title>
			{error && (
				<Text color='red' className='font-medium'>
					{error}
				</Text>
			)}
			<form className='my-2 flex flex-col gap-3' onSubmit={handleSubmit}>
				<TextInput name='name' placeholder='Aquí el nombre' defaultValue={edit?.name} />
				<TextInput name='email' placeholder='Aquí el email' defaultValue={edit?.email} />
				<TextInput name='github' placeholder='Aquí el usuario de Github' defaultValue={edit?.github} />

				<div>
					<Button type='submit'>{edit ? 'Editar' : 'Crear'}</Button>
					{status === 'ok' && (
						<Badge className='ml-3' color='green'>
							{lastAdded} guardado correctamente
						</Badge>
					)}
				</div>
			</form>
		</Card>
	);
}
