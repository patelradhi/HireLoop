import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, PenBox } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Onboarding() {
	const { isLoaded, user } = useUser();
	const navigate = useNavigate();

	const handelRoleSelection = async (role) => {
		await user
			.update({
				unsafeMetadata: { role },
			})
			.then(() => {
				navigate(role === 'recruiter' ? '/post-jobs' : '/jobs');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	if (!isLoaded) {
		return <BarLoader className="mb-5" width={'100%'} height={5} color="#6d5ef8" />;
	}

	return (
		<div className="flex flex-col items-center justify-center py-20 sm:py-28 text-center">
			<span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
				👋 Welcome to HireLoop
			</span>
			<h2 className="gradient-title font-bold text-5xl sm:text-7xl tracking-tighter">I am a...</h2>
			<p className="mt-4 max-w-md text-muted-foreground">
				Pick how you want to use HireLoop. You can always change this later.
			</p>

			<div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-6 px-4 sm:grid-cols-2">
				{/* Candidate */}
				<Card
					onClick={() => handelRoleSelection('candidate')}
					className="group cursor-pointer items-center gap-5 rounded-2xl p-8 text-center transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
				>
					<div className="grid h-16 w-16 place-items-center rounded-2xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
						<Search size={28} />
					</div>
					<div>
						<h3 className="text-2xl font-bold tracking-tight">Candidate</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							Browse roles, save favorites, and apply in one click.
						</p>
					</div>
					<Button variant="blue" className="w-full">
						Continue as Candidate
					</Button>
				</Card>

				{/* Recruiter */}
				<Card
					onClick={() => handelRoleSelection('recruiter')}
					className="group cursor-pointer items-center gap-5 rounded-2xl p-8 text-center transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
				>
					<div className="grid h-16 w-16 place-items-center rounded-2xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
						<PenBox size={28} />
					</div>
					<div>
						<h3 className="text-2xl font-bold tracking-tight">Recruiter</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							Post jobs, manage applications, and hire the best.
						</p>
					</div>
					<Button variant="red" className="w-full">
						Continue as Recruiter
					</Button>
				</Card>
			</div>
		</div>
	);
}
export default Onboarding;
