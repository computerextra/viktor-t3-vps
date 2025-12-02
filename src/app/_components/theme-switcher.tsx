"use client";

import {
  Popover,
  Portal,
  SegmentedControl,
} from "@skeletonlabs/skeleton-react";
import { Computer, Moon, Palette, Sun } from "lucide-react";
import { api } from "@/trpc/react";

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

export default function ThemeSwitcher() {
  const [userTheme] = api.mode.getMode.useSuspenseQuery();

  const utils = api.useUtils();
  const update = api.mode.setMode.useMutation({
    onSuccess: async () => {
      await utils.mode.invalidate();
    },
    onError: () => {
      alert("Du musst angemeldet sein, um das zu tun!");
    },
  });

  return (
    <Popover>
      <Popover.Trigger className="btn-icon hover:preset-tonal">
        <Palette className="size-6" />
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content className="card bg-surface-50-950 border-surface-200-800 p-2 space-y-4 shadow-xl max-h-[75vh] lg:max-h-none overflow-y-auto">
            <SegmentedControl
              defaultValue={userTheme?.mode ?? "system"}
              onValueChange={(e) =>
                update.mutate({
                  theme: userTheme?.theme ?? "cerberus",
                  mode: e.value ?? "system",
                })
              }
            >
              <SegmentedControl.Control>
                <SegmentedControl.Indicator />
                <SegmentedControl.Item
                  value="system"
                  title="system"
                  aria-label="system"
                >
                  <SegmentedControl.ItemText>
                    <span className="flex items-center gap-1">
                      <Computer className="size-4" /> System
                    </span>
                  </SegmentedControl.ItemText>
                  <SegmentedControl.ItemHiddenInput />
                </SegmentedControl.Item>
                <SegmentedControl.Item
                  value="light"
                  title="light"
                  aria-label="light"
                >
                  <SegmentedControl.ItemText>
                    <span className="flex items-center gap-1">
                      <Sun className="size-4" /> Light
                    </span>
                  </SegmentedControl.ItemText>
                  <SegmentedControl.ItemHiddenInput />
                </SegmentedControl.Item>
                <SegmentedControl.Item
                  value="dark"
                  title="dark"
                  aria-label="dark"
                >
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
                    onClick={() =>
                      update.mutate({
                        theme: theme.name,
                        mode: userTheme?.mode ?? "system",
                      })
                    }
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
