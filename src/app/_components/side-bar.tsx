"use client";

import { Dialog, Portal } from "@skeletonlabs/skeleton-react";
import { MenuIcon, XIcon } from "lucide-react";

export default function SideBar() {
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
            <ul>
              {Array.from(Array(10).keys()).map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog>
  );
}
