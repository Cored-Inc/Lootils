import React from "react";
import { NextPage } from "next";
import Layout from "~/components/Layout";
import Link from "next/link";

const About: NextPage = () => {
	return (
		<Layout protected={false}>
			<div className="max-w-2xl mx-auto px-4 py-8">
				<article className="prose">
					<h1 className="text-primary">About Lootils</h1>
					<p>
						Lootils is a website that provides tools to help you organize your
						life better. Our current features include:
					</p>
					<ul>
						<li>
							<strong className="text-primary">Notes page</strong> - jot down
							your thoughts and ideas. Keep track of important information,
							brainstorm new projects, and stay organized.
						</li>
						<li>
							<strong className="text-primary">Todos page</strong> - create and
							manage your todo list. Set deadlines, prioritize tasks, and easily
							check items off your list.
						</li>
						<li>
							<strong className="text-warning">Calendar page</strong> (coming
							soon) - schedule your tasks and events. Stay on top of your
							schedule and never miss an important deadline.
						</li>
						<li>
							<strong className="text-warning">Contacts page</strong> (coming
							soon) - keep track of your important contacts. Store contact
							information, notes, and other relevant details in one place.
						</li>
					</ul>
					<h2>Our Mission</h2>
					<p>
						Our mission is to help you stay focused, motivated, and productive
						by providing simple and easy-to-use tools. We believe that everyone
						has the potential to achieve their goals, and we want to help you
						get there. Whether you&apos;re a student, a professional, or just
						someone looking to get more organized, Lootils can help.
					</p>
					<h2>Data Privacy</h2>
					<p>
						We take your privacy seriously at Lootils. We do not collect any
						personally identifiable information from you unless you explicitly
						provide it to us. We use industry-standard security measures to
						protect your data and ensure that it is not accessed by unauthorized
						parties.
					</p>
					<h2>Open Source</h2>
					<p>
						Lootils is an open-source project that is actively maintained by our
						team. We believe in the power of open-source software and the
						benefits it brings to the development community. Our code is
						available on GitHub, and we welcome contributions from anyone who
						wants to help improve our tools. You can find our project here at
						our repository:{" "}
						<Link href="https://github.com/cored-inc/lootils">
							Cored-Inc/Lootils
						</Link>
					</p>
					<h2>Contribution</h2>
					<p>
						We welcome contributions from anyone who wants to help improve
						Lootils. Whether you&apos;re a developer, designer, or just someone
						who wants to help spread the word, there are many ways to
						contribute. You can submit bug reports, suggest new features, or
						even submit code changes. Check out our GitHub repository for more
						information on how to get involved.
					</p>
					<h2>Bugs/Issues</h2>
					<p>
						If you encounter any problems while using Lootils, please let us
						know. You can submit bug reports or issues on our GitHub repository
						or email us at{" "}
						<Link href="mailto:youarenotmido@gmail.com">
							youarenotmido@gmail.com
						</Link>
						. We appreciate your feedback and will do our best to address any
						issues as quickly as possible.
					</p>
				</article>
			</div>
		</Layout>
	);
};

export default About;
