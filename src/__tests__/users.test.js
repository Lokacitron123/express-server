dotenv.config();

import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "../index.mjs";
import request from "supertest";

beforeAll(async () => {
  const mongoURI = process.env.MONGODB_URI;
  await mongoose.connect(mongoURI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("users", () => {
  it("should fetch all users", async () => {
    const response = await request(app)
      .get("/api/users")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty("_id");
    expect(response.body[0]).toHaveProperty("username", "Göran");
    expect(response.body[0]).toHaveProperty("email", "Göran@test.se");
    expect(response.body[0]).toHaveProperty("role", "user");
    expect(response.body[1]).toHaveProperty("username", "Johan");
    expect(response.body[1]).toHaveProperty("email", "Johan@test.se");
    expect(response.body[1]).toHaveProperty("role", "user");
  });

  it("should fetch single user", async () => {
    const response = await request(app)
      .get("/api/users/6665b4cd087f4a1eefd6d490")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("username", "Göran");
    expect(response.body).toHaveProperty("role", "user");
    expect(response.body).toHaveProperty("email", "Göran@test.se");
  });
});
