// socket.io tests mostly borrowed from here: https://medium.com/@tozwierz/testing-socket-io-with-jest-on-backend-node-js-f71f7ec7010f

const io = require("socket.io-client");
const http = require("http");
const ioBack = require("socket.io");
const app = require("../app");
const socketHandling = require("../utils/socketHandling");

const axios = require("axios");
jest.mock("axios");
jest.mock("../utils/getEmployees");
const getEmployees = require("../utils/getEmployees");
getEmployees.getOneEmployee.mockImplementation(() => {
  img: "https://cdn.pdq.com/wp-content/uploads/2017/10/default.png";
});

const testAddress = "localhost";
const testPort = "3002";

let socket;
let server;
let ioServer;

beforeAll(done => {
  server = http.createServer(app).listen(testPort);
  ioServer = ioBack(server);
  ioServer.on("connection", socket => {
    socketHandling(socket, ioServer);
  });
  done();
});

afterAll(done => {
  ioServer.close();
  server.close();
  done();
});

beforeEach(done => {
  socket = io.connect(`http://${testAddress}:${testPort}`, {
    "reconnection delay": 0,
    "reopen delay": 0,
    "force new connection": true,
    transports: ["websocket"]
  });
  socket.on("connect", () => {
    done();
  });
});

afterEach(done => {
  // Cleanup
  if (socket.connected) {
    socket.disconnect();
  }
  done();
});

test("Emitting 'echo' to the server should trigger 'Hello World' response", async done => {
  expect.assertions(1);
  socket.emit("echo");
  socket.on("echo", message => {
    expect(message).toBe("Hello World");
    done();
  });
});

test("socket.io should respond to 'callAPI' with broadcast of 'Running' followed by 'ResultsFromAPI'", async done => {
  expect.assertions(3);

  const user = {
    name: "Allison",
    currentThought: "This is a thought",
    daydream: "https://google.com"
  };
  axios.get.mockResolvedValue({ data: user });

  socket.emit("callAPI");
  socket.on("Running", message => {
    expect(message).not.toBeDefined();
  });
  socket.on("ResultsFromAPI", mind => {
    expect(mind).toBeDefined();
    expect(mind.name).toBe("Allison");
    done();
  });
});
