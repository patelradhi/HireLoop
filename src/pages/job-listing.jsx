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
import BackButton from '@/components/ui/back-button';
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
		return <BarLoader className="mb-4" width={'100%'} color="#6d5ef8" />;
	}

	return (
		<div className="px-2 sm:px-4 py-6 sm:py-10">
			<BackButton to="/" label="Back to home" />
			<header className="mb-10 text-center">
				<h1 className="gradient-title font-bold text-5xl sm:text-6xl tracking-tighter pb-3">Latest jobs</h1>
				<p className="text-muted-foreground text-base sm:text-lg">
					Discover roles at fast-moving startups — apply in one click.
				</p>
			</header>

			{/*  search + filters */}
			<div className="glass mx-auto max-w-4xl rounded-2xl p-4">
				<form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
					<Input
						type="text"
						placeholder="Search jobs by title…"
						name="search-query"
						className="h-11 flex-1 rounded-full px-5 text-base"
					/>
					<Button type="submit" size="lg" variant="blue">
						Search
					</Button>
				</form>

				<div className="mt-3 flex flex-col sm:flex-row gap-3">
					<Select value={location} onValueChange={(value) => setLocation(value)}>
						<SelectTrigger className="flex-1 rounded-full h-11">
							<SelectValue placeholder="Filter by location" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{City.getCitiesOfCountry('IN').map(({ name }, index) => (
									<SelectItem key={`${name}-${index}`} value={name}>
										{name}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>

					<Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
						<SelectTrigger className="flex-1 rounded-full h-11">
							<SelectValue placeholder="Filter by company" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{Array.isArray(companies) &&
									companies.map(({ name, id }) => (
										<SelectItem key={name} value={id}>
											{name}
										</SelectItem>
									))}
							</SelectGroup>
						</SelectContent>
					</Select>

					<Button variant="outline" size="lg" onClick={clearFilterButton}>
						Clear filters
					</Button>
				</div>
			</div>

			{loadingJobs && <BarLoader className="mt-6" width={'100%'} color="#6d5ef8" />}
			{!loadingJobs && (
				<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{jobs?.length ? (
						jobs.map((job) => {
							const isMyJob = user?.id === job.recruiter_id;
							return (
								<JobCard key={job.id} job={job} isMyJob={isMyJob} isMySavedJob={job.saved.length > 0} />
							);
						})
					) : (
						<div className="col-span-full py-20 text-center text-muted-foreground">No jobs found 😢</div>
					)}
				</div>
			)}
		</div>
	);
}

export default JobListing;
