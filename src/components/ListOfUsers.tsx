import {
	Card,
	Table,
	TableRow,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableBody,
	Button,
	Title,
	Badge,
} from '@tremor/react';
import Delete from '../icons/Delete';
import Edit from '../icons/Edit';
import { useAppSelector } from '../hooks/store';
import useUserActions from '../hooks/useUserActions';

export default function ListOfUsers() {
	const users = useAppSelector((state) => state.users);
	const { removeUser } = useUserActions();

	return (
		<Card className='w-full'>
			<Title>
				Usuarios:<Badge className='ml-4'>{users.length}</Badge>
			</Title>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell>Id</TableHeaderCell>
						<TableHeaderCell>Name</TableHeaderCell>
						<TableHeaderCell>Email</TableHeaderCell>
						<TableHeaderCell>Github</TableHeaderCell>
						<TableHeaderCell>Actions</TableHeaderCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{users.map((item) => (
						<TableRow key={item.id}>
							<TableCell>{item.id}</TableCell>
							<TableCell>
								<img
									className='rounded-full w-8 h-8 mr-3 inline'
									src={`https://unavatar.io/github/${item.github}`}
									alt='github avatar'
								/>
								{item.name}
							</TableCell>
							<TableCell>{item.email}</TableCell>
							<TableCell>{item.github}</TableCell>
							<TableCell className='flex flex-row gap-5'>
								<Button onClick={() => removeUser(item.id)} variant='light'>
									<Delete />
								</Button>
								<Button variant='light'>
									<Edit />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
}
