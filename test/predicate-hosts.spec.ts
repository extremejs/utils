import { expect, test, vi } from "vitest";

test("uses the host's Element accessor and works without DOMException", async () => {
  class HostElement {

    readonly #namespace = "http://www.w3.org/1999/xhtml";

    public get namespaceURI(): string {
      return this.#namespace;
    }

  }

  vi.stubGlobal("Element", HostElement);
  vi.stubGlobal("DOMException", void 0);
  vi.resetModules();

  try {
    const { isElement, isError } = await import("@extremejs/utils");
    const standIn: unknown = Object.create(HostElement.prototype);

    expect(isElement(new HostElement())).toBe(true);
    expect(isElement(standIn)).toBe(false);
    expect(isError(new Error("example"))).toBe(true);
    expect(isError({ [Symbol.toStringTag]: "DOMException" })).toBe(false);
  } finally {
    vi.unstubAllGlobals();
    vi.resetModules();
  }
});
