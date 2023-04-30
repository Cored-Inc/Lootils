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
	image: string;
};

const NoteById: NextPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const { query } = router;
	const id = parseInt(query.id as string);

	const { data: note, isLoading } = api.notes.getById.useQuery({ id });

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<Inputs>();

	const onSubmit = async (data: Inputs) => {
		try {
			await fetch(`/api/notes/${query.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(data),
			});
			router.push("/notes");
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async () => {
		try {
			await fetch(`/api/notes/${query.id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			});
			router.push("/notes");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Layout protected>
			{note?.userId !== session?.user?.id &&
			!isLoading &&
			status !== "unauthenticated" ? (
				<div className="max-w-2xl mx-auto px-4 py-8">
					<article className="prose">
						<h1 className="text-primary">Uh oh</h1>
						<p className="text-error">
							Seems like you do not have permissions to view this note! Try
							visiting this note through the <Link href="/notes">notes</Link>{" "}
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
							defaultValue={note?.title || ""}
							className="input input-bordered"
							{...register("title", { required: true })}
						/>
						{errors.title && (
							<label className="label-text text-error">Title is required</label>
						)}
					</div>
					<div className="flex flex-col">
						<label className="label">
							<label className="label-text text-primary">Description</label>
						</label>
						<input
							defaultValue={note?.description || ""}
							className="input input-bordered"
							{...register("description")}
						/>
						{errors.description && (
							<label className="label-text text-error">
								Description is required
							</label>
						)}
					</div>
					<div className="flex flex-col">
						<label className="label">
							<label className="label-text text-primary">Image</label>
						</label>
						<input
							defaultValue={note?.image || ""}
							className="input input-bordered"
							{...register("image", { required: true })}
						/>
						{errors.title && (
							<label className="label-text text-error">Image is required</label>
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

export default NoteById;
