import React, { useEffect } from 'react';
import { getSavedJobs } from '@/api/apijobs';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners';
import JobCard from '@/components/job-card';
import { Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

function SavedJobs() {
	const { isLoaded, user } = useUser();

	const { loading: loadingSavedJobs, data: savedJobs, fn: fnSavedJobs } = useFetch(getSavedJobs);

	useEffect(() => {
		if (isLoaded) {
			fnSavedJobs();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoaded]);

	if (loadingSavedJobs || !isLoaded) {
		<BarLoader className="mb-4" width={'100%'} color="#36d7b7" />;
	}

	return (
		<div>
			<h1 className="gradient-title font-bold text-4xl sm:text-5xl text-center pb-8"> Saved Jobs</h1>
			{loadingSavedJobs === false && (
				<div
					className={`mt-8 ${
						savedJobs?.length > 0 ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex justify-center'
					}`}
				>
					{savedJobs?.length ? (
						savedJobs?.map((saved) => {
							return (
								<JobCard key={saved.id} job={saved?.job} onJobSaved={fnSavedJobs} isMySavedJob={true} />
							);
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
}

export default SavedJobs;
