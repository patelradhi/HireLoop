import supabaseClient, { supabaseUrl } from '@/utils/supabase';

// - Apply to job ( candidate )
export async function applyToJob(token, _, jobData) {
	const supabase = await supabaseClient(token);

	const random = Math.floor(Math.random() * 90000);
	const fileName = `resume-${random}-${jobData.candidate_id}`;

	const { error: storageError } = await supabase.storage.from('resumes').upload(fileName, jobData.resume);

	if (storageError) throw new Error('Error uploading Resume');

	const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

	const { data, error } = await supabase
		.from('applications')
		.insert([
			{
				...jobData,
				resume,
			},
		])
		.select();

	if (error) {
		console.error(error);
		throw new Error('Error submitting Application');
	}

	return data;
}

//update application status
export async function updateApplicationStatus(token, { job_id }, status) {
	const supabase = await supabaseClient(token);

	const { data, error } = await supabase
		.from('applications')
		.update({ status: status })
		.eq('job_id', job_id)
		.select();

	if (error) {
		console.error(error);
		throw new Error('Error Updating Application Status');
	}

	return data;
}

//get application
export async function getApplications(token, { user_id }) {
	const supabase = await supabaseClient(token);

	const { data, error } = await supabase
		.from('applications')
		.select('*, job:jobs(title,company:companies(name,logo_url))')
		.eq('candidate_id', user_id);

	if (error) {
		console.error(error);
		throw new Error('Error fetching Application');
	}

	return data;
}
