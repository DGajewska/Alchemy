import request from 'supertest'
import { afterAll, afterEach, describe, expect, it } from 'vitest'

import app from '../../src'
import {
  createTestUser,
  deleteTestUsers,
  deleteTestUserWithRelations,
} from '../helpers/test-queries'
import { generateTestEmail } from '../helpers/test-data'

const password = 'Mclaren4life!'
const userInputData = {
  firstName: 'Lando',
  lastName: 'Norris',
}
// date portion of ISO string
const todaysDate = new Date().toISOString().split('T')[0]

describe('userRoutes', () => {
  afterAll(async () => {
    await deleteTestUsers()
  })

  describe('POST /', async () => {
    let userId: string

    /**
     * TODO: TestDB
     * This is in place to keep the DB clean while operating with only one DB
     */
    afterEach(async () => {
      await deleteTestUserWithRelations({ userId })
    })

    it('creates new user and returns data, not including password', () => {
      const email = generateTestEmail('lando')

      return request(app)
        .post('/api/v1/users')
        .send({ ...userInputData, email, password })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          userId = response.body.id

          expect(response.body.id).toBeTypeOf('string')
          expect(response.body.firstName).toBe(userInputData.firstName)
          expect(response.body.lastName).toBe(userInputData.lastName)
          expect(response.body.email).toBe(email)
          expect(response.body.createdAt).toContain(todaysDate)
          expect(response.body.updatedAt).toContain(todaysDate)
        })
    }, 10000) // requires longer timeout for password encryption
  })

  describe('GET /:id', async () => {
    it('fetches user record by ID, returns user data', async () => {
      const { id } = await createTestUser()
      return request(app)
        .get(`/api/v1/users/${id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.id).toBe(id)
        })
    })

    it('returns 404 if user not found', () => {
      return request(app)
        .get('/api/v1/users/770f537d-3ac5-485c-9ba4-d4e3152b91ee')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
    })
  })
})
