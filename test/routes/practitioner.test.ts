import request from 'supertest'
import { afterAll, afterEach, describe, expect, it } from 'vitest'

import app from '../../src'
import {
  createTestPractitioner,
  createTestUser,
  deleteTestUserWithRelations,
  deleteTestUsers,
} from '../helpers/test-queries'
import { generateTestEmail, testPractitionerData } from '../helpers/test-data'

// date portion of ISO string
const todaysDate = new Date().toISOString().split('T')[0]

describe('practitionerRoutes', () => {
  afterAll(async () => {
    await deleteTestUsers()
  })

  describe('POST /', async () => {
    let userId: string
    let practitionerId: string
    let contactId: string

    /**
     * TODO: TestDB
     * This is in place to keep the DB clean while operating with only one DB
     */
    afterEach(async () => {
      await deleteTestUserWithRelations({ userId, practitionerId, contactId })
    })

    it('creates new practitioner and returns data', async () => {
      const user = await createTestUser({ email: generateTestEmail('lando2') })
      userId = user.id

      return request(app)
        .post(`/api/v1/practitioners/user/${user.id}`)
        .send(testPractitionerData)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          practitionerId = response.body.id
          contactId = response.body.contactId

          expect(response.body.id).toBeTypeOf('string')
          expect(response.body.description).toBe(
            testPractitionerData.description
          )
          expect(response.body.userId).toBe(user.id)
          expect(response.body.contactId).toBeTypeOf('string')
          expect(response.body.createdAt).toContain(todaysDate)
          expect(response.body.updatedAt).toContain(todaysDate)
        })
    })
  })

  describe('GET /:id', async () => {
    it('fetches practitioner record by ID, returns user data', async () => {
      const { id: userId } = await createTestUser()
      const { id } = await createTestPractitioner(userId)

      return request(app)
        .get(`/api/v1/practitioners/${id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.id).toBe(id)
          expect(response.body.userId).toBe(userId)
          expect(response.body.services[0].id).toBeTypeOf('string')
        })
    })

    it('returns 404 if user not found', () => {
      return request(app)
        .get('/api/v1/practitioners/770f537d-3ac5-485c-9ba4-d4e3152b91ee')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
    })
  })
})
