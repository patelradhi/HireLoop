import { Outlet } from 'react-router-dom';
import Header from '@/components/header';

function AppLayout() {
	return (
		<div>
			<div className="grid-background"></div>
			<main className="min-h-screen container">
				<Header />
				<Outlet />
			</main>
			<div className="p-10 text-center bg-gray-800 mt-10">Made with ❤️ by Radhika Patel</div>
		</div>
	);
}

export default AppLayout;
