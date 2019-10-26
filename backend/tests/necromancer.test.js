const axios = require("axios");

const { callNecromancer } = require("../utils/necromancer");
const globals = require("../utils/globals");
jest.mock("axios");

test("Successfully call necromancer", async () => {
  expect.assertions(3);
  const user = {
    name: "bob",
    currentThought: "This is a thought",
    daydream: "https://google.com"
  };
  axios.get.mockResolvedValue({ data: user });

  return callNecromancer().then(data => {
    expect(data).toHaveProperty("name");
    expect(data).toHaveProperty("currentThought");
    expect(data).toHaveProperty("daydream");
  });
});

test("Fail if attempting to call necromancer API more than once at a time.", async () => {
  expect.assertions(2);
  // Start 1st call:
  callNecromancer();
  // globals.currentlyCaballing should be true, and 2nd call should fail:
  expect(globals.currentlyCaballing).toBe(true);
  return expect(callNecromancer()).rejects.toMatch("Error: Attempted multiple");
});
