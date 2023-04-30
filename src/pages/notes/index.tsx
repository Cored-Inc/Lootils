/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import React from "react";
import Link from "next/link";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

const Todos: NextPage = () => {
	const { data: notes, isLoading } = api.notes.getAll.useQuery();

	return (
		<Layout protected>
			<h1 className="font-bold text-5xl mb-10">Notes</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
				{!isLoading &&
					notes?.map((n) => (
						<div
							key={n.id}
							className="card bg-base-100 shadow-xl image-full h-80"
						>
							<figure>
								<img src={n.image} alt="Shoes" className="w-full" />
							</figure>
							<div className="card-body">
								<h2 className="card-title">{n.title}</h2>
								<p>{n.description}</p>
								<div className="card-actions justify-end">
									<Link href={`/notes/${n.id}`} className="btn btn-secondary">
										Edit now
									</Link>
								</div>
							</div>
						</div>
					))}
				{!isLoading && notes?.length === 0 && (
					<article className="prose">
						<h1 className="text-primary">No notes found!</h1>
						<p>
							It seems like you do not have any notes, use the button below to
							create a new one!
						</p>
					</article>
				)}
			</div>
			<Link href="/notes/create" className="btn btn-secondary mt-10 mb-10">
				Create Now
			</Link>
		</Layout>
	);
};

export default Todos;
