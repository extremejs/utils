import { split } from "@extremejs/utils";

it("should split string by separator", () => {
  expect(split("012345")).toEqual(["0", "1", "2", "3", "4", "5"]);

  expect(split("0,1,2,3,4,5", ",")).toEqual(["0", "1", "2", "3", "4", "5"]);

  expect(split("0,1,2,3,4,5", ",", 2)).toEqual(["0", "1"]);
});
