/* eslint-disable indent */
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { id } = req.query;

	switch (req.method) {
		case "PATCH": {
			const { title, description, completed } = req.body;

			try {
				const updatedTodo = await prisma.todo.update({
					where: { id: parseInt(id as string) },
					data: { title, description, completed },
				});

				res.status(200).json(updatedTodo);
			} catch (error) {
				console.error(error);
				res.status(500).json({ message: "Failed to update todo" });
			}

			break;
		}
		case "DELETE": {
			try {
				await prisma.todo.delete({
					where: { id: parseInt(id as string) },
				});

				res.status(200).json({ message: "Todo deleted successfully" });
			} catch (error) {
				console.error(error);
				res.status(500).json({ message: "Failed to delete todo" });
			}

			break;
		}
		default:
			res.status(405).json({ message: "Method not allowed" });
			break;
	}
}
