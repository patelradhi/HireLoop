import React, { use } from 'react';
import useFetch from '@/hooks/use-fetch';
import { getJobs } from '@/api/apijobs';
import { useUser } from '@clerk/clerk-react';
import BarLoader from 'react-spinners/BarLoader';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSession } from '@clerk/clerk-react';
import JobCard from '@/components/job-card';
import { getCompanies } from '@/api/apicompany';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { City, State } from 'country-state-city';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function JobListing() {
	const [location, setLocation] = React.useState('');
	const [company_id, setCompany_id] = React.useState('');
	const [searchQuery, setSearchQuery] = React.useState('');
	const { isLoaded, user } = useUser();

	// for jobs

	const {
		data: jobs,
		loading: loadingJobs,
		fn: fnJobs,
	} = useFetch(getJobs, {
		location,
		company_id,
		searchQuery,
	});

	useEffect(() => {
		if (isLoaded) {
			fnJobs();
		}
	}, [isLoaded, searchQuery, location, company_id]);

	// for companies

	const { data: companies, loading: loadingCompanies, fn: fnCompanies } = useFetch(getCompanies);
	console.log(companies, 'companies');

	useEffect(() => {
		if (isLoaded) {
			fnCompanies();
		}
	}, [isLoaded]);

	//for serch bar

	const handleSearch = (e) => {
		e.preventDefault();
		let formData = new FormData(e.target);

		const query = formData.get('search-query');
		if (query) setSearchQuery(query);
	};

	const clearFilterButton = () => {
		setLocation('');
		setCompany_id('');
		setSearchQuery('');
	};

	if (!isLoaded) {
		return <BarLoader className="mb-4" width={'100%'} color="#36d7b7" />;
	}

	return (
		<div>
			<h1 className="gradient-title font-bold text-7xl sm:text-6xl text-center pb-8">Latest jobs</h1>
			{/*  add search bar */}

			<form onSubmit={handleSearch} className="h-14 flex flex-row w-100% gap-4 items-center mb-3 ml-3">
				<Input
					type="text"
					placeholder="Search Jobs by Title.."
					name="search-query"
					className="h-10 flex-1  px-4 text-md"
				/>
				<Button type="submit" className="h-9 sm:w-30 mr-6" variant="blue">
					Search
				</Button>
			</form>

			{/*for serch by location*/}

			<div className="flex flex-col sm:flex-row gap-3 ml-3">
				<Select value={location} onValueChange={(value) => setLocation(value)}>
					<SelectTrigger className="w-[500px] ">
						<SelectValue placeholder="Filter by location" />
					</SelectTrigger>

					<SelectContent>
						<SelectGroup>
							{City.getCitiesOfCountry('IN').map(({ name }, index) => (
								<SelectItem key={`${name}-${index}`} value={name}>
									{name}
								</SelectItem>
							))}
						</SelectGroup>{' '}
					</SelectContent>
				</Select>

				{/*for serch by company*/}

				<Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
					<SelectTrigger className="w-[500px]">
						<SelectValue placeholder="Filter by Company" />
					</SelectTrigger>

					<SelectContent>
						<SelectGroup>
							{Array.isArray(companies) &&
								companies.map(({ name, id }) => (
									<SelectItem key={name} value={id}>
										{name}
									</SelectItem>
								))}{' '}
						</SelectGroup>
					</SelectContent>
				</Select>

				<Button variant="red" className="h-9 w-[150px] sm:w-[180px] " onClick={clearFilterButton}>
					Clear Filter
				</Button>
			</div>

			{loadingJobs && <BarLoader className="mt-4" width={'100%'} color="#36d7b7" />}
			{!loadingJobs && (
				<div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4">
					{jobs?.length ? (
						jobs.map((job) => {
							const isMyJob = user?.id === job.recruiter_id;
							return (
								<JobCard key={job.id} job={job} isMyJob={isMyJob} isMySavedJob={job.saved.length > 0} />
							);
						})
					) : (
						<div className="text-center">No Jobs Found 😢</div>
					)}
				</div>
			)}
		</div>
	);
}

export default JobListing;
