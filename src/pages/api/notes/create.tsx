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
					.json({ message: "You must be logged in to create a note" });
			}

			const { title, description, image } = req.body;

			try {
				const newNote = await prisma.note.create({
					data: {
						image: image ? image : null,
						title,
						description,
						user: {
							connect: {
								id: userId,
							},
						},
					},
				});

				res.status(200).json(newNote);
			} catch (error) {
				console.error(error);
				res.status(500).json({ message: "Failed to create note" });
			}
			break;
		}
		default:
			res.status(405).json({ message: "Method not allowed" });
			break;
	}
}
