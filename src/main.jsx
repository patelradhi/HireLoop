import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error('Missing Publishable Key');
}

// Aurora Glass appearance — light card, violet accent, matches the app.
const clerkAppearance = {
	variables: {
		colorPrimary: '#6d5ef8',
		colorText: '#0b0d12',
		colorTextSecondary: '#6b7280',
		colorBackground: '#ffffff',
		colorInputBackground: '#ffffff',
		colorInputText: '#0b0d12',
		borderRadius: '0.75rem',
		fontFamily: 'inherit',
	},
	elements: {
		card: 'shadow-2xl shadow-violet-500/10 border border-white/60',
		headerTitle: 'font-bold tracking-tight',
		formButtonPrimary:
			'bg-[#6d5ef8] hover:bg-[#5d4ee8] text-white normal-case font-medium shadow-sm shadow-violet-500/20',
		footerActionLink: 'text-[#6d5ef8] hover:text-[#5d4ee8]',
	},
};

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ClerkProvider appearance={clerkAppearance} publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
			<App />
		</ClerkProvider>
	</React.StrictMode>
);
