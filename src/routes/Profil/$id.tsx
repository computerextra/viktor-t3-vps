import { createFileRoute, redirect } from "@tanstack/react-router";
import { prisma } from "@/db";

export const Route = createFileRoute("/Profil/$id")({
	beforeLoad: ({ context }) => {
		if (!context.session) {
			throw redirect({ to: "/" });
		}
	},
	loader: async ({ params }) => {
		const res = await prisma.user.findUnique({ where: { id: params.id } });
		return { user: res };
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = Route.useLoaderData();

	return <div>Hello {user?.name}</div>;
}
