import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function Onboarding() {
	const { isLoaded, user } = useUser();
	const navigate = useNavigate();
	console.log(user);

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
		return <BarLoader className="mb-5" width={'100%'} height={5} color="blue" />;
	}

	return (
		<div className="flex flex-col items-center justify-center mt-32">
			<h2 className="gradient-title font-bold text-7xl sm:text-8xl tracking-tighter">I am a...</h2>
			<div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
				<Button
					variant="blue"
					className="h-20  w-[90%] text-2xl"
					onClick={() => handelRoleSelection('candidate')}
				>
					Candidate
				</Button>
				<Button
					variant="red"
					className="h-20 w-[90%] text-2xl"
					onClick={() => handelRoleSelection('recruiter')}
				>
					Recruiter
				</Button>
			</div>
		</div>
	);
}
export default Onboarding;
