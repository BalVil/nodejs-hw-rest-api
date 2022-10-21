const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");
const { User } = require("../../models/userModel");

const { DB_TEST_HOST, PORT = 3000 } = process.env;

describe("test auth routes", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
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

    // the response must have status code 200
    expect(response.statusCode).toBe(200);

    // the response should return a token and a user object
    const { body } = response;
    expect(body.token).toBeTruthy();
    expect(body.user).toBeTruthy();

    // the user object must have 2 fields: email and subscription with data type String
    expect(body.user).toEqual({
      email: expect.any(String),
      subscription: expect.any(String),
    });

    // verification of token compliance
    const { token } = await User.findOne({ email: loginUser.email });
    expect(body.token).toBe(token);
  });
});
