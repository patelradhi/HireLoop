import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import companies from '../data/companies.json';
import fqas from '../data/fqa.json';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

function LandingPage() {
	return (
		<>
			<main className="flex flex-col  gap-10 sm:gap-20 py-10 sm:py-20 px-20">
				<section className="text-center">
					<h1 className="flex flex-col justify-center items-center gradient-title text-2xl font-bold sm:text-5xl lg:text-6xl tracking-tighter py-4">
						Find your dream job {''}
						<span className="flex items-center gap-2 sm:gap-6">
							and get {''}
							<img src="/logo-dark.png" alt="hirrd logo" className="h-14 sm:h-24 lg:h-32" />
						</span>
					</h1>
					<p className="text-gray-300 text-xs sm:mt-4 sm:text-xl">
						Explore thounds of job listings or find the perfect candidate
					</p>
				</section>
				<div className="flex gap-6 justify-center">
					<Link to="/jobs">
						<Button variant="blue" size="lg">
							Find jobs
						</Button>
					</Link>
					<Link to="/post-jobs">
						<Button variant="red" size="lg">
							post a job
						</Button>
					</Link>
				</div>
				{/*Carousel*/}

				<Carousel
					plugins={[
						Autoplay({
							delay: 2000,
						}),
					]}
					className="w-full py-10"
				>
					<CarouselContent className=" flex gap-5 sm:gap-20 items-center">
						{companies.map(({ name, id, path }) => {
							return (
								<CarouselItem key={id} className="basis-1/3 lg:basis-1/5">
									<img src={path} alt={name} className="h-9 sm:h-14 object-contain" />
								</CarouselItem>
							);
						})}
					</CarouselContent>
				</Carousel>

				{/*Banner*/}

				<img src="banner.jpeg" alt="banner" className="w-full h-auto" />

				<section className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/*cards*/}

					<Card>
						<CardHeader>
							<CardTitle>For Job Seekers</CardTitle>
						</CardHeader>
						<CardContent>
							<p>Serch and apply for the jobs, track applications, and more.</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>For Employers</CardTitle>
						</CardHeader>
						<CardContent>
							<p>Post jobs, manage applications, and best candidates.</p>
						</CardContent>
					</Card>
				</section>

				{/*accordion*/}

				<Accordion type="single" collapsible className="w-full">
					{fqas.map((fqa, index) => {
						console.log(fqa);
						return (
							<AccordionItem key={index} value={`item-${index}`}>
								<AccordionTrigger>{fqa.question}</AccordionTrigger>
								<AccordionContent>{fqa.answer}</AccordionContent>
							</AccordionItem>
						);
					})}
				</Accordion>
			</main>
		</>
	);
}

export default LandingPage;
