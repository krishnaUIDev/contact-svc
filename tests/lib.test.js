const lib = require("./lib");

test("Our first test", () => {
  const result = lib.absolute(1);
  expect(result).toBe(1);
});
