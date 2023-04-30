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
			const { title, description } = req.body;

			try {
				const updatedNote = await prisma.note.update({
					where: { id: parseInt(id as string) },
					data: { title, description },
				});

				res.status(200).json(updatedNote);
			} catch (error) {
				console.error(error);
				res.status(500).json({ message: "Failed to update note" });
			}

			break;
		}
		case "DELETE": {
			try {
				await prisma.note.delete({
					where: { id: parseInt(id as string) },
				});

				res.status(200).json({ message: "Note deleted successfully" });
			} catch (error) {
				console.error(error);
				res.status(500).json({ message: "Failed to delete note" });
			}

			break;
		}
		default:
			res.status(405).json({ message: "Method not allowed" });
			break;
	}
}
