import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

function Dialog({ ...props }) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ className, ...props }) {
	return (
		<DialogPrimitive.Overlay
			data-slot="dialog-overlay"
			className={cn(
				'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm',
				className
			)}
			{...props}
		/>
	);
}

function DialogContent({ className, children, showCloseButton = true, ...props }) {
	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Content
				data-slot="dialog-content"
				className={cn(
					'glass data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-1/2 left-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-3xl p-6 shadow-2xl shadow-violet-500/10 duration-200 sm:p-8',
					className
				)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot="dialog-close"
						className="absolute top-5 right-5 rounded-full p-1.5 text-muted-foreground opacity-70 transition hover:bg-accent hover:text-foreground hover:opacity-100 focus:outline-none disabled:pointer-events-none"
					>
						<XIcon className="size-4" />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
}

function DialogHeader({ className, ...props }) {
	return <div data-slot="dialog-header" className={cn('flex flex-col gap-1.5 text-left', className)} {...props} />;
}

function DialogFooter({ className, ...props }) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
			{...props}
		/>
	);
}

function DialogTitle({ className, ...props }) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn('text-xl font-bold tracking-tight', className)}
			{...props}
		/>
	);
}

function DialogDescription({ className, ...props }) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn('text-sm text-muted-foreground', className)}
			{...props}
		/>
	);
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
};
