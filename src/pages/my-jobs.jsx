import CreatedApplications from '@/components/ui/created-application';
import CreatedJobs from '@/components/ui/created-job';
import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners';

const MyJobs = () => {
	const { user, isLoaded } = useUser();

	if (!isLoaded) {
		return <BarLoader className="mb-4" width={'100%'} color="#36d7b7" />;
	}

	return (
		<div>
			<h1 className="gradient-title font-bold text-4xl sm:text-5xl text-center pb-8">
				{user?.unsafeMetadata?.role === 'candidate' ? 'My Applications' : 'My Jobs'}
			</h1>
			{user?.unsafeMetadata?.role === 'candidate' ? <CreatedApplications /> : <CreatedJobs />}
		</div>
	);
};

export default MyJobs;
