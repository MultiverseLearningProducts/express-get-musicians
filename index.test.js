// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest"); //The response to an endpoint can be accessed using the supertest package.
const { db } = require("./db/connection");
const { Musician, Band } = require("./models/index");
const app = require("./src/app");
const seedMusician = require("./seedData");

describe("./musicians endpoint", () => {
  // Write your tests here
  it("Testing musician endpoint", async () => {
    const res = await request(app).get("/musicians");
    const responseData = JSON.parse(res.text);
    // console.log(responseData);
    expect(res.statusCode).toBe(200);
  });
});

describe("./bands endpoint", () => {
  // Write your tests here
  it("Testing band endpoint", async () => {
    const res = await request(app).get("/bands");
    const responseData = JSON.parse(res.text);
    // console.log(responseData);
    expect(res.statusCode).toBe(200);
  });
});
