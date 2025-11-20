import request from 'supertest'
import { describe, it } from 'vitest'

import app from '../../src'

describe("GET /", () => {
    it("responds with generic json message", () =>
        request(app)
            .get("/")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, { status: "API is running on /api" }));
})