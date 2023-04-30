import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Inputs = {
	title: string;
	description: string;
	completed: boolean;
};

const NoteById: NextPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const { query } = router;
	const id = parseInt(query.id as string);

	const { data: todo, isLoading } = api.todos.getById.useQuery({ id });

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<Inputs>();

	const onSubmit = async (data: Inputs) => {
		try {
			await fetch(`/api/todos/${query.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(data),
			});
			router.push("/todos");
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async () => {
		try {
			await fetch(`/api/todos/${query.id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			});
			router.push("/todos");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Layout protected>
			{todo?.userId !== session?.user?.id &&
			!isLoading &&
			status !== "unauthenticated" ? (
				<div className="max-w-2xl mx-auto px-4 py-8">
					<article className="prose">
						<h1 className="text-primary">Uh oh</h1>
						<p className="text-error">
							Seems like you do not have permissions to view this todo! Try
							visiting this todo through the <Link href="/todos">todos</Link>{" "}
							page and try again!
						</p>
						<p>Error: &quot;INVALID_PERMISSIONS&quot;</p>
					</article>
				</div>
			) : (
				<form
					className="form-control w-full max-w-xs gap-5"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="flex flex-col">
						<label className="label">
							<label className="label-text text-primary">Title</label>
						</label>
						<input
							defaultValue={todo?.title || ""}
							className="input input-bordered"
							{...register("title", {
								maxLength: 50,
								required: true,
								minLength: 2,
							})}
						/>
						{errors.title && (
							<ErrorMessage type={errors.title.type as string} />
						)}
					</div>

					<div className="flex flex-col">
						<label className="label">
							<label className="label-text text-primary">Description</label>
						</label>
						<input
							defaultValue={todo?.description || ""}
							className="input input-bordered"
							{...register("description", {
								maxLength: 1000,
								required: true,
								minLength: 5,
							})}
						/>
						{errors.description && (
							<ErrorMessage type={errors.description.type as string} />
						)}
					</div>

					<div className="flex flex-col">
						<label className="label">
							<label className="label-text text-primary">Status</label>
						</label>
						<input
							type="checkbox"
							defaultChecked={todo?.completed}
							className="toggle"
							{...(register("completed"))}
						/>
						{errors.completed && (
							<ErrorMessage type={errors.completed.type as string} />
						)}
					</div>
					<div className="grid grid-cols-2 gap-x-5">
						<button type="submit" className="btn btn-secondary">
							Submit
						</button>
						<button className="btn btn-error" onClick={handleDelete}>
							Delete
						</button>
					</div>
				</form>
			)}
		</Layout>
	);
};

function ErrorMessage({ type }: { type: string }) {
	switch (type) {
		case "minLength":
			return (
				<label className="label-text text-error">
					You must hit the minimum length
				</label>
			);
		case "required":
			return (
				<label className="label-text text-error">
					The following field is required
				</label>
			);
		case "maxLength":
			return (
				<label className="label-text text-error">
					You have hit the maximum length
				</label>
			);
		default:
			return (
				<label className="label-text text-error">An error has occurred</label>
			);
	}
}

export default NoteById;
