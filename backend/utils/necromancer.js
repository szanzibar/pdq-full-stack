const axios = require("axios");

const endpoint = `https://pdqweb.azurewebsites.net/api/brain`;
var globals = require("./globals"); // share globals.currentlyCaballing across modules

async function callNecromancer() {
  if (globals.currentlyCaballing === true) {
    return { error: `Error: Attempted multiple necromances at once.` };
  } else {
    globals.currentlyCaballing = true;

    return axios
      .get(endpoint)
      .then(response => {
        // console.log(`necromance results: ${JSON.stringify(response.data)}`); // For debugging
        globals.currentlyCaballing = false;
        return response.data;
      })
      .catch(err => {
        globals.currentlyCaballing = false;
        let msg;
        if (err && err.response && err.response.status === 500) {
          msg = `Got response 500, which usually means a cabal of necrotic zombies are chewing on the servers. Please try again.`;
        } else {
          msg = `Failed to necromance: ${JSON.stringify(err, null, 2)}`;
        }
        console.log(msg);
        return { error: msg };
      });
  }
}

module.exports = { callNecromancer };
