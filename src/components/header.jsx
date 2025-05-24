import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';
import { SignedIn, SignedOut, SignInButton, UserButton, SignIn } from '@clerk/clerk-react';
import { PenBox, BriefcaseBusiness, Heart } from 'lucide-react';
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
			<nav className=" py-4 flex justify-between items-center">
				<Link>
					<img src="/logo-dark.png" alt="logo" className="h-10 sm:h-14 lg:h-20 mr-4" />
				</Link>
				<div className="flex gap-7">
					<SignedOut>
						<Button className="mr-15 mt-2" variant="outline" onClick={() => setShowSignIn(true)}>
							Login
						</Button>
					</SignedOut>
					<SignedIn>
						{user?.unsafeMetadata?.role === 'recruiter' && (
							<Link to="/post-jobs">
								<Button variant="red" className="rounded-full ">
									<PenBox size={20} />
									post a job
								</Button>
							</Link>
						)}
						<UserButton
							appearance={{
								elements: {
									avatarBox: 'w-16 h-16 mr-10 ring-0', // Outer wrapper
									avatarImage: 'w-16 h-16',
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
			{showSignIn && (
				<div
					className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
					onClick={handelOverlayClick}
				>
					<SignIn signUpForceRedirectUrl="/onboarding" fallbackRedirectUrl="/onboarding" />
				</div>
			)}
		</>
	);
}

export default Header;
