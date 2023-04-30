import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const notesRouter = createTRPCRouter({
	getById: publicProcedure
		.input(z.object({ id: z.number() }))
		.query(({ ctx, input }) => {
			return ctx.prisma.note.findUnique({
				where: {
					id: input.id,
				},
			});
		}),

	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.note.findMany({
			where: { userId: ctx.session?.user?.id },
		});
	}),
});
