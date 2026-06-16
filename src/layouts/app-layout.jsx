import { Outlet } from 'react-router-dom';
import Header from '@/components/header';

function AppLayout() {
	return (
		<div>
			<div className="aurora-bg"></div>
			<Header />
			<main className="mx-auto min-h-screen max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
				<Outlet />
			</main>
			<div className="mt-20 border-t border-white/40 bg-white/30 p-10 text-center text-sm text-muted-foreground backdrop-blur-md">
				Made with ❤️ by Radhika Patel
			</div>
		</div>
	);
}

export default AppLayout;
