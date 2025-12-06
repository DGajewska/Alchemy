import request from 'supertest'
import { afterAll, afterEach, describe, expect, it } from 'vitest'

import app from '../../src'
import {
  createTestBusiness,
  createTestUser,
  deleteTestUserWithRelations,
  deleteTestUsers,
} from '../helpers/test-queries'
import { generateTestEmail, testBusinessData } from '../helpers/test-data'

// date portion of ISO string
const todaysDate = new Date().toISOString().split('T')[0]

describe('businessRoutes', () => {
  afterAll(async () => {
    await deleteTestUsers()
  })

  describe('POST /', async () => {
    let userId: string
    let businessId: string
    let contactId: string

    /**
     * TODO: TestDB
     * This is in place to keep the DB clean while operating with only one DB
     */
    afterEach(async () => {
      await deleteTestUserWithRelations({ userId, businessId, contactId })
    })

    it('creates new business and returns data', async () => {
      const user = await createTestUser({ email: generateTestEmail('lando2') })
      userId = user.id

      return request(app)
        .post(`/api/v1/businesses/user/${user.id}`)
        .send(testBusinessData)
        .expect('Content-Type', /json/)
        // .expect(200)
        .then((response) => {
          businessId = response.body.id
          contactId = response.body.contactId

          expect(response.body.id).toBeTypeOf('string')
          expect(response.body.description).toBe(
            testBusinessData.description
          )
          expect(response.body.ownerUserId).toBe(user.id)
          expect(response.body.contactId).toBeTypeOf('string')
          expect(response.body.createdAt).toContain(todaysDate)
          expect(response.body.updatedAt).toContain(todaysDate)
        })
    })
  })

  describe('GET /:id', async () => {
    it('fetches business record by ID, returns user data', async () => {
      const { id: userId } = await createTestUser()
      const { id } = await createTestBusiness(userId)

      return request(app)
        .get(`/api/v1/businesses/${id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.id).toBe(id)
          expect(response.body.ownerUserId).toBe(userId)
        })
    })

    it('returns 404 if user not found', () => {
      return request(app)
        .get('/api/v1/businesses/770f537d-3ac5-485c-9ba4-d4e3152b91ee')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
    })
  })
})
