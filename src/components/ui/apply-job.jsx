import React from 'react';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useFetch from '@/hooks/use-fetch';
import { applyToJob } from '@/api/apiApplication';
import { BarLoader } from 'react-spinners';
import { UploadCloud } from 'lucide-react';

const schema = z.object({
	experience: z.number().min(0, { message: 'Experience must be at least 0' }).int(),
	skills: z.string().min(1, { message: 'Skills are required' }),
	education: z.enum(['Intermediate', 'Graduate', 'Post Graduate'], {
		message: 'Education is required',
	}),
	resume: z
		.any()
		.refine((file) => file[0] && (file[0].type === 'application/pdf' || file[0].type === 'application/msword'), {
			message: 'Only PDF or Word documents are allowed',
		}),
});

export function ApplyJobDrawer({ job, user, fetchJob, applied }) {
	const [open, setOpen] = React.useState(false);

	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(schema),
	});

	const { loading: loadingApply, error: errorApply, fn: fnApply } = useFetch(applyToJob);

	const resumeFile = watch('resume');
	const resumeName = resumeFile?.[0]?.name;

	const onSubmit = (data) => {
		fnApply({
			...data,
			job_id: job.id,
			candidate_id: user.id,
			name: user.fullName,
			status: 'applied',
			resume: data.resume[0],
		}).then(() => {
			fetchJob();
			reset();
			setOpen(false);
		});
	};

	const handleOpenChange = (next) => {
		if (!next) reset();
		setOpen(next);
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button size="lg" variant={job?.isOpen && !applied ? 'blue' : 'destructive'} disabled={!job?.isOpen || applied}>
					{job?.isOpen ? (applied ? 'Applied' : 'Apply') : 'Hiring Closed'}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Apply for {job?.title} at {job?.company?.name}
					</DialogTitle>
					<DialogDescription>Fill in the details below to submit your application.</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 pt-2">
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="experience">Years of experience</Label>
						<Input
							id="experience"
							type="number"
							placeholder="e.g. 3"
							{...register('experience', { valueAsNumber: true })}
						/>
						{errors.experience && <p className="text-sm text-destructive">{errors.experience.message}</p>}
					</div>

					<div className="flex flex-col gap-1.5">
						<Label htmlFor="skills">Skills</Label>
						<Input id="skills" type="text" placeholder="e.g. React, Node.js, SQL" {...register('skills')} />
						{errors.skills && <p className="text-sm text-destructive">{errors.skills.message}</p>}
					</div>

					<div className="flex flex-col gap-2">
						<Label>Education</Label>
						<Controller
							name="education"
							control={control}
							render={({ field }) => (
								<RadioGroup
									onValueChange={field.onChange}
									value={field.value}
									className="grid grid-cols-1 gap-2 sm:grid-cols-3"
								>
									{['Intermediate', 'Graduate', 'Post Graduate'].map((option) => (
										<Label
											key={option}
											htmlFor={option}
											className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
												field.value === option
													? 'border-primary bg-accent text-accent-foreground'
													: 'border-border bg-white/40 hover:border-primary/40'
											}`}
										>
											<RadioGroupItem value={option} id={option} />
											{option}
										</Label>
									))}
								</RadioGroup>
							)}
						/>
						{errors.education && <p className="text-sm text-destructive">{errors.education.message}</p>}
					</div>

					<div className="flex flex-col gap-1.5">
						<Label htmlFor="resume">Resume</Label>
						<label
							htmlFor="resume"
							className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border bg-white/40 px-4 py-6 text-center transition-colors hover:border-primary/50 hover:bg-accent/40"
						>
							<UploadCloud className="size-6 text-primary" />
							<span className="text-sm font-medium text-foreground">
								{resumeName ? resumeName : 'Click to upload your resume'}
							</span>
							<span className="text-xs text-muted-foreground">PDF or Word document</span>
						</label>
						<Input id="resume" type="file" accept=".pdf, .doc, .docx" className="hidden" {...register('resume')} />
						{errors.resume && <p className="text-sm text-destructive">{errors.resume.message}</p>}
					</div>

					{errorApply?.message && <p className="text-sm text-destructive">{errorApply?.message}</p>}
					{loadingApply && <BarLoader width={'100%'} color="#6d5ef8" />}

					<DialogFooter className="pt-2">
						<DialogClose asChild>
							<Button type="button" variant="outline">
								Cancel
							</Button>
						</DialogClose>
						<Button type="submit" variant="blue" disabled={loadingApply}>
							Submit application
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
