// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician, Band } = require('./models/index')
const app = require('./src/app');
const { seedMusician } = require("./seedData");

beforeEach(() => {
  seedMusician
});

describe('./musicians endpoint', () => {
  test("Testing musicians endpoint", async () => {
    const res = await request(app).get("/musicians");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(seedMusician)
  })

  test("Testing /musicians/1 GET", async () => {
    const res = await request(app).get("/musicians/1");
    expect(res.body).toEqual(seedMusician[0])
  })

  test("Testing musicians POST", async () => {
    const newMusician = { name: "Nandos" };
    const res = await request(app)
      .post("/musicians")
      .send(newMusician);

    expect(res.body).toEqual(expect.arrayContaining(seedMusician, newMusician))
  })

  test("Testing musicians PUT", async () => {
    const replaceRestaurant = { name: "Bob Marly" };
    const res = await request(app)
      .put("/musicians/2")
      .send(replaceRestaurant)

    expect(res.body).toEqual(expect.arrayContaining([
      seedMusician[0], 
      replaceRestaurant, 
      seedMusician[2]
    ]))
  })

  test("Testing musicians DELETE", async () => {
    const res = await request(app)
      .delete("/musicians/3")

    expect(res.body).toEqual(expect.arrayContaining([seedMusician[0], seedMusician[1]]))
  })
})