import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { getApplications } from '@/api/apiApplication';
import ApplicationCard from '@/components/application-card';
import { Link } from 'react-router-dom';

import useFetch from '@/hooks/use-fetch';
import { BarLoader } from 'react-spinners';

const CreatedApplications = () => {
	const { user } = useUser();

	const {
		loading: loadingApplications,
		data: applications,
		fn: fnApplications,
	} = useFetch(getApplications, {
		user_id: user.id,
	});

	useEffect(() => {
		fnApplications();
	}, []);

	if (loadingApplications) {
		return <BarLoader className="mb-4" width={'100%'} color="#36d7b7" />;
	}
	[];
	return (
		<div className="flex flex-col  gap-2 ">
			{Array.isArray(applications) && applications.length > 0 ? (
				applications.map((application) => (
					<ApplicationCard key={application.id} application={application} isCandidate={true} />
				))
			) : (
				<div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
					<img src="/jobs/save-job.png" alt="No jobs found" className="w-42 h-48 mx-auto mb-6" />
					<p className="text-gray-400 mb-6 max-w-md">
						You haven’t applied to any jobs yet. Start exploring opportunities and apply to kickstart your
						journey!{' '}
					</p>
					<Link to="/jobs">
						<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition">
							Explore Jobs
						</button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default CreatedApplications;
