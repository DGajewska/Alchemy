import request from 'supertest'
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest'

import app from '../../src'
import { createTestUser, deleteTestUser, deleteTestUsers, generateTestEmail } from '../helpers/user';

const password = 'Mclaren4life!'
const userInputData = {
    firstName: 'Lando',
    lastName: 'Norris',
    aka: 'LN4',
}
// date portion of ISO string
const todaysDate = new Date().toISOString().split("T")[0]

describe("userRoutes", () => {
    afterAll(async () => {
        await deleteTestUsers()
    })

    describe("POST /", async () => {
        let userId: string;

        /**
         * TODO: TestDB
         * This is in place to keep the DB clean while operating with only one DB
         */
        afterEach(async () => {
            await deleteTestUser(userId)
        })

        it("creates new user and returns data, not including password", () => {
            const email = generateTestEmail('lando')

            return request(app)
                .post("/api/v1/users")
                .send({ ...userInputData, email, password })
                .expect("Content-Type", /json/)
                .expect(200)
                .then((response) => {
                    userId = response.body.id;

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

    describe("GET /:id", async  () => {
        it("fetches user record by ID, returns user data", async () => {
            const { id } = await createTestUser()
            return request(app)
                .get(`/api/v1/users/${id}`)
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200);
        })


        it("returns 404 if user not found", () => {
            return request(app)
                .get("/api/v1/users/incorrect-id")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/) 
                .expect(404);
        })
    })
})