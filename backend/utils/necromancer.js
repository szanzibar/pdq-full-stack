const axios = require("axios");

const endpoint = `https://pdqweb.azurewebsites.net/api/brain`;
var globals = require("./globals"); // share globals.currentlyCaballing across modules

async function callNecromancer() {
  if (globals.currentlyCaballing === true) {
    return `Error: Attempted multiple necromances at once.`;
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
          msg = `Failed to necromance: ${err}`;
        }
        console.log(msg);
        return msg;
      });
  }
}

function callNecromancerPromise() {
  return new Promise(async (resolve, reject) => {
    try {
      if (globals.currentlyCaballing === true) {
        reject(`Error: Attempted multiple necromances at once.`);
        return;
      }
      globals.currentlyCaballing = true;

      let response = await axios.get(endpoint);
      // console.log(`necromance results: ${JSON.stringify(response.data)}`); // For debugging
      globals.currentlyCaballing = false;
      resolve(response.data);
    } catch (err) {
      globals.currentlyCaballing = false;
      let msg;
      if (err && err.response && err.response.status === 500) {
        msg = `Got response 500, which usually means a cabal of necrotic zombies are chewing on the servers. Please try again.`;
      } else {
        msg = `Failed to necromance: ${err}`;
      }
      console.log(msg);
      reject(msg);
    }
  });
}

module.exports = { callNecromancer };
