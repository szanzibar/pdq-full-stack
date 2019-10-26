const { callNecromancer } = require("./necromancer");
var globals = require("./globals");
const { getOneEmployee } = require("./getEmployees");

function socketHandling(socket, io) {
  console.log(`New client connected.`);
  if (!globals.currentlyCaballing) socket.emit("Ready");
  else socket.emit("Running");

  socket.on("callAPI", async () => {
    io.emit("Running");
    try {
      let mind = await callNecromancer();
      let employee = await getOneEmployee(mind.name);
      mind.img = employee ? employee.img : null;
      // console.log(JSON.stringify(mind, null, 2)); //debugging
      io.emit("ResultsFromAPI", mind);
    } catch (err) {
      io.emit("ResultsFromAPI", err);
    }
  });

  socket.on("echo", () => {
    socket.emit("echo", "Hello World");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
}

module.exports = socketHandling;
