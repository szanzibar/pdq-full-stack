const globals = require("../utils/globals");

test("Global value 'currentlyCaballing' should initialize as false", () => {
  expect(globals.currentlyCaballing).toBe(false);
});
