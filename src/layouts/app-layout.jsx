import { Outlet } from 'react-router-dom';
import Header from '@/components/header';
import Footer from '@/components/footer';

function AppLayout() {
	return (
		<div>
			<div className="aurora-bg"></div>
			<Header />
			<main className="mx-auto min-h-screen max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export default AppLayout;
