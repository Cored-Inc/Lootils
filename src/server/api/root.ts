import { createTRPCRouter } from "~/server/api/trpc";
import { notesRouter } from "./routers/notes";
import { todosRouter } from "./routers/todos";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	notes: notesRouter,
	todos: todosRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
