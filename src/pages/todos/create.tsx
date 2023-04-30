import React from "react";

import { NextPage } from "next";
import { useForm } from "react-hook-form";
import Layout from "~/components/Layout";
import { useRouter } from "next/router";

type Inputs = {
	title: string;
	description: string;
};

const TodoCreate: NextPage = () => {
	const router = useRouter();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<Inputs>();

	const onSubmit = async (data: Inputs) => {
		try {
			await fetch("/api/todos/create", {
				method: "PUT",
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

	return (
		<Layout protected>
			<form
				className="form-control w-full max-w-xs gap-5"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex flex-col">
					<label className="label">
						<label className="label-text text-primary">Title</label>
					</label>
					<input
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
						className="input input-bordered"
						{...register("description", { required: false })}
					/>
					{errors.description && (
						<label className="label-text text-error">
							Description is required
						</label>
					)}
				</div>
				<button type="submit" className="btn btn-secondary">
					Submit
				</button>
			</form>
		</Layout>
	);
};

export default TodoCreate;
