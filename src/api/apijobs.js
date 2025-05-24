import supabaseClient from '@/utils/supabase';

// add new job

export async function addNewJob(token, _, jobData) {
	const supabase = await supabaseClient(token);

	const { data, error } = await supabase.from('jobs').insert([jobData]).select();

	if (error) {
		console.error(error);
		throw new Error('Error adding Job');
	}

	return data;
}

// Fetch Jobs
export async function getJobs(token, { location, company_id, searchQuery }) {
	const supabase = await supabaseClient(token);
	let query = supabase.from('jobs').select('*, saved: saved_jobs(id), company: companies(name,logo_url)');

	if (location) {
		query = query.eq('location', location);
	}

	if (company_id) {
		query = query.eq('company_id', company_id);
	}

	if (searchQuery) {
		query = query.ilike('title', `%${searchQuery}%`);
	}

	const { data, error } = await query;

	if (error) {
		console.error('Error fetching Jobs:', error);
		return null;
	}

	return data;
}

// add saved  job //

export async function savedJobs(token, { alreadySaved }, savedData) {
	const supabase = await supabaseClient(token);

	if (alreadySaved) {
		const { data, error: deleteError } = await supabase.from('saved_jobs').delete().eq('job_id', savedData.job_id);
		if (deleteError) {
			console.log(deleteError);
			return null;
		}
		console.log(data, 'data for already saved');
		return data;
	} else {
		const { data, error: insertError } = await supabase.from('saved_jobs').insert(savedData);
		if (insertError) {
			console.log(insertError);
			return null;
		}
		console.log(data, 'data for insert time save');

		return data;
	}
}

//fetch saved jobs //

export async function getSavedJobs(token) {
	const supabase = await supabaseClient(token);
	let query = supabase.from('saved_jobs').select('*,job:jobs(*,company:companies(name,logo_url))');

	const { data, error } = await query;

	if (error) {
		console.error('Error fetching Saved Jobs:', error);
		return null;
	}

	return data;
}

// fetch single job
export async function getSingleJob(token, { job_id }) {
	const supabase = await supabaseClient(token);
	let query = supabase
		.from('jobs')
		.select('*, company: companies(name,logo_url), applications: applications(*)')
		.eq('id', job_id)
		.single();

	const { data, error } = await query;

	if (error) {
		console.error('Error fetching Job:', error);
		return null;
	}

	return data;
}

// - job isOpen toggle - (recruiter_id = auth.uid())
export async function updateHiringStatus(token, { job_id }, isOpen) {
	const supabase = await supabaseClient(token);
	const { data, error } = await supabase.from('jobs').update({ isOpen }).eq('id', job_id).select();

	if (error) {
		console.error('Error Updating Hiring Status:', error);
		return null;
	}

	return data;
}

// get my created jobs
export async function getMyJobs(token, { recruiter_id }) {
	const supabase = await supabaseClient(token);

	const { data, error } = await supabase
		.from('jobs')
		.select('*, company: companies(name,logo_url)')
		.eq('recruiter_id', recruiter_id);

	if (error) {
		console.error('Error fetching Jobs:', error);
		return null;
	}

	return data;
}

// Delete job
export async function deleteJob(token, { job_id }) {
	const supabase = await supabaseClient(token);

	const { data, error: deleteError } = await supabase.from('jobs').delete().eq('id', job_id).select();

	if (deleteError) {
		console.error('Error deleting job:', deleteError);
		return data;
	}

	return data;
}
