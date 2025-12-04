import request from 'supertest'
import { afterAll, describe, expect, it } from 'vitest'

import app from '../../src'
import { createTestUser, deleteTestUsers, generateTestEmail } from '../helpers/user';
import { createPractitioner, testPractitionerData } from '../helpers/practitioner';

// date portion of ISO string
const todaysDate = new Date().toISOString().split("T")[0]

describe("practitionerRoutes", () => {
    afterAll(async () => {
        await deleteTestUsers()
    })

    describe("POST /", async () => {
        it("creates new practitioner and returns data", async () => {
            const user = await createTestUser({ email: generateTestEmail('lando2')});

            const practitionerData = {
                ...testPractitionerData,
                userId: user.id,
            }

            return request(app)
                .post("/api/v1/practitioners")
                .send(practitionerData)
                .expect("Content-Type", /json/)
                .expect(200)
                .then((response) => {
                    expect(response.body.id).toBeTypeOf('string')
                    expect(response.body.description).toBe(practitionerData.description)
                    expect(response.body.socialMedia.instagram).toBe(practitionerData.socialMedia.instagram)
                    expect(response.body.userId).toBe(user.id)
                    expect(response.body.createdAt).toContain(todaysDate)
                    expect(response.body.updatedAt).toContain(todaysDate)
                })
        })
    })

    describe("GET /:id", async () => {
        it("fetches practitioner record by ID, returns user data", async () => {
            const { id: userId } = await createTestUser()
            const { id } = await createPractitioner(userId)

            return request(app)
                .get(`/api/v1/practitioners/${id}`)
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .then((response) => {
                    expect(response.body.id).toBe(id)
                    expect(response.body.userId).toBe(userId)
                });
        })

        it("returns 404 if user not found", () => {
            return request(app)
                .get("/api/v1/practitioners/incorrect-id")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(404);
        })
    })
})