import { z } from "zod";
import { createTRPCRouter } from "@/server/api/trpc";
import { publicProcedure } from "./../trpc";

export const themeRouter = createTRPCRouter({
  getMode: publicProcedure.query(async ({ ctx }) => {
    if (ctx.session == null) return null;
    const mode = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: { mode: true, theme: true },
    });

    return mode ?? null;
  }),
  setMode: publicProcedure
    .input(z.object({ mode: z.string(), theme: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.session == null) return null;
      return await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          mode: input.mode,
          theme: input.theme,
        },
      });
    }),
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),
  //
  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.post.create({
  //       data: {
  //         name: input.name,
  //         createdBy: { connect: { id: ctx.session.user.id } },
  //       },
  //     });
  //   }),
  //
  // getLatest: protectedProcedure.query(async ({ ctx }) => {
  //   const post = await ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //     where: { createdBy: { id: ctx.session.user.id } },
  //   });
  //
  //   return post ?? null;
  // }),
  //
  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
