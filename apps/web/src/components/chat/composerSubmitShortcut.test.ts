import { describe, expect, it } from "vitest";

import type { PromptSubmitShortcut } from "@t3tools/contracts/settings";
import { matchesComposerSubmitShortcut } from "./composerSubmitShortcut";

function keyEvent(
  init: Partial<KeyboardEvent> & Pick<KeyboardEvent, "key">,
): Pick<KeyboardEvent, "key" | "shiftKey" | "ctrlKey" | "metaKey" | "altKey"> {
  return {
    shiftKey: false,
    ctrlKey: false,
    metaKey: false,
    altKey: false,
    ...init,
  };
}

describe("matchesComposerSubmitShortcut", () => {
  it.each([
    ["enter", keyEvent({ key: "Enter" })],
    ["shift-enter", keyEvent({ key: "Enter", shiftKey: true })],
    ["meta-enter", keyEvent({ key: "Enter", metaKey: true })],
    ["ctrl-enter", keyEvent({ key: "Enter", ctrlKey: true })],
  ] as const)("matches %s", (shortcut, event) => {
    expect(matchesComposerSubmitShortcut(shortcut, event)).toBe(true);
  });

  it("rejects extra modifiers", () => {
    const shortcuts: PromptSubmitShortcut[] = ["enter", "shift-enter", "meta-enter", "ctrl-enter"];

    for (const shortcut of shortcuts) {
      expect(
        matchesComposerSubmitShortcut(
          shortcut,
          keyEvent({ key: "Enter", shiftKey: true, ctrlKey: true, metaKey: true }),
        ),
      ).toBe(false);
    }
  });

  it("rejects Alt combos", () => {
    const shortcuts: PromptSubmitShortcut[] = ["enter", "shift-enter", "meta-enter", "ctrl-enter"];

    for (const shortcut of shortcuts) {
      expect(
        matchesComposerSubmitShortcut(shortcut, keyEvent({ key: "Enter", altKey: true })),
      ).toBe(false);
      expect(
        matchesComposerSubmitShortcut(
          shortcut,
          keyEvent({ key: "Enter", altKey: true, shiftKey: true }),
        ),
      ).toBe(false);
    }
  });
});
