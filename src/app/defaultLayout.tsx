"use client";

import { AppBar } from "@skeletonlabs/skeleton-react";
import SideBar from "./_components/side-bar";
import ThemeSwitcher from "./_components/theme-switcher";

export function Header() {
  return (
    <header>
      <AppBar>
        <AppBar.Toolbar className="grid-cols-[auto_1ft_auto]">
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
  return <footer>FOOTER</footer>;
}
