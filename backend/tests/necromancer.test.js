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

test("Get error message from return object if 500 response error", async () => {
  expect.assertions(2);
  const response = {
    status: 500
  };
  axios.get.mockRejectedValue({ response });

  return callNecromancer().then(data => {
    expect(data).toHaveProperty("error");
    expect(data.error).toMatch("Got response 500");
  });
});

test("Fail if attempting to call necromancer API more than once at a time.", async () => {
  expect.assertions(2);
  // Start 1st call:
  callNecromancer();
  // globals.currentlyCaballing should be true, and 2nd call should resolve with error:
  expect(globals.currentlyCaballing).toBe(true);
  return expect(callNecromancer()).resolves.toHaveProperty("error");
});
