import request from 'supertest'
import { describe, expect, it, vi } from 'vitest'

import app from '../../src'

// remove after test helpers have been created to clear test data
const randomNumber = (max: number):number => Math.floor(Math.random() * max);

const password = 'Mclaren4life!'
const userInputData = {
    firstName: 'Lando',
    lastName: 'Norris',
    aka: 'LN4',
}
// date portion of ISO string
const todaysDate = new Date().toISOString().split("T")[0]

describe("userRoutes", () => {
    describe("POST /", () => {
        it("creates new user and returns data, not including password", () => {
            const email = `lando${randomNumber(100)}@ln4.com`;

            return request(app)
                .post("/api/v1/users")
                .send({ ...userInputData, email, password })
                .expect("Content-Type", /json/)
                .expect(200)
                .then((response) => {
                    expect(response.body.id).toBeTypeOf('string')
                    expect(response.body.firstName).toBe(userInputData.firstName)
                    expect(response.body.lastName).toBe(userInputData.lastName)
                    expect(response.body.aka).toBe(userInputData.aka)
                    expect(response.body.email).toBe(email)
                    expect(response.body.createdAt).toContain(todaysDate)
                    expect(response.body.updatedAt).toContain(todaysDate)
                })
        })
    })

    describe("GET /:id", () => {
        it("fetches user record by ID, returns user data", () => {
            return request(app)
                .get("/api/v1/users/test-user-id")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200);
        })

        /**
         * Add test back in after test helpers are created to 
         * create and delete test users
         */
        // it("returns 404 if user not found", () => {
        //     return request(app)
        //         .get("/api/v1/users/incorrect-id")
        //         .set("Accept", "application/json")
        //         // .expect("Content-Type", /json/)
        //         .expect(404);
        // })
    })
})