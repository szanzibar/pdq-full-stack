const axios = require("axios");
const $ = require("cheerio");

const url = `https://web.archive.org/web/20190914100118/https://www.pdq.com/about-us/`;

var parsedEmployeeData = [];

function getEmployees() {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(url);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

function employeeData() {
  //Only query pdq.com/about-us once for data. After that, just return the parsedEmployeeData array
  if (parsedEmployeeData && parsedEmployeeData.length > 0)
    return parsedEmployeeData;
  else {
    return new Promise(async (resolve, reject) => {
      try {
        let employeeData = await getEmployees();
        employeeNodes = $("div.figures > figure", employeeData).each(function(
          i,
          element
        ) {
          let longName;
          try {
            // Since the div tags containing names have duplicates, get unique long names from img url
            longName = $("img", this)
              .attr("src")
              .match(/([^_\/]+)$/gm)[0] //get everything after last / or _
              .match(/\w+/gm)[0]; //get first set of word characters to remove .png or -1.png
          } catch (err) {
            longName = null;
          }
          parsedEmployeeData.push({
            name: $("div", this).text(),
            img: $("img", this).attr("src"),
            longName
          });
        });
        // console.log(JSON.stringify(parsedEmployeeData, null, 2)); // For debugging
        resolve(parsedEmployeeData);
      } catch (err) {
        reject(err);
      }
    });
  }
}

async function getOneEmployee(name) {
  if (!parsedEmployeeData) parsedEmployeeData = await employeeData();

  let employee = parsedEmployeeData.find(element => {
    return element.name.toLowerCase() === name.toLowerCase();
  });

  if (!employee) {
    employee = parsedEmployeeData.find(element => {
      return element.name.toLowerCase() === "you?";
    });
  }

  employee.name = employee.name.toLowerCase();

  return employee;
}

module.exports = { employeeData, getOneEmployee };
