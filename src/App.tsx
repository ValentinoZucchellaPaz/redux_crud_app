import { Toaster } from 'sonner';
import './App.css';
import CreateNewUser from './components/CreateNewUser';
import ListOfUsers from './components/ListOfUsers';

function App() {
	return (
		<div className='w-[80%] m-auto my-10 flex flex-col justify-center items-center'>
			<p>primera app redux</p>
			<ListOfUsers />
			<CreateNewUser />
			<Toaster expand={true} richColors />
		</div>
	);
}

export default App;
