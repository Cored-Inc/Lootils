import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";

type LayoutProps = {
	children?: React.ReactNode;
	protected: boolean;
};

const Layout: NextPage<LayoutProps> = ({
	children,
	protected: isProtected,
}: LayoutProps) => {
	const { status } = useSession();

	return (
		<div className="min-h-screen">
			<Navbar />
			{isProtected && status === "loading" && (
				<div className="max-w-2xl mx-auto px-4 py-8">
					<article className="prose">
						<h1 className="text-primary">Loading</h1>
						<p className="text-neutral-content">
							Your data is being processed and brought from our servers, please
							be patient with us!
						</p>
					</article>
				</div>
			)}
			{isProtected && status === "unauthenticated" && (
				<div className="max-w-2xl mx-auto px-4 py-8">
					<article className="prose">
						<h1 className="text-primary">This page is protected</h1>
						<p>
							You must be signed in to view protected pages as they usually
							contain content that is only viewable by signed in users.
						</p>
						<div className="grid grid-cols-2 gap-10">
							<button
								onClick={() => void signIn()}
								className="btn btn-secondary"
							>
								Sign in
							</button>
							<Link href="/" className="btn btn-secondary">
								Go back
							</Link>
						</div>
					</article>
				</div>
			)}
			{(!isProtected || status === "authenticated") && (
				<div className="container mx-auto px-4 md:px-0">
					<div
						className={
							!isProtected
								? "hidden"
								: "text-sm breadcrumbs mb-10 bg-base-300 w-fit p-3 rounded-full"
						}
					>
						<ul>
							<li>
								<Link href="/">Home</Link>
							</li>
							<Breadcrumbs />
						</ul>
					</div>
					{children}
				</div>
			)}
		</div>
	);
};

export default Layout;
