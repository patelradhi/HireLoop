import CreatedApplications from '@/components/ui/created-application';
import CreatedJobs from '@/components/ui/created-job';
import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners';
import BackButton from '@/components/ui/back-button';

const MyJobs = () => {
	const { user, isLoaded } = useUser();

	if (!isLoaded) {
		return <BarLoader className="mb-4" width={'100%'} color="#6d5ef8" />;
	}

	return (
		<div>
			<BackButton label="Back" className="mt-6" />
			<h1 className="gradient-title font-bold text-3xl sm:text-5xl text-center pb-8">
				{user?.unsafeMetadata?.role === 'candidate' ? 'My Applications' : 'My Jobs'}
			</h1>
			{user?.unsafeMetadata?.role === 'candidate' ? <CreatedApplications /> : <CreatedJobs />}
		</div>
	);
};

export default MyJobs;
