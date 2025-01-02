import { Toaster } from 'sonner';
import './App.css';
import UserForm from './components/UserForm';
import ListOfUsers from './components/ListOfUsers';

function App() {

	return (
		<div className='w-[80%] m-auto my-10 flex flex-col justify-center items-center relative'>
			<ListOfUsers />
			<div className='lg:w-[40dvw]'>
				<UserForm edit={null} />
			</div>
			<Toaster expand={true} richColors />
		</div>
	);
}

export default App;
