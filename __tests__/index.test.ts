import request from "supertest";
import app from "../src/app";

describe("POST: Calculate Area of Shapes", () => {
  test("Should return a 201 status code for valid calculations", async (done) => {
    await request(app)
      .post("/calculate")
      .send({
        shape: "circle",
        dimension: 10,
      })
      .expect(201)
      .expect("Content-Type", /json/);
    done();
  });
  test("Should return correct area of circle", async (done) => {
    const res = await request(app).post("/calculate").send({
      shape: "circle",
      dimension: 10,
    });
    expect(res.body.area).toEqual(314.159);
    done();
  });
  test("Should return correct area of square", async (done) => {
    const res = await request(app).post("/calculate").send({
      shape: "square",
      dimension: 10,
    });
    expect(res.body.area).toEqual(100);
    done();
  });
  test("Should return correct area of rectangle", async (done) => {
    const res = await request(app)
      .post("/calculate")
      .send({
        shape: "rectangle",
        dimension: { a: 4, b: 3 },
      });
    expect(res.body.area).toEqual(12);
    done();
  });
  test("Should return correct area of triangle", async (done) => {
    const res = await request(app)
      .post("/calculate")
      .send({
        shape: "triangle",
        dimension: { a: 4, b: 3, c: 4 },
      });
    expect(res.body.area).toEqual(5.562);
    done();
  });
});

describe("GET- Fetch all records", () => {
  it("Should return a json content type", async (done) => {
    await request(app).get("/fetchRecords").expect("Content-Type", /json/);
    done();
  });
  it("should respond with a 200 status code", async (done) => {
    const res = await request(app).get("/fetchRecords");
    expect(res.status).toBe(200);
    done();
  });
});
