import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';
import { SignedIn, SignedOut, SignInButton, UserButton, SignIn } from '@clerk/clerk-react';
import { PenBox, BriefcaseBusiness, Heart } from 'lucide-react';
import Logo from './ui/logo';
import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

function Header() {
	const [search, setSearch] = useSearchParams();
	const [showSignIn, setShowSignIn] = React.useState(false);
	const { user } = useUser();

	useEffect(() => {
		if (search.get('sign-in')) {
			setShowSignIn(true);
		}
	}, [search]);

	const handelOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			setShowSignIn(false);
			setSearch({});
		}
	};
	return (
		<>
			<header className="sticky top-0 z-40 w-full border-b border-white/40 bg-white/55 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
				<nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
					<Link to="/" className="flex items-center">
						<Logo className="text-2xl sm:text-3xl" />
					</Link>
					<div className="flex items-center gap-4">
					<SignedOut>
						<Button variant="blue" onClick={() => setShowSignIn(true)}>
							Login
						</Button>
					</SignedOut>
					<SignedIn>
						{user?.unsafeMetadata?.role === 'recruiter' && (
							<Link to="/post-jobs">
								<Button variant="red">
									<PenBox size={18} />
									Post a job
								</Button>
							</Link>
						)}
						<UserButton
							appearance={{
								elements: {
									avatarBox: 'w-10 h-10 ring-0', // Outer wrapper
									avatarImage: 'w-10 h-10',
								},
							}}
						>
							<UserButton.MenuItems>
								<UserButton.Link
									label="My Jobs"
									labelIcon={<BriefcaseBusiness size={15} />}
									href="/my-jobs"
								/>
								<UserButton.Link
									label="Saved Jobs"
									labelIcon={<Heart size={15} />}
									href="/saved-jobs"
								/>
								<UserButton.Action label="manageAccount" />
							</UserButton.MenuItems>
						</UserButton>{' '}
					</SignedIn>
				</div>
			</nav>
			</header>
			{showSignIn && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
					onClick={handelOverlayClick}
				>
					<SignIn signUpForceRedirectUrl="/onboarding" fallbackRedirectUrl="/onboarding" />
				</div>
			)}
		</>
	);
}

export default Header;
