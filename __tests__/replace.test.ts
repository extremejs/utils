import { replace } from "@extremejs/utils";

it("should repeat the given string, by count times", () => {
  expect(replace("Hi Fred, I'm Fred!", "Fred", "Barney"))
    .toBe("Hi Barney, I'm Fred!");

  expect(replace("Hi Fred, I'm Fred too!", "Fred", "Barney", true))
    .toBe("Hi Barney, I'm Barney too!");
});
