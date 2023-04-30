import { type NextPage } from "next";
import Layout from "~/components/Layout";
import React from "react";
import { api } from "~/utils/api";
import Link from "next/link";

const Todos: NextPage = () => {
	const { data: todos, isLoading } = api.todos.getAll.useQuery();

	return (
		<Layout protected>
			<h1 className="font-bol text-5xl mb-10">Todos</h1>
			<div className="grid grid-cols-1 w-full">
				{!isLoading &&
					todos?.sort((t, tb) => (tb.completed ? 1 : 0) - (t.completed ? 1 : 0)).map((t) => (
						<Link
							href={`/todos/${t.id}`}
							className="p-3 rounded-full w-full bg-base-300 flex items-center gap-x-10"
							key={t.id}
						>
							<input
								type="checkbox"
								className="checkbox checkbox-primary"
								checked={t.completed}
								readOnly
							/>
							<h1 className={t.completed ? "text-success" : "text-error"}>
								{t.title}
							</h1>
							<h2>{t.description}</h2>
						</Link>
					))}
				{!isLoading && todos?.length === 0 && (
					<article className="prose">
						<h1 className="text-primary">No todos found!</h1>
						<p>
							It seems like you do not have any todos, use the button below to
							create a new one!
						</p>
					</article>
				)}
			</div>
			<Link href="/todos/create" className="btn btn-secondary mt-10 mb-10">
				Create Now
			</Link>
		</Layout>
	);
};

export default Todos;
