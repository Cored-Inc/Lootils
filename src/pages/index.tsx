import { type NextPage } from "next";
import Link from "next/link";
import Layout from "~/components/Layout";
import React from "react";

const Home: NextPage = () => {
	return (
		<Layout protected={false}>
			<div className="hero min-h-[calc(100vh-6rem)]">
				<div className="hero-content text-center text-neutral-content">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl font-bold">Lootils</h1>
						<p className="mb-5">
							A single website where you can find a list of tools that can help
							you organize your daily life!
						</p>
						<Link href="/about" className="btn btn-secondary">
							Learn More
						</Link>
					</div>
				</div>
			</div>
			<section className="min-h-screen h-full p-3">
				<h1 className="text-center font-bold text-5xl m-5">Features</h1>
				<FeatureSection
					imageSrc="/features/notes.png"
					title="Notes"
					description="Take and organize notes for your tasks, ideas, and more."
				/>
				<FeatureSection
					imageSrc="/features/todos.png"
					title="Todos"
					description="Create a list to remind you of your tasks later on."
				/>
			</section>
		</Layout>
	);
};

function FeatureSection({
	imageSrc,
	title,
	description,
}: {
	imageSrc: string;
	title: string;
	description: string;
}) {
	return (
		<div className="bg-inherit rounded-lg p-3 flex flex-col lg:flex-row items-center justify-center py-10">
			<div className="lg:w-1/2 mb-10 lg:mb-0">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={imageSrc}
					alt={title}
					className="rounded-xl w-full h-full object-contain"
				/>
			</div>
			<div className="lg:w-1/2 lg:pl-10">
				<h2 className="text-3xl font-bold mb-5">{title}</h2>
				<p className="text-lg mb-5">{description}</p>
				{/* Add more content here if needed */}
			</div>
		</div>
	);
}

export default Home;
