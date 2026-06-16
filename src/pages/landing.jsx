import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import companies from '../data/companies.json';
import fqas from '../data/fqa.json';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import FloatingJobCards from '@/components/ui/floating-job-cards';

function LandingPage() {
	return (
		<>
			<main className="flex flex-col gap-16 sm:gap-28 py-12 sm:py-24 px-4 sm:px-12 lg:px-20">
				<section className="flex flex-col items-center px-4 py-10 text-center sm:py-16">
					<span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-4 py-1.5 text-sm font-medium text-accent-foreground backdrop-blur-md">
						🚀 The fastest way to hire & get hired
					</span>
					<h1 className="flex flex-col justify-center items-center text-4xl font-bold sm:text-6xl lg:text-7xl tracking-tighter py-2">
						<span className="gradient-title">Find your dream job</span>
						<span className="flex flex-wrap items-baseline justify-center gap-x-3 sm:gap-x-5">
							<span className="gradient-title">and get</span>
							<span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
								Hired
							</span>
						</span>
					</h1>
					<p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-xl">
						Explore thousands of job listings at fast-moving startups — or find the perfect candidate.
					</p>
					<div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
						<Link to="/jobs">
							<Button variant="blue" size="lg">
								Find jobs
							</Button>
						</Link>
						<Link to="/post-jobs">
							<Button variant="red" size="lg">
								Post a job
							</Button>
						</Link>
					</div>
				</section>

				{/*Carousel*/}
				<div>
					<p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
						Trusted by teams at
					</p>
					<Carousel
						plugins={[
							Autoplay({
								delay: 2000,
							}),
						]}
						className="w-full [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
					>
						<CarouselContent className="flex gap-5 sm:gap-20 items-center px-4">
							{companies.map(({ name, id, path }) => {
								return (
									<CarouselItem key={id} className="basis-1/3 lg:basis-1/5">
										<img
											src={path}
											alt={name}
											className="h-9 sm:h-12 object-contain opacity-50 brightness-0 transition hover:opacity-90 dark:brightness-100 dark:opacity-70 dark:invert-0 dark:hover:opacity-100"
										/>
									</CarouselItem>
								);
							})}
						</CarouselContent>
					</Carousel>
				</div>

				{/*Floating job-card collage (replaces the banner)*/}
				<FloatingJobCards />

				<section className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/*cards*/}
					<Card className="rounded-2xl transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
						<CardHeader>
							<CardTitle className="text-xl font-bold">For Job Seekers</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								Search and apply for jobs, track applications, and land your next role faster.
							</p>
						</CardContent>
					</Card>
					<Card className="rounded-2xl transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
						<CardHeader>
							<CardTitle className="text-xl font-bold">For Employers</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								Post jobs, manage applications, and find the best candidates with ease.
							</p>
						</CardContent>
					</Card>
				</section>

				{/*accordion*/}
				<section className="mx-auto w-full max-w-3xl">
					<h2 className="mb-8 text-center text-3xl font-bold tracking-tight sm:text-4xl">
						Frequently asked questions
					</h2>
					<Accordion type="single" collapsible className="w-full">
						{fqas.map((fqa, index) => {
							return (
								<AccordionItem key={index} value={`item-${index}`}>
									<AccordionTrigger>{fqa.question}</AccordionTrigger>
									<AccordionContent>{fqa.answer}</AccordionContent>
								</AccordionItem>
							);
						})}
					</Accordion>
				</section>
			</main>
		</>
	);
}

export default LandingPage;
