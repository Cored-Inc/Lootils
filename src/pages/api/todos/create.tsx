/* eslint-disable indent */
import { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getServerAuthSession({ req, res });

	switch (req.method) {
		case "PUT": {
			const userId = session?.user?.id;
			if (!userId) {
				return res
					.status(401)
					.json({ message: "You must be logged in to create a todo" });
			}

			const { title, description } = req.body;

			try {
				const newTodo = await prisma.todo.create({
					data: {
						title,
						description,
						user: {
							connect: {
								id: userId,
							},
						},
					},
				});

				res.status(200).json(newTodo);
			} catch (error) {
				console.error(error);
				res.status(500).json({ message: "Failed to create todo" });
			}
			break;
		}
		default:
			res.status(405).json({ message: "Method not allowed" });
			break;
	}
}
