import type { PromptSubmitShortcut } from "@t3tools/contracts/settings";

export type ComposerSubmitShortcutEvent = Pick<
  KeyboardEvent,
  "key" | "shiftKey" | "ctrlKey" | "metaKey" | "altKey"
>;

export function matchesComposerSubmitShortcut(
  shortcut: PromptSubmitShortcut,
  event: ComposerSubmitShortcutEvent,
): boolean {
  if (event.key !== "Enter" || event.altKey) {
    return false;
  }

  switch (shortcut) {
    case "enter":
      return !event.shiftKey && !event.ctrlKey && !event.metaKey;
    case "shift-enter":
      return event.shiftKey && !event.ctrlKey && !event.metaKey;
    case "meta-enter":
      return event.metaKey && !event.shiftKey && !event.ctrlKey;
    case "ctrl-enter":
      return event.ctrlKey && !event.shiftKey && !event.metaKey;
  }
}
