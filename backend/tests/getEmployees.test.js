const { employeeData, getOneEmployee } = require("../utils/getEmployees.js");

test("Should scrape pdq.com/about-us and return array of employee objects with picture links", async () => {
  const employees = await employeeData();
  expect(employees.length).toBeGreaterThan(0);
  expect(employees[0]).toHaveProperty("name");
  expect(employees[0]).toHaveProperty("img");
});

test("Should return information for single employee from pdq.com/about-us", async () => {
  const employee = await getOneEmployee("shawn");
  expect(employee.name).toBe("shawn");
  expect(employee.longName).toBe("shawna"); // The cabal API only returns first names, but if it ever gave us a first initial of the last name, we could distinguish between duplicates
  expect(employee.img).toMatch("shawna.png");
});

test("Should use default image and name for unknown employee", async () => {
  const employee = await getOneEmployee("Allison");
  expect(employee.name).toBe("you?");
  expect(employee.img).toMatch("default.png");
});
