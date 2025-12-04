import {
	AppBar,
	Dialog,
	Menu,
	Popover,
	Portal,
	SegmentedControl,
} from "@skeletonlabs/skeleton-react";
import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Link,
	Scripts,
	useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { Computer, MenuIcon, Moon, Palette, Sun, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { type AuthSession, getSession } from "start-authjs";
import { authConfig } from "@/utils/auth";
import appCss from "../styles.css?url";

const themes: { name: string; icon: string }[] = [
	{ name: "catppuccin", icon: "🐈" },
	{ name: "cerberus", icon: "🐺" },
	{ name: "concord", icon: "🤖" },
	{ name: "crimson", icon: "🔴" },
	{ name: "fennec", icon: "🦊" },
	{ name: "hamlindigo", icon: "👔" },
	{ name: "legacy", icon: "💀" },
	{ name: "mint", icon: "🍃" },
	{ name: "modern", icon: "🌸" },
	{ name: "mona", icon: "🐙" },
	{ name: "nosh", icon: "🥙" },
	{ name: "nouveau", icon: "👑" },
	{ name: "pine", icon: "🌲" },
	{ name: "reign", icon: "📒" },
	{ name: "rocket", icon: "🚀" },
	{ name: "rose", icon: "🌷" },
	{ name: "sahara", icon: "🏜️" },
	{ name: "seafoam", icon: "🧜‍♀️" },
	{ name: "terminus", icon: "🌑" },
	{ name: "vintage", icon: "📺" },
	{ name: "vox", icon: "👾" },
	{ name: "wintry", icon: "🌨️" },
];

interface RouterContext {
	session: AuthSession | null;
}

const fetchSession = createServerFn({ method: "GET" }).handler(async () => {
	const request = getRequest();
	const session = await getSession(request, authConfig);
	return session;
});

export const Route = createRootRouteWithContext<RouterContext>()({
	beforeLoad: async () => {
		const session = await fetchSession();
		return {
			session,
		};
	},
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Viktor",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const { session } = Route.useRouteContext();

	return (
		<html lang="de" data-theme="cerberus">
			<head>
				<HeadContent />
			</head>
			<body>
				<div className="grid h-screen grid-rows-[auto_1fr_auto]">
					<Header />
					<main className="p-4">
						{!session && (
							<p className="text-5xl text-center max-w-md mx-auto mt-5">
								Diese Seite ist für die Mitarbeiter der Fa. Computer Extra
								gedacht, eine Nutzung ohne Firmenzugang ist nicht möglich.
							</p>
						)}
						{children}
					</main>
					<Footer />
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
				</div>
				<Scripts />
			</body>
		</html>
	);
}

function Header() {
	const { session } = Route.useRouteContext();
	const user = session?.user;
	const navigate = useNavigate();

	return (
		<header>
			<AppBar>
				<AppBar.Toolbar className="grid-cols-[auto_1fr_auto]">
					<AppBar.Lead>
						<SideBar />
					</AppBar.Lead>
					<AppBar.Headline>
						<p className="text-2xl">Viktor</p>
					</AppBar.Headline>
					<AppBar.Trail>
						<ThemeSwitcher />
						{user ? (
							<Menu>
								<Menu.Trigger className="btn hover:preset-tonal">
									{user.name ? user.name : user.email}
								</Menu.Trigger>
								<Portal>
									<Menu.Positioner>
										<Menu.Content>
											<Menu.Item
												value="profile"
												onClick={() =>
													navigate({
														to: "/Profil/$id",
														// biome-ignore lint/style/noNonNullAssertion: id kann hier nicht null sein!
														params: { id: user.id! },
													})
												}
											>
												Profil
											</Menu.Item>
											<Menu.Item
												value="signout"
												onClick={() =>
													navigate({
														to: "/api/auth/$",
														params: { _splat: "signout" },
													})
												}
											>
												<Menu.ItemText>Abmelden</Menu.ItemText>
											</Menu.Item>
										</Menu.Content>
									</Menu.Positioner>
								</Portal>
							</Menu>
						) : (
							<a className="btn preset-tonal" href="/api/auth/signin">
								Anmelden
							</a>
						)}
					</AppBar.Trail>
				</AppBar.Toolbar>
			</AppBar>
		</header>
	);
}

function SideBar() {
	const { session } = Route.useRouteContext();

	return (
		<Dialog>
			<Dialog.Trigger className="btn-icon preset-tonal">
				<MenuIcon className="size-4" />
			</Dialog.Trigger>
			<Portal>
				<Dialog.Backdrop className="fixed inset-0 z-50 bg-surface-50-950/50 transition transition-discrete opacity-0 starting:data-[state=open]:opacity-0 data-[state=open]:opacity-100" />
				<Dialog.Positioner className="fixed inset-0 z-50 flex justify-start">
					<Dialog.Content className="h-screen card bg-surface-100-900 w-sm p-4 space-y-4 shadow-xl transition transition-discrete opacity-0 -translate-x-full starting:data-[state=open]:opacity-0 starting:data-[state=open]:-translate-x-full data-[state=open]:opacity-100 data-[state=open]:translate-x-0">
						<header className="flex justify-between items-center">
							<Dialog.Title className="text-2xl font-bold">Viktor</Dialog.Title>
							<Dialog.CloseTrigger className="btn-icon preset-tonal">
								<XIcon />
							</Dialog.CloseTrigger>
						</header>
						{session && (
							<ul>
								{Array.from(Array(10).keys()).map((x) => (
									<li key={x}>{x}</li>
								))}
							</ul>
						)}
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog>
	);
}

function ThemeSwitcher() {
	const [activeMode, setActiveMode] = useState("system");
	const [activeTheme, setActiveTheme] = useState("cerberus");

	useEffect(() => {
		const mode = localStorage.getItem("mode") ?? null;
		if (mode == null) {
			setActiveMode("system");
		} else {
			setActiveMode(mode);
		}

		const theme = localStorage.getItem("theme") ?? null;
		if (theme == null) {
			setActiveTheme("cerberus");
		} else {
			setActiveTheme(theme);
		}
	}, []);

	useEffect(() => {
		if (activeMode == null) return;
		localStorage.setItem("mode", activeMode);
		if (activeMode === "system") {
			if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
				document.documentElement.setAttribute("data-mode", "dark");
			} else {
				document.documentElement.setAttribute("data-mode", "light");
			}
		} else {
			document.documentElement.setAttribute("data-mode", activeMode);
		}
	}, [activeMode]);

	useEffect(() => {
		if (activeTheme == null) return;
		localStorage.setItem("theme", activeTheme);
		document.documentElement.setAttribute("data-theme", activeTheme);
	}, [activeTheme]);

	return (
		<Popover>
			<Popover.Trigger className="btn-icon hover:preset-tonal">
				<Palette className="size-6" />
			</Popover.Trigger>
			<Portal>
				<Popover.Positioner>
					<Popover.Content className="card bg-surface-50-950 border-surface-200-800 p-2 space-y-4 shadow-xl max-h-[75vh] lg:max-h-none overflow-y-auto">
						<SegmentedControl
							value={activeMode}
							onValueChange={(e) => setActiveMode(e.value ?? "system")}
						>
							<SegmentedControl.Control>
								<SegmentedControl.Indicator />
								<SegmentedControl.Item value="system">
									<SegmentedControl.ItemText>
										<span className="flex items-center gap-1">
											<Computer className="size-4" /> System
										</span>
									</SegmentedControl.ItemText>
									<SegmentedControl.ItemHiddenInput />
								</SegmentedControl.Item>
								<SegmentedControl.Item value="light">
									<SegmentedControl.ItemText>
										<span className="flex items-center gap-1">
											<Sun className="size-4" /> Light
										</span>
									</SegmentedControl.ItemText>
									<SegmentedControl.ItemHiddenInput />
								</SegmentedControl.Item>
								<SegmentedControl.Item value="dark">
									<SegmentedControl.ItemText>
										<span className="flex items-center gap-1">
											<Moon className="size-4" />
											Dark
										</span>
									</SegmentedControl.ItemText>
									<SegmentedControl.ItemHiddenInput />
								</SegmentedControl.Item>
							</SegmentedControl.Control>
						</SegmentedControl>

						<div className="space-y-4">
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
								{themes.map((theme) => (
									<button
										key={theme.name}
										data-theme={theme.name}
										type="button"
										className="bg-surface-50-950 p-3 preset-outlined-surface-100-900 hover:preset-outlined-surface-950-50 rounded-md grid grid-cols-[auto_1fr_auto] items-center gap-4"
										onClick={() => setActiveTheme(theme.name)}
									>
										<span>{theme.icon}</span>
										<h3 className="text-sm capitalize font-bold text-left">
											{theme.name}
										</h3>
										<div className="flex justify-center items-center -space-x-1.5">
											<div className="aspect-square w-4 bg-primary-500 border border-black/10 rounded-full"></div>
											<div className="aspect-square w-4 bg-secondary-500 border border-black/10 rounded-full"></div>
											<div className="aspect-square w-4 bg-tertiary-500 border border-black/10 rounded-full"></div>
										</div>
									</button>
								))}
							</div>
						</div>
					</Popover.Content>
				</Popover.Positioner>
			</Portal>
		</Popover>
	);
}

function Footer() {
	return (
		<footer className="bg-neutral-primary-soft rounded-base shadow-xs border border-default m-4">
			<div className="w-full mx-auto max-w-7xl p-4 md:flex md:items-center md:justify-between">
				<span className="text-sm text-body sm:text-center">
					© {new Date().getFullYear()}{" "}
					<a href="https://computer-extra.de" className="hover:underline">
						Computer Extra GmbH
					</a>
				</span>
				<ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-body sm:mt-0">
					<li>
						<Link className="hover:underline me-4 md:me-6" to="/Datenschutz">
							Datenschutz
						</Link>
					</li>
					<li>
						<Link className="hover:underline me-4 md:me-6" to="/">
							Impressum
						</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
}
