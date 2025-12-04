import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/Datenschutz/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/Datenschutz/"!</div>;
}
