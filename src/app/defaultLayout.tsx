"use client";

import { AppBar } from "@skeletonlabs/skeleton-react";
import Link from "next/link";
import SideBar from "./_components/side-bar";
import ThemeSwitcher from "./_components/theme-switcher";

export function Header() {
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
          </AppBar.Trail>
        </AppBar.Toolbar>
      </AppBar>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="flex flex-row justify-between gap-4 p-8 bg-surface-50-950/50">
      <p>&copy; {new Date().getFullYear()} - Computer Extra GmbH</p>
      <Link href="/Impressum">Impressum</Link>
      <Link href="/Datenschutz">Datenschutz</Link>
    </footer>
  );
}
