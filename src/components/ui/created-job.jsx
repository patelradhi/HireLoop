import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners';
import JobCard from '../job-card';
import { useEffect } from 'react';
import { getMyJobs } from '@/api/apijobs';
import { Link } from 'react-router-dom';

const CreatedJobs = () => {
	const { user } = useUser();

	const {
		loading: loadingCreatedJobs,
		data: createdJobs,
		fn: fnCreatedJobs,
	} = useFetch(getMyJobs, {
		recruiter_id: user.id,
	});

	useEffect(() => {
		fnCreatedJobs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			{loadingCreatedJobs ? (
				<BarLoader className="mt-4" width={'100%'} color="#36d7b7" />
			) : (
				<div
					className={`mt-8 ${
						createdJobs?.length > 0 ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex justify-center'
					}`}
				>
					{createdJobs?.length ? (
						createdJobs.map((job) => {
							return <JobCard key={job.id} job={job} onJobSaved={fnCreatedJobs} isMyJob />;
						})
					) : (
						<div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
							<img src="/jobs/save-job.png" alt="No jobs found" className="w-42 h-48 mx-auto mb-6" />
							<p className="text-gray-400 mb-6 max-w-md">
								Looks like you haven’t saved any jobs yet. Start exploring and save your favorites!
							</p>
							<Link to="/jobs">
								<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition">
									Explore Jobs
								</button>
							</Link>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default CreatedJobs;
