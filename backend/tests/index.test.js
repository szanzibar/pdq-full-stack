const request = require("supertest");
const app = require("../app");

test("Express server should be running and accepting requests", async () => {
  await request(app)
    .get("/")
    .expect(200);
});
