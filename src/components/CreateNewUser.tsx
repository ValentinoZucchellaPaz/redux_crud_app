import { Button, Card, TextInput, Title, Text, Badge } from '@tremor/react';
import { FormEvent, useState } from 'react';
import useUserActions from '../hooks/useUserActions';

export default function CreateNewUser() {
	const { addUser } = useUserActions();
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

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const github = formData.get('github') as string;

		console.log(name, email, github);

		const errorCondition = !name || !email || !github || !email.includes('@');
		const errorValidation = validateFields(name, email, github, errorCondition);

		if (errorCondition) {
			return setError(errorValidation);
		}

		addUser({ name, email, github });
		setStatus('ok');
		setLastAdded(name);
		form.reset();
	}

	return (
		<Card className='mt-5 lg:w-1/2 p-10'>
			<Title>Create New User</Title>
			{error && (
				<Text color='red' className='font-medium'>
					{error}
				</Text>
			)}
			<form className='my-2 flex flex-col gap-3' onSubmit={handleSubmit}>
				<TextInput name='name' placeholder='Aquí el nombre' />
				<TextInput name='email' placeholder='Aquí el email' />
				<TextInput name='github' placeholder='Aquí el usuario de Github' />

				<div>
					<Button type='submit'>Crear</Button>
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
