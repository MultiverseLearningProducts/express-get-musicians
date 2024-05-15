// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");


describe('./musicians endpoint', () => {
  test("Testing musicians endpoint", async () => {
    const response = await request(app).get("/musicians");
    const responseData = JSON.parse(response.text);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(responseData)).toBe(true)
  })

  test("should respond with Mick Jagger Data", async () => {
    const response = await request(app).get("/musicians/1");
    expect(response.statusCode).toBe(200);
    const responseData = JSON.parse(response.text);
    expect(responseData).toEqual(expect.objectContaining({
      name: 'Mick Jagger',
      instrument: 'Voice',
    }));
  });

  test("should delete Drake from list", async () => {
    const response = await request(app).delete("/musicians/2");
    expect(response.statusCode).toBe(200);
    const responseData = JSON.parse(response.text);
    expect(responseData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
            name: 'Mick Jagger',
            instrument: 'Voice',
        }),
        expect.objectContaining({
            name: 'Jimi Hendrix',
            instrument: 'Guitar',
        }),
      ])
    );
  });
})