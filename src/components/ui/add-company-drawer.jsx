/* eslint-disable react/prop-types */
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useFetch from '@/hooks/use-fetch';
import { addNewCompany } from '@/api/apicompany';
import { BarLoader } from 'react-spinners';
import { useEffect, useState } from 'react';

const schema = z.object({
	name: z.string().min(1, { message: 'Company name is required' }),
	logo: z.any().refine((file) => file[0] && (file[0].type === 'image/png' || file[0].type === 'image/jpeg'), {
		message: 'Only Images are allowed',
	}),
});

// The form and all of its state live here. AddCompanyDrawer remounts this
// component every time the dialog opens, so it always starts fresh (no stale errors).
function CompanyForm({ fetchCompanies, onSuccess }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	});

	const {
		loading: loadingAddCompany,
		error: errorAddCompany,
		data: dataAddCompany,
		fn: fnAddCompany,
	} = useFetch(addNewCompany);

	const onSubmit = (data) => {
		fnAddCompany({
			...data,
			logo: data.logo[0],
		});
	};

	useEffect(() => {
		if (dataAddCompany?.length > 0) {
			fetchCompanies();
			onSuccess?.();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingAddCompany]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 pt-2">
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="company-name">Company name</Label>
				<Input id="company-name" placeholder="e.g. Acme Inc." {...register('name')} />
				{errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
			</div>

			<div className="flex flex-col gap-1.5">
				<Label htmlFor="company-logo">Company logo</Label>
				<Input
					id="company-logo"
					type="file"
					accept="image/*"
					className="file:mr-3 file:rounded-full file:border-0 file:bg-accent file:px-3 file:py-1 file:text-sm file:font-medium file:text-accent-foreground"
					{...register('logo')}
				/>
				<span className="text-xs text-muted-foreground">PNG or JPEG image</span>
				{errors.logo && <p className="text-sm text-destructive">{errors.logo.message}</p>}
			</div>

			{errorAddCompany?.message && <p className="text-sm text-destructive">{errorAddCompany?.message}</p>}
			{loadingAddCompany && <BarLoader width={'100%'} color="#6d5ef8" />}

			<DialogFooter className="pt-2">
				<DialogClose asChild>
					<Button type="button" variant="outline">
						Cancel
					</Button>
				</DialogClose>
				<Button type="submit" variant="blue" disabled={loadingAddCompany}>
					Add company
				</Button>
			</DialogFooter>
		</form>
	);
}

const AddCompanyDrawer = ({ fetchCompanies }) => {
	const [open, setOpen] = useState(false);
	// Bump this on every open so <CompanyForm> remounts with a clean slate.
	const [formKey, setFormKey] = useState(0);

	const handleOpenChange = (next) => {
		if (next) setFormKey((k) => k + 1);
		setOpen(next);
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button type="button" size="sm" variant="secondary">
					Add Company
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Add a New Company</DialogTitle>
				</DialogHeader>
				<CompanyForm key={formKey} fetchCompanies={fetchCompanies} onSuccess={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	);
};

export default AddCompanyDrawer;
