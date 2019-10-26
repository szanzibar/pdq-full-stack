const { callNecromancer } = require("../utils/necromancer");
const globals = require("../utils/globals");
jest.setTimeout(15000);
jest.retryTimes(2); // To give necromancer another chance if it returns a 500

test("Successfully call necromancer", async () => {
  expect.assertions(3);

  const response = await callNecromancer();
  expect(response).toHaveProperty("name");
  expect(response).toHaveProperty("currentThought");
  expect(response).toHaveProperty("daydream");
});

test("Fail if attempting to call necromancer API more than once at a time.", async () => {
  expect.assertions(2);
  // Start 1st call:
  callNecromancer();
  // globals.currentlyCaballing should be true, and 2nd call should fail:
  expect(globals.currentlyCaballing).toBe(true);
  return expect(callNecromancer()).rejects.toMatch("Error: Attempted multiple");
});
