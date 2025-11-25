import request from 'supertest'
import { describe, it } from 'vitest'

import app from '../../src'

describe("app", () => {
    it("responds with a 404", () =>
        request(app)
            .get("/api/v1/what-is-this-even")
            .set("Accept", "application/json")
            .expect(404));
});

describe("GET /api/v1/", () => {
    it("responds with generic json message", () => {
        request(app)
            .get("/api/v1/")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, { status: "API is running on /api" })
    })
})