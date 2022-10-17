const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");
const { User } = require("../../models/userModel");

const { DB_TEST_HOST, PORT = 3000 } = process.env;
// const login = require("./login");

describe("test auth routes", () => {
  let server;
  beforeAll(() => (server = app.listen(8083)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });
  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done());
    });
  });

  test("POST /api/users/login", async () => {
    const loginUser = {
      email: "test@gmail.com",
      password: "1234567",
    };
    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);

    expect(response.statusCode).toBe(200);

    const { body } = response;
    expect(body.token).toBeTruthy();
    expect(body.user).toBeTruthy();

    expect(body.user).toEqual({
      email: expect.any(String),
      subscription: expect.any(String),
    });

    const { token } = await User.findOne({ email: loginUser.email });
    expect(body.token).toBe(token);
  });
});
